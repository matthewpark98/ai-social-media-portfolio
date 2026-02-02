import db from './connection'

export interface Bot {
  id: number
  name: string
  avatar?: string
}

export async function getAllBots(): Promise<Bot[]> {
  return db('bots').select('*')
}

export async function getBotById(id: number): Promise<Bot | undefined> {
  return db('bots').where({ id }).first()
}
