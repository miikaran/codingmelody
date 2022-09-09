import React from 'react';
import Hero from '../components/sections/LandingPage/Hero'
import Features from '../components/sections/LandingPage/Features'
import Cards from '../components/sections/LandingPage/Cards'
import Navbar from '../components/navigation/Navbar'

export default function LandingPage(){

    return(
        <>
        <Navbar />
        <Hero />
        <Features />
        <Cards />
        </>
    )

}