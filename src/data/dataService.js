import matchesData from './matches.json'

const TOURNAMENTS = {
  2022: {
    tournament: 'FIFA World Cup 2022',
    country: 'Qatar',
    year: 2022,
    label: '2022 Qatar'
  },
  2026: {
    tournament: 'FIFA World Cup 2026',
    country: 'USA • Canada • Mexico',
    year: 2026,
    label: '2026 USA • Canada • Mexico'
  }
}

const FLAG_CODES = {
  ARG: 'ar',
  AUS: 'au',
  BEL: 'be',
  BRA: 'br',
  CAN: 'ca',
  CMR: 'cm',
  CRC: 'cr',
  CRO: 'hr',
  DEN: 'dk',
  ECU: 'ec',
  EGY: 'eg',
  ENG: 'gb-eng',
  ESP: 'es',
  FRA: 'fr',
  GER: 'de',
  GHA: 'gh',
  GRE: 'gr',
  IRN: 'ir',
  ITA: 'it',
  JAM: 'jm',
  JPN: 'jp',
  KOR: 'kr',
  KSA: 'sa',
  MAR: 'ma',
  MEX: 'mx',
  NED: 'nl',
  PAR: 'py',
  PER: 'pe',
  POL: 'pl',
  POR: 'pt',
  QAT: 'qa',
  SEN: 'sn',
  SRB: 'rs',
  SVK: 'sk',
  SUI: 'ch',
  SVN: 'si',
  SWE: 'se',
  TUN: 'tn',
  TUR: 'tr',
  UKR: 'ua',
  URU: 'uy',
  USA: 'us',
  UZB: 'uz',
  VEN: 've',
  VIE: 'vn',
  WAL: 'gb-wls',
  ZIM: 'zw'
}

function nullableNumber(value) {
  return typeof value === 'number' ? value : null
}

class DataService {
  constructor() {
    this.data = matchesData
  }

  getMatchYear(match) {
    if (match.year) return Number(match.year)
    if (match.tournamentYear) return Number(match.tournamentYear)

    if (match.kickoff) {
      const year = new Date(match.kickoff).getFullYear()
      return Number.isNaN(year) ? null : year
    }

    return this.data.year ? Number(this.data.year) : null
  }

  getAvailableTournaments() {
    return Object.values(TOURNAMENTS)
  }

  getTournamentInfo(year = 2026) {
    return TOURNAMENTS[Number(year)] || {
      tournament: `FIFA World Cup ${year}`,
      country: '',
      year: Number(year),
      label: String(year)
    }
  }

  getAllMatches(year) {
    const matches = this.data.matches || []

    if (!year) {
      return matches
    }

    return matches.filter(match => this.getMatchYear(match) === Number(year))
  }

  getMatchesByStatus(status, year) {
    return this.getAllMatches(year).filter(match =>
      match.status?.toUpperCase() === status.toUpperCase()
    )
  }

  filterMatchesByStatus(matches, status) {
    return matches.filter(match =>
      match.status?.toUpperCase() === status.toUpperCase()
    )
  }

  async getMatches(year) {
    try {
      const liveMatches = await this.fetchLiveMatches(year)

      return {
        matches: liveMatches,
        source: 'api',
        error: null,
        lastUpdated: new Date()
      }
    } catch (error) {
      return {
        matches: this.getAllMatches(year),
        source: 'static',
        error: error.message,
        lastUpdated: new Date()
      }
    }
  }

  async fetchLiveMatches(year) {
    const response = await fetch(`/api/world-cup?year=${year}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || 'Live API unavailable')
    }

    const data = await response.json()
    const matches = data.matches || []

    if (matches.length === 0) {
      throw new Error('No live matches returned')
    }

    return this.mergeLocalMatchDetails(
      matches.map(match => this.normalizeFootballDataMatch(match, year)),
      year
    )
  }

  normalizeFootballDataMatch(match, year) {
    const score = match.score?.fullTime || {}

    return {
      id: `football-data-${match.id}`,
      externalId: match.id,
      year: Number(year),
      stage: this.mapStage(match.stage),
      group: this.mapGroup(match.group),
      homeTeam: this.normalizeTeam(match.homeTeam),
      awayTeam: this.normalizeTeam(match.awayTeam),
      kickoff: match.utcDate,
      status: this.mapStatus(match.status),
      minute: null,
      stadium: null,
      score: {
        home: nullableNumber(score.home),
        away: nullableNumber(score.away)
      },
      events: [],
      source: 'football-data.org',
      lastUpdated: match.lastUpdated
    }
  }

  normalizeTeam(team = {}) {
    const code = (team.tla || team.shortName || team.name || 'TBD')
      .slice(0, 3)
      .toUpperCase()

    const flagCode = FLAG_CODES[code]

    return {
      name: team.shortName || team.name || 'TBD',
      code,
      flag: '',
      flagCode,
      flagUrl: flagCode ? `https://flagcdn.com/w40/${flagCode}.png` : null
    }
  }

  mapStatus(status) {
    switch (status) {
      case 'IN_PLAY':
      case 'PAUSED':
        return 'LIVE'
      case 'FINISHED':
      case 'AWARDED':
        return 'FINISHED'
      case 'POSTPONED':
      case 'SUSPENDED':
        return 'POSTPONED'
      case 'CANCELED':
      case 'CANCELLED':
        return 'CANCELLED'
      case 'SCHEDULED':
      case 'TIMED':
      default:
        return 'SCHEDULED'
    }
  }

  mapStage(stage) {
    const stages = {
      GROUP_STAGE: 'Group Stage',
      LAST_16: 'Round of 16',
      QUARTER_FINALS: 'Quarter-Finals',
      SEMI_FINALS: 'Semi-Finals',
      THIRD_PLACE: 'Third Place',
      FINAL: 'Final'
    }

    return stages[stage] || stage || ''
  }

  mapGroup(group) {
    if (!group) return null
    return group.replace('GROUP_', '')
  }

  mergeLocalMatchDetails(apiMatches, year) {
    const localMatches = this.getAllMatches(year)

    return apiMatches.map(apiMatch => {
      const localMatch = localMatches.find(local => this.isSameFixture(local, apiMatch))

      if (!localMatch) {
        return apiMatch
      }

      return {
        ...apiMatch,
        stadium: localMatch.stadium || apiMatch.stadium,
        events: localMatch.events || apiMatch.events,
        homeTeam: {
          ...localMatch.homeTeam,
          ...apiMatch.homeTeam
        },
        awayTeam: {
          ...localMatch.awayTeam,
          ...apiMatch.awayTeam
        }
      }
    })
  }

  isSameFixture(localMatch, apiMatch) {
    const sameTeams =
      localMatch.homeTeam?.code === apiMatch.homeTeam?.code &&
      localMatch.awayTeam?.code === apiMatch.awayTeam?.code

    if (!sameTeams) {
      return false
    }

    const localDate = new Date(localMatch.kickoff).toISOString().slice(0, 10)
    const apiDate = new Date(apiMatch.kickoff).toISOString().slice(0, 10)

    return localDate === apiDate
  }
}

export default new DataService()