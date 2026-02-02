import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../apis/posts'
import { PostData } from '../../models/post'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: api.getPosts,
  })
}

export function useAddPost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post: PostData) => api.addPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useTriggerAiReaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId: number) => api.triggerAiReaction(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
