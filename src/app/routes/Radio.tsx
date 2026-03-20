import type { Route } from "../routes/+types/Radio";
import { Link } from "react-router";
import { IAPIResponse } from "@/types/IAPIResponse";
import { Map } from "leaflet";
import { useRef } from "react";

export async function clientLoader() {
  const response = await fetch("http://localhost:3000/api/stations");
  if (!response.ok) throw new Error("Failed to fetch radio stations");
  const data: IAPIResponse = await response.json();
  return { stations: data.stations || [] };
}

export default function Radio({ loaderData }: Route.ComponentProps) {
  const { stations } = loaderData;
  const mapRef = useRef<Map>(null);

  if (!stations || stations.length === 0) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-2xl text-gray-500">
        No radio stations found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-center text-4xl mb-10 text-gray-900 font-bold">
        Radio Stations
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stations.map((station, idx) => (
          <div
            key={idx}
            className=" rounded-2xl shadow-lg p-6 flex flex-col items-center min-h-105"
          >
            <h2 className="text-2xl mb-3 text-green-600 font-semibold">
              {station.name}
            </h2>
            <div className="text-base mb-4 text-white flex flex-wrap gap-x-4 gap-y-1">
              <span>
                <strong>Country:</strong> {station.country}
              </span>
              <span>
                <strong>Language:</strong> {station.language}
              </span>
              <span>
                <strong>Codec:</strong> {station.codec}
              </span>
              <span>
                <strong>Bitrate:</strong> {station.bitrate}
              </span>
            </div>
            <Link
              to={station.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              Listen Live
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
