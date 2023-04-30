import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useWeb3React } from "@web3-react/core";
import { AuthStateContext } from "../context/authContext";
import { useTranslation } from "react-i18next";
const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { account } = useWeb3React();

  const { setAuthTkn } = useContext(AuthStateContext);

  const [signupData, setSignupData] = useState({
    email: "",
    name: "",
    password: "",
    address: "",
  });
  const signup = async () => {
    await axios
      .post("/api/user/create", signupData)
      .then((res) => {
        if (res.data?.status == "success") {
          localStorage.setItem("authToken", res.data?.token);
          localStorage.setItem("userAddress", res.data?.data?.address);
          setAuthTkn(res.data?.token);
          toast.success("success");
          navigate("/");
          // return window.location('/')
        } else {
          toast.error(res.data?.message);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (account != undefined) {
      setSignupData({ ...signupData, address: account });
    }
  }, []);

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
          <iframe src="https://player.vimeo.com/video/502163294?background=1&autoplay=1&loop=1&byline=0&title=0"></iframe>
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
                        signup();
                      }}
                    >
                      <h5 className="mb-4">{t("registerYourAccount")}</h5>

                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-floating mb-2">
                            <input
                              type="text"
                              className="form-control"
                              id="RegisterName"
                              placeholder="Harry"
                              required
                              onChange={(e) =>
                                setSignupData({
                                  ...signupData,
                                  name: e.target.value,
                                })
                              }
                            />
                            <label htmlFor="RegisterName">{t("firstName")}</label>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-floating mb-2">
                            <input
                              type="email"
                              className="form-control"
                              id="RegisterEmail"
                              placeholder="name@example.com"
                              required
                              onChange={(e) =>
                                setSignupData({
                                  ...signupData,
                                  email: e.target.value,
                                })
                              }
                            />
                            <label htmlFor="RegisterEmail">{t("emailAddress")}</label>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              id="RegisterPassword"
                              placeholder="Password"
                              required
                              onChange={(e) =>
                                setSignupData({
                                  ...signupData,
                                  password: e.target.value,
                                })
                              }
                            />
                            <label htmlFor="RegisterPassword">{t("password")}</label>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-check align-items-center d-flex mb-3">
                            <input
                              className="form-check-input mt-0"
                              type="checkbox"
                              value=""
                              id="AcceptT&C"
                              required
                            />
                            <label
                              className="form-check-label text-muted ms-2"
                              htmlFor="AcceptT&C"
                            >
                             {t("iAccept")}
                              <a
                                href=""
                                onClick={(e) => e.preventDefault()}
                                className="text-primary"
                              >
                                {t("termsAndCondition")}
                              </a>
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <button
                            className="btn btn-primary rounded-md w-100"
                            type="submit"
                          >
                         {t("register")}
                          </button>
                        </div>

                        <div className="col-12 text-center mt-4">
                          <small>
                            <span className="text-muted me-2">
                            {t("alreadyHaveAnAccount")}
                            </span>{" "}
                            <Link to="/login" className="text-dark fw-bold">
                            {t("signIn")}
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

export default SignUp;
