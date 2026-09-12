import { RISK_LEVEL_META, scoreToLevel } from "@/utils/riskLevel";

export default function RiskGauge({ score, size = 96 }: { score: number; size?: number }) {
  const level = scoreToLevel(score);
  const meta = RISK_LEVEL_META[level];
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e2e8f0" strokeWidth={10} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={meta.hex}
          strokeWidth={10}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">{score}</span>
        <span className="text-[10px] text-slate-400">/ 100</span>
      </div>
    </div>
  );
}
