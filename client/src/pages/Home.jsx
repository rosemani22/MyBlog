import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, getStats } from '../utils/api';
// import home from '../photos/home1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const categories = ['All', 'Technology', 'Lifestyle', 'Other'];

const Home = () => {
  const [stats, setStats] = useState({ userCount: 0, blogCount: 0 });
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();
        setStats({
          userCount: response.data.userCount,
          blogCount: response.data.blogCount || response.data.entryCount || 0,
        });
      } catch (error) {
        setError('Error fetching stats');
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {};
        if (search) params.search = search;
        if (category !== 'All') params.category = category;
        const response = await getBlogs(params);
        setBlogs(response.data);
      } catch (err) {
        setError('Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [search, category]);

  return (
    <>
      {!user && (
        <div
          style={{
            minHeight: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1,
            // backgroundImage: `url(${home})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
          }}
        />
      )}
      <div className="container mt-5 home-bg" style={{ position: 'relative', zIndex: 1, background: "linear-gradient(to bottom, rgba(0, 255, 255, 0.1), rgba(255, 255, 0, 0.1))" }}>
        {!user && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8))',
            zIndex: 0,
          }} />
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center mb-4">
            <h1 className="display-4 font-playfair">Welcome to the Blog Platform</h1>
            {/* <p className="lead">Discover, create, and interact with blogs!</p> */}
            <p className="lead fw-medium">Discover amazing stories, share your thoughts, and connect with a community of passionate writers.</p>
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Total Users</h5>
                    <p className="card-text display-6">{stats.userCount}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Total Blogs</h5>
                    <p className="card-text display-6">{stats.blogCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search blogs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-2">
              <select
                className="form-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {loading && <div className="text-center">Loading blogs...</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          <div className="row">
            {blogs.length === 0 && !loading && !error && (
              <div className="text-center">No blogs found.</div>
            )}
            {blogs.map(blog => (
              <div className="col-md-6 mb-4" key={blog._id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h4 className="card-title">{blog.title}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">
                      👤 {blog.author?.name || 'Unknown'} | {blog.category}
                    </h6>
                    <div
                      className="card-text mb-2"
                      style={{ maxHeight: 80, overflow: 'hidden' }}
                      dangerouslySetInnerHTML={{ __html: blog.content?.slice(0, 200) + (blog.content?.length > 200 ? '...' : '') }}
                    />
                    <div className="d-flex align-items-center gap-3 mb-2" style={{ fontSize: '1.1rem' }}>
                      <span className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faHeart} style={{ color: '#e25555', marginRight: 4 }} />
                        {(blog.likes?.length || 0) + (blog.guestLikes?.length || 0)}
                      </span>
                      <span className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faComment} style={{ color: '#555', marginRight: 4 }} />
                        {blog.comments?.length || 0}
                      </span>
                    </div>
                    <Link to={`/blogs/${blog._id}`} className="btn btn-outline-primary btn-sm mt-2">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

