import React from 'react';

interface ProgressBarProps {
    label: string;
    value: number;
    total: number;
    color: string;
}

export function ProgressBar({ label, value, total, color }: ProgressBarProps) {
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">{label}</span>
                <span className="text-sm font-semibold text-white">{value} ({percentage}%)</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                    }}
                />
            </div>
        </div>
    );
}

interface PieChartProps {
    data: Array<{ label: string; value: number; color: string }>;
}

export function SimplePieChart({ data }: PieChartProps) {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    if (total === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
            </div>
        );
    }

    let currentAngle = 0;

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-64">
            {/* Pie Chart */}
            <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {data.map((item, index) => {
                        const percentage = (item.value / total) * 100;
                        const angle = (percentage / 100) * 360;
                        const startAngle = currentAngle;
                        currentAngle += angle;

                        // Calculate path for pie slice
                        const startX = 50 + 45 * Math.cos((startAngle * Math.PI) / 180);
                        const startY = 50 + 45 * Math.sin((startAngle * Math.PI) / 180);
                        const endX = 50 + 45 * Math.cos((currentAngle * Math.PI) / 180);
                        const endY = 50 + 45 * Math.sin((currentAngle * Math.PI) / 180);
                        const largeArc = angle > 180 ? 1 : 0;

                        return (
                            <path
                                key={index}
                                d={`M 50 50 L ${startX} ${startY} A 45 45 0 ${largeArc} 1 ${endX} ${endY} Z`}
                                fill={item.color}
                                className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                        );
                    })}
                    {/* Center circle for donut effect */}
                    <circle cx="50" cy="50" r="25" fill="#1f2937" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white">{total}</div>
                        <div className="text-xs text-gray-400">Total</div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="space-y-2">
                {data.map((item, index) => {
                    const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
                    return (
                        <div key={index} className="flex items-center space-x-3">
                            <div
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-gray-300 flex-1">{item.label}</span>
                            <span className="text-sm font-semibold text-white">
                                {item.value} ({percentage}%)
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

interface BarChartProps {
    data: Array<{ label: string; value: number }>;
    color?: string;
}

export function SimpleBarChart({ data, color = '#3b82f6' }: BarChartProps) {
    const maxValue = Math.max(...data.map(d => d.value), 1);

    return (
        <div className="h-64 flex items-end justify-around gap-2 px-4">
            {data.map((item, index) => {
                const height = (item.value / maxValue) * 100;
                return (
                    <div key={index} className="flex flex-col items-center flex-1 max-w-[80px]">
                        <div className="text-xs font-semibold text-white mb-2">{item.value}</div>
                        <div
                            className="w-full rounded-t-lg transition-all duration-500 ease-out hover:opacity-80 cursor-pointer"
                            style={{
                                height: `${height}%`,
                                backgroundColor: color,
                                minHeight: item.value > 0 ? '8px' : '0px',
                            }}
                        />
                        <div className="text-xs text-gray-400 mt-2 text-center truncate w-full">
                            {item.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
