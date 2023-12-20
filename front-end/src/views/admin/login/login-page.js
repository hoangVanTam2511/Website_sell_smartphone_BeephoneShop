import React, { useEffect, useState } from "react";
import "./login-page.css";
import { useDispatch } from "react-redux";
import {
  loginUser,
  changeInformationUser,
} from "../../../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { request, setAuthHeader } from "../../../store/helpers/axios_helper";
import { Button, notification, Space } from "antd";

const LoginPage = () => {
  const [isForgetView, setIsForgetView] = useState(0);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, mess, content, placement) => {
    api[type]({
      message: mess,
      description: content,
      placement,
    });
  };

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetLogin = () => {
    setUserLogin({
      email: "",
      password: "",
    });
  };

  const login = (e) => {
    e.preventDefault();
    setAuthHeader(null);

    if (userLogin.email === "") {
      alert("Vui lòng nhập email");
      return;
    }

    if (userLogin.password === "") {
      alert("Vui lòng nhập mật khẩu");
      return;
    }

    request("POST", "/client/account/login", userLogin)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.token);
          setAuthHeader(res.data.token);
          dispatch(changeInformationUser(res.data));
          if (res.data.idRole === "role2") {
            openNotificationWithIcon(
              "error",
              "Bạn không quyền truy cập hệ thống.",
              "Bạn không có quyền truy cập hệ thống."
            );
          } else {
            resetLogin();
            openNotificationWithIcon("success", "Đăng nhập thành công.", "");
            navigate("/dashboard/statistic");
          }
        }
      })
      .catch((error) => {
        openNotificationWithIcon(
          "error",
          "Sai tài khoản hoặc mật khẩu.",
          "Bạn không nhập đúng tài khoản hoặc mật khẩu.Vui lòng kiểm tra lại."
        );
      });
  };

  const forgetPass = () => {
    request("POST", "/email/send-html-email-get-pass", {
      email: userLogin.email,
    })
      .then((res) => {
        setIsForgetView(0);
        openNotificationWithIcon(
          "success",
          "Mật khẩu đã dược gửi về email của bạn.",
          "Mật khẩu đã được gửi về email của bạn."
        );
      })
      .catch((error) => {
        openNotificationWithIcon(
          "error",
          "Không tìm thấy email trên hệ thống.",
          ""
        );
      });
  };

  return (
    <>
      {contextHolder}
      <div className="bodyLogin">
        <div>{/* <img src='logo.png' /> */}</div>
        <div class="wrapper">
          <div>
            <h1 style={{ color: "white" }}>
              {isForgetView === 0 ? "Đăng nhập" : "Quên mật khẩu"}
            </h1>
            <div class="input-box">
              <input
                type="text"
                placeholder="Email"
                required
                value={userLogin.email}
                name="email"
                onChange={(e) =>
                  setUserLogin({ ...userLogin, email: e.target.value })
                }
              />
              <i class="bx bxs-user"></i>
            </div>
            {isForgetView === 0 ? (
              <div class="input-box">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  required
                  value={userLogin.password}
                  name="password"
                  onChange={(e) =>
                    setUserLogin({ ...userLogin, password: e.target.value })
                  }
                />
                <i class="bx bxs-lock-alt"></i>
              </div>
            ) : (
              <></>
            )}

            <div class="remember-forgot">
              {isForgetView === 0 ? (
                <label style={{ marginLeft: "15px" }}>
                  <input type="checkbox" />
                  Nhớ mật khẩu
                </label>
              ) : (
                <></>
              )}

              {isForgetView === 1 ? (
                <span
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    marginLeft: "101px",
                  }}
                  onClick={() => setIsForgetView(0)}
                >
                  Quay lại đăng nhập
                </span>
              ) : (
                <span
                  style={{ cursor: "pointer", marginRight: "17px" }}
                  onClick={() => setIsForgetView(1)}
                >
                  Quên mật khẩu?
                </span>
              )}
            </div>

            {isForgetView === 1 ? (
              <>
                <button class="btn" onClick={(e) => forgetPass(e)}>
                  Gửi mật khẩu về Gmail
                </button>
              </>
            ) : (
              <>
                <button class="btn" onClick={(e) => login(e)}>
                  Đăng nhập
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
