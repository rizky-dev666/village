import React from "react";

const StatistikCard = ({ title, value, icon, className }) => {
  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex items-center ${className}`}
    >
      <div className="flex-shrink-0 mr-4">
        <div className="bg-green-100 text-green-700 text-2xl p-3 rounded-full">
          {icon}
        </div>
      </div>
      {/* Penambahan kelas 'min-w-0' untuk memperbaiki word wrapping */}
      <div className="min-w-0">
        <h3 className="text-sm text-gray-500 font-medium truncate">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
    </div>
  );
};

export default StatistikCard;
