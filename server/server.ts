import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'

import postsRoutes from './routes/posts.ts'
import uploadRoutes from './routes/upload.ts'
import aiRoutes from './routes/ai.ts'
import botsRoutes from './routes/bots.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(express.json())
server.use(express.static(Path.join(__dirname, '..', 'public')))

server.use('/api/v1/posts', postsRoutes)
server.use('/api/v1/upload', uploadRoutes)
server.use('/api/v1/ai', aiRoutes)
server.use('/api/v1/bots', botsRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
