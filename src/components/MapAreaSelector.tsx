import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, Polyline, CircleMarker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { Pentagon, Trash2, Check } from "lucide-react";

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapAreaSelectorProps {
  onAreaSelected: (area: any) => void;
}

function MapClickHandler({ isDrawing, onMapClick }: { isDrawing: boolean; onMapClick: (latlng: any) => void }) {
  useMapEvents({
    click: (e) => {
      if (isDrawing) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
}

const MapAreaSelector: React.FC<MapAreaSelectorProps> = ({ onAreaSelected }) => {
  const [mapCenter] = useState<[number, number]>([38.7223, -9.1393]); // Lisbon, Portugal
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<[number, number][]>([]);
  const [polygon, setPolygon] = useState<[number, number][] | null>(null);

  const handleMapClick = (latlng: any) => {
    const { lat, lng } = latlng;
    setPoints([...points, [lat, lng]]);
  };

  const finishDrawing = () => {
    if (points.length < 3) {
      return;
    }
    
    setPolygon([...points]);
    setIsDrawing(false);
    
    // Create GeoJSON
    const coordinates = points.map(p => [p[1], p[0]]);
    coordinates.push(coordinates[0]); // Close the polygon
    
    const geoJSON = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [coordinates]
      }
    };
    onAreaSelected(geoJSON);
    setPoints([]);
  };

  const handleFirstPointClick = (e: any) => {
    L.DomEvent.stopPropagation(e);
    if (points.length >= 3) {
      finishDrawing();
    }
  };

  const clearArea = () => {
    setPolygon(null);
    setPoints([]);
    setIsDrawing(false);
    onAreaSelected(null);
  };

  const startDrawing = () => {
    clearArea();
    setIsDrawing(true);
  };

  const cancelDrawing = () => {
    setPoints([]);
    setIsDrawing(false);
  };

  return (
    <div className="relative">
      <MapContainer
        center={mapCenter}
        zoom={12}
        style={{ height: "600px", width: "100%", cursor: isDrawing ? "crosshair" : "grab" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler isDrawing={isDrawing} onMapClick={handleMapClick} />
        
        {/* Show completed polygon */}
        {polygon && (
          <Polygon
            positions={polygon}
            pathOptions={{ color: '#3b82f6', weight: 2, fillOpacity: 0.2 }}
          />
        )}
        
        {/* Show polygon being drawn */}
        {isDrawing && points.length > 0 && (
          <>
            {points.map((point, idx) => (
              <CircleMarker
                key={idx}
                center={point}
                radius={idx === 0 && points.length >= 3 ? 8 : 5}
                pathOptions={{ 
                  color: idx === 0 && points.length >= 3 ? '#10b981' : '#3b82f6', 
                  fillColor: idx === 0 && points.length >= 3 ? '#10b981' : '#3b82f6', 
                  fillOpacity: 1,
                  weight: idx === 0 && points.length >= 3 ? 3 : 2
                }}
                eventHandlers={idx === 0 ? {
                  click: handleFirstPointClick,
                } : undefined}
              />
            ))}
            {points.length > 1 && (
              <Polyline
                positions={points}
                pathOptions={{ color: '#3b82f6', weight: 2, dashArray: '5, 5' }}
              />
            )}
          </>
        )}
      </MapContainer>
      
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        {!isDrawing && !polygon && (
          <Button
            onClick={startDrawing}
            variant="default"
            size="sm"
            className="shadow-lg"
          >
            <Pentagon className="h-4 w-4 mr-2" />
            Draw Area
          </Button>
        )}
        
        {isDrawing && (
          <>
            <Button
              onClick={finishDrawing}
              variant="default"
              size="sm"
              className="shadow-lg"
              disabled={points.length < 3}
            >
              <Check className="h-4 w-4 mr-2" />
              Finish ({points.length} points)
            </Button>
            <Button
              onClick={cancelDrawing}
              variant="secondary"
              size="sm"
              className="shadow-lg"
            >
              Cancel
            </Button>
          </>
        )}
        
        {polygon && (
          <Button
            onClick={clearArea}
            variant="destructive"
            size="sm"
            className="shadow-lg"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>
      
      {isDrawing && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-card p-3 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-medium mb-1">Drawing polygon</p>
          <p className="text-xs text-muted-foreground">
            {points.length < 3 
              ? `Click on the map to add points. Need at least 3 points (${points.length}/3).`
              : `Click the green dot to finish, or keep adding points.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default MapAreaSelector;
