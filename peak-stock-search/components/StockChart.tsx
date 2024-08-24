'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function StockChart({ data }: { data: any }) {
  const chartData = data.slice().reverse()
  
  return (
    <div className="bg-darkBlue px-8 sm:pr-8 sm:pl-4 py-8 rounded-xl shadow-xl mt-6 text-lightBlue flex items-start flex-col">
      <h3 className="text-2xl font-bold mb-8 mx-2">Price history</h3>
      <ResponsiveContainer height={300} className="sm:px-0 flex justify-center">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E9F1F2"/>
          <XAxis dataKey="date" stroke="#E9F1F2" dy={12}/>
          <YAxis dataKey="close" stroke="#E9F1F2" dx={-12}/>
          <Tooltip contentStyle={{color: "#e9f1f2", backgroundColor: "#204555", borderRadius: 16, margin: 16}}/>
          <Line type="monotone" dataKey="close" stroke="#70F954" strokeWidth={3} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
