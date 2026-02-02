import { usePosts, useDeletePost } from '../hooks/usePosts'
import { useBots } from '../hooks/useBots'
import { Post } from '../../models/post'

function Feed() {
  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = usePosts()
  const {
    data: bots,
    isLoading: isLoadingBots,
    isError: isErrorBots,
  } = useBots()
  const deletePost = useDeletePost()

  if (isLoadingPosts || isLoadingBots) {
    return <div>Loading...</div>
  }

  if (isErrorPosts || isErrorBots) {
    return <div>Error fetching data</div>
  }

  const botsMap = new Map(bots?.map((bot) => [bot.id, bot]))
  const humanUser = { name: 'Matthew Park', avatar: '/images/avatars/matthew.png' }

  const mainPosts = posts?.filter((post) => !post.parent_id)
  const comments = posts?.filter((post) => post.parent_id)

  const getAuthor = (post: Post) => {
    if (post.is_ai) {
      return botsMap.get(post.user_id) || { name: 'AI Bot', avatar: '' }
    }
    return humanUser
  }

  const handleDelete = (id: number) => {
    deletePost.mutate(id)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Feed</h1>
      <div className="space-y-6">
        {mainPosts &&
          mainPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <img
                    src={getAuthor(post).avatar}
                    alt={getAuthor(post).name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <span className="font-bold">{getAuthor(post).name}</span>
                  {!post.is_ai && (
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="text-gray-700">{post.content}</p>
              </div>
              {post.image_url && (
                <img src={post.image_url} alt="Post" className="w-full" />
              )}
              <div className="p-4">
                <span className="text-sm text-gray-500">
                  {post.likes} likes
                </span>
              </div>
              <div className="p-4 border-t border-gray-200">
                {comments
                  ?.filter((comment) => comment.parent_id === post.id)
                  .map((comment) => (
                    <div key={comment.id} className="flex items-start mt-4 pl-8 bg-gray-50 rounded-lg p-2">
                      <img
                        src={getAuthor(comment).avatar}
                        alt={getAuthor(comment).name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <p className="text-gray-600 text-sm">
                          <span className="font-bold">
                            {getAuthor(comment).name}
                          </span>{' '}
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Feed
