import axios from 'axios'
import { apiKey } from './apiKey'

const baseUrl = 'https://masa-nuxt-blog.microcms.io/api/v1'

function createRequestUrl(path: string, params: any): string {
  const sp = new URLSearchParams(params)
  const query = sp ? `?${sp}` : ''

  const url = baseUrl + path + query
  return url
}

const client = {
  async get(path: string, params: any): Promise<any> {
    const url = createRequestUrl(path, params)

    return axios.get(url, {
      headers: {
        'X-MICROCMS-API-KEY': apiKey,
      },
    })
  },
}

export default client
