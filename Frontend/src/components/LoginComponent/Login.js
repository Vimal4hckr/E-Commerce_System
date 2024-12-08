import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { UseAuthContext } from "../AuthContext.js";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, userUpdate } = UseAuthContext();
  const onLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:4000/login`, {
      email: email,
      pwd: password,
    });
    localStorage.setItem("access_token", response.data.Access_token);
    localStorage.setItem("refresh_token", response.data.Refresh_token);
    const access_token = localStorage.getItem("access_token");
    const res = await axios.get("http://localhost:4000/finduserbyemail", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    userUpdate({ email: res.data.msg });
    console.log(user);
  };

  const onLogin1 = async (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");
    const response = await axios.get("http://localhost:4000/finduserbyname", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log(response);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePwd = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.Login_Module}>
      <div className={styles.Login}>
        <div>
          <h2 className={styles.Heading}>JKART LOGIN</h2>
        </div>
        <div>
          <form method="GET" className={styles.form_component}>
            <div className={styles.form_element}>
              <label htmlFor="">Email</label>
              <input type="text" onChange={onChangeEmail} value={email} />
            </div>
            <div className={styles.form_element}>
              <label htmlFor="">Password</label>
              <input type="text" onChange={onChangePwd} value={password} />
            </div>
            <div className={styles.login_button}>
              <button type="submit" onClick={onLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
