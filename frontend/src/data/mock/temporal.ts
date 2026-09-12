import type { TemporalAnalysis } from "@/types";

function hourly(peakHours: number[]): { label: string; accidentShare: number }[] {
  const buckets = ["12-3AM", "3-6AM", "6-9AM", "9-12PM", "12-3PM", "3-6PM", "6-9PM", "9-12AM"];
  return buckets.map((label, idx) => ({
    label,
    accidentShare: peakHours.includes(idx) ? 0.2 + Math.random() * 0.06 : 0.04 + Math.random() * 0.05,
  }));
}

const dayOfWeekDefault = [
  { label: "Mon", accidentShare: 0.13 },
  { label: "Tue", accidentShare: 0.12 },
  { label: "Wed", accidentShare: 0.13 },
  { label: "Thu", accidentShare: 0.14 },
  { label: "Fri", accidentShare: 0.17 },
  { label: "Sat", accidentShare: 0.19 },
  { label: "Sun", accidentShare: 0.12 },
];

export const mockTemporal: Record<string, TemporalAnalysis> = {
  "loc-peelamedu": {
    locationId: "loc-peelamedu",
    peakHourWindow: "7:00 PM - 10:00 PM",
    peakDayType: "Weekend evenings",
    hourly: hourly([6]),
    dayOfWeek: dayOfWeekDefault,
  },
  "loc-rspuram": {
    locationId: "loc-rspuram",
    peakHourWindow: "8:30 AM - 10:00 AM",
    peakDayType: "Weekday mornings",
    hourly: hourly([2]),
    dayOfWeek: dayOfWeekDefault,
  },
  "loc-avinashi": {
    locationId: "loc-avinashi",
    peakHourWindow: "6:00 PM - 8:00 PM",
    peakDayType: "Weekday evenings",
    hourly: hourly([5]),
    dayOfWeek: dayOfWeekDefault,
  },
  "loc-gandhipuram": {
    locationId: "loc-gandhipuram",
    peakHourWindow: "5:30 PM - 7:30 PM",
    peakDayType: "Weekday evenings",
    hourly: hourly([5]),
    dayOfWeek: dayOfWeekDefault,
  },
  "loc-nh47-seg12": {
    locationId: "loc-nh47-seg12",
    peakHourWindow: "10:00 PM - 1:00 AM",
    peakDayType: "Weekend nights",
    hourly: hourly([0]),
    dayOfWeek: dayOfWeekDefault,
  },
  "loc-saibaba": {
    locationId: "loc-saibaba",
    peakHourWindow: "8:00 AM - 9:30 AM",
    peakDayType: "School days",
    hourly: hourly([2]),
    dayOfWeek: dayOfWeekDefault,
  },
  "loc-singanallur": {
    locationId: "loc-singanallur",
    peakHourWindow: "6:00 AM - 8:00 AM",
    peakDayType: "Weekday mornings",
    hourly: hourly([1]),
    dayOfWeek: dayOfWeekDefault,
  },
  "loc-ukkadam": {
    locationId: "loc-ukkadam",
    peakHourWindow: "5:00 PM - 6:30 PM",
    peakDayType: "Weekday evenings",
    hourly: hourly([5]),
    dayOfWeek: dayOfWeekDefault,
  },
};

export function getTemporal(locationId: string): TemporalAnalysis | undefined {
  return mockTemporal[locationId];
}
