import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useFormik } from "formik";
import { existsUsername, updateUser } from "../firebase/firebase";

export default function ChoosUsernameView() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setcurrentUser] = useState({});
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [pais, setPais] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");

  function handledUserLoggedIn(user) {
    navigate("../");
  }

  function handleUserNotRegistered(user) {
    setcurrentUser(user);
    setState(3);
  }

  function handleUserNotLoggedIn() {
    navigate("../");
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      handleContinue();
    },
  });

  async function handleContinue() {
    const exist = await existsUsername(currentUser.email);
    if (exist) {
      setState(5);
    } else {
      const tmp = { ...currentUser };
      tmp.email = currentUser.email;
      tmp.username = nombre;
      tmp.apellido = apellido;
      tmp.pais = pais;
      tmp.direccion = direccion;
      tmp.telefono = telefono;
      tmp.fecha = fecha;
      tmp.descripcion = descripcion;
      tmp.processCompleted = true;
      await updateUser(tmp);
      setState(6);
      window.location.reload(true);
    }
  }

  if (state == 3 || state == 5) {
    return (
      <main className="main-chooseusername">
        <div className="div-title">Bienvenido {currentUser.displayName}</div>
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
                <label htmlFor="direccion" className="form-label">
                  Direccion
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    setDireccion(e.target.value);
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
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <input
              id="descripcion"
              name="descripcion"
              className="form-control"
              type="text"
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
              required
            />
            <div className="div-btn">
              <button className="btn btn-primary" type="submit">
                Submit
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
