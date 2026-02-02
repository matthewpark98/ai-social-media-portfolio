import express from 'express'
import * as db from '../db/posts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const posts = await db.getAllPosts()
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.post('/', async (req, res) => {
  try {
    const newPost = req.body
    const insertedPost = await db.insertPost(newPost)
    res.status(201).json(insertedPost)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deletePost(id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
