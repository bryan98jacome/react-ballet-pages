import AuthProvider from "../components/authProvider";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePaso, deleteUnidad, existsPaso, getPasosUnidad, getProfilePhotoUrl, getUnidad, setProfilePaso, upDatePaso } from "../firebase/firebase";
import swal from "sweetalert";
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { v4 as uuid } from "uuid";

export default function AdministrarUnidad() {

    let { idunidad } = useParams();

    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [unidad, setUnidad] = useState({});
    const [pasos, setPasos] = useState([]);
    const [nombrePaso, setNombrePaso] = useState('');

    const [inputPaso, setInputPaso] = useState("");
    const [inputNombrePaso, setInputNombrePaso] = useState("");

    const [data, setData] = useState('');
    const [file, setFile] = useState({});
    const [paso, setPaso] = useState('');

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
        const res = await getUnidad(idunidad);
        setUnidad(res);

        const resPasos = await getPasosUnidad(idunidad);
        setPasos([...resPasos]);
    }

    function renderPasos() {
        //ordenar array pasos 
        pasos.sort((a, b) => {
            if (a.order > b.order) {
                return 1;
            }
            if (a.order < b.order) {
                return -1;
            }
            return 0;
        });

        if (pasos.length > 0) {
            return pasos.map((paso) => (
                <div
                    className="view-paso"
                    key={paso.id}
                    onClick={(e) => { editPaso(paso.id) }}
                >
                    <div><h2>{paso.name}</h2></div>
                </div>
            ));
        }
    }

    function clickDeleteUnidad() {
        swal({
            title: "¿Está seguro?",
            text: "Una vez eliminado esta unidad, ¡no podrá recuperarlo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                /* Eliminar los pasos de la unidad */
                eliminarPasos();
                /* Eliminar la unidad */
                await deleteUnidad(unidad.id);

                swal(`¡La unidad ${unidad.name} ha sido eliminado!`, {
                    icon: "success",
                });
                /* Redirigir a la pagina anterior */
                navigate(`../administrar-nivel/${unidad.idNivel}`);
            } else {
                swal(`¡La unidad ${unidad.name} está a salvo!`);
            }
        });
    }

    function eliminarPasos() {
        pasos.map(async (paso) => (
            await deletePaso(paso.id)
        ));
    }

    function editPaso(uuid) {
        navigate(`../editar-paso/${uuid}`);
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
        if (data == "addPaso") {
            const noexist = await existsPaso(nombrePaso, unidad.idCurso);
            if (noexist) {
                FilePicker();
                swal(
                    `El paso ${nombrePaso}`,
                    "se agrera en 10 segundos",
                    {
                        timer: 10000,
                        buttons: false
                    }
                );
                setInputNombrePaso('');
                setInputPaso('');
            } else {
                swal(
                    `El paso ${nombrePaso} ya existe`,
                    "Intenta de nuevo",
                    "error"
                );
            }
        }
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
        const cont = pasos.length;
        const tmp = {};
        tmp.id = idPaso;
        tmp.idCurso = unidad.idCurso;
        tmp.idNivel = unidad.idNivel;
        tmp.idunidad = unidad.id;
        tmp.name = nombrePaso;
        tmp.video = urlVideo;
        tmp.paso = paso;
        tmp.order = cont + 1;
        await upDatePaso(tmp);
        getData();
    }

    if (state == 6 && currentUser.rol === "administrador") {
        return (
            <main className="admin-nivel">
                <h2>{unidad.name}</h2>

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
                            <button type="submit" className="btn btn-primary">Agregar</button>
                        </form>
                    </div>
                </section>

                <section>
                    <div className="div-addPaso">
                        <h3>Pasos</h3>
                        {renderPasos()}
                    </div>
                </section>

                <div className="div-deleteCurso">
                    <button className="btn btn-primary btnred btnDelete" onClick={clickDeleteUnidad}>Eliminar Unidad</button>
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