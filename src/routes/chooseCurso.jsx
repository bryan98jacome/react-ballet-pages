import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useFormik } from "formik";
import addPhoto from "../img/addPhoto.png";
import { existsCurso, getDocentes, getProfilePhotoUrl, setCursoPhoto, upDateCurso } from "../firebase/firebase";
import { v4 as uuid } from "uuid";
import swal from "sweetalert";
import { Form } from "react-bootstrap";

export default function ChoosCurso() {

    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [file, setFile] = useState({});
    const [docentes, setDocentes] = useState([]);
    const [docente, setDocente] = useState('');
    const fileRef = useRef();

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
        const resDocentes = await getDocentes();
        setDocentes([...resDocentes]);
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

    function handleOpenFilePicker() {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    async function handleChangeFile() {
        const noexist = await existsCurso(nombre);
        if (noexist) {
            if (docente === '' || docente === 'false') {
                swal(
                    `Debe seleccionar un Instructor`,
                    "Intenta de nuevo",
                    "error"
                );
            } else {
                const fileReader = new FileReader();
                if (fileReader && file && file.length > 0) {
                    fileReader.readAsArrayBuffer(file[0]);
                    fileReader.onload = async function () {
                        const imageData = fileReader.result;
                        const res = await setCursoPhoto(nombre, imageData);
                        if (res) {
                            const urlPhoto = await getProfilePhotoUrl(res.metadata.fullPath);
                            handleContinue(urlPhoto);
                        }
                    };
                }
            }
        } else {
            //Mensaje que ya existe el docente
            swal(
                `El curso ${nombre} ya esta registrado`,
                "Intenta de nuevo",
                "error"
            );
        }
    }

    async function handleContinue(urlPhoto) {
        const tmp = {};
        tmp.id = uuid();
        tmp.name = nombre;
        tmp.descripcion = descripcion;
        tmp.photo = urlPhoto;
        tmp.docente = docente;
        await upDateCurso(tmp);
        swal(
            `El curso ${nombre}`,
            "se creo con exito",
            "success",
        );
        navigate("../administrar-web");
    }

    if (state === 6 && currentUser.rol === "administrador") {
        return (
            <main className="main-choosCurso">
                <div className="div-title">Datos del curso</div>
                <div className="div-formuCurso">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="div-nameInput">
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

                        <div className="div-intructorInput">
                            <label htmlFor="firstName" className="form-label">
                                Instructor
                            </label>
                            <Form.Control as="select" onChange={(e) => { setDocente(e.target.value) }}>
                                <option value={false}>Select instructor</option>
                                {
                                    docentes.map((docente) => (
                                        <option value={docente.id} key={docente.id}>{docente.username}</option>
                                    ))
                                }
                            </Form.Control>
                        </div>

                        <div className="div-photoDocente">
                            {file.length > 0 ? (
                                <img src={URL.createObjectURL(file[0])} alt='' />
                            ) : (
                                <img src={addPhoto} alt='' />
                            )}
                            <button
                                className="btn btn-primary"
                                onClick={handleOpenFilePicker}
                                type="button"
                            >
                                Foto
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
                                Agregar curso
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
        >
        </AuthProvider>
    );
}