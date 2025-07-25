// src/pages/About.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faUsers,
  faGlobe,
  faEdit,
  faTags,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <>
      
<div
  // style={{
  //   minHeight: '100vh',
  //   width: '100vw',
  //   position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   zIndex: -1,
  //   backgroundImage:
  //     // "url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1500&q=80')",
  //   // backgroundSize: 'cover',
  //   // backgroundRepeat: 'no-repeat',
  //   // backgroundPosition: 'center',
  //   // opacity: 0.9,
  // }}
/>

{/* Page Container */}
<div className="container my-5 about-bg position-relative" style={{ zIndex: 1 }}>
  {/* Glass Overlay */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      // background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(6px)',
      zIndex: 0,
    }}
  />

  <div style={{ position: 'relative', zIndex: 1 }}>
    <div className="card shadow-lg border-0 rounded-4 p-4">
      <div className="card-body">
        {/* Heading */}
        <h1 className="text-center mb-4 text-primary fw-bold">
          <FontAwesomeIcon icon={faBookOpen} className="me-2" />
          About BlogSpace
        </h1>

        {/* Intro */}
        <div className="row mb-5">
          <div className="col-md-8 mx-auto">
            <p className="lead text-center text-dark">
              BlogSpace is a vibrant platform where you can create, discover, and share amazing stories
              with a community of passionate writers and readers.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="row text-center g-4 mb-5">
          <div className="col-md-4">
            <div className="bg-light rounded-4 p-4 shadow-sm h-100">
              <FontAwesomeIcon icon={faEdit} size="2x" className="text-primary mb-3" />
              <h4 className="fw-semibold">Write & Publish</h4>
              <p className="text-muted">
                Share your stories, articles, and ideas with the world using our intuitive editor.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-light rounded-4 p-4 shadow-sm h-100">
              <FontAwesomeIcon icon={faGlobe} size="2x" className="text-primary mb-3" />
              <h4 className="fw-semibold">Explore & Discover</h4>
              <p className="text-muted">
                Browse stories by categories, trending topics, or search for your favorite writers.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-light rounded-4 p-4 shadow-sm h-100">
              <FontAwesomeIcon icon={faUsers} size="2x" className="text-primary mb-3" />
              <h4 className="fw-semibold">Community</h4>
              <p className="text-muted">
                Connect with a growing community of writers and readers. Comment, like, and follow.
              </p>
            </div>
          </div>
        </div>

        {/* Core Features + Tech Stack */}
        <div className="row g-4 mb-5">
          {/* Core Features */}
          <div className="col-md-6">
            <h3 className="mb-3 text-primary">Core Features</h3>
            <ul className="list-group shadow-sm rounded-3">
              <li className="list-group-item">
                <FontAwesomeIcon icon={faEdit} className="text-primary me-2" />
                Publish and edit blog posts
              </li>
              <li className="list-group-item">
                <FontAwesomeIcon icon={faTags} className="text-primary me-2" />
                Organize posts by categories and tags
              </li>
              <li className="list-group-item">
                <FontAwesomeIcon icon={faUsers} className="text-primary me-2" />
                User profiles and following system
              </li>
              <li className="list-group-item">
                <FontAwesomeIcon icon={faChartLine} className="text-primary me-2" />
                View stats on reads, likes, and comments
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="col-md-6">
            <h3 className="mb-3 text-primary">Technical Details</h3>
            <div className="card bg-light border-0 shadow-sm rounded-3">
              <div className="card-body">
                <h5 className="card-title fw-bold">Technology Stack</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <strong>Frontend:</strong> React.js, Bootstrap
                  </li>
                  <li className="mb-2">
                    <strong>Backend:</strong> Node.js, Express.js
                  </li>
                  <li className="mb-2">
                    <strong>Database:</strong> MongoDB
                  </li>
                  <li className="mb-2">
                    <strong>Authentication:</strong> JWT (JSON Web Tokens)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mb-5">
          <h3 className="mb-3 text-primary">How to Use</h3>
          <div className="card bg-light border-0 shadow-sm rounded-3">
            <div className="card-body">
              <ol className="mb-0">
                <li className="mb-2">Register for a new account or sign in</li>
                <li className="mb-2">Click on "Write" to start a new blog post</li>
                <li className="mb-2">Add title, content, and choose categories</li>
                <li className="mb-2">Publish to share with the community</li>
                <li className="mb-2">Explore and interact with other blogs</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-muted mt-4">
          <p className="mb-1">Version 1.0.0 Aditya Dhanraj</p>
          <p>© 2025 BlogSpace. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default About;