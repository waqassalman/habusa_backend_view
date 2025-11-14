import React, { useEffect, useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CategoryRadarChart = ({ products }) => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const grouped = {};

      // Group and count products by category name
      products.forEach((product) => {
        const catName = product.category_id?.name || "Unknown";
        grouped[catName] = (grouped[catName] || 0) + 1;
      });

      // Convert object → array
      const chartData = Object.entries(grouped).map(([category, count]) => ({
        category,
        count,
      }));

      setCategoryData(chartData);
    }
  }, [products]);

  return (
    <div className="w-full h-[400px] bg-white rounded-xl shadow p-4">
      {categoryData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={categoryData}s>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis fillOpacity={0.5} angle={90} domain={[0, Math.max(...categoryData.map(d => d.count))]} />
            <Radar
              name="Product Count"
              dataKey="count"
              stroke="#2563eb"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default CategoryRadarChart;
