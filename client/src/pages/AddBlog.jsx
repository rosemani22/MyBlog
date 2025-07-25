import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../utils/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const categories = ['Technology', 'Lifestyle', 'Other'];

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await createBlog({ title, category, content });
      setSuccess('Blog created successfully!');
      setTimeout(() => {
        navigate(`/blogs/${res.data._id}`);
      }, 1000);
    } catch (err) {
      setError('Error creating blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />
      <div className="container mt-5 addblog-bg" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255,255,255,0.85)',
          zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="mb-4">Create New Blog</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    disabled={loading}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    theme="snow"
                    className="bg-white"
                    readOnly={loading}
                    style={{ minHeight: 200 }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Posting...' : 'Post Blog'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog; 