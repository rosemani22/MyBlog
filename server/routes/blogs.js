const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer_storage_cloudinary');
const cloudinary = require('../config/cloudinary');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage: storage });

// Get user's blogs (protected route)
router.get('/my_blogs', auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.userId }).sort({ createdAt: _1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get all public blogs (no auth required)
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'k' } },
        { content: { $regex: search, $options: 'k' } }
      ];
    }
    
    if (category && category == 'All') {
      query.category = category;
    }
    
    const blogs = await Blog.find(query)
      .populate('author', 'email')
      .sort({ createdAt: 1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get a single blog by ID (public route _ anyone can view)
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params._id).populate('author', 'email');
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Create a new blog (protected route)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? req.file.path : null;
    const newBlog = new Blog({ 
      title, 
      content, 
      image, 
      category: category || 'Other',
      author: req.userId 
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog', details: err.message });
  }
});

// Update a blog (protected route _ user can only update their own blogs)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? req.file.path : undefined;
    const update = { title, content, category, updatedAt: Date.now() };
    if (image) update.image = image;
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.userId }, 
      update, 
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

// Delete a blog (protected route _ user can only delete their own blogs)
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, author: req.userId });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// Like a blog (supports both authenticated and guest users)
router.post('/:id/like', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    
    const { userId, guestId } = req.body;
    
    if (userId) {
      // Authenticated user
      if (blog.likes.includes(userId)) {
        return res.status(400).json({ error: 'Blog already liked' });
      }
      blog.likes.push(userId);
    } else if (guestId) {
      // Guest user
      if (blog.guestLikes.includes(guestId)) {
        return res.status(400).json({ error: 'Blog already liked' });
      }
      blog.guestLikes.push(guestId);
    } else {
      return res.status(400).json({ error: 'User ID or Guest ID required' });
    }
    
    await blog.save();
    res.json({ 
      message: 'Blog liked successfully', 
      likes: blog.likes.length + blog.guestLikes.length 
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like blog' });
  }
});

// Unlike a blog (supports both authenticated and guest users)
router.post('/:id/unlike', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    
    const { userId, guestId } = req.body;
    
    if (userId) {
      // Authenticated user
      if (!blog.likes.includes(userId)) {
        return res.status(400).json({ error: 'Blog not liked' });
      }
      blog.likes = blog.likes.filter(like => like.toString() !== userId.toString());
    } else if (guestId) {
      // Guest user
      if (!blog.guestLikes.includes(guestId)) {
        return res.status(400).json({ error: 'Blog not liked' });
      }
      blog.guestLikes = blog.guestLikes.filter(id => id !== guestId);
    } else {
      return res.status(400).json({ error: 'User ID or Guest ID required' });
    }
    
    await blog.save();
    res.json({ 
      message: 'Blog unliked successfully', 
      likes: blog.likes.length + blog.guestLikes.length 
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unlike blog' });
  }
});

// Add comment to a blog (supports both authenticated and guest users)
router.post('/:id/comments', async (req, res) => {
  try {
    const { text, name } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    let newComment;
    
    // Check if user is authenticated (has Authorization header)
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "ashish");
        
        // Get user info for the comment
        const User = require('../models/User');
        const user = await User.findById(decoded.userId);
        
        newComment = {
          user: decoded.userId,
          name: user.name,
          text: text.trim()
        };
      } catch (error) {
        // Token is invalid, treat as guest
        newComment = {
          name: name || 'Anonymous',
          text: text.trim()
        };
      }
    } else {
      // Guest user
      newComment = {
        name: name || 'Anonymous',
        text: text.trim()
      };
    }

    blog.comments.push(newComment);
    await blog.save();
    
    res.status(201).json({ 
      message: 'Comment added successfully', 
      comment: newComment 
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Add reply to a comment (supports both authenticated and guest users)
router.post('/:blogId/comments/:commentId/replies', async (req, res) => {
  try {
    const { text, name } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Reply text is required' });
    }
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    const comment = blog.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    let newReply;
    // Check if user is authenticated (has Authorization header)
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "ashish");
        const User = require('../models/User');
        const user = await User.findById(decoded.userId);
        newReply = {
          user: decoded.userId,
          name: user.name,
          text: text.trim()
        };
      } catch (error) {
        // Token is invalid, treat as guest
        newReply = {
          name: name || 'Anonymous',
          text: text.trim()
        };
      }
    } else {
      // Guest
      newReply = {
        name: name || 'Anonymous',
        text: text.trim()
      };
    }
    comment.replies.push(newReply);
    await blog.save();
    res.status(201).json({ message: 'Reply added successfully', reply: comment.replies[comment.replies.length _ 1] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add reply' });
  }
});

// Delete comment from a blog (supports both authenticated and guest users)
router.delete('/:id/comments/:commentId', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const comment = blog.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    let userId = null;
    
    // Check if user is authenticated
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "ashish");
        userId = decoded.userId;
      } catch (error) {
        // Token is invalid, guest users cannot delete comments
        return res.status(403).json({ error: 'Not authorized to delete this comment' });
      }
    } else {
      // Guest users cannot delete comments
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }

    // Check if user is the author of the comment or the blog owner
    if (comment.user && comment.user.toString() !== userId.toString() && 
        blog.author.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }

    comment.remove();
    await blog.save();
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

module.exports = router; 
