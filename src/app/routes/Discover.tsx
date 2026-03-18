import { CardImage } from "@/components/CardImage";
import { Route } from "../routes/+types/Discover";
import { CardImageProps } from "@/types/CardImageProps";
import { Button } from "@/ui/Button";
import { PlayCircle } from "lucide-react";

export async function loader() {
  const mockMixes: CardImageProps[] = [
    {
      title: "Daily_Mix_01",
      description: "Artist 1, Artist 2, Artist 3 and more",
      imageSrc: "/assets/discover-1.png",
    },
    {
      title: "Daily_Mix_02",
      description: "Artist 4, Artist 5, Artist 6 and more",
      imageSrc: "/assets/discover-2.png",
    },
  ];
  return { mockMixes };
}

export default function Discover({ loaderData }: Route.ComponentProps) {
  const { mockMixes } = loaderData;
  return (
    <div className="flex flex-col gap-12 max-w-fit mx-auto mt-4">
      <section className="relative rounded-2xl overflow-hidden w-240 h-90">
        <img
          src="/assets/h-discover.png"
          className="absolute object-cover z-0 size-full"
        />
        <div className="relative flex z-10 justify-between p-10 items-end w-full h-fit">
          <div className="flex flex-col gap-3 max-w-fit">
            <div className="w-full">
              <span>
                <span className="text-lime-400 text-sm">CURATED SEQUENCE</span>{" "}
                | 0X9A
              </span>
            </div>
            <div className="w-full">
              <h1 className="text-8xl font-bricolage!">
                Algorithmic Awakening
              </h1>
            </div>
            <div className="max-w-sm">
              <span>
                Your personal audio DNA parsed into 50 tracks of pure synthetic
                bliss.
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="size-16">
            <PlayCircle size={24} />
          </Button>
        </div>
      </section>
      <section className="flex flex-col gap-6 w-240 h-90">
        <div className="w-full">
          <div className="w-full flex gap-6">
            {mockMixes.map((mix, index) => (
              <CardImage key={index} {...mix} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
