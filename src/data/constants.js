/**
 * Global Constants for World Cup Tracker
 */

export const REFRESH_INTERVAL_MS = 60_000

export const MATCH_STATUSES = {
  ALL: 'ALL',
  SCHEDULED: 'SCHEDULED',
  LIVE: 'LIVE',
  FINISHED: 'FINISHED',
  POSTPONED: 'POSTPONED',
  CANCELLED: 'CANCELLED'
}

export const FILTER_OPTIONS = [
  { key: 'ALL', label: 'All Matches' },
  { key: 'SCHEDULED', label: 'Scheduled' },
  { key: 'LIVE', label: 'Live' },
  { key: 'FINISHED', label: 'Finished' }
]

export const TOURNAMENTS = {
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

export const FLAG_CODES = {
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

export const EVENT_TYPES = {
  GOAL: { icon: '⚽', class: 'goal', label: 'Goal' },
  YELLOW_CARD: { icon: '🟨', class: 'yellow-card', label: 'Yellow Card' },
  RED_CARD: { icon: '🟥', class: 'red-card', label: 'Red Card' },
  SUBSTITUTION: { icon: '🔄', class: 'substitution', label: 'Substitution' }
}

export const STATUS_DISPLAY = {
  SCHEDULED: { text: 'Scheduled', className: 'scheduled' },
  LIVE: { text: '🔴 LIVE', className: 'live' },
  FINISHED: { text: 'Finished', className: 'finished' },
  POSTPONED: { text: 'Postponed', className: 'scheduled' },
  CANCELLED: { text: 'Cancelled', className: 'scheduled' }
}

export const STAGE_MAPPING = {
  GROUP_STAGE: 'Group Stage',
  LAST_16: 'Round of 16',
  QUARTER_FINALS: 'Quarter-Finals',
  SEMI_FINALS: 'Semi-Finals',
  THIRD_PLACE: 'Third Place',
  FINAL: 'Final'
}