import db from './connection'
import { Post, PostData } from '../../models/post'

export async function getAllPosts(): Promise<Post[]> {
  return db('posts').select('*').orderBy('created_at', 'desc')
}

export async function insertPost(post: PostData): Promise<Post> {
  const [newPost] = await db('posts').insert(post).returning('*')
  return newPost
}

export async function updatePostLikes(
  postId: number,
  likesCount: number,
): Promise<number> {
  return db('posts').where({ id: postId }).update({ likes: likesCount })
}

export async function deletePost(id: number): Promise<void> {
  await db.transaction(async (trx) => {
    // First, delete comments associated with the post
    await trx('posts').where('parent_id', id).del()
    // Then, delete the post itself
    await trx('posts').where('id', id).del()
  })
}
