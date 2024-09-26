import { useState, useEffect, useRef } from "react"
import { RiCloseCircleFill, RiInstagramLine, RiFacebookCircleFill, RiMenuFill } from "react-icons/ri"
import "./styles.css"

const text_content = {
    ES: {
        title: "Hola mundo",
        change_lang_button: "change language to english"
    },
    EN: {
        title: "Hello world",
        change_lang_button: "cambiar idioma a español"
    }
}

function ImageCard({ img, description, activateImgModal }) {
    return <div className="img_card">
        <img src={img} alt={description} onClick={ () => {activateImgModal(img, description)} }/>
        <p>{ description }</p>
    </div>
}

function ImageModal({ img, description, disarmImgModal }) {

    useEffect(() => {

        document.getElementById("body").classList.add("disable_scrolling")

        return () => {
            document.getElementById("body").classList.remove("disable_scrolling")
        }
    })

    return <div className="dark_overlay" onClick={disarmImgModal}>
        <button onClick={disarmImgModal}><RiCloseCircleFill size="100%" /></button>
        <img src={img} alt="" onClick={(e) => {e.stopPropagation()}}/>
        <p onClick={(e) => {e.stopPropagation()}}>{description}</p>
    </div>
}

export function App() {
    const [lang, setLang] = useState(navigator.language.includes("es") ? "ES" : "EN")
    const [imgModalInfo, setImgModalInfo] = useState({isActive: false, img: null, description: null})
    const sectionRefs = {
        navbar: useRef(),
        home: useRef(),
        services: useRef(),
        quote: useRef(),
        gallery: useRef(),
        contactandmedia: useRef()
    }
    const [isPopUpMenuOpen, setIsPopUpMenuOpen] = useState(false)
    const popUpButtonsContRef = useRef()

    function disarmImgModal() {
        setImgModalInfo({...imgModalInfo, isActive: false})
    }

    function activateImgModal(img, description) {
        setImgModalInfo({isActive: true, img, description})
    }

    function changeLang() {
        setLang(lang === "ES" ? "EN" : "ES")
    }

    function scrollToSection(e, section) {
        e.preventDefault()
        window.scrollTo({
            top: sectionRefs[section].current.offsetTop - sectionRefs.navbar.current.offsetHeight,
            left: 0,
            behavior: "smooth"
        })
    }

    function open_close_menu() {
        popUpButtonsContRef.current.style.opacity = isPopUpMenuOpen ? "0" : "1"
        popUpButtonsContRef.current.style.translate = isPopUpMenuOpen ? "0 -150%" : "0 0"
        setIsPopUpMenuOpen(!isPopUpMenuOpen)
    }

    return <>
        { imgModalInfo.isActive && <ImageModal disarmImgModal={disarmImgModal} img={imgModalInfo.img} description={imgModalInfo.description}/> }
        <section className="presentation_section" id="home" ref={sectionRefs.home}>
            <div className="background_shadow">
                <h1>JHON SOLUTIONS LLC</h1>
                <p>soluciones de cubiertas de alta calidad</p>
            </div>
        </section>
        <nav className="navbar" id="navbar" ref={sectionRefs.navbar}>
            <div className="nav_logo" href="#home" onClick={(e)=>{scrollToSection(e, "home")}}>
                <img src="./logo.png" alt="jhon solutions llc's logo" />
            </div>
            <ul id="wide_navbar_buttons_cont" className="wide_navbar_buttons_cont">
                <a href="#services" onClick={(e)=>{scrollToSection(e, "services")}}><li>Servicios</li></a>
                <a href="#quote" onClick={(e)=>{scrollToSection(e, "quote")}}><li>Cotización gratuita</li></a>
                <a href="#gallery" onClick={(e)=>{scrollToSection(e, "gallery")}}><li>Galería</li></a>
                <a href="#contactandmedia" onClick={(e)=>{scrollToSection(e, "contactandmedia")}}><li>Contacto y redes</li></a>
                <a href="#"><li>Eng/Esp</li></a>
            </ul>

            <button id="pop_up_opener_button" className="pop_up_opener" onClick={open_close_menu}>
                <RiMenuFill color="var(--d_blue)" size="100%" />
            </button>
            <ul id="pop_up_buttons_cont" className="pop_up_buttons_cont" ref={popUpButtonsContRef}>
                <a href="#services" onClick={(e)=>{open_close_menu(); scrollToSection(e, "services")}}><li>Servicios</li></a>
                <a href="#quote" onClick={(e)=>{open_close_menu(); scrollToSection(e, "quote")}}><li>Cotización gratuita</li></a>
                <a href="#gallery" onClick={(e)=>{open_close_menu(); scrollToSection(e, "gallery")}}><li>Galería</li></a>
                <a href="#contactandmedia" onClick={(e)=>{open_close_menu(); scrollToSection(e, "contactandmedia")}}><li>Contacto y redes</li></a>
                <a href="#"><li>Eng/Esp</li></a>
            </ul>
        </nav>
        <section className="page_section" id="about">
            <h2>
                ¿Quienes somos?
            </h2>
            <p>
                Jhon Screen Solutions ofrece una variedad de servicios en el área de fabricación, instalación y reparación de todo tipo de cubiertas (o screens) con una calidad y eficiencia que le permitirá disfrutar rápidamente de un espacio al aire libre sin la molestia de los mosquitos o el fuerte sol.
            </p>
        </section>
        <section className="page_section blue_section" id="services" ref={sectionRefs.services}>
            <h2>
                ¿Qué hacemos?
            </h2>
            <div className="two_parts_container">
                <div>
                    <h3>Instalamos y reparamos:</h3>
                    <ul>
                        <li>Porches de aluminio</li>
                        <li>Cubiertas de piscina</li>
                        <li>Pantallas de terraza <i>(lanai screen)</i></li>
                        <li>Re-screen</li>
                        <li><b>¡Y más!</b> Si alguno de los servicios que requiere no se encuentra en la lista, no dude en preguntarnos por ello</li>
                    </ul>
                </div>
                <img src="./wkimg_1.png" alt="imagen de un trabajo de Jhon Screen Solutions"/>
            </div>
        </section>
        <section className="page_section dark_blue_section" id="quote" ref={sectionRefs.quote}>
            <h2>
                ¿Necesita un estimado?
            </h2>
            <p>
                Puede contactarnos para un estimado totalmente gratuito. Solo llame o escriba al <i><b><a>+1 (407) 460-0238</a></b></i> o envíe un correo a <i><b><a>jhonsolution273@gmail.com</a></b></i>. Con gusto lo atenderemos.
            </p>
        </section>
        <section className="page_section blue_section" id="gallery" ref={sectionRefs.gallery}>
            <h2>Aquí algunas muestras de nuestro trabajo:</h2>

            <div className="img_card_container">
                <ImageCard img="./wkimg_1.png" description="description sample" activateImgModal={activateImgModal}/>

                <ImageCard img="./bg_1.jpg" description="another description sample" activateImgModal={activateImgModal}/>

                <ImageCard img="./wkimg_1.png" description="wuwuwu wuwuwu" activateImgModal={activateImgModal}/>

                <ImageCard img="./bg_1.jpg" description="description sample" activateImgModal={activateImgModal}/>
                
                <ImageCard img="./bg_1.jpg" description="description sample" activateImgModal={activateImgModal}/>

                <ImageCard img="./bg_1.jpg" description="description sample" activateImgModal={activateImgModal}/>
            </div>

        </section>
        <section className="page_section" id="contactandmedia" ref={sectionRefs.contactandmedia}>
            <h2>
                Aquí puedes contactarnos:
            </h2>
            <div className="contact_section">
                <p>
                    <b>Oficina: </b><a>+1 (407) 460-0238</a>
                </p>
                <div>
                    <p><b>Jhonkar Alvarado</b> <i>(gerente general)</i>:</p> <a><p>+1 (352) 995-1956</p></a>
                </div>
                <p style={{border: "none"}}>
                    (sí manejamos SMS y WhatsApp)
                </p>
                <p>
                    <b>E-mail: </b><a>jhonsolution273@gmail.com</a>
                </p>
            </div>

            <h2>
                Nuestras redes sociales:
            </h2>

            <div className="contact_section">
                <div>
                    <div className="social_media_icon_container">
                        <RiInstagramLine size="100%"/>
                        <p><b>Instagram:</b></p>
                    </div>
                    <a><p>@jhonscreensolutions</p></a>
                </div>
                <div>
                    <div className="social_media_icon_container">
                        <RiFacebookCircleFill size="100%"/>
                        <p><b>Facebook:</b></p>
                    </div>
                    <a><p>Jhon Screen Solution</p></a>
                </div>
            </div>
        </section>
        <section className="page_section page_footer">
            <img href="#home" onClick={(e)=>{scrollToSection(e, "home")}} src="./logo.png" />
        </section>
    </>
}
