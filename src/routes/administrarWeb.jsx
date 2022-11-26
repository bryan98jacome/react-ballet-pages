import AuthProvider from "../components/authProvider";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCursos, getDocentes } from "../firebase/firebase";

export default function AdministrarWeb() {

    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [docentes, setDocentes] = useState([]);
    const [cursos, setCursos] = useState([]);

    async function handledUserLoggedIn(user) {
        setcurrentUser(user);
        if (user.rol === "administrador") {
            setState(6);
            const resDocentes = await getDocentes();
            setDocentes([...resDocentes]);
            const resCursos = await getCursos();
            setCursos([...resCursos]);
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

    function handleOnNewDocente() {
        navigate("../choose-docente");
    }

    function handleOnNewCurso() {
        navigate("../choose-curso");
    }

    function renderDocentes() {
        if (docentes.length > 0) {
            return docentes.map((docente) => (
                <div
                    className="view-docente"
                    key={docente.id}
                    onClick={(e) => { handleOnClickDocente(docente.id) }}
                >
                    <div>
                        <h2>{docente.username} {docente.apellido}</h2>
                        <p>{docente.email}</p>
                    </div>
                    <img src={docente.profilePicture} />
                </div>
            ));
        }
    }

    function renderCursos() {
        if (cursos.length > 0) {
            return cursos.map((curso) => (
                <div
                    className="view-curso"
                    key={curso.id}
                    onClick={(e) => { handleOnClickCurso(curso.id) }}
                >
                    <div>
                        <h2>{curso.name}</h2>
                        <p>{curso.descripcion}</p>
                    </div>
                    <img src={curso.photo} />
                </div>
            ));
        }
    }

    function handleOnClickDocente(e) {
        navigate(`../administrar-docente/${e}`);
    }

    function handleOnClickCurso(e) {
        navigate(`../administrar-curso/${e}`);
    }

    if (state == 6 && currentUser.rol === "administrador") {
        return (
            <main className="main-adminWeb">
                <h1>Cursos</h1>
                <div className="admin-cursos">
                    <div className="new-curso" onClick={handleOnNewCurso}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        <p>Agregar curso</p>
                    </div>
                    {renderCursos()}
                </div>
                <h1>Docentes</h1>
                <div className="admin-cursos">
                    <div className="new-docente" onClick={handleOnNewDocente}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        <p>Agregar docente</p>
                    </div>
                    {renderDocentes()}
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