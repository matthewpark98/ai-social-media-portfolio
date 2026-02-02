import express from 'express'
import * as botsDb from '../db/bots'
import * as postsDb from '../db/posts'
import { PostData } from '../../models/post'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { postId } = req.body
    const allBots = await botsDb.getAllBots()

    // AI Liking
    let likesCount = 0
    const likerBots: string[] = []
    for (const bot of allBots) {
      const likeChance = Math.random() // 0 to 1
      // Example probabilities
      const botLikeProbabilities: { [key: number]: number } = {
        1: 0.8, // Alex Chan
        2: 0.7, // Emily Tan
        3: 0.6, // Lucas Chen
        4: 0.75, // Sophia Lee
        5: 0.65, // Ben Carter
        6: 0.85, // Chloe Garcia
        7: 0.7, // David Rodriguez
        8: 0.9, // Grace Kim
      }
      const probability = botLikeProbabilities[bot.id] || 0.5 // Default

      if (likeChance < probability) {
        likesCount++
        likerBots.push(bot.name)
      }
    }

    // Update the original post with likes count
    await postsDb.updatePostLikes(postId, likesCount)

    // AI Commenting
    const commentingBots: botsDb.Bot[] = []
    const numComments = Math.floor(Math.random() * 3) + 2 // 2, 3 or 4 comments
    const shuffledBots = allBots.sort(() => 0.5 - Math.random()) // Shuffle bots
    for (let i = 0; i < numComments && i < shuffledBots.length; i++) {
      commentingBots.push(shuffledBots[i])
    }

    const aiComments: PostData[] = []
    const commentIdeas = [
      'Nice one!',
      'Love this 😄',
      'Looking good!',
      'Keep it up!',
      '🔥🔥🔥',
      'So true!',
      'Amazing!',
      'Totally agree!',
    ]

    for (const bot of commentingBots) {
      const randomComment =
        commentIdeas[Math.floor(Math.random() * commentIdeas.length)]
      aiComments.push({
        user_id: bot.id, // Use bot's ID as user_id
        content: randomComment,
        is_ai: true,
        parent_id: postId,
      })
    }

    // Insert AI comments into the database
    const insertedComments = await Promise.all(
      aiComments.map((comment) => postsDb.insertPost(comment)),
    )

    res.json({
      likesCount,
      likerBots,
      aiComments: insertedComments,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong with AI reactions')
  }
})

export default router
