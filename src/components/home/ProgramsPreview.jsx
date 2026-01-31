import React from 'react';
import { Link } from 'react-router-dom';
import ProgramCard from '../programs/ProgramCard';
import Button from '../ui/Button';
import { programs } from '../../utils/programsData';
import { ArrowRight } from 'lucide-react';

const ProgramsPreview = () => {
    // Show top 3 programs
    const showcasePrograms = programs.slice(0, 3);

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">
                        Popular Programs
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join thousands of students learning in-demand skills.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {showcasePrograms.map((program) => (
                        <ProgramCard key={program.id} program={program} />
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/programs">
                        <Button variant="outline" size="lg" className="gap-2">
                            View All Programs <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProgramsPreview;
