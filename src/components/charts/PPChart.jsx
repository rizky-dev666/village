import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import dataPP from "../data/PP";

const formatLabel = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(value);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-md shadow-md p-3 text-xs sm:text-sm">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="flex items-center justify-between mb-1"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span>{entry.name}</span>
            </div>
            <span className="font-bold">{formatRupiah(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const PPChart = ({ selectedYear }) => {
  const filteredData = dataPP.filter((item) => item.tahun === selectedYear);

  return (
    <div className="bg-white p-4 sm:p-6 mt-8 sm:mt-16 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-4 sm:mb-6 text-center sm:text-left">
        Pendapatan dan Belanja Desa Tahun {selectedYear}
      </h2>
      <div className="w-full h-[300px] sm:h-[400px] md:h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredData}
            margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
            barGap={10}
            barCategoryGap="15%"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tahun" fontSize={12} />
            <YAxis
              tickFormatter={formatRupiah}
              domain={[0, (dataMax) => dataMax * 1.1]}
              width={120}
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ fontSize: "12px" }}
            />
            <Bar
              dataKey="pendapatan"
              fill="#16a34a"
              name="Pendapatan"
              minPointSize={10}
            >
              <LabelList
                dataKey="pendapatan"
                position="top"
                formatter={formatLabel}
                style={{ fontSize: 11 }}
              />
            </Bar>
            <Bar
              dataKey="belanja"
              fill="#bbf7d0"
              name="Belanja"
              minPointSize={10}
            >
              <LabelList
                dataKey="belanja"
                position="top"
                formatter={formatLabel}
                style={{ fontSize: 11 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PPChart;
