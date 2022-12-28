import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "../components/authProvider";
import { getCurso, getNiveles } from "../firebase/firebase";

export default function CursoNiveles() {

    let {idcurso} = useParams();

    const navigate = useNavigate();

    const [state, setState] = useState(0);
    const [currentUser, setcurrentUser] = useState({});
    const [curso, setCurso] = useState({});
    const [niveles, setNiveles] = useState([]);

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
        const res = await getCurso(idcurso);
        setCurso(res);
        const resNiveles = await getNiveles(idcurso);
        setNiveles([...resNiveles]);
    }

    function renderNiveles() {
        niveles.sort((a, b) => {
            if (a.order > b.order) {
                return 1;
            }
            if (a.order < b.order) {
                return -1;
            }
            return 0;
        });

        if (niveles.length > 0) {
            return niveles.map((nivel) => (
                <div
                    className="view-nivel"
                    key={nivel.id}
                    onClick={(e) => { handleOnClickNivel(nivel.id) }}
                >
                    <div><h1>{nivel.name}</h1></div>
                </div>
            ));
        }
    }

    function handleOnClickNivel(e) {
        navigate(`../curso-unidades/${e}`);
    }

    if (state === 6) {
        return (
            <main className="cursoNiveles">
                <h2>{curso.name}</h2>
                <section className="admin-cursos">
                    {renderNiveles()}
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