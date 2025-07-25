import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getBlog,
  likeBlog,
  unlikeBlog,
  addComment,
  deleteComment,
  postReply
} from '../utils/api';
import { useAuth } from '../context/AuthContext';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [likeLoading, setLikeLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [guestName, setGuestName] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [guestId, setGuestId] = useState(() => {
    let id = localStorage.getItem('guestId');
    if (!id) {
      id = Math.random().toString(36).substr(2, 9);
      localStorage.setItem('guestId', id);
    }
    return id;
  });
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);

  const fetchBlog = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getBlog(id);
      setBlog(res.data);
    } catch (err) {
      setError('Blog not found or error fetching blog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line
  }, [id]);

  const likesArr = (blog && Array.isArray(blog.likes)) ? blog.likes : [];
  const guestLikesArr = (blog && Array.isArray(blog.guestLikes)) ? blog.guestLikes : [];

  const isLiked = user
    ? likesArr.some(id => id === user.id || id === user)
    : guestLikesArr.includes(guestId);

  const handleLike = async () => {
    setLikeLoading(true);
    try {
      if (user) {
        // console.log('Liking blog as user:', user._id);

        // console.log('Liking blog as user:', user);
        await likeBlog(id, { userId: user.id });
      } else {
        await likeBlog(id, { guestId });
      }
      await fetchBlog();
    } catch (err) {
      setError('Error updating like.');
    } finally {
      setLikeLoading(false);
    }
  };

  const handleUnlike = async () => {
    setLikeLoading(true);
    try {
      if (user) {
        await unlikeBlog(id, { userId: user.id });
      } else {
        await unlikeBlog(id, { guestId });
      }
      await fetchBlog();
    } catch (err) {
      setError('Error removing like.');
    } finally {
      setLikeLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setCommentLoading(true);
    try {
      await addComment(id, { text: comment, name: user ? user.username : guestName });
      setComment('');
      setGuestName('');
      await fetchBlog();
    } catch (err) {
      setError('Error adding comment.');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setCommentLoading(true);
    try {
      await deleteComment(id, commentId);
      await fetchBlog();
    } catch (err) {
      setError('Error deleting comment.');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
    setReplyText('');
    setReplyName('');
  };

  const handleSubmitReply = async (e, commentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplyLoading(true);
    try {
      await postReply(blog._id, commentId, {
        text: replyText,
        name: user ? user.username : replyName
      });
      setReplyText('');
      setReplyName('');
      setReplyingTo(null);
      await fetchBlog();
    } catch (err) {
      setError('Error posting reply.');
    } finally {
      setReplyLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading blog...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;
  if (!blog) return null;

  return (
    <div className="container mt-4">
      {/* <button className="btn bg-succea mb-3" onClick={() => navigate(-1)}>&larr; Back to Blogs</button> */}
      <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="../../">Home</a></li>
    <li class="breadcrumb-item"><a href="../">Back To Blog</a></li>
    {/* <li class="breadcrumb-item active" aria-current="page">Data</li> */}
  </ol>
</nav>
      <div className="card mb-4 shadow-lg ">
        <div className="card-body ">
          <h2 className="card-title">{blog.title}</h2>
          <h6 className="card-subtitle mb-2 text-muted">
            👤 {blog.author.name || 'Unknown'} | {blog.category} | {new Date(blog.createdAt).toLocaleString()}
          </h6>
          <div className="mb-3" dangerouslySetInnerHTML={{ __html: blog.content }} />
          <div className="d-flex align-items-center mb-2">
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={handleLike}
              disabled={likeLoading || isLiked}
            >
              {isLiked ? 'Liked' : 'Like'}
            </button>
            {isLiked && (
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={handleUnlike}
                disabled={likeLoading}
              >
                Unlike
              </button>
            )}
            <span className="dashboard-number">{likesArr.length + guestLikesArr.length}</span> Likes
            {user && user._id === blog.author?._id && (
              <Link to={`/blogs/${blog._id}/edit`} className="btn btn-warning btn-sm ms-3">
                Edit
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Comments</h5>
          <form className="mb-3" onSubmit={handleAddComment}>
            <div className="input-group">
              {!user && (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your name (optional)"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  disabled={commentLoading}
                />
              )}
              <input
                type="text"
                className="form-control"
                placeholder="Add a comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                disabled={commentLoading}
              />
              <button className="btn btn-success" type="submit" disabled={commentLoading || !comment.trim()}>
                {commentLoading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
          {blog.comments.length === 0 && <div className="text-muted">No comments yet.</div>}
          {blog.comments.map((c) => (
            <div key={c._id} className="mb-2 border-bottom pb-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{c.name || c.user?.username || 'Unknown'}:</strong> {c.text}
                  <div className="text-muted small">{new Date(c.createdAt).toLocaleString()}</div>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => handleReply(c._id)}
                    disabled={replyLoading}
                  >
                    Reply
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteComment(c._id)}
                    disabled={commentLoading}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {/* Replies */}
              {c.replies && c.replies.length > 0 && (
                <div className="ms-4 mt-2">
                  {c.replies.map((r) => (
                    <div key={r._id} className="mb-1">
                      <strong>{r.name || r.user?.username || 'Unknown'}:</strong> {r.text}
                      <div className="text-muted small">{new Date(r.createdAt).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
              {/* Reply Form */}
              {replyingTo === c._id && (
                <form className="ms-4 mt-2" onSubmit={e => handleSubmitReply(e, c._id)}>
                  <div className="input-group input-group-sm mb-2">
                    {!user && (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your name (optional)"
                        value={replyName}
                        onChange={e => setReplyName(e.target.value)}
                        disabled={replyLoading}
                      />
                    )}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      disabled={replyLoading}
                    />
                    <button className="btn btn-primary" type="submit" disabled={replyLoading || !replyText.trim()}>
                      {replyLoading ? 'Posting...' : 'Reply'}
                    </button>
                    <button className="btn btn-outline-secondary" type="button" onClick={() => setReplyingTo(null)} disabled={replyLoading}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 