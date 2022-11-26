import { useState } from "react";
import img from "../img/singup.jpg";
import { auth, existsEmail } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useFormik } from "formik";
import swal from "sweetalert";

export default function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();
  const [state, setCurrentState] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    async function signInWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handledUserLoggedIn(user) {
    navigate("../");
  }

  async function handleUserNotRegistered(user) {
    setCurrentState(3);
    navigate("../choose-username");
  }

  function handleUserNotLoggedIn() {
    setCurrentState(4);
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  async function handleSubmit() {
    const exist = await existsEmail(email);
    if (exist) {
      swal(
        `El correo ${email} ya esta registrado`,
        "Intente con otro correo",
        "error"
      );
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (state === 4) {
    return (
      <main className="main-signup">
        <div className="div-img">
          <img className="img-lg" src={img} />
        </div>
        <div className="div-form">
          <div className="div-input">
            <form action="" onSubmit={formik.handleSubmit}>
              <input
                type="email"
                name="input-email"
                className="input-email"
                placeholder="Ingrese el Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type={passwordShown ? "text" : "password"}
                name="input-pass"
                className="input-pass"
                required
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              <div onClick={() => setPasswordShown(!passwordShown)}>
                {passwordShown ? (
                  <svg
                    id="svg-eye"
                    className="svg-eye"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                ) : (
                  <svg
                    id="svg-eye-slash"
                    className="svg-eye-slash"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
                )}
              </div>
              <button className="btn-register" type="submit">
                Registrarse
              </button>
            </form>
            <div className="div-line">
              <hr color="#C6AAC8" size={1} width="90" />
              <p>O continue con</p>
              <hr color="#C6AAC8" size={1} width="90" />
            </div>
            <div className="div-button">
              <button className="btn-google" onClick={handleOnClick}>
                <img
                  className="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="google button"
                />
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handledUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    ></AuthProvider>
  );
}
