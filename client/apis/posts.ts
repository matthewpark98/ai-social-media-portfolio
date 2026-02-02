import request from 'superagent'
import { Post, PostData } from '../../models/post'

const rootUrl = '/api/v1/posts'
const uploadUrl = '/api/v1/upload'
const aiReactUrl = '/api/v1/ai'

export async function getPosts(): Promise<Post[]> {
  const res = await request.get(rootUrl)
  return res.body
}

export async function addPost(post: PostData): Promise<Post> {
  const res = await request.post(rootUrl).send(post)
  return res.body
}

export async function uploadImage(file: File): Promise<{ imageUrl: string }> {
  const res = await request.post(uploadUrl).attach('image', file as any)
  return res.body
}

export async function triggerAiReaction(postId: number) {
  await request.post(aiReactUrl).send({ postId })
}

export async function deletePost(id: number): Promise<void> {
  await request.delete(`${rootUrl}/${id}`)
}
