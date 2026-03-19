import { getUserFromServer } from "@/storage/getUserFromServer";
import { Route } from "../routes/+types/Favorites";
import { toast } from "sonner";
import { IAPIResponse } from "@/types/IAPIResponse";

export async function loader({ request }: Route.LoaderArgs) {
  const { email } = getUserFromServer(request);
  const response = await fetch(
    `http://localhost:3000/api/favorite-songs/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) {
    const data: IAPIResponse = await response.json();
    toast.error(data.message);
  }
  const data: IAPIResponse = await response.json();
  return { favoriteSongs: data.favoriteSongs || [] };
}

export default function Favorites({ loaderData }: Route.ComponentProps) {
  const { favoriteSongs } = loaderData;
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-6">
        Your Favorite Songs
      </h1>
      <div className="flex flex-col gap-6">
        {/* Example favorite song card */}
        {favoriteSongs.map((song, index) => {
          return (
            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
              <img
                src={song.imgSrc}
                alt="Song Cover"
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-white">
                  {song.title}
                </span>
                <span className="text-sm text-white/60">{song.artist}</span>
              </div>
              <button className="ml-auto bg-primary text-white px-4 py-2 rounded-lg">
                Play
              </button>
            </div>
          );
        })}
        {/* Repeat for more songs */}
      </div>
    </div>
  );
}
