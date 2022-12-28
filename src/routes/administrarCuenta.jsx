import AuthProvider from "../components/authProvider";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { useFormik } from "formik";
import {
  auth,
  getProfilePhotoUrl,
  setUserProfilePhoto,
  updateUser,
} from "../firebase/firebase";
import addPhoto from "../img/addPhoto.png";
import { sendEmailVerification } from "firebase/auth";
import Flecha from "../layouts/flecha";

export default function AdministrarCuenta() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setcurrentUser] = useState({});
  const [file, setFile] = useState({});
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [data, setData] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [direccion, setDireccion] = useState("");
  const fileRef = useRef();

  const [dropdownF, setDropdownF] = useState(false);
  const [dropdownN, setDropdownN] = useState(false);
  const [dropdownA, setDropdownA] = useState(false);
  const [dropdownFe, setDropdownFe] = useState(false);
  const [dropdownD, setDropdownD] = useState(false);
  const [dropdownC, setDropdownC] = useState(false);
  const [dropdownT, setDropdownT] = useState(false);
  const [dropdownP, setDropdownP] = useState(false);
  const [dropdownDi, setDropdownDi] = useState(false);

  async function handledUserLoggedIn(user) {
    setcurrentUser(user);
    if (auth.currentUser.emailVerified) {
      const tmp = { ...user };
      tmp.emailVerified = auth.currentUser.emailVerified;
      console.log(tmp.emailVerified);
      await updateUser(tmp);
      setcurrentUser(tmp);
    }
    setState(6);
  }

  function handleUserNotRegistered(user) {
    setState(3);
    navigate("../");
  }

  function handleUserNotLoggedIn() {
    setState(4);
    navigate("../");
  }

  const abrirCerrarDropdown = () => { };

  function clickDropdownD() {
    setDropdownD(!dropdownD);
  }
  function clickDropdownFe() {
    setDropdownFe(!dropdownFe);
  }
  function clickDropdownA() {
    setDropdownA(!dropdownA);
  }
  function clickDropdownN() {
    setDropdownN(!dropdownN);
  }
  function clickDropdownF() {
    setDropdownF(!dropdownF);
  }
  function clickDropdownC() {
    setDropdownC(!dropdownC);
  }
  function clickDropdownT() {
    setDropdownT(!dropdownT);
  }
  function clickDropdownP() {
    setDropdownP(!dropdownP);
  }
  function clickDropdownDi() {
    setDropdownDi(!dropdownDi);
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      clickSave();
    },
  });

  async function clickSave() {
    if (data === "foto") {
      handleChangeFile();
      setDropdownF(!dropdownF);
    }

    if (data === "nombre") {
      const tmp = { ...currentUser };
      tmp.username = nombre;
      await updateUser(tmp);
      setcurrentUser(tmp);
      setDropdownN(!dropdownN);
    }

    if (data === "apellido") {
      const tmp = { ...currentUser };
      tmp.apellido = apellido;
      await updateUser(tmp);
      setcurrentUser(tmp);
      setDropdownA(!dropdownA);
    }

    if (data === "fecha") {
      const tmp = { ...currentUser };
      tmp.fecha = fecha;
      await updateUser(tmp);
      setcurrentUser(tmp);
      setDropdownFe(!dropdownFe);
    }

    if (data === "descripcion") {
      const tmp = { ...currentUser };
      tmp.descripcion = descripcion;
      await updateUser(tmp);
      setcurrentUser(tmp);
      setDropdownD(!dropdownD);
    }

    if (data === "telefono") {
      const tmp = { ...currentUser };
      tmp.telefono = telefono;
      await updateUser(tmp);
      setcurrentUser(tmp);
      setDropdownT(!dropdownT);
    }

    if (data === "pais") {
      const tmp = { ...currentUser };
      tmp.pais = pais;
      await updateUser(tmp);
      setcurrentUser(tmp);
      setDropdownP(!dropdownP);
    }

    if (data === "direccion") {
      const tmp = { ...currentUser };
      tmp.direccion = direccion;
      await updateUser(tmp);
      setcurrentUser(tmp);
      setDropdownDi(!dropdownDi);
    }
  }

  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  function handleChangeFile() {
    const fileReader = new FileReader();
    if (fileReader && file && file.length > 0) {
      fileReader.readAsArrayBuffer(file[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;
        const res = await setUserProfilePhoto(currentUser.uid, imageData);
        if (res) {
          const urlPhoto = await getProfilePhotoUrl(res.metadata.fullPath);
          const tmp = { ...currentUser };
          tmp.profilePicture = urlPhoto;
          await updateUser(tmp);
          setcurrentUser(tmp);
        }
      };
    }
  }

  function verifiedEmail() {
    sendEmailVerification(auth.currentUser).then(async () => { });
  }

  if (state === 6) {
    return (
      <main className="main-AdminCuenta">
        <div className="div-imgAdminCuenta">
          <img src={currentUser.profilePicture} alt="foto de perfil" />
          <p>Bienvenido, {currentUser.username}</p>
        </div>
        <div className="div-infoBasica">
          <p>Información básica</p>

          <Dropdown isOpen={dropdownF} toggle={abrirCerrarDropdown}>
            <DropdownToggle className="dropdownbutton-info">
              <button
                className="button-infoBasica button-final"
                onClick={clickDropdownF}
              >
                <div className="div-rigth">
                  <p>Foto</p>
                </div>
                <div className="div-center">
                  <p>Agregar una foto para personalizar tu cuenta</p>
                </div>
                <img src={currentUser.profilePicture} alt="foto de perfil" />
              </button>
            </DropdownToggle>
            <DropdownMenu className="dropdownenu-info">
              <form onSubmit={formik.handleSubmit}>
                <div className="div-newPhotoPro">
                  {file.length > 0 ? (
                    <img src={URL.createObjectURL(file[0])} alt="foto temporal" />
                  ) : (
                    <img src={addPhoto} alt="foto add"/>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={handleOpenFilePicker}
                  >
                    Actualizar foto de Perfil
                  </button>
                </div>
                <input
                  id="foto"
                  name="foto"
                  className="form-control"
                  type="file"
                  required
                  onChange={(e) => {
                    setFile(e.target.files);
                    setData(e.target.name);
                  }}
                  ref={fileRef}
                  style={{ display: "none" }}
                />
                <button
                  className="btn btn-primary btnred"
                  type="button"
                  onClick={clickDropdownF}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  Guardar
                </button>
              </form>
            </DropdownMenu>
          </Dropdown>

          <Dropdown isOpen={dropdownN} toggle={abrirCerrarDropdown}>
            <DropdownToggle className="dropdownbutton-info">
              <button
                className="button-infoBasica button-final"
                onClick={clickDropdownN}
              >
                <div className="div-rigth">
                  <p>Nombre</p>
                </div>
                <div className="div-center">
                  <p>{currentUser.username}</p>
                </div>
                {Flecha(dropdownN)}
              </button>
            </DropdownToggle>
            <DropdownMenu className="dropdownenu-info">
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  type="text"
                  required
                  onChange={(e) => {
                    setNombre(e.target.value);
                    setData(e.target.name);
                  }}
                />
                <button
                  className="btn btn-primary btnred"
                  type="button"
                  onClick={clickDropdownN}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  Guardar
                </button>
              </form>
            </DropdownMenu>
          </Dropdown>

          <Dropdown isOpen={dropdownA} toggle={abrirCerrarDropdown}>
            <DropdownToggle className="dropdownbutton-info">
              <button
                className="button-infoBasica button-final"
                onClick={clickDropdownA}
              >
                <div className="div-rigth">
                  <p>Apellido</p>
                </div>
                <div className="div-center">
                  <p>{currentUser.apellido}</p>
                </div>
                {Flecha(dropdownA)}
              </button>
            </DropdownToggle>
            <DropdownMenu className="dropdownenu-info">
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  className="form-control"
                  type="text"
                  required
                  onChange={(e) => {
                    setApellido(e.target.value);
                    setData(e.target.name);
                  }}
                />
                <button
                  className="btn btn-primary btnred"
                  type="button"
                  onClick={clickDropdownA}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  Guardar
                </button>
              </form>
            </DropdownMenu>
          </Dropdown>

          <Dropdown isOpen={dropdownFe} toggle={abrirCerrarDropdown}>
            <DropdownToggle className="dropdownbutton-info">
              <button
                className="button-infoBasica button-final"
                onClick={clickDropdownFe}
              >
                <div className="div-rigth">
                  <p>Fecha de nacimiento</p>
                </div>
                <div className="div-center">
                  <p>{currentUser.fecha}</p>
                </div>
                {Flecha(dropdownFe)}
              </button>
            </DropdownToggle>
            <DropdownMenu className="dropdownenu-info">
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="fecha" className="form-label">
                  Fecha de nacimiento
                </label>
                <input
                  id="fecha"
                  name="fecha"
                  className="form-control"
                  type="date"
                  required
                  onChange={(e) => {
                    setFecha(e.target.value);
                    setData(e.target.name);
                  }}
                />
                <button
                  className="btn btn-primary btnred"
                  type="button"
                  onClick={clickDropdownFe}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  Guardar
                </button>
              </form>
            </DropdownMenu>
          </Dropdown>

          <Dropdown isOpen={dropdownD} toggle={abrirCerrarDropdown}>
            <DropdownToggle className="dropdownbutton-info button-final">
              <button
                className="button-infoBasica button-final"
                onClick={clickDropdownD}
              >
                <div className="div-rigth">
                  <p>Descripción</p>
                </div>
                <div className="div-center">
                  <p>{currentUser.descripcion}</p>
                </div>
                {Flecha(dropdownD)}
              </button>
            </DropdownToggle>
            <DropdownMenu className="dropdownenu-info">
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="descripcion" className="form-label">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  className="form-control"
                  type="text"
                  required
                  onChange={(e) => {
                    setDescripcion(e.target.value);
                    setData(e.target.name);
                  }}
                />
                <button
                  className="btn btn-primary btnred"
                  type="button"
                  onClick={clickDropdownD}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  Guardar
                </button>
              </form>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="div-infoBasica">
          <p>Información de contacto</p>

          <Dropdown isOpen={dropdownC} toggle={abrirCerrarDropdown}>
            <DropdownToggle className="dropdownbutton-info button-final">
              <button
                className="button-infoBasica button-final"
                onClick={clickDropdownC}
              >
                <div className="div-rigth">
                  <p>Correo electrónico</p>
                </div>
                <div className="div-center">
                  <p>{currentUser.email}</p>
                  {currentUser.emailVerified === false ? (
                    <p style={{ color: "red" }}>Correo no verificado</p>
                  ) : (
                    <></>
                  )}
                </div>
                {Flecha(dropdownC)}
              </button>
            </DropdownToggle>
            <DropdownMenu className="dropdownenu-info">
              <form>
                <h3>Verificar correo electrónico</h3>
                {currentUser.emailVerified === false ? (
                  <p>
                    Presiona en verificar email y revisa el email{" "}
                    {currentUser.email}
                  </p>
                ) : (
                  <p>El email {currentUser.email} ya esta verificado</p>
                )}
                {currentUser.emailVerified === false ? (
                  <div className="div-buttonEmail">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={verifiedEmail}
                    >
                      Verificar email
                    </button>
                  </div>
                ) : (
                  <></>
                )}

                <button
                  className="btn btn-primary btnred"
                  type="button"
                  onClick={clickDropdownC}
                >
                  Cancelar
                </button>
              </form>
            </DropdownMenu>
          </Dropdown>

          <Dropdown isOpen={dropdownT} toggle={abrirCerrarDropdown}>
            <DropdownToggle className="dropdownbutton-info button-final">
              <button
                className="button-infoBasica button-final"
                onClick={clickDropdownT}
              >
                <div className="div-rigth">
                  <p>Teléfono</p>
                </div>
                <div className="div-center">
                  <p>{currentUser.telefono}</p>
                </div>
                {Flecha(dropdownT)}
              </button>
            </DropdownToggle>
            <DropdownMenu className="dropdownenu-info">
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  className="form-control"
                  type="text"
                  required
                  onChange={(e) => {
                    setTelefono(e.target.value);
                    setData(e.target.name);
                  }}
                />
                <button
                  className="btn btn-primary btnred"
                  type="button"
                  onClick={clickDropdownT}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  Guardar
                </button>
              </form>
            </DropdownMenu>
          </Dropdown>

          <Dropdown isOpen={dropdownP} toggle={abrirCerrarDropdown}>
            <DropdownToggle className="dropdownbutton-info button-final">
              <button
                className="button-infoBasica button-final"
                onClick={clickDropdownP}
              >
                <div className="div-rigth">
                  <p>País</p>
                </div>
                <div className="div-center">
                  <p>{currentUser.pais}</p>
                </div>
                {Flecha(dropdownP)}
              </button>
            </DropdownToggle>
            <DropdownMenu className="dropdownenu-info">
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="pais" className="form-label">
                  País
                </label>
                <input
                  id="pais"
                  name="pais"
                  className="form-control"
                  type="text"
                  required
                  onChange={(e) => {
                    setPais(e.target.value);
                    setData(e.target.name);
                  }}
                />
                <button
                  className="btn btn-primary btnred"
                  type="button"
                  onClick={clickDropdownP}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  Guardar
                </button>
              </form>
            </DropdownMenu>
          </Dropdown>

          <Dropdown isOpen={dropdownDi} toggle={abrirCerrarDropdown}>
            <DropdownToggle className="dropdownbutton-info button-final">
              <button
                className="button-infoBasica button-final"
                onClick={clickDropdownDi}
              >
                <div className="div-rigth">
                  <p>Dirección</p>
                </div>
                <div className="div-center">
                  <p>{currentUser.direccion}</p>
                </div>
                {Flecha(dropdownDi)}
              </button>
            </DropdownToggle>
            <DropdownMenu className="dropdownenu-info">
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="direccion" className="form-label">
                  Dirección
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  className="form-control"
                  type="text"
                  required
                  onChange={(e) => {
                    setDireccion(e.target.value);
                    setData(e.target.name);
                  }}
                />
                <button
                  className="btn btn-primary btnred"
                  type="button"
                  onClick={clickDropdownDi}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  Guardar
                </button>
              </form>
            </DropdownMenu>
          </Dropdown>
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
