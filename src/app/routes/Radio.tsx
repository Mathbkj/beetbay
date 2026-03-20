import type {Route} from "../routes/+types/Radio";
import { MapComp } from "@/components/Map";
import { IAPIResponse } from "@/types/IAPIResponse";
import { Map } from "leaflet";
import { useRef } from "react";

export async function clientLoader(){
    const response = await fetch("http://localhost:3000/api/stations");
    if(!response.ok) throw new Error("Failed to fetch radio stations");
    const data:IAPIResponse = await response.json();
    return {stations:data.stations || []}
}

export default function Radio({loaderData}:Route.ComponentProps){
    const {stations} = loaderData;
    const mapRef = useRef<Map>(null);
    if(!mapRef.current) return <div>Loading map...</div>;
    return <MapComp ref={mapRef} coords={[stations[0].geoLat, stations[0].geoLong]} zoom={13} scrollWheelZoom={true} itemName={stations[0]?.name || "Unnamed Station"} />

}