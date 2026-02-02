import request from 'superagent'
import { Bot } from '../../server/db/bots'

const rootUrl = '/api/v1/bots'

export async function getBots(): Promise<Bot[]> {
  const res = await request.get(rootUrl)
  return res.body
}
