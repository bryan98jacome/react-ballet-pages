import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { deleteNivel, deletePaso, deleteUnidad, existsNivel, existsUnidad, getNivel, getNiveles, getPasosNivel, getProfilePhotoUrl, getUnidadesNivel, setProfilePaso, upDateNivel, upDatePaso, upDateUnidad } from "../firebase/firebase";
import { useFormik } from 'formik';
import swal from "sweetalert";
import { v4 as uuid } from "uuid";
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

    const [pasos, setPasos] = useState([]);

    const [data, setData] = useState('');
    const [inputUnidad, setInputUnidad] = useState("");

    const [dropdownN, setDropdownN] = useState(false);

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

    async function getData() {
        const res = await getNivel(idnivel);
        setNivel(res);

        const resUnidades = await getUnidadesNivel(idnivel);
        setUnidades([...resUnidades]);

        const resPasos = await getPasosNivel(idnivel);
        setPasos([...resPasos]);
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
                const cont = unidades.length;
                const tmp = {};
                tmp.id = uuid();
                tmp.idNivel = idnivel;
                tmp.idCurso = nivel.idCurso;
                tmp.name = unidad;
                tmp.order = cont + 1;
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

        getData();
    }

    function renderUnidades() {
        //ordenar array unidades 
        unidades.sort((a, b) => {
            if (a.order > b.order) {
                return 1;
            }
            if (a.order < b.order) {
                return -1;
            }
            return 0;
        });

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

    function handleOnClickUnidad(e) {
        navigate(`../administrar-unidad/${e}`);
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

    if (state === 6 && currentUser.rol === "administrador") {
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