import React from 'react';
import { Link } from 'react-router-dom';
import ProgramCard2 from '../programs/ProgramCard2';
import Button from '../ui/Button';
import { programs } from '../../utils/programsData';
import { ArrowRight } from 'lucide-react';

const ProgramsPreview = () => {
    const showcasePrograms = programs.slice(0, 3);

    return (
        <section className="py-20 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 mb-4">
                        Popular Programs
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Carefully designed programs to take you from learning to career-ready.
                    </p>
                </div>

                {/* ONE CARD PER ROW */}
                <div className="flex flex-col space-y-6 mb-12">
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
