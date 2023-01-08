import { useState, useEffect } from "react";
import { getPasos, getUnidades } from '../firebase/firebase';

export default function UnidadesCompra() {

    const [unidades, setUnidades] = useState([]);
    const [pasos, setPasos] = useState([]);
    const [selection, setSelection] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const resUnidades = await getUnidades('82f45f19-e930-467d-a791-e8bbde2a6b57');
        const newUnidades = resUnidades.map((res) => {
            return {
                ...res,
                isSelect: false
            };
        });
        setUnidades([...newUnidades]);
        const resPasos = await getPasos('82f45f19-e930-467d-a791-e8bbde2a6b57');
        setPasos([...resPasos]);
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
                <div key={unidad.id} className="divUnidad-unidadesCompra">
                    <h2>{unidad.name}</h2>
                    <div className="divPasos-unidadesCompra">
                        {renderPasos(unidad.id)}
                    </div>
                    <div className="divButton-unidadesCompra">
                        {
                            unidad.isSelect ? <button onClick={() => { desSelected(unidad.id) }}>Quitar</button>
                                : <button onClick={() => { selected(unidad.id) }}>Adquirir</button>
                        }
                    </div>
                </div>
            ));
        }
    }

    function selected(id) {
        unidades.map((res) => {
            if (res.id === id) {
                res.isSelect = true;
            }
        });
        setUnidades([...unidades]);
        const newUnidad = { id: id }
        setSelection([...selection, newUnidad]);
    }

    function desSelected(id) {
        unidades.map((res) => {
            if (res.id === id) {
                res.isSelect = false;
            }
        });
        setUnidades([...unidades]);
        //Quitar el id de la lista de selection!!!
        const newUnidad = selection.filter((select) => select.id !== id);
        setSelection(newUnidad);
    }

    function renderPasos(idunidad) {
        if (pasos.length > 0) {
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

            return pasos.map((paso) => (
                <div key={paso.id}>
                    {paso.idunidad === idunidad ?
                        <li key={paso.id} className="li-unidadesCompra">
                            <span>{paso.name}</span>
                        </li> :
                        <></>
                    }
                </div>
            ));
        } else {
            return (<div></div>);
        }
    }

    return (
        <main className="main-unidadesCompra">
            <h1>Unidades Compra</h1>
            <section className="sec-presio">
                <ul>
                    {selection.map((select) => (
                        <li key={select.id}>{select.id}</li>
                    ))}
                </ul>
            </section>
            <div className="divUnidades-unidadesCompra">
                {renderUnidades()}
            </div>
        </main>
    );


}