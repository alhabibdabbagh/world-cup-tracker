import matchesData from './matches.json'

class DataService {
  constructor() {
    this.data = matchesData
  }

  getAllMatches() {
    return this.data.matches || []
  }

  getMatchById(id) {
    return this.data.matches.find(match => match.id === id)
  }

  getMatchesByStatus(status) {
    return this.data.matches.filter(match => 
      match.status.toUpperCase() === status.toUpperCase()
    )
  }

  getScheduledMatches() {
    return this.getMatchesByStatus('SCHEDULED')
  }

  getLiveMatches() {
    return this.getMatchesByStatus('LIVE')
  }

  getFinishedMatches() {
    return this.getMatchesByStatus('FINISHED')
  }

  getMatchesByStage(stage) {
    return this.data.matches.filter(match => match.stage === stage)
  }

  getMatchesByGroup(group) {
    return this.data.matches.filter(match => match.group === group)
  }

  searchMatchesByTeam(teamName) {
    const search = teamName.toLowerCase()
    return this.data.matches.filter(match =>
      match.homeTeam.name.toLowerCase().includes(search) ||
      match.awayTeam.name.toLowerCase().includes(search)
    )
  }

  getTournamentInfo() {
    return {
      tournament: this.data.tournament,
      country: this.data.country,
      year: this.data.year
    }
  }

  getUniqueGroups() {
    const groups = new Set()
    this.data.matches.forEach(match => {
      if (match.group) groups.add(match.group)
    })
    return Array.from(groups).sort()
  }

  getUniqueStages() {
    const stages = new Set()
    this.data.matches.forEach(match => {
      if (match.stage) stages.add(match.stage)
    })
    return Array.from(stages)
  }
}

export default new DataService()