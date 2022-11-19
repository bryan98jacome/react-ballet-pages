import img from "../img/3 5ta posicion de brazos.JPG";
import fotoPerfil from "../img/docente-ninette-duran.jpg";
import { useState } from "react";

const Niveles = () => {
    const [mostrar, setMostrar] = useState(false);
    const [mostrar2, setMostrar2] = useState(false);
    const [mostrar3, setMostrar3] = useState(false);
    const [mostrar4, setMostrar4] = useState(false);
    const [mostrar5, setMostrar5] = useState(false);
    const [mostrar6, setMostrar6] = useState(false);
    const [mostrar7, setMostrar7] = useState(false);
    const [mostrar8, setMostrar8] = useState(false);


    function textMore1() { setMostrar(!mostrar); }
    function textMore2() { setMostrar2(!mostrar2); }
    function textMore3() { setMostrar3(!mostrar3); }
    function textMore4() { setMostrar4(!mostrar4); }
    function textMore5() { setMostrar5(!mostrar5); }
    function textMore6() { setMostrar6(!mostrar6); }
    function textMore7() { setMostrar7(!mostrar7); }
    function textMore8() { setMostrar8(!mostrar8); }

    return (
        <>
            <main className="main-niveles">
                <div className="div-encabezado">
                    <div className="div-curso">
                        <strong>Metodología Cubana de Ballet</strong>
                    </div>
                    <div className="div-comprar">
                        <div className="cont-button">
                            <strong>Empieza hoy</strong>
                            <p>Dale click a Inscribirse para comenzar con el curso</p>
                            <button>Inscribirse</button>
                        </div>
                    </div>
                </div>
                <div className="div-nav">
                    <a href="#sec-acerca">Acerca de</a>
                    <a href="#sec-niveles">Niveles</a>
                    <a href="#sec-instructor">Instructor</a>
                </div>
                <div className="div-main">
                    <div className="div-aside">
                        <aside>
                            <div className="div-conte">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="currentColor"
                                    className="bi bi-patch-check"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                                    />
                                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                                </svg>
                                <div>
                                    <strong>Certificado</strong>
                                    <p>Obtén un certificado al finalizar</p>
                                </div>
                            </div>
                            <div className="div-conte">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="currentColor"
                                    className="bi bi-globe"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                                </svg>
                                <div>
                                    <strong>Curso 100% en linea</strong>
                                    <p>Comienza de inmediato y aprende a tu propio ritmo</p>
                                </div>
                            </div>
                            <div className="div-conte">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="currentColor"
                                    className="bi bi-calendar2-week"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                </svg>
                                <div>
                                    <strong>Cronograma flexible</strong>
                                    <p>Establece y mantén fechas flexibles</p>
                                </div>
                            </div>
                            <div className="div-conte">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    fill="currentColor"
                                    className="bi bi-clock"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                </svg>
                                <div>
                                    <strong>Aprende a tu tiempo</strong>
                                    <p>Ritmo sugerido de 9 horas/semana</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                    <section className="sec-acerca" id="sec-acerca">
                        <div className="div-cuadro">
                            <strong className="titulo-cuadro">QUÉ APRENDERÁS</strong>
                            <div>
                                <ul>
                                    <li>
                                        <p>
                                            Todos los pasos que se deben enseñar por cada nivel de
                                            estudio con una explicación teórica detallada y los videos
                                            de cada paso en la práctica.
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Los objetivos de cada nivel a tener en cuenta y el conteo
                                            de enseñanza de cada paso.
                                        </p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <p>
                                            Conocerás las estructura, dinámicas y características de
                                            cada clase de ballet por nivel de estudio
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Conocerás la etapas y fases de enseñanza de cada paso así
                                            como los distintas formas de realización de cada paso
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                <div>
                    <div className="div-section">
                        <div className="div-line"><hr color="#C6AAC8" size={1} width="100%" /></div>
                        <section className="sec-niveles" id="sec-niveles">
                            <strong className="titulo">Contenido de niveles</strong>
                            <div className="div-contentNivel">
                                <strong className="subtitulo">Nivel 1</strong>
                                <div className="div-imgtext">
                                    <div className="div-imgMostrar"><img className="img-mostrar" src={img} alt="" /></div>
                                    <div className="div-textMostrar">
                                        {
                                            mostrar == false ?
                                                <ul>
                                                    <li>Conformado por 9 unidades de estudio</li>
                                                    <li>Total de pasos a enseñar: 219 pasos </li>
                                                    <li>20 a 30 pasos por cada unidad</li>
                                                </ul>
                                                :
                                                <p>
                                                    El 1er nivel comprende un programa divido en: 9 unidades de
                                                    estudio con un promedio de 20 a 30 pasos a enseñar por cada
                                                    unidad y con un total de 219 pasos a enseñar en todo el
                                                    nivel. Este primer nivel tiene como objetivo la enseñanza de
                                                    la postura y colocación del cuerpo, piernas, brazos y
                                                    cabeza. En este nivel los estudiantes conocen por primera
                                                    vez los pasos básicos que componen la técnica del ballet,
                                                    por lo que es necesario aplicar un conteo de enseñanza que
                                                    favorezca el desarrollo del movimiento para su correcta
                                                    forma de ejecución y mecanismo de realización, primeramente,
                                                    de las piernas con la utilización de brazos y cabeza en
                                                    posiciones fijas. La dinámica de la clase en un 1er año es
                                                    lenta, controlada, metódica, donde los distintos pasos se
                                                    van a enseñar por separado, inicialmente en 1ra fase, para
                                                    después pasarlo a 2da fase combinándolos en los distintos
                                                    ejercicios donde lo recomendable es utilizar hasta 3
                                                    dificultades técnicas por ejercicio y finalmente realizarlos
                                                    al centro del salón primeramente en posición en face y una
                                                    vez dominado los pasos en centro hacerlos desde las
                                                    posiciones croise, efface o ecarte.
                                                </p>
                                        }
                                        <button class="button-more" onClick={textMore1}>
                                            {
                                                mostrar == false ?
                                                    'Mostrar mas'
                                                    :
                                                    'Mostrar menos'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="div-contentNivel">
                                <strong className="subtitulo">Nivel 2</strong>
                                <div className="div-imgtext">
                                    <div className="div-imgMostrar"><img className="img-mostrar" src={img} alt="" /></div>
                                    <div className="div-textMostrar">
                                        {
                                            mostrar2 == false ?
                                                <ul>
                                                    <li>Conformado por 9 unidades de estudio</li>
                                                    <li>Total de pasos a enseñar: 282 pasos </li>
                                                    <li>30 a 40 pasos por cada unidad</li>
                                                </ul>
                                                :
                                                <p>
                                                    El 2do nivel comprende un programa divido en 9 unidades de
                                                    estudio con un promedio de 30 a 40 pasos a enseñar por cada
                                                    unidad y con un total de 282 pasos a enseñar en todo el
                                                    nivel. En este nivel se irá introduciendo cada vez mas el
                                                    trabajo de la coordinación de piernas, brazos y cabeza donde
                                                    se irán incluyendo port de bras básicos en los distintos
                                                    ejercicios de clases. Otro de los aspectos importantes en el
                                                    2do nivel es el inicio de estudio de la familia de los
                                                    giros, su correcta enseñanza radica en el control y
                                                    equilibrio que van desarrollando los estudiantes desde el
                                                    1er año en las distintas posiciones estudiadas y en las que
                                                    cada vez mas tratarán de desafiar la gravedad para mantener
                                                    el cuerpo alineado y en equilibrio desde el pie apoyado
                                                    completamente en el suelo hasta su realización a releve,
                                                    después con la realización de pasos más complejos como los
                                                    promenade hasta llegar a las etapas de enseñanza de un
                                                    pirouette. La dinámica de la clase se va haciendo cada vez
                                                    más combinada en comparación con la clase de 1er año, una
                                                    vez coordinado los movimientos con la utilización de
                                                    piernas, brazos y cabeza y asimilado por parte de los
                                                    estudiantes, el maestro podrá ir agilizando los conteo de
                                                    ejecución de los pasos así como también la cantidad de pasos
                                                    a combinar con una media de 4 pasos por ejercicio pero
                                                    cuidando siempre la calidad de los movimientos, así
                                                    garantizaremos un trabajo acorde de fuerza y resistencia
                                                    muscular para el nivel. El inicio del estudio de la
                                                    baterías, saltos con giros y el inicio del baile en puntas
                                                    son otros de los objetivos del programa de estudio de este
                                                    nivel.
                                                </p>
                                        }
                                        <button class="button-more" onClick={textMore2}>
                                            {
                                                mostrar == false ?
                                                    'Mostrar mas'
                                                    :
                                                    'Mostrar menos'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div className="div-contentNivel">
                                <strong className="subtitulo">Nivel 3</strong>
                                <div className="div-imgtext">
                                    <div className="div-imgMostrar"><img className="img-mostrar" src={img} alt="" /></div>
                                    <div className="div-textMostrar">
                                        {
                                            mostrar3 == false ?
                                                <ul>
                                                    <li>Conformado por 9 unidades de estudio</li>
                                                    <li>Total de pasos a enseñar: 438 pasos </li>
                                                    <li>40 a 50 pasos por cada unidad</li>
                                                </ul>
                                                :
                                                <p>
                                                    El 3er nivel comprende un programa divido en 9 unidades de
                                                    estudio con un promedio de 40 a 50 pasos a enseñar por cada
                                                    unidad y con un total de 438 pasos a enseñar en todo el
                                                    nivel. En este nivel se seguirá desarrollando aún más la
                                                    coordinación de piernas, brazos y cabeza con ejercicios cada
                                                    vez más combinados donde hasta se pueda utilizar por
                                                    ejercicios de 4 a 5 dificultades técnicas, se irá también
                                                    incrementando la dinámica de los movimientos donde se puedan
                                                    trabajar distintos ritmos dentro de un mismo ejercicio y
                                                    esto se verá reflejado en la clase de allegro donde se sigue
                                                    desarrollando los saltos battu. Será un objetivo fundamental
                                                    en este nivel trabajar dentro de las estructuras de
                                                    ejercicios los cambios de ángulos y dominio del espacio con
                                                    el desarrollo de los pasos en tournant y pasos con
                                                    traslación. La fuerza de piernas se irá incrementando cada
                                                    vez más pues se debe lograr una resistencia de los músculos
                                                    en el trabajo a releve en los ejercicios de barra y centro
                                                    para poder asumir de una forma satisfactoria el trabajo en
                                                    las puntas. El trabajo de los giros se irá desarrollando
                                                    paulatinamente con el estudio de los giros de posiciones
                                                    cerradas partiendo de todas las diferentes posiciones
                                                    básicas y el inicio del trabajo de los giros con traslación.
                                                </p>
                                        }
                                        <button class="button-more" onClick={textMore3}>
                                            {
                                                mostrar == false ?
                                                    'Mostrar mas'
                                                    :
                                                    'Mostrar menos'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="div-contentNivel">
                                <strong className="subtitulo">Nivel 4</strong>
                                <div className="div-imgtext">
                                    <div className="div-imgMostrar"><img className="img-mostrar" src={img} alt="" /></div>
                                    <div className="div-textMostrar">
                                        {
                                            mostrar4 == false ?
                                                <ul>
                                                    <li>Conformado por 9 unidades de estudio</li>
                                                    <li>Total de pasos a enseñar: 359 pasos </li>
                                                    <li>40 a 50 pasos por cada unidad</li>
                                                </ul>
                                                :
                                                <p>
                                                    El 4to año comprende un programa divido en 9 unidades de
                                                    estudio con un promedio de 40 a 50 pasos a enseñar por cada
                                                    unidad y con un total de 359 pasos a enseñar en todo el
                                                    nivel. En este nivel se inicia el estudio de las formas de
                                                    giros de posiciones abiertas que se caracterizan por ser
                                                    giros más lentos y controlados. Se seguirá desarrollando los
                                                    saltos battu con nuevas formas de realización, así como
                                                    también los saltos en tournant. La clase será más combinada
                                                    pero siempre teniendo en cuenta que los pasos nuevos que se
                                                    enseñen de gran dificultad deben trabajarse por separado al
                                                    enseñarlos, y una vez aprendidos se pueden combinar dentro
                                                    de los ejercicios, este es uno de los principios de la
                                                    metodología de enseñanza en la escuela cubana de ballet. En
                                                    este nivel inicia el trabajo de las variaciones individuales
                                                    del repertorio clásico en puntas acorde a los pasos
                                                    enseñados en un 4to nivel de estudio por lo que la clase de
                                                    ballet estará en función de lograr una mejor coordinación de
                                                    movimientos, enlace de frases con la utilización de pasos de
                                                    enlaces, dominio del espacio con la utilización de diseños
                                                    espaciales como diagonales, líneas, columnas, círculos, etc.
                                                    Se le irá dando cada vez más importancia a la parte
                                                    artística siempre fundamentada sobre una buena base técnica.
                                                </p>
                                        }
                                        <button class="button-more" onClick={textMore4}>
                                            {
                                                mostrar == false ?
                                                    'Mostrar mas'
                                                    :
                                                    'Mostrar menos'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="div-contentNivel">
                                <strong className="subtitulo">Nivel 5</strong>
                                <div className="div-imgtext">
                                    <div className="div-imgMostrar"><img className="img-mostrar" src={img} alt="" /></div>
                                    <div className="div-textMostrar">
                                        {
                                            mostrar5 == false ?
                                                <ul>
                                                    <li>Conformado por 9 unidades de estudio</li>
                                                    <li>Total de pasos a enseñar: 335 pasos </li>
                                                    <li>40 a 50 pasos por cada unidad</li>
                                                </ul>
                                                :
                                                <p>
                                                    El 5to año comprende un programa divido en 9 unidades de
                                                    estudio con un promedio de 40 a 50 pasos a enseñar por cada
                                                    unidad y con un total de 335 pasos a enseñar en todo el
                                                    nivel. En este nivel la dinámica de la clase se sigue
                                                    desarrollando buscando combinaciones de ejercicios más
                                                    elaborados con alternancias rítmicas y conteos musicales
                                                    donde los estudiantes tenga un buen dominio de la música y
                                                    el ritmo. En este nivel inicia el estudio de nuevas formas
                                                    de giros como los giros suivi que se caracterizan por un
                                                    gran control, resistencia y trabajo de coordinación de
                                                    piernas, brazos y cabeza. También se inicia el estudio de
                                                    una gran familia de saltos fundamental tanto en el baile
                                                    femenino como masculino que es la familia de los grandes
                                                    saltos y el correcto uso de pasos de enlace para su
                                                    enseñanza, así como la utilización de un correcto conteo
                                                    musical y dominio del espacio. La enseñanza del repertorio
                                                    clásico se va desarrollando cada vez más con variaciones con
                                                    un nivel técnico y artístico cada vez más elevado y la clase
                                                    de ballet deberá estar en función de lograr estos objetivos.
                                                </p>
                                        }
                                        <button class="button-more" onClick={textMore5}>
                                            {
                                                mostrar == false ?
                                                    'Mostrar mas'
                                                    :
                                                    'Mostrar menos'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="div-contentNivel">
                                <strong className="subtitulo">Nivel 6</strong>
                                <div className="div-imgtext">
                                    <div className="div-imgMostrar"><img className="img-mostrar" src={img} alt="" /></div>
                                    <div className="div-textMostrar">
                                        {
                                            mostrar6 == false ?
                                                <ul>
                                                    <li>Conformado por 9 unidades de estudio</li>
                                                    <li>Total de pasos a enseñar: 227 pasos </li>
                                                    <li>30 a 40 pasos por cada unidad</li>
                                                </ul>
                                                :
                                                <p>
                                                    El 6to año comprende un programa divido en 9 unidades de
                                                    estudio con un promedio de 30 a 40 pasos a enseñar por cada
                                                    unidad y con un total de 277 pasos a enseñar en todo el
                                                    nivel. En este nivel se debe de cumplir ciertos criterios
                                                    físicos, técnicos y artísticos para poder aspirar a cursar
                                                    los niveles avanzados. Los estudiantes deben haber alcanzado
                                                    en este nivel un correcto desarrollo técnico que les permita
                                                    poner más énfasis en la interpretación. La clase de 6to
                                                    nivel va adquiriendo matices donde se debe observar un
                                                    exquisito control del cuerpo en ejercicios de adagios y una
                                                    efervescente dinámica en ejercicios de allegro, así como
                                                    cuidar la limpieza de los detalles y prestarle gran
                                                    importancia a los pasos de enlace para que se vea una danza
                                                    fluida y ligada. En este nivel se sigue desarrollando el
                                                    estudio de la técnica de los giros de posiciones abiertas,
                                                    de los giros con traslación y de la gran familia de grandes
                                                    saltos incorporándose también movimientos en tournant y
                                                    battu. Las estructuras de ejercicios en este nivel se van
                                                    haciendo cada vez más complejas con ejercicios donde se
                                                    combinen de 6 a 8 dificultades técnicas, siempre con una
                                                    coordinación de pasos coherentes y de una correcta selección
                                                    musical.
                                                </p>
                                        }
                                        <button class="button-more" onClick={textMore6}>
                                            {
                                                mostrar == false ?
                                                    'Mostrar mas'
                                                    :
                                                    'Mostrar menos'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="div-contentNivel">
                                <strong className="subtitulo">Nivel 7</strong>
                                <div className="div-imgtext">
                                    <div className="div-imgMostrar"><img className="img-mostrar" src={img} alt="" /></div>
                                    <div className="div-textMostrar">
                                        {
                                            mostrar7 == false ?
                                                <ul>
                                                    <li>Conformado por 9 unidades de estudio</li>
                                                    <li>Total de pasos a enseñar: 292 pasos </li>
                                                    <li>30 a 40 pasos por cada unidad</li>
                                                </ul>
                                                :
                                                <p>
                                                    El 7mo año comprende un programa divido en 9 unidades de
                                                    estudio con un promedio de 30 a 40 pasos a enseñar por cada
                                                    unidad y con un total de 292 pasos a enseñar en todo el
                                                    nivel. En este se seguirá desarrollando aún más la familia
                                                    de grandes giros con múltiples combinaciones de los mismos,
                                                    tanto el baile femenino como el masculino se caracterizan
                                                    por la ejecución de diagonales de giros, en manege, giros
                                                    suivi con repeticiones de 32 giros seguidos como es el caso
                                                    de los tours fouettes para las chicas o los tours a la
                                                    seconde para los chicos, los grand pirouettes entre otras
                                                    formas de giros que hacen de esta técnica un gran desafío
                                                    para sus intérpretes. La familia de los grandes saltos
                                                    también se sigue desarrollando, apareciendo en el programa
                                                    saltos con grandes dificultades tecnicas, exigiéndoles a los
                                                    bailarines niveles de preparación físico y técnicas cada vez
                                                    más superiores.
                                                </p>
                                        }
                                        <button class="button-more" onClick={textMore7}>
                                            {
                                                mostrar == false ?
                                                    'Mostrar mas'
                                                    :
                                                    'Mostrar menos'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="div-contentNivel">
                                <strong className="subtitulo">Nivel 8</strong>
                                <div className="div-imgtext">
                                    <div className="div-imgMostrar"><img className="img-mostrar" src={img} alt="" /></div>
                                    <div className="div-textMostrar">
                                        {
                                            mostrar8 == false ?
                                                <ul>
                                                    <li>Conformado por 9 unidades de estudio</li>
                                                    <li>Total de pasos a enseñar: 242 pasos </li>
                                                    <li>20 a 30 pasos por cada unidad</li>
                                                </ul>
                                                :
                                                <p>
                                                    El 8vo nivel comprende un programa divido en 9 unidades de
                                                    estudio con un promedio de 20 a 30 pasos a enseñar por cada
                                                    unidad y con un total de 242 pasos a enseñar en todo el
                                                    nivel. En este nivel donde los estudiantes están próximos a
                                                    graduarse de bailarines profesionales por lo que todas las
                                                    dificultades técnicas del programa deben ser vencidas
                                                    satisfactoriamente. En este nivel los estudiantes deben
                                                    alcanzar un dominio total de todos los pasos técnicos del
                                                    programa de enseñanza alcanzando un gran virtuosismo
                                                    técnico, interpretativo y artístico. Deben también dominar
                                                    el espacio escénico y la relación entre los bailarines y el
                                                    público. Al concluir este nivel los estudiantes deben tener
                                                    experiencia en el trabajo tanto de cuerpo de baile, como de
                                                    solistas. En este nivel se sigue desarrollando la técnica de
                                                    giros y saltos, así como la impecable limpieza de los pasos
                                                    y su sensación de movimientos, haciendo una danza mas
                                                    estética y limpia. En este nivel se debe alcanzar una gran
                                                    cohesión entre lo físico, lo técnico y lo artístico pues ya
                                                    están preparados para salir al mundo laboral.
                                                </p>
                                        }
                                        <button class="button-more" onClick={textMore8}>
                                            {
                                                mostrar == false ?
                                                    'Mostrar mas'
                                                    :
                                                    'Mostrar menos'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="div-line"><hr color="#C6AAC8" size={1} width="100%" /></div>

                            <section className="sec-instructor" id="sec-instructor">
                                <strong className="titulo">Instructor</strong>
                                <div className="div-instructor">
                                    <img
                                        src={fotoPerfil}
                                        alt="Docente Ninette Durán"
                                        width="145"
                                        height="145"
                                    />
                                    <p>
                                        <strong>Docente Ninette Durán</strong>
                                        <br />
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Minima, accusantium. Lorem ipsmet Lorem ipsum dolor sit..
                                    </p>
                                </div>
                            </section>
                        </section>
                    </div>
                </div>
            </main >
            <script type="../js/textMore.js"></script>
        </>
    );
};
export default Niveles;