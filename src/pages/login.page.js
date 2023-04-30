import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AuthStateContext } from "../context/authContext";


import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";

const Login = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {setAuthTkn}= useContext(AuthStateContext)



  const login = async() => {
    await axios.post("/api/userLogin", loginData)
      .then(res =>{
        if(res.data?.status == 'success'){
          localStorage.setItem('authToken',res.data?.token);
          localStorage.setItem('userAddress',res.data.address);
          setAuthTkn(res.data?.token)
          toast.success("success");
          navigate("/");
        } else {
          toast.error(res.data?.message);
        }
      })
      .catch((err) => toast.error("Network Eror"));

    // userLogin(dispatch , loginData)
  };

  const state = useSelector(() => {});
  console.log(state);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  useEffect(() => {
    let authToken = localStorage.getItem("authToken");
    setAuthTkn(authToken)
  },[]);

  console.log("porpos", props);
  console.log("login data", loginData);

  return (
    <>
      <div className="back-to-home">
        <a
          href=""
          onClick={(e) => e.preventDefault()}
          className="back-button btn btn-pills btn-sm btn-icon btn-primary"
        >
          <FiArrowLeft className="icons" />
        </a>
      </div>

      <section className="position-relative">
        <div className="bg-video-wrapper">
          {/* <iframe src="https://player.vimeo.com/video/502163294?background=1&autoplay=1&loop=1&byline=0&title=0"></iframe> */}
          {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/TDkS7AYrqDk?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
          <ReactPlayer
            url="https://www.youtube.com/watch?v=TDkS7AYrqDk"
            playing={true}
            loop={true}
            controls={false}
            width="640"
            height="360"
          />
        </div>

        <div className="bg-overlay bg-linear-gradient-2"></div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="d-flex flex-column min-vh-100 p-4">
                <div className="title-heading text-center my-auto">
                  <div className="form-signin px-4 py-5 bg-white rounded-md shadow-sm">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        login();
                      }}
                    >
                      <h5 className="mb-4">{t("login")}</h5>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-floating mb-2">
                            <input
                              type="email"
                              className="form-control"
                              id="LoginEmail"
                              placeholder="name@example.com"
                              required
                              onChange={(e) =>
                                setLoginData({
                                  ...loginData,
                                  email: e.target.value,
                                })
                              }
                            />
                            <label htmlFor="LoginEmail">{t("emailAddress")}:</label>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              id="LoginPassword"
                              placeholder="Password"
                              required
                              onChange={(e) =>
                                setLoginData({
                                  ...loginData,
                                  password: e.target.value,
                                })
                              }
                            />
                            <label htmlFor="LoginPassword">{t("password")}:</label>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="d-flex justify-content-between mb-3">
                            <div className="">
                              <div className="form-check align-items-center d-flex mb-0">
                                <input
                                  className="form-check-input mt-0"
                                  type="checkbox"
                                  value=""
                                  id="RememberMe"
                                />
                                <label
                                  className="form-check-label text-muted ms-2"
                                  htmlFor="RememberMe"
                                >
                                  {t("rememberMe")}
                                </label>
                              </div>
                            </div>
                            <small className="text-muted">
                              <Link
                                href="/reset-password"
                                className="text-muted fw-semibold"
                              >
                                {t("forgotPassword")}?
                              </Link>
                            </small>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button
                            className="btn btn-primary rounded-md w-100"
                            type="submit"
                          >
                           {t("signin")}
                          </button>
                        </div>

                        <div className="col-12 text-center mt-4">
                          <small>
                            <span className="text-muted me-2">
                            {t("dontHaveAnAccount")}
                            </span>{" "}
                            <Link to="/signup" className="text-dark fw-bold">
                            {t("signUp")}
                            </Link>
                          </small>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
