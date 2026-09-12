import type { CauseFingerprint } from "@/types";

export const mockCauseFingerprints: Record<string, CauseFingerprint> = {
  "loc-peelamedu": {
    locationId: "loc-peelamedu",
    riskScore: 87,
    topFactors: [
      { factor: "Poor night-time lighting", contributionPoints: 18.4, description: "Illumination surveys show sub-standard lux levels along the junction approach after sunset." },
      { factor: "High-severity accident history", contributionPoints: 14.2, description: "Fatality-to-accident ratio at this junction exceeds the district median." },
      { factor: "Two-wheeler involvement (62%)", contributionPoints: 11.0, description: "Majority of recorded accidents involve two-wheeler riders." },
      { factor: "Unsignalized complex geometry", contributionPoints: 9.3, description: "Multi-approach junction without coordinated signal phasing." },
      { factor: "Monsoon waterlogging", contributionPoints: 6.1, description: "Recurring waterlogging reduces effective carriageway width in the monsoon months." },
    ],
    note: "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
  },
  "loc-rspuram": {
    locationId: "loc-rspuram",
    riskScore: 82,
    topFactors: [
      { factor: "Over-speeding on approach", contributionPoints: 16.7, description: "Observed speeds exceed the posted limit on the eastern approach during morning peak." },
      { factor: "Pedestrian conflict volume", contributionPoints: 13.5, description: "High pedestrian crossing volume without a dedicated refuge island." },
      { factor: "On-street parking obstruction", contributionPoints: 8.9, description: "Informal parking reduces sightlines near the crossing." },
      { factor: "Peak-hour congestion", contributionPoints: 7.4, description: "Morning congestion correlates with a higher share of rear-end collisions." },
    ],
    note: "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
  },
  "loc-avinashi": {
    locationId: "loc-avinashi",
    riskScore: 78,
    topFactors: [
      { factor: "Heavy vehicle mix on corridor", contributionPoints: 15.1, description: "Freight and heavy-vehicle share is elevated compared to similar corridors." },
      { factor: "Unsafe lateral merging", contributionPoints: 12.3, description: "Multiple uncontrolled access points along the corridor." },
      { factor: "Excessive corridor speed", contributionPoints: 10.6, description: "Wide carriageway encourages higher travel speeds than posted limits." },
    ],
    note: "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
  },
  "loc-gandhipuram": {
    locationId: "loc-gandhipuram",
    riskScore: 74,
    topFactors: [
      { factor: "Commercial-hub pedestrian density", contributionPoints: 13.8, description: "Retail frontage draws high foot traffic across the carriageway." },
      { factor: "Bus-stop conflict points", contributionPoints: 10.2, description: "Bus boarding/alighting close to the intersection stop line." },
      { factor: "Rising accident trend (2021-2024)", contributionPoints: 9.0, description: "Accident count has increased year-over-year for the last three observed years." },
    ],
    note: "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
  },
  "loc-nh47-seg12": {
    locationId: "loc-nh47-seg12",
    riskScore: 71,
    topFactors: [
      { factor: "Night-time high-speed corridor", contributionPoints: 14.9, description: "Majority of severe accidents occur between 10 PM and 1 AM." },
      { factor: "Insufficient median separation", contributionPoints: 11.4, description: "Sections of the highway lack a physical median barrier." },
      { factor: "Sparse street lighting on rural stretch", contributionPoints: 8.2, description: "Extended unlit segments reduce hazard-perception distance." },
    ],
    note: "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
  },
  "loc-saibaba": {
    locationId: "loc-saibaba",
    riskScore: 52,
    topFactors: [
      { factor: "School-zone morning congestion", contributionPoints: 9.1, description: "Concentrated drop-off activity increases conflict during the morning window." },
      { factor: "Faded lane markings", contributionPoints: 6.4, description: "Lane discipline drops where markings have worn down." },
    ],
    note: "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
  },
  "loc-singanallur": {
    locationId: "loc-singanallur",
    riskScore: 45,
    topFactors: [
      { factor: "Industrial heavy-vehicle turning movements", contributionPoints: 7.8, description: "Frequent truck turning movements near factory access roads." },
      { factor: "Low data coverage", contributionPoints: 4.0, description: "Limited historical records reduce confidence in this fingerprint." },
    ],
    note: "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
  },
  "loc-ukkadam": {
    locationId: "loc-ukkadam",
    riskScore: 22,
    topFactors: [
      { factor: "Transit-hub pedestrian crossings", contributionPoints: 5.2, description: "Bus-stand foot traffic creates minor, low-severity conflict points." },
    ],
    note: "These are model-associated contributing factors, not proven causal effects. Field verification is recommended before capital allocation.",
  },
};

export function getCauseFingerprint(locationId: string): CauseFingerprint | undefined {
  return mockCauseFingerprints[locationId];
}
