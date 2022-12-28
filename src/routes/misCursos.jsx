import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "../components/authProvider";
import { getCursos } from "../firebase/firebase";

export default function MisCursos() {

    const navigate = useNavigate();

    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [cursos, setCursos] = useState([]);

    async function handledUserLoggedIn(user) {
        setcurrentUser(user);
        setState(6);
        getData();
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
        const res = await getCursos('82f45f19-e930-467d-a791-e8bbde2a6b57');
        setCursos([...res]);
    }

    function renderCursos() {
        if (cursos.length > 0) {
            return cursos.map((curso) => (
                <div
                    className="view-curso"
                    key={curso.id}
                    onClick={(e) => { clickCurso(curso.id) }}
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

    function clickCurso(e) {
        navigate(`../curso-niveles/${e}`);
    }

    if (state === 6) {
        return (
            <main className="main-misCursos">
                <section className="section-misCursos">
                    <h2>Mis cursos</h2>
                    <div className="divCursos-misCursos">
                        {renderCursos()}
                    </div>
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