import React, { useState } from 'react';

interface DataPoint {
    month: string;
    margin: number;
    cost: number;
}

const MarginEvolutionGraph: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Mock data: 6 month projection
    const data: DataPoint[] = [
        { month: 'M1', margin: 80000, cost: 7000 },
        { month: 'M2', margin: 50000, cost: 7000 },
        { month: 'M3', margin: 100000, cost: 7000 },
        { month: 'M4', margin: 90000, cost: 7000 },
        { month: 'M5', margin: 110000, cost: 7000 },
        { month: 'M6', margin: 120000, cost: 7000 },
    ];

    // Calculate Totals
    const totalMargin = data.reduce((acc, curr) => acc + curr.margin, 0);
    const totalCost = data.reduce((acc, curr) => acc + curr.cost, 0);

    // Chart Dimensions
    const maxVal = 140000; // Capped for visual breathing room
    const height = 150; // Shorter, more abstract
    const width = 600;
    const padding = { top: 20, right: 0, bottom: 0, left: 0 }; // No axis padding needed for abstract view

    const chartWidth = width;
    const chartHeight = height - padding.top;

    const barWidth = 60;
    const gap = (chartWidth - (data.length * barWidth)) / (data.length + 1);

    const getY = (val: number) => chartHeight - (val / maxVal) * chartHeight;

    return (
        <div className="w-full bg-orange-50/50 rounded-2xl border border-orange-100 overflow-hidden transition-all duration-300">
            {/* Header / Summary Section (Always Visible) */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-orange-50 transition-colors cursor-pointer text-left group"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-orange-100 p-2.5 rounded-full text-orange-600 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                            6-Month Projection
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-gray-900">
                                +€{(totalMargin / 1000).toFixed(0)}k
                            </span>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                Net Margin
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                        <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                            Total Investment
                        </div>
                        <div className="text-sm font-semibold text-gray-700">
                            €{(totalCost / 1000).toFixed(0)}k
                        </div>
                    </div>

                    {/* Chevron */}
                    <div className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </button>

            {/* Expanded Graph Section */}
            <div
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isExpanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-5 pb-6 pt-2">
                    <p className="text-xs text-gray-400 mb-4 text-center">
                        Monthly Net Margin (Green) vs Fixed Bundle Cost (Red Line)
                    </p>

                    <div className="w-full h-[150px]">
                        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                            <defs>
                                <linearGradient id="abstractGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#fb923c" stopOpacity="0.9" /> {/* orange-400 */}
                                    <stop offset="100%" stopColor="#fdba74" stopOpacity="0.6" /> {/* orange-300 */}
                                </linearGradient>
                            </defs>

                            {/* Bars */}
                            {data.map((d, i) => {
                                const x = gap + i * (barWidth + gap);
                                const barHeight = (d.margin / maxVal) * chartHeight;
                                const y = padding.top + chartHeight - barHeight;

                                return (
                                    <g key={i} className="group/bar">
                                        <rect
                                            x={x}
                                            y={y}
                                            width={barWidth}
                                            height={barHeight}
                                            rx="6"
                                            fill="url(#abstractGradient)"
                                            className="transition-all duration-300 hover:opacity-80"
                                        />
                                        {/* Floating Value Label */}
                                        <text
                                            x={x + barWidth / 2}
                                            y={y - 8}
                                            textAnchor="middle"
                                            className="text-[10px] font-bold fill-orange-600 opacity-0 group-hover/bar:opacity-100 transition-opacity"
                                        >
                                            €{(d.margin / 1000).toFixed(0)}k
                                        </text>
                                    </g>
                                )
                            })}

                            {/* Cost Line (Subtle) */}
                            {(() => {
                                const costY = padding.top + getY(7000);
                                return (
                                    <line
                                        x1={0}
                                        y1={costY}
                                        x2={width}
                                        y2={costY}
                                        stroke="#ef4444"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                        opacity="0.5"
                                    />
                                );
                            })()}
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarginEvolutionGraph;
