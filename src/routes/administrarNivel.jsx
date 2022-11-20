import { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { deleteNivel, deletePaso, deleteUnidad, existsNivel, existsPaso, existsUnidad, getNivel, getNiveles, getPasosNivel, getProfilePhotoUrl, getUnidadesNivel, setProfilePaso, upDateNivel, upDatePaso, upDateUnidad } from "../firebase/firebase";
import { useFormik } from 'formik';
import swal from "sweetalert";
import { v4 as uuid } from "uuid";
import Form from 'react-bootstrap/Form';
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import Flecha from "../layouts/flecha";

export default function AdministrarNivel() {

    let { idnivel } = useParams();

    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const navigate = useNavigate();
    const [nivel, setNivel] = useState({});
    const [nombre, setNombre] = useState('');

    const [unidades, setUnidades] = useState([]);
    const [unidad, setUnidad] = useState('');
    const [idUnidad, setIdUnidad] = useState('');

    const [paso, setPaso] = useState('');
    const [nombrePaso, setNombrePaso] = useState('');
    const [pasos, setPasos] = useState([]);

    const [data, setData] = useState('');
    const [file, setFile] = useState({});
    const [inputUnidad, setInputUnidad] = useState("");
    const [inputPaso, setInputPaso] = useState("");
    const [inputNombrePaso, setInputNombrePaso] = useState("");

    const [dropdownN, setDropdownN] = useState(false);

    async function getData() {
        const res = await getNivel(idnivel);
        setNivel(res);

        const resUnidades = await getUnidadesNivel(idnivel);
        setUnidades([...resUnidades]);

        const resPasos = await getPasosNivel(idnivel);
        setPasos([...resPasos]);
    }

    async function handledUserLoggedIn(user) {
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

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
        },
        onSubmit: values => {
            clickSave();
        },
    });

    async function clickSave() {
        if (data == "nombre") {
            const noexist = await existsNivel(nombre, nivel.idCurso);
            if (noexist) {
                const tmp = { ...nivel };
                tmp.name = nombre;
                await upDateNivel(tmp);
                setNivel(tmp);
                setDropdownN(!dropdownN);
            } else {
                swal(
                    `El nivel ${nombre} ya existe`,
                    "Intenta con otro nombre",
                    "error"
                );
            }
        }
        if (data == "addUnidad") {
            const noexist = await existsUnidad(unidad, idnivel);
            if (noexist) {
                const tmp = {};
                tmp.id = uuid();
                tmp.idNivel = idnivel;
                tmp.idCurso = nivel.idCurso;
                tmp.name = unidad;
                await upDateUnidad(tmp);
                swal(
                    `La unidad ${unidad}`,
                    "se agrego con exito",
                    "success",
                );
                setInputUnidad("");
            } else {
                swal(
                    `La unidad ${unidad} ya existe`,
                    "Intenta de nuevo",
                    "error"
                );
            }
        }

        if (data == "addPaso") {
            const noexist = await existsPaso(nombrePaso, idUnidad);
            if (noexist) {
                if (idUnidad == '' || idUnidad == 'false') {
                    swal(
                        `Debe seleccionar un nivel`,
                        "Intenta de nuevo",
                        "error"
                    );
                } else {
                    FilePicker();
                    swal(
                        `El paso ${nombrePaso}`,
                        "se agrego con exito",
                        "success",
                    );
                    setInputNombrePaso('');
                    setInputPaso('');
                }
            } else {
                swal(
                    `El paso ${nombrePaso} ya existe`,
                    "Intenta de nuevo",
                    "error"
                );
            }

        }
        getData();
    }

    function FilePicker() {
        const fileReader = new FileReader();
        if (fileReader && file && file.length > 0) {
            fileReader.readAsArrayBuffer(file[0]);
            fileReader.onload = async function () {
                const videoData = fileReader.result;
                const idPaso = uuid();
                const res = await setProfilePaso(idPaso, videoData);
                if (res) {
                    const urlVideo = await getProfilePhotoUrl(res.metadata.fullPath);
                    addPaso(idPaso, urlVideo);
                }
            };
        }
    }

    async function addPaso(idPaso, urlVideo) {
        const tmp = {};
        tmp.id = idPaso;
        tmp.idCurso = nivel.idCurso;
        tmp.idNivel = idnivel;
        tmp.idunidad = idUnidad;
        tmp.name = nombrePaso;
        tmp.video = urlVideo;
        tmp.paso = paso;
        await upDatePaso(tmp);
    }

    function handleOnClickUnidad(e) {
        navigate(`../administrar-unidad/${e}`);
    }

    function renderUnidades() {
        if (unidades.length > 0) {
            return unidades.map((unidad) => (
                <div
                    className="view-nivel"
                    key={unidad.id}
                    onClick={(e) => { handleOnClickUnidad(unidad.id) }}
                >
                    <div><h1>{unidad.name}</h1></div>
                </div>
            ));
        }
    }

    const abrirCerrarDropdown = () => { setDropdownN(!dropdownN); }
    const abrirCerrarDropdownF = () => { }

    function clickDeleteNivel() {
        swal({
            title: "¿Está seguro?",
            text: "Una vez eliminado este nivel, ¡no podrá recuperarlo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                /* Eliminar las unidades del nivel */
                eliminarUnidades();
                /* Eliminar los pasos del nivel */
                eliminarPasos();
                /* Eliminar el nivel */
                await deleteNivel(nivel.id);

                swal(`¡El nivel ${nivel.name} ha sido eliminado!`, {
                    icon: "success",
                });
                /* Redirigir a la pagina anterior */
                navigate(`../administrar-curso/${nivel.idCurso}`);
            } else {
                swal(`¡El nivel ${nivel.name} está a salvo!`);
            }
        });
    }

    function eliminarUnidades() {
        unidades.map(async (unidad) => (
            await deleteUnidad(unidad.id)
        ));
    }

    function eliminarPasos() {
        pasos.map(async (paso) => (
            await deletePaso(paso.id)
        ));
    }

    if (state == 6 && currentUser.rol === "administrador") {
        return (
            <main className="admin-nivel">
                <h2>{nivel.name}</h2>

                <div className="div-infoBasica">
                    <Dropdown isOpen={dropdownN} toggle={abrirCerrarDropdownF}>
                        <DropdownToggle className="dropdownbutton-info" >
                            <button className="button-infoBasica button-final" onClick={abrirCerrarDropdown}>
                                <div className="div-rigth"><p>Nombre</p></div>
                                <div className="div-center"><p>{nivel.name}</p></div>
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
                                <button className="btn btn-primary btnred" type="button" onClick={abrirCerrarDropdown}>Cancelar</button>
                                <button className="btn btn-primary" type="submit">Guardar</button>
                            </form>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <section>
                    <div className="div-addUnidad">
                        <h3>Agregar unidad</h3>
                        <form className="form-add" onSubmit={formik.handleSubmit}>
                            <input
                                type="text" name="addUnidad" className="form-control" required
                                value={inputUnidad}
                                onChange={(e) => {
                                    setUnidad(e.target.value);
                                    setData(e.target.name);
                                    setInputUnidad(e.target.value);
                                }} />
                            <button type="submit" className="btn btn-primary">Agregar</button>
                        </form>
                    </div>
                </section>

                <section>
                    <div className="div-addPaso">
                        <h3>Agregar Paso</h3>
                        <form className="form-addPaso" onSubmit={formik.handleSubmit}>
                            <input type="text" className="form-control cls-input" required
                                value={inputNombrePaso}
                                onChange={(e) => {
                                    setInputNombrePaso(e.target.value);
                                    setNombrePaso(e.target.value);
                                }}
                            />
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" required
                                    onChange={(e) => {
                                        setFile(e.target.files);
                                    }}
                                />
                            </Form.Group>
                            <textarea
                                id="texto"
                                name="addPaso"
                                className="form-control"
                                type="text"
                                required
                                value={inputPaso}
                                onChange={(e) => {
                                    setInputPaso(e.target.value);
                                    setPaso(e.target.value);
                                    setData(e.target.name);
                                }}
                            />
                            <Form.Control as="select" className="input-selec" onChange={(e) => { setIdUnidad(e.target.value) }}>
                                <option value={false}>Select level</option>
                                {
                                    unidades.map(unidad => (
                                        <option value={unidad.id} key={unidad.id}>{unidad.name}</option>
                                    ))
                                }
                            </Form.Control>
                            <button type="submit" className="btn btn-primary">Agregar</button>
                        </form>
                    </div>
                </section>

                <section>
                    <div className="div-datos">
                        <h3>Unidades</h3>
                    </div>
                    <div className="div-renNiveles">
                        {renderUnidades()}
                    </div>
                </section>

                <div className="div-deleteCurso">
                    <button className="btn btn-primary btnred btnDelete" onClick={clickDeleteNivel}>Eliminar Nivel</button>

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