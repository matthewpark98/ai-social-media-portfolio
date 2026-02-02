import React, { useState, useRef } from 'react'
import { useAddPost, useTriggerAiReaction } from '../hooks/usePosts'
import { useNavigate } from 'react-router-dom'
import { uploadImage } from '../apis/posts'
import { Post } from '../../models/post'

function CreatePost() {
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const addPost = useAddPost()
  const triggerAiReaction = useTriggerAiReaction()
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let imageUrl: string | undefined = undefined
    if (image) {
      const uploadResponse = await uploadImage(image)
      imageUrl = uploadResponse.imageUrl
    }

    addPost.mutate(
      {
        user_id: 1, // Assuming user_id 1 is the human user
        content,
        image_url: imageUrl,
        is_ai: false,
      },
      {
        onSuccess: (newPost: Post) => {
          triggerAiReaction.mutate(newPost.id)
          setContent('') // Clear content
          setImage(null) // Clear image state
          if (fileInputRef.current) {
            fileInputRef.current.value = '' // Reset file input
          }
          navigate('/')
        },
      },
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Create a new post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            What&apos;s on your mind?
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Add an image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={addPost.isPending || triggerAiReaction.isPending}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {addPost.isPending || triggerAiReaction.isPending
              ? 'Creating...'
              : 'Create Post'}
          </button>
          {(addPost.isError || triggerAiReaction.isError) && (
            <p className="text-red-500 text-sm mt-2 text-center">
              Error creating post. Please try again.
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default CreatePost
