import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import type { LocationWithRisk } from "@/hooks/useLocationsWithRisk";
import { RISK_LEVEL_META } from "@/utils/riskLevel";

interface RiskMapProps {
  locations: LocationWithRisk[];
  selectedId?: string;
  onSelect: (locationId: string) => void;
  center?: [number, number];
}

function FlyToSelected({ locations, selectedId }: { locations: LocationWithRisk[]; selectedId?: string }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    const loc = locations.find((l) => l.locationId === selectedId);
    if (loc) map.flyTo([loc.latitude, loc.longitude], 15, { duration: 0.6 });
  }, [selectedId, locations, map]);
  return null;
}

export default function RiskMap({ locations, selectedId, onSelect, center = [11.0055, 76.9558] }: RiskMapProps) {
  return (
    <MapContainer center={center} zoom={12} className="h-full w-full" scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToSelected locations={locations} selectedId={selectedId} />
      {locations.map((loc) => {
        const meta = RISK_LEVEL_META[loc.risk.level];
        const isSelected = loc.locationId === selectedId;
        return (
          <CircleMarker
            key={loc.locationId}
            center={[loc.latitude, loc.longitude]}
            radius={isSelected ? 14 : 10}
            pathOptions={{
              color: meta.hex,
              fillColor: meta.hex,
              fillOpacity: loc.risk.isEmerging ? 0.5 : 0.85,
              weight: isSelected ? 3 : loc.risk.isEmerging ? 2 : 1,
              dashArray: loc.risk.isEmerging ? "4 3" : undefined,
            }}
            eventHandlers={{ click: () => onSelect(loc.locationId) }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-slate-900">{loc.name}</p>
                <p className="text-slate-500">
                  {loc.district}, {loc.state}
                </p>
                <p className="mt-1">
                  Risk Score: <span className="font-semibold">{loc.risk.score}/100</span> ({meta.label})
                </p>
                {loc.risk.isEmerging && <p className="text-orange-600 font-medium">Emerging risk</p>}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
