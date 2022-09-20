import React from 'react';
import Hero from '../components/sections/LandingPage/Hero'
import Features from '../components/sections/LandingPage/Features'
import Steps from '../components/sections/LandingPage/Steps'
import About from '../components/sections/LandingPage/About'
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/navigation/Footer'

export default function LandingPage(){

    return(
        <>
        <Navbar />
        <Hero />
        <Features />
        <About />
        <Steps />
        <Footer />
        </>
    )

}