import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import AboutPreview from '../components/home/AboutPreview';
import ProgramsPreview from '../components/home/ProgramsPreview';
import LevelTestPopup from "../components/home/LevelTestPopup";

const Home = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <Stats />
            <AboutPreview />
            <ProgramsPreview />
            <LevelTestPopup />
            {/* Additional sections will be added here */}
        </div>
    );
};

export default Home;
