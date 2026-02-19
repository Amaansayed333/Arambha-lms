import React from 'react';
import { Clock, BarChart } from 'lucide-react';

const ProgramCard2 = ({ program }) => {
    return (
        <div className="
            bg-white rounded-2xl shadow-sm 
            border border-slate-200 
            border-b-4 border-b-blue-950
            p-8 flex flex-col md:flex-row gap-8
        ">
            {/* ===== LEFT SIDE (35%) ===== */}
            <div className="md:w-[35%]">
                <span className="inline-block mb-4 px-4 py-1.5 text-sm font-semibold tracking-wide uppercase bg-yellow-100 text-yellow-800 rounded font-crimson">
                    {program.category}
                </span>

                <h3 className="text-2xl md:text-2xl font-crimson font-semibold text-slate-900 mb-5 leading-snug">
                    {program.title}
                </h3>

                <div className="flex items-center gap-8 text-base text-slate-700 font-crimson">
                    <div className="flex items-center gap-2">
                        <Clock size={18} className="text-yellow-600" />
                        <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BarChart size={18} className="text-yellow-600" />
                        <span>{program.level}</span>
                    </div>
                </div>
            </div>

            {/* ===== VERTICAL DIVIDER ===== */}
            <div className="hidden md:block w-px bg-blue-950/80" />

            {/* ===== RIGHT SIDE (65%) ===== */}
            <div className="md:w-[65%] flex items-center">
                <p className="text-lg md:text-[24px] text-slate-700 leading-relaxed font-crimson">
                    {program.description}
                </p>
            </div>
        </div>
    );
};

export default ProgramCard2;
