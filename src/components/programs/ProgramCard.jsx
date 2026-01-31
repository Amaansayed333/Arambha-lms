import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Clock, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProgramCard = ({ program }) => {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow border-t-4 border-t-primary">
            <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary-dark bg-secondary-light/20 px-2 py-1 rounded-sm">
                    {program.category}
                </span>
            </div>
            <h3 className="text-xl font-heading font-bold text-primary mb-2">
                {program.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                {program.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                    <Clock size={14} className="text-secondary" />
                    <span>{program.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                    <BarChart size={14} className="text-secondary" />
                    <span>{program.level}</span>
                </div>
            </div>

            <div className="mt-auto">
                <Link to={`/programs/${program.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                        View Details
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default ProgramCard;
