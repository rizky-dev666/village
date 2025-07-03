import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import dataPembiayaan from "../../components/data/pembiayaanData";

const colors = {
  penerimaan: "#16a34a",
  pengeluaran: "#bbf7d0",
};

const labelMap = {
  penerimaan: "Penerimaan",
  pengeluaran: "Pengeluaran",
};

const getTotal = (arr) =>
  Array.isArray(arr) ? arr.reduce((sum, item) => sum + item.jumlah, 0) : 0;

const PembiayaanChart = ({ tahunDipilih }) => {
  const [expanded, setExpanded] = useState({
    penerimaan: false,
    pengeluaran: false,
  });

  const selectedData = dataPembiayaan.find(
    (item) => item.tahun === tahunDipilih
  );

  const chartData = selectedData
    ? [
        {
          name: "penerimaan",
          value: getTotal(selectedData.rincian.penerimaanPembiayaan),
        },
        {
          name: "pengeluaran",
          value: getTotal(selectedData.rincian.pengeluaranPembiayaan),
        },
      ]
    : [];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(value);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { value, payload: data } = payload[0];
      const label = labelMap[data.name];

      return (
        <div className="bg-white border shadow-md rounded px-3 py-2">
          <p className="text-sm font-medium text-gray-800">{label}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: colors[data.name] }}
            ></span>
            <span className="text-[13px] font-semibold text-gray-800">
              {formatRupiah(value)}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderProgressBar = (key, value, rincian) => {
    const percentage = total ? ((value / total) * 100).toFixed(2) : 0;
    const isExpanded = expanded[key];

    return (
      <div className="mb-4 bg-gray-50 p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-sm font-semibold text-gray-800">
            {labelMap[key]}
          </h3>
          <p className="text-xs text-gray-600">{formatRupiah(value)}</p>
        </div>
        <div className="w-full h-2 mt-2 bg-gray-200 rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: value > 0 ? colors[key] : "#d1d5db",
            }}
          />
          {value > 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-semibold">
              {percentage}%
            </div>
          )}
        </div>

        {rincian.length > 0 && (
          <>
            <button
              className="mt-2 text-[11px] text-green-600 hover:underline focus:outline-none"
              onClick={() =>
                setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
              }
            >
              {isExpanded ? "Sembunyikan rincian" : "Tampilkan rincian"}
            </button>
            <div
              className={`transition-all duration-500 overflow-hidden ${
                isExpanded ? "max-h-96 mt-2" : "max-h-0"
              }`}
            >
              <ul className="text-xs text-gray-700 space-y-1 mt-1">
                {rincian.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b border-dashed border-gray-300 pb-1"
                  >
                    <span>{item.sumber}</span>
                    <span className="font-medium">
                      {formatRupiah(item.jumlah)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-green-600">
          Pembiayaan Desa Tahun {tahunDipilih}
        </h2>
      </div>

      <div className="mb-8 overflow-x-auto">
        <div className="min-w-[300px] md:min-w-full">
          <ResponsiveContainer width="100%" height={420}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 20, left: 80 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fontWeight: 500 }}
                tickFormatter={(key) => labelMap[key]}
                tickMargin={10}
              />
              <YAxis
                tickFormatter={formatRupiah}
                tick={{ fontSize: 12 }}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" barSize={100}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.name]} />
                ))}
                <LabelList
                  dataKey="value"
                  position="top"
                  content={({ value, x, y, width }) => (
                    <text
                      x={x + width / 2}
                      y={y - 6}
                      fill="#333"
                      textAnchor="middle"
                      fontSize={11}
                      fontWeight={600}
                    >
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        notation: "compact",
                        maximumFractionDigits: 1,
                        minimumFractionDigits: 1,
                      }).format(value)}
                    </text>
                  )}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {selectedData && (
        <>
          {renderProgressBar(
            "penerimaan",
            chartData.find((d) => d.name === "penerimaan")?.value || 0,
            selectedData.rincian.penerimaanPembiayaan
          )}
          {renderProgressBar(
            "pengeluaran",
            chartData.find((d) => d.name === "pengeluaran")?.value || 0,
            selectedData.rincian.pengeluaranPembiayaan
          )}
        </>
      )}
    </div>
  );
};

export default PembiayaanChart;
