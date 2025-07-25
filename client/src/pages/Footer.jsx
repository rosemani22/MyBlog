import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-5">
      <div className="container text-md-left">
        <div className="row text-md-left">

          {/* Logo & About */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">BlogSphere</h5>
            <p>
              BlogSpace is a vibrant platform where you can create, discover, and share amazing stories
              with a community of passionate writers and readers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Quick Links</h5>
            <p><a href="#" className="text-light text-decoration-none">Home</a></p>
            <p><a href="#" className="text-light text-decoration-none">About</a></p>
            {/* <p><a href="#" className="text-light text-decoration-none">Services</a></p> */}
            {/* <p><a href="#" className="text-light text-decoration-none">Contact</a></p> */}
          </div>

          {/* Newsletter */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Newsletter</h5>
            <form>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  aria-label="Recipient's email"
                  aria-describedby="button-addon2"
                />
                <button className="btn btn-warning" type="button" id="button-addon2">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Social Media */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-3 text-center">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Follow Us</h5>
            <a href="#" className="text-light me-3"><i className="fab fa-facebook fa-lg"></i></a>
            <a href="#" className="text-light me-3"><i className="fab fa-instagram fa-lg"></i></a>
            <a href="#" className="text-light me-3"><i className="fab fa-twitter fa-lg"></i></a>
            <a href="#" className="text-light"><i className="fab fa-linkedin fa-lg"></i></a>
          </div>
        </div>

        {/* Footer Bottom */}
        <hr className="mb-4" />
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-start">
              © {new Date().getFullYear()} <span className="text-warning">BlogSphere</span>. All Rights Reserved.
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <a href="#" className="text-light text-decoration-none">Privacy Policy</a> | <a href="#" className="text-light text-decoration-none">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
