import React from 'react';
import { Clock, BarChart } from 'lucide-react';

const ProgramCard2 = ({ program }) => {
    return (
        <div className="
            bg-white rounded-2xl shadow-sm 
            border border-slate-200 
            border-b-4 border-b-blue-950
            p-6 flex flex-col md:flex-row gap-6
        ">
            {/* ===== LEFT SIDE (35%) ===== */}
            <div className="md:w-[35%]">
                <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-yellow-100 text-yellow-800 rounded">
                    {program.category}
                </span>

                <h3 className="text-xl font-heading font-bold text-slate-900 mb-4">
                    {program.title}
                </h3>

                <div className="flex items-center gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-yellow-600" />
                        <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BarChart size={16} className="text-yellow-600" />
                        <span>{program.level}</span>
                    </div>
                </div>
            </div>

            {/* ===== VERTICAL DIVIDER ===== */}
            <div className="hidden md:block w-px bg-blue-950/80" />

            {/* ===== RIGHT SIDE (65%) ===== */}
            <div className="md:w-[65%] flex items-center">
                <p className="text-slate-600 leading-relaxed text-base">
                    {program.description}
                </p>
            </div>
        </div>
    );
};

export default ProgramCard2;
