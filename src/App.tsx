import React from 'react';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueBlock from './components/ValueBlock';
import ProcessBlock from './components/ProcessBlock';
import Doctors from './components/Doctors';
import ClinicalExpertise from './components/Directions';
import TrustBlock from './components/WhyDifferent';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-white selection:bg-[#007f94] selection:text-white">
            <Navbar />
            <main>
                <Hero />
                <ValueBlock />
                <ProcessBlock />
                <TrustBlock />
                <Doctors />
                <ClinicalExpertise />
                <ContactForm />
            </main>
            <Footer />


        </div>
    );
}

export default App;
