import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { deleteCurso, deleteNivel, deletePaso, deleteUnidad, existsNivel, existsUnidad, getCurso, getNiveles, getPasos, getProfilePhotoUrl, getUnidades, setCursoPhoto, upDateCurso, upDateNivel, upDateUnidad } from "../firebase/firebase";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { useFormik } from 'formik';
import swal from "sweetalert";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { getIdToken } from "firebase/auth";
import Flecha from "../layouts/flecha";

export default function AdiministrarCurso() {

    let { idcurso } = useParams();

    const [currentUser, setcurrentUser] = useState({});
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [curso, setCurso] = useState({});
    const [file, setFile] = useState({});
    const [inputValue, setInputValue] = useState("");
    const [inputUnidad, setInputUnidad] = useState("");
    const [data, setData] = useState('');
    const fileRef = useRef();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [nombreNivel, setNombreNivel] = useState('');
    const [niveles, setNiveles] = useState([]);
    const [nivel, setNivel] = useState('');

    const [nombreUnidad, setNombreUnidad] = useState('');
    const [unidades, setUnidades] = useState([]);
    const [unidad, setUnidad] = useState('');

    const [pasos, setPasos] = useState([]);

    const [dropdownF, setDropdownF] = useState(false);
    const [dropdownN, setDropdownN] = useState(false);
    const [dropdownD, setDropdownD] = useState(false);



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
        if (data == "foto") {
            handleChangeFile();
        }
        if (data == "nombre") {
            const tmp = { ...curso };
            tmp.name = nombre;
            await upDateCurso(tmp);
            setCurso(tmp);
            setDropdownN(!dropdownN);
        }
        if (data == "descripcion") {
            const tmp = { ...curso };
            tmp.descripcion = descripcion;
            await upDateCurso(tmp);
            setCurso(tmp);
            setDropdownD(!dropdownD);
        }
        if (data == "addNivel") {
            const noexist = await existsNivel(nombreNivel, idcurso);
            if (noexist) {
                const tmp = {};
                tmp.id = uuid();
                tmp.idCurso = idcurso;
                tmp.name = nombreNivel;
                await upDateNivel(tmp);
                swal(
                    `El nivel ${nombreNivel}`,
                    "se agrego con exito",
                    "success",
                );
                setInputValue("");
            } else {
                swal(
                    `El nivel ${nombreNivel} ya existe`,
                    "Intenta de nuevo",
                    "error"
                );
            }
        }

        if (data == "addUnidad") {
            const noexist = await existsUnidad(nombreUnidad, nivel);
            if (noexist) {
                if (nivel == '' || nivel == 'false') {
                    swal(
                        `Debe seleccionar un nivel`,
                        "Intenta de nuevo",
                        "error"
                    );
                } else {
                    const tmp = {};
                    tmp.id = uuid();
                    tmp.idNivel = nivel;
                    tmp.idCurso = idcurso;
                    tmp.name = nombreUnidad;
                    await upDateUnidad(tmp);
                    swal(
                        `La unidad ${nombreUnidad}`,
                        "se agrego con exito",
                        "success",
                    );
                    setInputUnidad("");
                }
            } else {
                swal(
                    `La unidad ${nombreUnidad} ya existe`,
                    "Intenta de nuevo",
                    "error"
                );
            }
        }

        getDataNiveles();
    }

    function handleChangeFile() {
        const fileReader = new FileReader();
        if (fileReader && file && file.length > 0) {
            fileReader.readAsArrayBuffer(file[0]);
            fileReader.onload = async function () {
                const imageData = fileReader.result;
                const res = await setCursoPhoto(curso.name, imageData);
                if (res) {
                    const urlPhoto = await getProfilePhotoUrl(res.metadata.fullPath);
                    const tmp = { ...curso };
                    tmp.photo = urlPhoto;
                    await upDateCurso(tmp);
                    setCurso(tmp);
                }
            };
            setDropdownF(!dropdownF);
        }
    }

    async function handledUserLoggedIn(user) {
        setcurrentUser(user);
        if (user.rol === "administrador") {
            setState(6);
            getData();
            getDataNiveles();
            getDataUnidades();
            getDataPasos();
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
        const res = await getCurso(idcurso);
        setCurso(res);
    }

    async function getDataNiveles() {
        const resNiveles = await getNiveles(idcurso);
        setNiveles([...resNiveles]);
    }

    async function getDataUnidades() {
        const resUnidades = await getUnidades(idcurso);
        setUnidades([...resUnidades]);
    }

    async function getDataPasos() {
        const resPasos = await getPasos(idcurso);
        setPasos([...resPasos]);
    }

    const abrirCerrarDropdown = () => { }

    function clickDropdown(e) {
        if (e == "foto") { setDropdownF(!dropdownF); }
        if (e == "nombre") { setDropdownN(!dropdownN); }
        if (e == "descripcion") { setDropdownD(!dropdownD); }
    }

    function handleOpenFilePicker() {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    function renderNiveles() {
        if (niveles.length > 0) {
            return niveles.map((nivel) => (
                <div
                    className="view-nivel"
                    key={nivel.id}
                    onClick={(e) => { handleOnClickNivel(nivel.id) }}
                >
                    <div><h2>{nivel.name}</h2></div>
                </div>
            ));
        }
    }

    function handleOnClickNivel(e) {
        navigate(`../administrar-nivel/${e}`);
    }

    function clickDeleteCurso() {
        swal({
            title: "¿Está seguro?",
            text: "Una vez eliminado este curso, ¡no podrá recuperarlo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                /* Eliminar los niveles del curso */
                eliminarNiveles();
                /* Eliminar las unidades del curso */
                eliminarUnidades();
                /* Eliminar los pasos del curso */
                eliminarPasos();
                /* Servicio de eliminar el curso */
                await deleteCurso(idcurso);

                swal(`¡El curso ${curso.name} ha sido eliminado!`, {
                    icon: "success",
                });
                /* Redirigir a la pagina anterior */
                navigate("../administrar-web");
            } else {
                swal(`¡El curso ${curso.name} está a salvo!`);
            }
        });
    }

    function eliminarNiveles() {
        niveles.map(async (nivel) => (
            await deleteNivel(nivel.id)
        ));
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
            <main className="main-adminCurso">
                <h1>{curso.name}</h1>
                <div><img src={curso.photo} className='photo-curso' /></div>
                <div className="div-infoBasica">

                    <Dropdown isOpen={dropdownF} toggle={abrirCerrarDropdown}>
                        <DropdownToggle className="dropdownbutton-info" >
                            <button className="button-infoBasica button-final" onClick={(e) => { clickDropdown("foto") }}>
                                <div className="div-rigth"><p>Foto</p></div>
                                <div className="div-center"><p>Agregar una foto</p></div>
                                <img src={curso.photo} />
                            </button>
                        </DropdownToggle>
                        <DropdownMenu className="dropdownenu-info">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="div-newPhotoPro">
                                    {
                                        file.length > 0 ?

                                            <img src={URL.createObjectURL(file[0])} />
                                            :
                                            <img src={curso.photo} />
                                    }
                                    <button className="btn btn-primary" onClick={handleOpenFilePicker}>Actualizar foto</button>
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
                                <div className="div-center"><p>{curso.name}</p></div>
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

                    <Dropdown isOpen={dropdownD} toggle={abrirCerrarDropdown}>
                        <DropdownToggle className="dropdownbutton-info button-final" >
                            <button className="button-infoBasica button-final" onClick={(e) => { clickDropdown("descripcion") }}>
                                <div className="div-rigth"><p>Descripción</p></div>
                                <div className="div-center"><p>{curso.descripcion}</p></div>
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

                <section>
                    <div className="div-addNivel">
                        <h3>Agregar nuevo nivel</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                type="text" name="addNivel" className="form-control" required
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setNombreNivel(e.target.value);
                                    setData(e.target.name);
                                }}
                            />
                            <button type="submit" className="btn btn-primary">Agregar</button>
                        </form>
                    </div>
                </section>

                <section>
                    <div className="div-addNivel">
                        <h3>Agregar nueva unidad</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                type="text" name="addUnidad" className="form-control" required
                                value={inputUnidad}
                                onChange={(e) => {
                                    setInputUnidad(e.target.value);
                                    setNombreUnidad(e.target.value);
                                    setData(e.target.name);
                                }}
                            />
                            <Form.Control as="select" className="input-selec" onChange={(e) => { setNivel(e.target.value) }}>
                                <option value={false}>Select level</option>
                                {
                                    niveles.map(nivel => (
                                        <option value={nivel.id} key={nivel.id}>{nivel.name}</option>
                                    ))
                                }
                            </Form.Control>
                            <button type="submit" className="btn btn-primary">Agregar</button>
                        </form>
                    </div>
                </section>

                <section>
                    <div className="div-datos">
                        <h3>Niveles</h3>
                    </div>
                    <div className="div-renNiveles">
                        {renderNiveles()}
                    </div>
                </section>

                <div className="div-deleteCurso">
                    <button className="btn btn-primary btnred btnDelete" onClick={clickDeleteCurso}>Eliminar Curso</button>

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