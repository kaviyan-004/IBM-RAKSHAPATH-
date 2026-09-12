import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export interface ImpactBar {
  label: string;
  value: number;
  highlight?: boolean;
}

export default function ImpactBarChart({ bars }: { bars: ImpactBar[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={bars} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <YAxis type="category" dataKey="label" width={140} tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <Tooltip contentStyle={{ borderRadius: 8, borderColor: "#e2e8f0", fontSize: 13 }} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
          {bars.map((bar, idx) => (
            <Cell key={idx} fill={bar.highlight ? "#4f46e5" : "#94a3b8"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
