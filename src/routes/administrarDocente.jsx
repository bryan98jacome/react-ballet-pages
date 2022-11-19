import AuthProvider from "../components/authProvider";
import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDocente, getProfilePhotoUrl, upDateDocente, setDocenteProfilePhoto } from "../firebase/firebase";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { useFormik } from 'formik';
import Flecha from "../layouts/flecha";

export default function AdministrarDocente() {

    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [docente, setDocente] = useState({});
    let { iddocente } = useParams();
    const fileRef = useRef();
    const [file, setFile] = useState({});
    const [data, setData] = useState('');

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [pais, setPais] = useState('');

    const [dropdownF, setDropdownF] = useState(false);
    const [dropdownN, setDropdownN] = useState(false);
    const [dropdownA, setDropdownA] = useState(false);
    const [dropdownFe, setDropdownFe] = useState(false);
    const [dropdownD, setDropdownD] = useState(false);
    const [dropdownC, setDropdownC] = useState(false);
    const [dropdownT, setDropdownT] = useState(false);
    const [dropdownP, setDropdownP] = useState(false);

    function handledUserLoggedIn(user) {
        setcurrentUser(user);
        if (user.rol === "administrador") {
            setState(6);
            getData();
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

    async function getData() {
        const res = await getDocente(iddocente);
        setDocente(res);
    }

    const abrirCerrarDropdown = () => { }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
        },
        onSubmit: values => {
            clickSave();

        },
    });

    function handleOpenFilePicker() {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    function clickDropdown(e) {
        if (e == "foto") { setDropdownF(!dropdownF); }
        if (e == "nombre") { setDropdownN(!dropdownN); }
        if (e == "apellido") { setDropdownA(!dropdownA); }
        if (e == "fecha") { setDropdownFe(!dropdownFe); }
        if (e == "descripcion") { setDropdownD(!dropdownD); }
        if (e == "email") { setDropdownC(!dropdownC); }
        if (e == "telefono") { setDropdownT(!dropdownT); }
        if (e == "pais") { setDropdownP(!dropdownP); }
    }

    async function clickSave() {
        if (data === "foto") {
            handleChangeFile();
            setDropdownF(!dropdownF);
        }

        if (data == "nombre") {
            const tmp = { ...docente };
            tmp.username = nombre;
            await upDateDocente(tmp);
            setDocente(tmp);
            setDropdownN(!dropdownN);
        }

        if (data == "apellido") {
            const tmp = { ...docente };
            tmp.apellido = apellido;
            await upDateDocente(tmp);
            setDocente(tmp);
            setDropdownA(!dropdownA);
        }

        if (data == "fecha") {
            const tmp = { ...docente };
            tmp.fecha = fecha;
            await upDateDocente(tmp);
            setDocente(tmp);
            setDropdownFe(!dropdownFe);
        }

        if (data == "descripcion") {
            const tmp = { ...docente };
            tmp.descripcion = descripcion;
            await upDateDocente(tmp);
            setDocente(tmp);
            setDropdownD(!dropdownD);
        }

        if (data == "telefono") {
            const tmp = { ...docente };
            tmp.telefono = telefono;
            await upDateDocente(tmp);
            setDocente(tmp);
            setDropdownT(!dropdownT);
        }

        if (data == "pais") {
            const tmp = { ...docente };
            tmp.pais = pais;
            await upDateDocente(tmp);
            setDocente(tmp);
            setDropdownP(!dropdownP);
        }
    }

    function handleChangeFile() {
        const fileReader = new FileReader();
        if (fileReader && file && file.length > 0) {
            fileReader.readAsArrayBuffer(file[0]);
            fileReader.onload = async function () {
                const imageData = fileReader.result;
                const res = await setDocenteProfilePhoto(docente.email, imageData);
                if (res) {
                    const urlPhoto = await getProfilePhotoUrl(res.metadata.fullPath);
                    const tmp = { ...docente };
                    tmp.profilePicture = urlPhoto;
                    await upDateDocente(tmp);
                    setDocente(tmp);
                }
            }
        }
    }

    if (state == 6 && currentUser.rol === "administrador") {
        return (
            <main className="main-AdminDocente">
                <div className="div-infoBasica">
                    <p>Información básica</p>

                    <Dropdown isOpen={dropdownF} toggle={abrirCerrarDropdown}>
                        <DropdownToggle className="dropdownbutton-info" >
                            <button className="button-infoBasica button-final" onClick={(e) => { clickDropdown("foto") }}>
                                <div className="div-rigth"><p>Foto</p></div>
                                <div className="div-center"><p>Agregar una foto para personalizar tu cuenta</p></div>
                                <img src={docente.profilePicture} />
                            </button>
                        </DropdownToggle>
                        <DropdownMenu className="dropdownenu-info">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="div-newPhotoPro">
                                    {
                                        file.length > 0 ?

                                            <img src={URL.createObjectURL(file[0])} />
                                            :
                                            <img src={docente.profilePicture} />
                                    }
                                    <button className="btn btn-primary" onClick={handleOpenFilePicker}>Actualizar foto de Perfil</button>
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
                                    style={{ display: 'none' }}
                                />
                                <button className="btn btn-primary btnred" type="button" onClick={(e) => { clickDropdown("foto") }}>Cancelar</button>
                                <button className="btn btn-primary" type="submit">Guardar</button>
                            </form>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={dropdownN} toggle={abrirCerrarDropdown}>
                        <DropdownToggle className="dropdownbutton-info" >
                            <button className="button-infoBasica button-final" onClick={(e) => { clickDropdown("nombre") }}>
                                <div className="div-rigth"><p>Nombre</p></div>
                                <div className="div-center"><p>{docente.username}</p></div>
                                {
                                    Flecha(dropdownN)
                                }
                            </button>
                        </DropdownToggle>
                        <DropdownMenu className="dropdownenu-info">
                            <form onSubmit={formik.handleSubmit}>
                                <label htmlFor="nombre" className="form-label">Nombre</label>
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
                                <button className="btn btn-primary btnred" type="button" onClick={(e) => { clickDropdown("nombre") }}>Cancelar</button>
                                <button className="btn btn-primary" type="submit">Guardar</button>
                            </form>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={dropdownA} toggle={abrirCerrarDropdown}>
                        <DropdownToggle className="dropdownbutton-info" >
                            <button className="button-infoBasica button-final" onClick={(e) => { clickDropdown("apellido") }}>
                                <div className="div-rigth"><p>Apellido</p></div>
                                <div className="div-center"><p>{docente.apellido}</p></div>
                                {
                                    Flecha(dropdownA)
                                }
                            </button>
                        </DropdownToggle>
                        <DropdownMenu className="dropdownenu-info">
                            <form onSubmit={formik.handleSubmit}>
                                <label htmlFor="apellido" className="form-label">Apellido</label>
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
                                <button className="btn btn-primary btnred" type="button" onClick={(e) => { clickDropdown("apellido") }}>Cancelar</button>
                                <button className="btn btn-primary" type="submit">Guardar</button>
                            </form>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={dropdownFe} toggle={abrirCerrarDropdown}>
                        <DropdownToggle className="dropdownbutton-info" >
                            <button className="button-infoBasica button-final" onClick={(e) => { clickDropdown("fecha") }}>
                                <div className="div-rigth"><p>Fecha de nacimiento</p></div>
                                <div className="div-center"><p>{docente.fecha}</p></div>
                                {
                                    Flecha(dropdownFe)
                                }
                            </button>
                        </DropdownToggle>
                        <DropdownMenu className="dropdownenu-info">
                            <form onSubmit={formik.handleSubmit}>
                                <label htmlFor="fecha" className="form-label">Fecha de nacimiento</label>
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
                                <button className="btn btn-primary btnred" type="button" onClick={(e) => { clickDropdown("fecha") }}>Cancelar</button>
                                <button className="btn btn-primary" type="submit">Guardar</button>
                            </form>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={dropdownD} toggle={abrirCerrarDropdown}>
                        <DropdownToggle className="dropdownbutton-info button-final" >
                            <button className="button-infoBasica button-final" onClick={(e) => { clickDropdown("descripcion") }}>
                                <div className="div-rigth"><p>Descripción</p></div>
                                <div className="div-center"><p>{docente.descripcion}</p></div>
                                {
                                    Flecha(dropdownD)
                                }
                            </button>
                        </DropdownToggle>
                        <DropdownMenu className="dropdownenu-info">
                            <form onSubmit={formik.handleSubmit}>
                                <label htmlFor="descripcion" className="form-label">Descripción</label>
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
                                <button className="btn btn-primary btnred" type="button" onClick={(e) => { clickDropdown("descripcion") }}>Cancelar</button>
                                <button className="btn btn-primary" type="submit">Guardar</button>
                            </form>
                        </DropdownMenu>
                    </Dropdown>

                </div>
                <div className="div-infoBasica">
                    <p>Información de contacto</p>

                    <Dropdown isOpen={dropdownC} toggle={abrirCerrarDropdown}>
                        <DropdownToggle className="dropdownbutton-info button-final" >
                            <button className="button-infoBasica button-final" onClick={(e) => { clickDropdown("email") }}>
                                <div className="div-rigth"><p>Correo electrónico</p></div>
                                <div className="div-center"><p>{docente.email}</p></div>
                                {
                                    Flecha(dropdownC)
                                }
                            </button>
                        </DropdownToggle>
                        <DropdownMenu className="dropdownenu-info">
                            <form>
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    type="email"
                                    required
                                />
                                <button className="btn btn-primary btnred" type="button" onClick={(e) => { clickDropdown("email") }}>Cancelar</button>
                                <button className="btn btn-primary" type="submit">Guardar</button>
                            </form>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={dropdownT} toggle={abrirCerrarDropdown}>
                        <DropdownToggle className="dropdownbutton-info button-final" >
                            <button className="button-infoBasica button-final" onClick={(e) => { clickDropdown("telefono") }}>
                                <div className="div-rigth"><p>Teléfono</p></div>
                                <div className="div-center"><p>{docente.telefono}</p></div>
                                {
                                    Flecha(dropdownT)
                                }
                            </button>
                        </DropdownToggle>
                        <DropdownMenu className="dropdownenu-info">
                            <form onSubmit={formik.handleSubmit}>
                                <label htmlFor="telefono" className="form-label">Teléfono</label>
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
                                <button className="btn btn-primary btnred" type="button" onClick={(e) => { clickDropdown("telefono") }}>Cancelar</button>
                                <button className="btn btn-primary" type="submit">Guardar</button>
                            </form>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={dropdownP} toggle={abrirCerrarDropdown}>
                        <DropdownToggle className="dropdownbutton-info button-final" >
                            <button className="button-infoBasica button-final" onClick={(e) => { clickDropdown("pais") }}>
                                <div className="div-rigth"><p>País</p></div>
                                <div className="div-center"><p>{docente.pais}</p></div>
                                {
                                    Flecha(dropdownP)
                                }
                            </button>
                        </DropdownToggle>
                        <DropdownMenu className="dropdownenu-info">
                            <form onSubmit={formik.handleSubmit}>
                                <label htmlFor="pais" className="form-label">País</label>
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
                                <button className="btn btn-primary btnred" type="button" onClick={(e) => { clickDropdown("pais") }}>Cancelar</button>
                                <button className="btn btn-primary" type="submit">Guardar</button>
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
        >
        </AuthProvider>
    );
}