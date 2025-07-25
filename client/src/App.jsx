import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import AddEntry from './pages/AddEntry'
import MyDiary from './pages/MyDiary'
import About from './pages/About'
import PrivateRoute from './components/PrivateRoute'
import BlogDetail from './pages/BlogDetail'
import AddBlog from './pages/AddBlog'
import EditBlog from './pages/EditBlog'
import Footer from './pages/Footer'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route style={{ background: 'linear-gradient(to left, rgba(0, 255, 255, 1), rgba(255, 255, 0))' }} path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/add-entry" element={
          <PrivateRoute>
            <AddEntry />
          </PrivateRoute>
        } />
        <Route path="/my-diary" element={
          <PrivateRoute>
            <MyDiary />
          </PrivateRoute>
        } />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/add-blog" element={
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        } />
        <Route path="/blogs/:id/edit" element={
          <PrivateRoute>
            <EditBlog />
          </PrivateRoute>
        } />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App