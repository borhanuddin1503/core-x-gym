import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../services/Axios/SecureAxios/useSecureAxios";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
  Line,
  LineChart,
  ComposedChart,
} from "recharts";
import useTheme from "../../../custom hooks/useTheme";

const PaymentChart = () => {
  const secureAxios = useSecureAxios();
  const {theme} = useTheme();

  // Fetch all payments
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await secureAxios.get("all-payments");
      return res.data;
    },
  });

  // Group by month
  const chartData = useMemo(() => { 
    const monthly = {};

    payments.forEach((p) => {
      const date = new Date(p.paidAt);
      const month = date.toLocaleString("default", { month: "short" }); // e.g. "Jan", "Feb"
      if (!monthly[month]) monthly[month] = { month, salesCount: 0, totalRevenue: 0 };
      monthly[month].salesCount += 1;
      monthly[month].totalRevenue += p.price;
    });

    return Object.values(monthly);
  }, [payments]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner text-main"></span>
      </div>
    );

  return (
    <div className={`p-5 rounded-xl shadow-md ${theme === 'dark' && 'border border-gray-500'}`}>
      <h2 className="text-xl font-semibold mb-4 text-center text-main">
        Monthly Sales Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />

          {/* Bar for total revenue */}
          <Bar
            yAxisId="left"
            dataKey="totalRevenue"
            fill="#8884d8"
            name="Revenue ($)"
            barSize={30}
            radius={[6, 6, 0, 0]}
          />

          {/* Line for number of sales */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="salesCount"
            stroke="#82ca9d"
            strokeWidth={2}
            name="Sales Count"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentChart;
