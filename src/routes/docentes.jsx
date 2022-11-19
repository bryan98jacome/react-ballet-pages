import fotoPerfil from '../img/docente-ninette-duran.jpg';
import fotoPerfilGen from '../img/docente.jpg';
import { useState } from "react";
import { getDocentes } from '../firebase/firebase';
import { useEffect } from 'react';

export default function Docentes() {

    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        getData();
    });

    async function getData() {
        const resDocentes = await getDocentes();
        setDocentes([...resDocentes]);
    }

    function renderDocentes() {
        if (docentes.length > 0) {
            return docentes.map((docente) => (
                <div className="div-ninette">
                    <img src={docente.profilePicture} alt="Docente Ninette Durán" width="145" height="145" />
                    <p><strong>{docente.username} {docente.apellido}</strong><br />{docente.descripcion}</p>
                </div>
            ));
        }
    }

    return (
        <main className="main-docentes">
            <p className="titulo-docentes">Equipo de Docentes</p>
            <section className="section-docentes">
                <div className="div-docentes-grid">
                    {renderDocentes()}
                </div>
            </section>
        </main>
    );
}