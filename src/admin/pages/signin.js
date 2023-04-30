import { Link } from "react-router-dom";
import SigninForm from "../components/form/SigninForm";

function Signin() {
  return (
    <>
      <div className="authincation section-padding">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-xl-5 col-md-6">
              <div className="mini-logo text-center my-4">
                <Link to="/admin">
                  <a>
                    <img src="./images/logo.png" alt="" />
                  </a>
                </Link>
                <h4 className="card-title mt-5">Sign in to FraArt</h4>
              </div>
              <div className="auth-form card">
                <div className="card-body">
                  <SigninForm />
                  <p className="mt-3 mb-0">
                    Don't have an account?
                    <Link to="/admin/signup">
                      <a className="text-primary">Sign up</a>
                    </Link>
                  </p>
                </div>
              </div>
              <div className="privacy-link">
                <a href="#">Have an issue with 2-factor authentication?</a>
                <br />
                <a href="#">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signin;
