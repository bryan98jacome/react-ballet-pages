import { async } from "@firebase/util";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExists,
} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          const userInfo = await getUserInfo(user.uid);
          if (userInfo.processCompleted) {
            onUserLoggedIn(userInfo);
          } else {
            onUserNotRegistered(userInfo);
          }
        } else {
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            apellido: "",
            pais: "",
            direccion: "",
            telefono: "",
            fecha: "",
            rol: "usuario",
            descripcion: "",
            profilePicture: user.photoURL,
            username: "",
            processCompleted: false,
            emailVerified: user.emailVerified,
          });
          onUserNotRegistered(user);
        }
      } else {
        onUserNotLoggedIn();
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);

  return <div>{children}</div>;
}
