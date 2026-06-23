import matchesData from './matches.json'
import { TOURNAMENTS, FLAG_CODES, STAGE_MAPPING } from './constants'

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

    // Return matches without modification to preserve original flags from JSON
    return matches.filter(match => this.getMatchYear(match) === Number(year))
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
      // Use static data with flags preserved
      const staticMatches = this.getAllMatches(year)
      return {
        matches: staticMatches,
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
    const flagEmoji = this.getCountryEmoji(code)

    return {
      name: team.shortName || team.name || 'TBD',
      code,
      flag: flagEmoji,
      flagCode,
      flagUrl: flagCode ? `https://flagcdn.com/w40/${flagCode}.png` : null
    }
  }

  getCountryEmoji(code) {
    const emojiMap = {
      ARG: '🇦🇷', AUS: '🇦🇺', BEL: '🇧🇪', BRA: '🇧🇷', CAN: '🇨🇦',
      CMR: '🇨🇲', CRC: '🇨🇷', CRO: '🇭🇷', DEN: '🇩🇰', ECU: '🇪🇨',
      EGY: '🇪🇬', ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', ESP: '🇪🇸', FRA: '🇫🇷', GER: '🇩🇪',
      GHA: '🇬🇭', GRE: '🇬🇷', IRN: '🇮🇷', ITA: '🇮🇹', JAM: '🇯🇲',
      JPN: '🇯🇵', KOR: '🇰🇷', KSA: '🇸🇦', MAR: '🇲🇦', MEX: '🇲🇽',
      NED: '🇳🇱', PAR: '🇵🇾', PER: '🇵🇪', POL: '🇵🇱', POR: '🇵🇹',
      QAT: '🇶🇦', SEN: '🇸🇳', SRB: '🇷🇸', SVK: '🇸🇰', SUI: '🇨🇭',
      SVN: '🇸🇮', SWE: '🇸🇪', TUN: '🇹🇳', TUR: '🇹🇷', UKR: '🇺🇦',
      URU: '🇺🇾', USA: '🇺🇸', UZB: '🇺🇿', VEN: '🇻🇪', VIE: '🇻🇳',
      WAL: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', ZIM: '🇿🇼'
    }
    return emojiMap[code] || '🏳️'
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
    return STAGE_MAPPING[stage] || stage || ''
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
          ...apiMatch.homeTeam,
          ...localMatch.homeTeam,
          flag: localMatch.homeTeam?.flag || apiMatch.homeTeam?.flag || '🏳️'
        },
        awayTeam: {
          ...apiMatch.awayTeam,
          ...localMatch.awayTeam,
          flag: localMatch.awayTeam?.flag || apiMatch.awayTeam?.flag || '🏳️'
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