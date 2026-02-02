import express from 'express'
import * as botsDb from '../db/bots'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const bots = await botsDb.getAllBots()
    res.json(bots)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
