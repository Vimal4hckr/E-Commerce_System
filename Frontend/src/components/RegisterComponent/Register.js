import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmission = async () => {
    await axios.post("http://localhost:4000/createUser", {
      Uname: userName,
      lName: legalName,
      email: email,
      pwd: password,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    formSubmission();
    setUserName("");
    setLegalName("");
    setPassword("");
    setEmail("");
  };

  const onChangeName = (e) => {
    setUserName(e.target.value);
  };
  const onChangelegal = (e) => {
    setLegalName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={styles.Register_Module}>
      <div className={styles.Register}>
        <div>
          <h2 className={styles.Heading}>JKART REGISTER</h2>
        </div>
        <div>
          <form method="POST" className={styles.form_component}>
            <div className={styles.form_element}>
              <label htmlFor="">Username</label>
              <input type="text" onChange={onChangeName} value={userName} />
            </div>
            <div className={styles.form_element}>
              <label htmlFor="">Legal name</label>
              <input type="text" onChange={onChangelegal} value={legalName} />
            </div>
            <div className={styles.form_element}>
              <label htmlFor="">Email</label>
              <input type="text" onChange={onChangeEmail} value={email} />
            </div>
            <div className={styles.form_element}>
              <label htmlFor="">Password</label>
              <input type="text" onChange={onChangePassword} value={password} />
            </div>
            <div className={styles.register_button}>
              <button type="submit" onClick={onSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
