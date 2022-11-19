import icono from '../img/icon-row-down.png';
//import video1 from '../videos/video1.mp4';
//import video2 from '../videos/video2.mp4';
//import video3 from '../videos/video3.mp4';
//import video4 from '../videos/video4.mp4';
import Carousel from 'react-bootstrap/Carousel';

const Academia = () => { 

    function cargarVideo(url) {
        document.getElementById('slider').src = url;
    }

    return (
        <main className="main-academy">
            <p className="titulo-academy">Academy</p>
            <section className="section-academy">
                <div className="text-academy"><p>La academia online para la enseñanza de la Metodologia Cubana de Ballet tiene como objetivo acercar
                    a maestros de todas partes del mundo al método de enseñanza de la técnica cubana de ballet con su programa de estudio para cada nivel.</p></div>
                <div className="icon-academy">
                    <img src={icono} />
                </div>
                <div className="text-academy"><p>La academia online constituye una importante herramienta teórica y práctica al alcance de los maestros en todas
                    partes del mundo para el análisis y desarrollo del estudio de la tecnica del ballet con una metodología fundamentada por grandes maestros
                    desde su origen hasta la actualidad donde se evidencia su integración con los adelantos cientificos de las últimas épocas, en estudios de
                    la anatomía, de la psicología, del entrenamiento, de la kinesiología, de la pedagogia, entre otros, en función de la creación de un método
                    sólido y bien estructurado. </p></div>
                <div className="icon-academy">
                    <img src={icono} />
                </div>
                <div className="text-academy"><p><strong>Muchos maestros de distintas partes del mundo se han formado bajo el método de enseñanza cubano de ballet
                    obteniendo grandes resultados a nivel internacional.</strong></p></div>
                <p className="subtitle-testimonio-academy">Testimonios de maestros</p>
            </section>
            <div className='div-carrusel'>
                <Carousel className='carrusel' variant="dark">
                    <Carousel.Item className='carrusel-item'>
                        <video controls>
                            <source src='https://firebasestorage.googleapis.com/v0/b/metodologia-ballet.appspot.com/o/videos%2Fvideo1.mp4?alt=media&token=9f28e669-2fcb-48dd-ab3c-493cfe26318f' />
                        </video>
                    </Carousel.Item>
                    <Carousel.Item className='carrusel-item'>
                        <video controls>
                            <source src='https://firebasestorage.googleapis.com/v0/b/metodologia-ballet.appspot.com/o/videos%2Fvideo2.mp4?alt=media&token=267aa748-10eb-438f-8c0b-0eaa6592d613' />
                        </video>
                    </Carousel.Item>
                    <Carousel.Item className='carrusel-item'>
                        <video controls>
                            <source src='https://firebasestorage.googleapis.com/v0/b/metodologia-ballet.appspot.com/o/videos%2Fvideo3.mp4?alt=media&token=d8435660-9d17-4dfc-a23b-c4b09272ce39' />
                        </video>
                    </Carousel.Item>
                    <Carousel.Item className='carrusel-item'>
                        <video controls>
                            <source src='https://firebasestorage.googleapis.com/v0/b/metodologia-ballet.appspot.com/o/videos%2Fvideo4.mp4?alt=media&token=662284e8-1c9f-4cbb-941e-15c1522efa57' />
                        </video>
                    </Carousel.Item>
                </Carousel>
            </div>
        </main>
    );
}

export default Academia;