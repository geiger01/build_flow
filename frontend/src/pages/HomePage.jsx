import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundUp } from "react-icons/io";
import { useInView } from "react-intersection-observer"
import { Screen } from "../components/Screen"
import { Header } from "../components/home-page/Header"
import { HowWeWork } from "../components/home-page/HowWeWork";
import { HomePageTemplates } from "../components/home-page/HomePageTemplates";
import { Hero } from "../components/home-page/Hero";


export const HomePage = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isMenuToggled, setIsMenuToggled] = useState(false)


    const [ref, inView] = useInView({
        threshold: 0,
    })

    const onSetWindowWidth = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener("resize", onSetWindowWidth)

        return () => {
            window.removeEventListener('resize', onSetWindowWidth);
        }

    }, [windowWidth])

    const toggleMenu = (boolean) => {
        setIsMenuToggled(boolean)
    }

    return (
        <div className="home-page-container">
            <Screen isOpen={isMenuToggled} exitScreen={toggleMenu} />
            <div ref={ref}>
                <Header isMenuToggled={isMenuToggled} toggleMenu={toggleMenu} />
            </div>
            {!inView && <div className="page-up-container"><IoMdArrowRoundUp onClick={() => window.location.href = '#'} className="page-up" /></div>}
            <Hero windowWidth={windowWidth} />
            <HowWeWork windowWidth={windowWidth} />
            <HomePageTemplates windowWidth={windowWidth} />
        </div>
    )
}



