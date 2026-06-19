const FOOTBALL_DATA_BASE_URL = 'https://api.football-data.org/v4'

const DATE_RANGES = {
  2022: {
    dateFrom: '2022-11-20',
    dateTo: '2022-12-18'
  },
  2026: {
    dateFrom: '2026-06-11',
    dateTo: '2026-07-19'
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const apiKey = '47623b698cbd488d97dd745b66a6e585'
  const year = Number(req.query.year || 2026)
  const range = DATE_RANGES[year]

  if (!apiKey) {
    return res.status(500).json({
      message: 'FOOTBALL_DATA_API_KEY is not configured'
    })
  }

  if (!range) {
    return res.status(400).json({
      message: 'Unsupported tournament year'
    })
  }

  const url = new URL(`${FOOTBALL_DATA_BASE_URL}/competitions/WC/matches`)
  url.searchParams.set('dateFrom', range.dateFrom)
  url.searchParams.set('dateTo', range.dateTo)

  try {
    const apiResponse = await fetch(url, {
      headers: {
        'X-Auth-Token': apiKey
      }
    })

    const data = await apiResponse.json()

    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({
        message: data.message || 'football-data.org request failed',
        details: data
      })
    }

    res.setHeader('Cache-Control', 's-maxage=45, stale-while-revalidate=120')
    return res.status(200).json(data)
  } catch (error) {
    return res.status(502).json({
      message: error.message || 'Could not fetch World Cup data'
    })
  }
}