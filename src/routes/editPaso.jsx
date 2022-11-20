import { useNavigate, useParams } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useState } from "react";
import { existsPaso, getPaso, getProfilePhotoUrl, setProfilePaso, upDatePaso } from "../firebase/firebase";
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import swal from "sweetalert";

export default function EditPaso() {

    let { idpaso } = useParams();

    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [paso, setPaso] = useState({});

    const [data, setData] = useState('');
    const [inputDes, setInputDes] = useState('');
    const [inputName, setInputName] = useState('');
    const [file, setFile] = useState({});

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

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
        const resPaso = await getPaso(idpaso);
        setPaso(resPaso);
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
            const noexist = await existsPaso(nombre, paso.idunidad);
            if (noexist) {
                const tmp = { ...paso };
                tmp.name = nombre;
                await upDatePaso(tmp);
                setPaso(tmp);
                swal(
                    `El paso ${nombre}`,
                    "se actualizo con exito",
                    "success",
                );
            } else {
                swal(
                    `El paso ${nombre} ya existe`,
                    "Intenta de nuevo",
                    "error"
                );
            }
            setInputName('');
            setData('');
        }
        if (data == "descripcion") {
            const tmp = { ...paso };
            tmp.paso = descripcion;
            await upDatePaso(tmp);
            setPaso(tmp);
            swal(
                `La descripcion del paso`,
                "se actualizo con exito",
                "success",
            );
            setInputDes('');
        }

        if (data == "video") {
            FilePicker();
            swal(
                `El videovdel paso`,
                "se actualizo con exito",
                "success",
            );
        }

    }

    function FilePicker() {
        const fileReader = new FileReader();
        if (fileReader && file && file.length > 0) {
            fileReader.readAsArrayBuffer(file[0]);
            fileReader.onload = async function () {
                const videoData = fileReader.result;
                const res = await setProfilePaso(paso.id, videoData);
                if (res) {
                    const urlVideo = await getProfilePhotoUrl(res.metadata.fullPath);
                    addPaso(urlVideo);
                }
            };
        }
    }

    async function addPaso(urlVideo) {
        const tmp = { ...paso };
        tmp.video = urlVideo;
        await upDatePaso(tmp);
    }

    if (state == 6 && currentUser.rol === "administrador") {
        return (
            <main className="main-editPaso">
                <h2>{paso.name}</h2>
                <section className="section-editPaso">
                    <h3>Editar Nombre</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            id="nombre"
                            name="nombre"
                            className="form-control"
                            type="text"
                            required
                            value={inputName}
                            onChange={(e) => {
                                setInputName(e.target.value);
                                setNombre(e.target.value);
                                setData(e.target.name);
                            }}
                        />
                        <button className="btn btn-primary" type="submit">Guardar cambio</button>
                    </form>
                </section>

                <section className="section-editPaso">
                    <h3>Editar Video</h3>
                    <form className="form-addPaso" onSubmit={formik.handleSubmit}>
                        <label htmlFor="nombre" className="form-label">Video</label>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                                name="video"
                                type="file"
                                onChange={(e) => {
                                    setFile(e.target.files);
                                    setData(e.target.name);
                                }}
                            />
                        </Form.Group>
                        <button className="btn btn-primary" type="submit">Guardar cambio</button>
                    </form>
                </section>

                <section className="section-editPaso">
                    <h3>Editar Descripción</h3>
                    <form className="form-editPaso" onSubmit={formik.handleSubmit}>
                        <label htmlFor="nombre" className="form-label">Descripción</label>
                        <textarea
                            id="texto"
                            name="descripcion"
                            className="form-control"
                            type="text"
                            required
                            value={inputDes}
                            onChange={(e) => {
                                setInputDes(e.target.value);
                                setDescripcion(e.target.value);
                                setData(e.target.name);
                            }}
                        />
                        <button className="btn btn-primary" type="submit">Guardar cambio</button>
                    </form>
                </section>
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