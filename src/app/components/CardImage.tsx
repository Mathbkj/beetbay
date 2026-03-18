import { CardImageProps } from "@/types/CardImageProps";
import { Button } from "@/ui/Button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";

export function CardImage({ title, description, imageSrc }: CardImageProps) {
  return (
    <Card className="relative w-[172.8px] bg-[#12121a] max-w-sm pt-0">
      <img
        width={140.8}
        height={140.8}
        src={imageSrc}
        alt="Event cover"
        className="relative my-2 mx-auto object-cover rounded-lg shadow-lg shadow-black dark:brightness-40"
      />
      <CardHeader>
        <CardTitle className="text-white text-lg font-bricolage!">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Mix</Button>
      </CardFooter>
    </Card>
  );
}
