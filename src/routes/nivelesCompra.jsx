import { useState, useEffect } from "react";
import { getNiveles, getPasos, getUnidades } from '../firebase/firebase';
import eeuuImg from '../img/estados-unidos.png';

export default function NivelesCompra() {

    const [niveles, setNiveles] = useState([]);
    const [selection, setSelection] = useState([]);

    const descrip = [
        { des: "El 1er nivel comprende un programa divido en: 9 unidades de estudio con un promedio de 20 a 30 pasos a enseñar por cada unidad y con un total de 219 pasos a enseñar en todo el nivel. Este primer nivel tiene como objetivo la enseñanza de la postura y colocación del cuerpo, piernas, brazos y cabeza. En este nivel los estudiantes conocen por primera vez los pasos básicos que componen la técnica del ballet, por lo que es necesario aplicar un conteo de enseñanza que favorezca el desarrollo del movimiento para su correcta forma de ejecución y mecanismo de realización, primeramente, de las piernas con la utilización de brazos y cabeza en posiciones fijas. La dinámica de la clase en un 1er año es lenta, controlada, metódica, donde los distintos pasos se van a enseñar por separado, inicialmente en 1ra fase, para después pasarlo a 2da fase combinándolos en los distintos ejercicios donde lo recomendable es utilizar hasta 3 dificultades técnicas por ejercicio y finalmente realizarlos al centro del salón primeramente en posición en face y una vez dominado los pasos en centro hacerlos desde las posiciones croise, efface o ecarte" },
        { des: "El 2do nivel comprende un programa divido en 9 unidades de estudio con un promedio de 30 a 40 pasos a enseñar por cada unidad y con un total de 282 pasos a enseñar en todo el nivel. En este nivel se irá introduciendo cada vez mas el trabajo de la coordinación de piernas, brazos y cabeza donde se irán incluyendo port de bras básicos en los distintos ejercicios de clases. Otro de los aspectos importantes en el 2do nivel es el inicio de estudio de la familia de los giros, su correcta enseñanza radica en el control y equilibrio que van desarrollando los estudiantes desde el 1er año en las distintas posiciones estudiadas y en las que cada vez mas tratarán de desafiar la gravedad para mantener el cuerpo alineado y en equilibrio desde el pie apoyado completamente en el suelo hasta su realización a releve, después con la realización de pasos más complejos como los promenade hasta llegar a las etapas de enseñanza de un pirouette. La dinámica de la clase se va haciendo cada vez más combinada en comparación con la clase de 1er año, una vez coordinado los movimientos con la utilización de piernas, brazos y cabeza y asimilado por parte de los estudiantes, el maestro podrá ir agilizando los conteo de ejecución de los pasos así como también la cantidad de pasos a combinar con una media de 4 pasos por ejercicio pero cuidando siempre la calidad de los movimientos, así garantizaremos un trabajo acorde de fuerza y resistencia muscular para el nivel. El inicio del estudio de la baterías, saltos con giros y el inicio del baile en puntas son otros de los objetivos del programa de estudio de este nivel" },
        { des: "El 3er nivel comprende un programa divido en 9 unidades de estudio con un promedio de 40 a 50 pasos a enseñar por cada unidad y con un total de 438 pasos a enseñar en todo el nivel. En este nivel se seguirá desarrollando aún más la coordinación de piernas, brazos y cabeza con ejercicios cada vez más combinados donde hasta se pueda utilizar por ejercicios de 4 a 5 dificultades técnicas, se irá también incrementando la dinámica de los movimientos donde se puedan trabajar distintos ritmos dentro de un mismo ejercicio y esto se verá reflejado en la clase de allegro donde se sigue desarrollando los saltos battu. Será un objetivo fundamental en este nivel trabajar dentro de las estructuras de ejercicios los cambios de ángulos y dominio del espacio con el desarrollo de los pasos en tournant y pasos con traslación. La fuerza de piernas se irá incrementando cada vez más pues se debe lograr una resistencia de los músculos en el trabajo a releve en los ejercicios de barra y centro para poder asumir de una forma satisfactoria el trabajo en las puntas. El trabajo de los giros se irá desarrollando paulatinamente con el estudio de los giros de posiciones cerradas partiendo de todas las diferentes posiciones básicas y el inicio del trabajo de los giros con traslación" },
        { des: "El 4to año comprende un programa divido en 9 unidades de estudio con un promedio de 40 a 50 pasos a enseñar por cada unidad y con un total de 359 pasos a enseñar en todo el nivel. En este nivel se inicia el estudio de las formas de giros de posiciones abiertas que se caracterizan por ser giros más lentos y controlados. Se seguirá desarrollando los saltos battu con nuevas formas de realización, así como también los saltos en tournant. La clase será más combinada pero siempre teniendo en cuenta que los pasos nuevos que se enseñen de gran dificultad deben trabajarse por separado al enseñarlos, y una vez aprendidos se pueden combinar dentro de los ejercicios, este es uno de los principios de la metodología de enseñanza en la escuela cubana de ballet. En este nivel inicia el trabajo de las variaciones individuales del repertorio clásico en puntas acorde a los pasos enseñados en un 4to nivel de estudio por lo que la clase de ballet estará en función de lograr una mejor coordinación de movimientos, enlace de frases con la utilización de pasos de enlaces, dominio del espacio con la utilización de diseños espaciales como diagonales, líneas, columnas, círculos, etc. Se le irá dando cada vez más importancia a la parte artística siempre fundamentada sobre una buena base técnica" },
        { des: "El 5to año comprende un programa divido en 9 unidades de estudio con un promedio de 40 a 50 pasos a enseñar por cada unidad y con un total de 335 pasos a enseñar en todo el nivel. En este nivel la dinámica de la clase se sigue desarrollando buscando combinaciones de ejercicios más elaborados con alternancias rítmicas y conteos musicales donde los estudiantes tenga un buen dominio de la música y el ritmo. En este nivel inicia el estudio de nuevas formas de giros como los giros suivi que se caracterizan por un gran control, resistencia y trabajo de coordinación de piernas, brazos y cabeza. También se inicia el estudio de una gran familia de saltos fundamental tanto en el baile femenino como masculino que es la familia de los grandes saltos y el correcto uso de pasos de enlace para su enseñanza, así como la utilización de un correcto conteo musical y dominio del espacio. La enseñanza del repertorio clásico se va desarrollando cada vez más con variaciones con un nivel técnico y artístico cada vez más elevado y la clase de ballet deberá estar en función de lograr estos objetivos" },
        { des: "El 6to año comprende un programa divido en 9 unidades de estudio con un promedio de 30 a 40 pasos a enseñar por cada unidad y con un total de 277 pasos a enseñar en todo el nivel. En este nivel se debe de cumplir ciertos criterios físicos, técnicos y artísticos para poder aspirar a cursar los niveles avanzados. Los estudiantes deben haber alcanzado en este nivel un correcto desarrollo técnico que les permita poner más énfasis en la interpretación. La clase de 6to nivel va adquiriendo matices donde se debe observar un exquisito control del cuerpo en ejercicios de adagios y una efervescente dinámica en ejercicios de allegro, así como cuidar la limpieza de los detalles y prestarle gran importancia a los pasos de enlace para que se vea una danza fluida y ligada. En este nivel se sigue desarrollando el estudio de la técnica de los giros de posiciones abiertas, de los giros con traslación y de la gran familia de grandes saltos incorporándose también movimientos en tournant y battu. Las estructuras de ejercicios en este nivel se van haciendo cada vez más complejas con ejercicios donde se combinen de 6 a 8 dificultades técnicas, siempre con una coordinación de pasos coherentes y de una correcta selección musical" },
        { des: "El 7mo año comprende un programa divido en 9 unidades de estudio con un promedio de 30 a 40 pasos a enseñar por cada unidad y con un total de 292 pasos a enseñar en todo el nivel. En este se seguirá desarrollando aún más la familia de grandes giros con múltiples combinaciones de los mismos, tanto el baile femenino como el masculino se caracterizan por la ejecución de diagonales de giros, en manege, giros suivi con repeticiones de 32 giros seguidos como es el caso de los tours fouettes para las chicas o los tours a la seconde para los chicos, los grand pirouettes entre otras formas de giros que hacen de esta técnica un gran desafío para sus intérpretes. La familia de los grandes saltos también se sigue desarrollando, apareciendo en el programa saltos con grandes dificultades tecnicas, exigiéndoles a los bailarines niveles de preparación físico y técnicas cada vez más superiores" },
        { des: "El 8vo nivel comprende un programa divido en 9 unidades de estudio con un promedio de 20 a 30 pasos a enseñar por cada unidad y con un total de 242 pasos a enseñar en todo el nivel. En este nivel donde los estudiantes están próximos a graduarse de bailarines profesionales por lo que todas las dificultades técnicas del programa deben ser vencidas satisfactoriamente. En este nivel los estudiantes deben alcanzar un dominio total de todos los pasos técnicos del programa de enseñanza alcanzando un gran virtuosismo técnico, interpretativo y artístico. Deben también dominar el espacio escénico y la relación entre los bailarines y el público. Al concluir este nivel los estudiantes deben tener experiencia en el trabajo tanto de cuerpo de baile, como de solistas. En este nivel se sigue desarrollando la técnica de giros y saltos, así como la impecable limpieza de los pasos y su sensación de movimientos, haciendo una danza mas estética y limpia. En este nivel se debe alcanzar una gran cohesión entre lo físico, lo técnico y lo artístico pues ya están preparados para salir al mundo laboral" },
    ]

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const resNiveles = await getNiveles('82f45f19-e930-467d-a791-e8bbde2a6b57');
        const newNiveles = resNiveles.map((res) => {
            return {
                ...res,
                isSelect: false
            };
        });
        setNiveles([...newNiveles]);
    }

    function renderNiveles() {
        //ordenar array niveles 
        niveles.sort((a, b) => {
            if (a.order > b.order) {
                return 1;
            }
            if (a.order < b.order) {
                return -1;
            }
            return 0;
        });

        return niveles.map((nivel) => (
            <div key={nivel.id} className="divUnidad-unidadesCompra">
                <h2>{nivel.name}</h2>
                <div className="divPasos-unidadesCompra">
                    <p>{descrip[nivel.order - 1].des}</p>
                </div>
                <div className="divButton-unidadesCompra">
                    {
                        nivel.isSelect ? <button onClick={() => { desSelected(nivel.id) }}>Quitar</button>
                            : <button onClick={() => { selected(nivel.id) }}>Adquirir</button>
                    }
                </div>
            </div>
        ));

    }

    function selected(id) {
        niveles.map((res) => {
            if (res.id === id) {
                res.isSelect = true;
            }
        });
        setNiveles([...niveles]);
        const newNivel = { id: id }
        setSelection([...selection, newNivel]);
    }

    function desSelected(id) {
        niveles.map((res) => {
            if (res.id === id) {
                res.isSelect = false;
            }
        });
        setNiveles([...niveles]);
        //Quitar el id de la lista de selection!!!
        const newNivel = selection.filter((select) => select.id !== id);
        setSelection(newNivel);
    }

    function compra() {
        return (
            <>

                <div className="divPrecio-nivelCompra">
                    <div className="div-compra">
                        {
                            selection.length === 1 ? <p>{selection.length} nevel seleccionado</p>
                                : <p>{selection.length} neveles seleccionados</p>
                        }
                    </div>
                    <div className="div-presioCompra">
                        <img src={eeuuImg} alt="Foto de Estados Unidos" />
                        <strong>${selection.length * 50}</strong>
                        <p>/año</p>
                    </div>
                    <div className="divButtonS-unidadesCompra">
                        <button>Suscribirse</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <main className="main-unidadesCompra">
            <h1>Opciones de Compra</h1>
            <section className="sec-presio">
                {compra()}
            </section>
            <div className="divUnidades-unidadesCompra">
                {renderNiveles()}
            </div>
        </main>
    );


}