import React from 'react';
import { Link } from 'react-router-dom';
import ProgramCard2 from '../programs/ProgramCard2';
import Button from '../ui/Button';
import { programs } from '../../utils/programsData';
import { ArrowRight } from 'lucide-react';

const ProgramsPreview = () => {
    const showcasePrograms = programs.slice(0, 3);

    return (
        <section className="relative py-24 overflow-hidden">

            {/* ===== Background Image ===== */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/discuss_room1.jpeg')"
                }}
            />

            {/* ===== Dark Overlay ===== */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

            {/* ===== Content ===== */}
            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-crimson font-semibold text-sky-200 drop-shadow-lg mb-6 tracking-wide">
                        Popular Programs
                    </h2>
                    <p className="text-xl lg:text-2xl font-crimson text-sky-100 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                        Carefully designed programs to take you from learning 
                        to career-ready with confidence and real-world skills.
                    </p>
                </div>

                {/* ONE CARD PER ROW */}
                <div className="flex flex-col space-y-8 mb-14">
                    {showcasePrograms.map((program) => (
                        <ProgramCard2
                            key={program.id}
                            program={program}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link to="/programs">
                        <Button
                            variant="outline"
                            size="lg"
                            className="gap-2 bg-white/10 backdrop-blur-sm text-white border-white/40 hover:bg-white/20 font-crimson text-lg"
                        >
                            View All Programs <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default ProgramsPreview;
