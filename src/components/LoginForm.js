import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";

function LoginForm({ existingUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await FirebaseAuthService.loginUser(username, password);
      setUsername("");
      setPassword("");
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }

    // try {
    //   await FirebaseAuthService.registerUser(username, password);
    //   setUsername("");
    //   setPassword("");
    // } catch (error) {
    //   alert(error.message);
    //   console.log(error.message);
    // }
  }

  function handleLogout() {
    FirebaseAuthService.logoutUser();
  }

  async function handleSendResetPassewordEmail() {
    if (!username) {
      alert("Missing username!");
      return;
    }
    try {
      await FirebaseAuthService.sendPasswordResetEmail(username);
      alert("Password reset email sent!");
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }

  async function handleLoginWithGoogle() {
    try {
      await FirebaseAuthService.loginWithGoogle();
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          <h3>Welcome, {existingUser.email}</h3>
          <button
            tyoe="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Username (email):
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </label>

          <label className="input-label login-label">
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button className="primary-button" type="submit">
              Login
            </button>
            <button
              type="button"
              onClick={handleSendResetPassewordEmail}
              className="primary-button"
            >
              Reset password
            </button>

            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="primary-button"
            >
              {" "}
              Login with Google{" "}
            </button>
          </div>
        </form>
      )}
    </div>

    // <div className="login-form-container">
    //   {existingUser ? (
    //     <div className="row">
    //       <h3>Welcome, {existingUser.email}</h3>
    //       <button
    //         tyoe="button"
    //         className="primary-button"
    //         onClick={handleLogout}
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   ) : (
    //     <form onSubmit={handleSubmit} className="login-form">
    //       <label className="input-label login-label">
    //         Username (email):
    //         <input
    //           type="email"
    //           required
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           className="input-field"
    //         />
    //       </label>

    //       <label className="input-label login-label">
    //         Password:
    //         <input
    //           type="password"
    //           required
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="input-text"
    //         />
    //       </label>
    //       <div className="button-box">
    //         <button className="primary-button" type="submit">
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   )}
    // </div>
  );
}

export default LoginForm;
