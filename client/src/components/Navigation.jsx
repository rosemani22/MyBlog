// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Navigation = () => {
//   const { user, logout } = useAuth();

//   return (
//     <><nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top fs-5">
//       <div className="container">
//         {/* Brand Logo */}
//         <Link className="navbar-brand fw-bold fs-2" to="/">
//           Blog<span className="text-primary">Sphere</span>
//         </Link>

//         {/* Toggler for Mobile */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
        

//         {/* Navbar Links */}
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto gap-2">
//             {!user ? (
//               <>
//                 <li className="nav-item">
//                   { <Link className="nav-link active " to="/">Home</Link>
//                    }

                   
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/register">Register</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">Login</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/about">About Project</Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/profile">Profile</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/add-blog">Create Blog</Link>
//                 </li>
//                 <li className="nav-item">
//                   <button className="nav-link btn btn-link text-danger fw-semibold" onClick={logout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//     </>

//   );
// };

// export default Navigation;

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top fs-5">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold fs-2" to="/">
          Blog<span className="text-primary">Sphere</span>
        </Link>

        {/* Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About Project</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-blog">Create Blog</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-danger fw-semibold" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
