import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getCursos } from '../firebase/firebase';

export default function Cursos() {

    const navigate = useNavigate();
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        getData();
    });

    async function getData() {
        const resCursos = await getCursos();
        setCursos([...resCursos]);
    }

    function clickContinue() {
        navigate('../niveles');
    }

    function renderCursos() {
        if (cursos.length > 0) {
            return cursos.map((curso) => (
                <div className='div-contCurso'>
                    <div className="div-image">
                        <img src={curso.photo} alt="imagen-logo" height="80" width="80" />
                    </div>
                    <strong>{curso.name}</strong>
                    <p className="text">{curso.descripcion}</p>
                    <a className='navLink' /*onClick={clickContinue}*/>
                        <p>Explore</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                    </a>

                </div>
            ));
        }
    }

    return (
        <>
            <main className="main-cursos">
                <p className="titulo-curso">Cursos Disponibles</p>
                <div className="div-cursos">
                    {renderCursos()}
                </div>
            </main>
        </>
    );
}