import AuthProvider from "../components/authProvider";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import addPhoto from "../img/addPhoto.png";
import {
  getProfilePhotoUrl,
  upDateDocente,
  setDocenteProfilePhoto,
  existsEmailDocente,
} from "../firebase/firebase";
import { v4 as uuid } from "uuid";
import swal from "sweetalert";

export default function ChoosDocente() {

  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setcurrentUser] = useState({});
  const [docente, setDocente] = useState({});
  const [file, setFile] = useState({});
  const fileRef = useRef();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [pais, setPais] = useState("");
  const [fecha, setFecha] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  function handledUserLoggedIn(user) {
    setcurrentUser(user);
    if (user.rol === "administrador") {
      setState(6);
    } else {
      navigate("../");
    }
  }

  function handleUserNotRegistered(user) {
    setState(3);
    navigate("../");
  }

  function handleUserNotLoggedIn() {
    setState(4);
    navigate("../");
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      handleChangeFile();
    },
  });

  async function handleContinue(urlaux) {
    const siExist = await existsEmailDocente(correo);
    if (siExist) {
      //Guardar los datos del docente en la bd
      const tmp = { ...docente };
      tmp.id = uuid();
      tmp.email = correo;
      tmp.username = nombre;
      tmp.apellido = apellido;
      tmp.pais = pais;
      tmp.telefono = telefono;
      tmp.fecha = fecha;
      tmp.descripcion = descripcion;
      tmp.profilePicture = urlaux;
      await upDateDocente(tmp);
      navigate("../administrar-web");
    } else {
      //Mensaje que ya existe el docente
      swal(
        `El correo ${correo} ya esta registrado`,
        "Intenta de nuevo",
        "error"
      );
    }
  }

  async function handleChangeFile() {
    const noexist = await existsEmailDocente(correo);
    if (noexist) {
      const fileReader = new FileReader();
      if (fileReader && file && file.length > 0) {
        fileReader.readAsArrayBuffer(file[0]);
        fileReader.onload = async function () {
          const imageData = fileReader.result;
          const res = await setDocenteProfilePhoto(correo, imageData);
          if (res) {
            const urlPhoto = await getProfilePhotoUrl(res.metadata.fullPath);
            handleContinue(urlPhoto);
          }
        };
      }
    } else {
      //Mensaje que ya existe el docente
      swal(
        `El correo ${correo} ya esta registrado`,
        "Intenta de nuevo",
        "error"
      );
    }
  }

  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  if (state == 6 && currentUser.rol === "administrador") {
    return (
      <main className="main-choosedocente">
        <div className="div-title">Datos del nuevo docente</div>
        <div className="div-formusername">
          <form onSubmit={formik.handleSubmit}>
            <div className="div-row">
              <div>
                <label htmlFor="firstName" className="form-label">
                  Nombre
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="form-label">
                  Apellido
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    setApellido(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="div-row">
              <div>
                <label htmlFor="pais" className="form-label">
                  Pais
                </label>
                <input
                  id="pais"
                  name="pais"
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    setPais(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="fecha" className="form-label">
                  Fecha de nacimiento
                </label>
                <input
                  id="fecha"
                  name="fecha"
                  className="form-control"
                  type="date"
                  onChange={(e) => {
                    setFecha(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="div-row">
              <div>
                <label htmlFor="telefono" className="form-label">
                  Telefono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    setTelefono(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="form-label">
                  Correo electronico
                </label>
                <input
                  id="email"
                  name="email"
                  className="form-control"
                  type="email"
                  onChange={(e) => {
                    setCorreo(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="form-control"
              type="text"
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
              required
            />
            <div className="div-photoDocente">
              {file.length > 0 ? (
                <img src={URL.createObjectURL(file[0])} />
              ) : (
                <img src={addPhoto} />
              )}
              <button
                className="btn btn-primary"
                onClick={handleOpenFilePicker}
                type="button"
              >
                foto de Perfil
              </button>
            </div>
            <input
              id="foto"
              name="foto"
              type="file"
              required
              onChange={(e) => {
                setFile(e.target.files);
              }}
              ref={fileRef}
              style={{ display: "none" }}
            />
            <div className="div-btn">
              <button className="btn btn-primary" type="submit">
                Agregar docente
              </button>
            </div>
          </form>
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
