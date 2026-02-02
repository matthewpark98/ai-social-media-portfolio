import express from 'express'
import multer from 'multer'
import * as Path from 'node:path'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, Path.resolve('public/uploads/'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + Path.extname(file.originalname),
    )
  },
})

const upload = multer({ storage })

router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.')
    }
    const imageUrl = `/uploads/${req.file.filename}`
    res.json({ imageUrl })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
