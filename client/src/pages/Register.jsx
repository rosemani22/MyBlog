

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerApi } from '../utils/api';
import home from '../photos/home.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      await registerApi(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <>
      {/* Background */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
         backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundImage: `url(${home})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          // opacity: 0.1,
          zIndex: -1
        }}
      />

      {/* Form Container */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100 ">
        <div className="card shadow p-4 " style={{ maxWidth: 450, width: '100%', borderRadius: '1.2rem' }}>
          {/* Header */}
          <div className="text-center mb-4">
            <div className="mb-3">
              <i
                className="bi bi-person-plus-fill text-white p-3 rounded-circle"
                style={{
                  background: 'linear-gradient(to right, #3B82F6, #8B5CF6)',
                  fontSize: '1.8rem'
                }}
              ></i>
            </div>
            <h4 className="fw-bold">Join BlogSphere</h4>
            <p className="text-muted">Create your account and start writing</p>
          </div>

          {error && <div className="alert alert-danger text-center">{error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-person" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-envelope" />
                </span>
                <input
                  type="email"
                  className="form-control border-start-0"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-lock" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control border-start-0"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <span
                  className="input-group-text bg-white"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
                </span>
              </div>
              <small className="text-muted">Password must be at least 6 characters long</small>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-lock" />
                </span>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className="form-control border-start-0"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
                <span
                  className="input-group-text bg-white"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`} />
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 text-white fw-semibold"
              style={{
                background: 'linear-gradient(to right, #3B82F6, #8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="bi bi-person-plus me-2"></i> Create Account
            </button>
          </form>

          {/* Footer link */}
          <div className="text-center mt-3">
            <small>
              Already have an account?{' '}
              <a href="/login" className="text-decoration-none fw-semibold" style={{ color: '#3B82F6' }}>
                Sign in here
              </a>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
