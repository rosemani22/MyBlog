import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlog, updateBlog } from '../utils/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../context/AuthContext';

const categories = ['Technology', 'Lifestyle', 'Other'];

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [notAuthor, setNotAuthor] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getBlog(id);
        if (!user || res.data.author?._id !== user._id) {
          setNotAuthor(true);
        } else {
          setTitle(res.data.title);
          setCategory(res.data.category);
          setContent(res.data.content);
        }
      } catch (err) {
        setError('Error fetching blog.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    // eslint-disable-next-line
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }
    setSaving(true);
    try {
      await updateBlog(id, { title, category, content });
      setSuccess('Blog updated successfully!');
      setTimeout(() => {
        navigate(`/blogs/${id}`);
      }, 1000);
    } catch (err) {
      setError('Error updating blog.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading blog...</div>;
  if (notAuthor) return <div className="alert alert-danger mt-5 text-center">You are not authorized to edit this blog.</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Edit Blog</h2>
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
                disabled={saving}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
                disabled={saving}
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
                readOnly={saving}
                style={{ minHeight: 200 }}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog; 