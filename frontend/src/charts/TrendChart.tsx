import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { RiskForecastPoint } from "@/types";

export default function TrendChart({ series }: { series: RiskForecastPoint[] }) {
  const data = series.map((p) => ({ ...p, range: [p.lowerBound, p.upperBound] as [number, number] }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={data} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <Tooltip
          contentStyle={{ borderRadius: 8, borderColor: "#e2e8f0", fontSize: 13 }}
          formatter={(value: number | [number, number], name: string) =>
            name === "range" ? [`${(value as [number, number])[0]} - ${(value as [number, number])[1]}`, "Uncertainty range"] : [value, "Predicted risk"]
          }
        />
        <Area type="monotone" dataKey="range" stroke="none" fill="#c7d2fe" fillOpacity={0.45} name="range" />
        <Line type="monotone" dataKey="risk" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} name="risk" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
