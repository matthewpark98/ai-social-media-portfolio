/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App'
import CreatePost from './components/CreatePost'
import Feed from './components/Feed'
import NotFoundPage from './components/NotFoundPage'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './auth/ProtectedRoute'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Feed />} />
    <Route path="login" element={<LoginPage />} />
    <Route
      path="add"
      element={
        <ProtectedRoute>
          <CreatePost />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFoundPage />} />
  </Route>,
)

export default routes
