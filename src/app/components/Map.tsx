
import { IMap } from "@/types/IMap";
import { Map } from "leaflet";
import { forwardRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export const MapComp = forwardRef<Map, IMap>((props, ref) => {
  const { coords, zoom, scrollWheelZoom, itemName } = props;
  return (
    <MapContainer ref={ref} center={coords} zoom={zoom} scrollWheelZoom={scrollWheelZoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords}>
        <Popup>{itemName}</Popup>
      </Marker>
    </MapContainer>
  );
});