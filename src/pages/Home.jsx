import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import AboutPreview from '../components/home/AboutPreview';
import ProgramsPreview from '../components/home/ProgramsPreview';

const Home = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Hero />
            <Stats />
            <AboutPreview />
            <ProgramsPreview />
            {/* Additional sections will be added here */}
        </div>
    );
};

export default Home;
