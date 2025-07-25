// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { login as loginApi } from '../utils/api';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
// import home from "../photos/home.jpg";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await loginApi(formData);
//       login(response.data.user, response.data.token);
//       navigate('/my-diary');
//     } catch (error) {
//       setError(error.response?.data?.error || 'Login failed');
//     }
//   };

//   return (
//     // <div
//     //   className="container mt-5 login-bg"
//     //   style={{
//     //     backgroundImage: `url(${home})`,
//     //     backgroundSize: 'cover',
//     //     backgroundPosition: 'center',
//     //     borderRadius: '16px',
//     //     boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
//     //     position: 'relative',
//     //     overflow: 'hidden',
//     //   }}
//     // >
//     //   <div style={{
//     //     position: 'absolute',
//     //     top: 0,
//     //     left: 0,
//     //     width: '100%',
//     //     height: '100%',
//     //     background: 'rgba(255,255,255,0.85)',
//     //     zIndex: 0,
//     //   }} />
//     //   <div style={{ position: 'relative', zIndex: 1 }}>
//     //     <div className="row justify-content-center">
//     //       <div className="col-md-6">
//     //         <div className="card auth-card">
//     //           <div className="card-body">
//     //             <h2 className="text-center mb-4">
//     //               <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
//     //               Login
//     //             </h2>
//     //             {error && <div className="alert alert-danger">{error}</div>}
//     //             <form onSubmit={handleSubmit}>
//     //               <div className="mb-3">
//     //                 <input
//     //                   type="email"
//     //                   className="form-control"
//     //                   placeholder="Email"
//     //                   value={formData.email}
//     //                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//     //                   required
//     //                 />
//     //               </div>
//     //               <div className="mb-3">
//     //                 <input
//     //                   type="password"
//     //                   className="form-control"
//     //                   placeholder="Password"
//     //                   value={formData.password}
//     //                   onChange={(e) => setFormData({...formData, password: e.target.value})}
//     //                   required
//     //                 />
//     //               </div>
//     //               <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
//     //               <div className="text-center">
//     //                 Don't have an account? <Link to="/register">Register</Link>
//     //               </div>
//     //             </form>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//     <>

//       <div
//         className="d-flex justify-content-center align-items-center min-vh-100 px-3"
//         style={{
//           backgroundImage: `url(${home})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//         }}
//       >
//         <div
//           className="card shadow-lg border-0 rounded-4 p-4 auth-card"
//           style={{
//             maxWidth: '500px',
//             width: '100%',
//             backdropFilter: 'blur(10px)',
//             background: 'rgba(255, 255, 255, 0.85)',
//           }}
//         >
//           <div className="card-body">
//             <h2 className="text-center mb-4 text-primary fw-bold">
//               <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
//               Login
//             </h2>

//             {error && <div className="alert alert-danger">{error}</div>}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Email</label>
//                 <input
//                   type="email"
//                   className="form-control rounded-3"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="form-label fw-semibold">Password</label>
//                 <input
//                   type="password"
//                   className="form-control rounded-3"
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <button type="submit" className="btn btn-primary w-100 rounded-3 fw-semibold">
//                 Login
//               </button>

//               <div className="text-center mt-3">
//                 <small>
//                   Don't have an account?{' '}
//                   <Link to="/register" className="text-decoration-none fw-semibold">
//                     Register
//                   </Link>
//                 </small>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// };

// export default Login;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginApi } from '../utils/api';
import home from "../photos/home.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginApi(formData);
      login(response.data.user, response.data.token);
      navigate('/my-diary');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center min-vh-100 px-3"
        style={{
          backgroundImage: `url(${home})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="card shadow-lg border-0 rounded-4 p-4"
          style={{
            maxWidth: '450px',
            width: '100%',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '1.5rem'
          }}
        >
          <div className="text-center mb-4">
            <div className="mb-3">
              <i
                className="bi bi-box-arrow-in-right text-white p-3 rounded-circle"
                style={{
                  background: 'linear-gradient(to right, #3B82F6, #8B5CF6)',
                  fontSize: '1.8rem'
                }}
              ></i>
            </div>
            <h4 className="fw-bold">Welcome Back</h4>
            <p className="text-muted">Sign in to your BlogSphere account</p>
          </div>

          {error && <div className="alert alert-danger text-center">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-lock" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control border-start-0"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 text-white fw-semibold rounded-3"
              style={{
                background: 'linear-gradient(to right, #3B82F6, #8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="bi bi-box-arrow-in-right me-2"></i> Sign In
            </button>

            {/* Footer Link */}
            <div className="text-center mt-3">
              <small>
                Don’t have an account?{' '}
                <Link to="/register" className="text-decoration-none fw-semibold" style={{ color: '#3B82F6' }}>
                  Sign up here
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
