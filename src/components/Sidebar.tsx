import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { capitalizeText } from "../utils";
import {
  Home,
  Compass,
  Radio,
  Music,
  Mic,
  Clock,
  Star,
  Folder,
  Plus,
  List,
  LogOut,
  ChevronDown,
  User,
  CreditCard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { Button } from "@/ui/Button";

interface SidebarLeftProps {
  position: "left";
  currentPage: "home" | "discover" | "radio" | "albums" | "podcast";
}

interface SidebarRightProps {
  position: "right";
}

type SidebarProps = SidebarLeftProps | SidebarRightProps;

export default function Sidebar(props: SidebarProps) {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    logout();
  };

  if (props.position === "left") {
    return (
      <aside className="fixed left-0 top-0 flex flex-col gap-2.5 p-8 h-screen w-67.5 text-white z-10 bg-dark">
        <img
          width="123"
          height="48"
          src="/assets/logo.svg"
          alt="BeatBay Logo"
        />
        <ul className="list-none font-semibold">
          <li className="h-12">
            <Link
              to="/dashboard"
              aria-current={props.currentPage === "home" ? "page" : undefined}
              className="flex gap-4 no-underline p-2.5 text-white brightness-50 hover:brightness-100 aria-[current=page]:brightness-100 aria-[current=page]:bg-white/5 aria-[current=page]:border-r-[6px] aria-[current=page]:border-primary [&>svg]:text-primary"
            >
              <Home size={18} />
              Home
            </Link>
          </li>
          <li className="h-12">
            <Link
              to="/discover"
              aria-current={
                props.currentPage === "discover" ? "page" : undefined
              }
              className="flex gap-4 no-underline p-2.5 text-white brightness-50 hover:brightness-100 aria-[current=page]:brightness-100 aria-[current=page]:bg-white/5 aria-[current=page]:border-r-[6px] aria-[current=page]:border-primary [&>svg]:text-primary"
            >
              <Compass size={18} />
              Discover
            </Link>
          </li>
          <li className="h-12">
            <Link
              to="/radio"
              aria-current={props.currentPage === "radio" ? "page" : undefined}
              className="flex gap-4 no-underline p-2.5 text-white brightness-50 hover:brightness-100 aria-[current=page]:brightness-100 aria-[current=page]:bg-white/5 aria-[current=page]:border-r-[6px] aria-[current=page]:border-primary [&>svg]:text-primary"
            >
              <Radio size={18} />
              Radio
            </Link>
          </li>
          <li className="h-12">
            <Link
              to="/albums"
              aria-current={props.currentPage === "albums" ? "page" : undefined}
              className="flex gap-4 no-underline p-2.5 text-white brightness-50 hover:brightness-100 aria-[current=page]:brightness-100 aria-[current=page]:bg-white/5 aria-[current=page]:border-r-[6px] aria-[current=page]:border-primary [&>svg]:text-primary"
            >
              <Music size={18} />
              Albums
            </Link>
          </li>
          <li className="h-12">
            <Link
              to="/podcast"
              aria-current={
                props.currentPage === "podcast" ? "page" : undefined
              }
              className="flex gap-4 no-underline p-2.5 text-white brightness-50 hover:brightness-100 aria-[current=page]:brightness-100 aria-[current=page]:bg-white/5 aria-[current=page]:border-r-[6px] aria-[current=page]:border-primary [&>svg]:text-primary"
            >
              <Mic size={18} />
              Podcast
            </Link>
          </li>
        </ul>
        <h2 className="text-xs font-bold text-gray uppercase">LIBRARY</h2>
        <ul className="list-none font-medium">
          <li className="h-12">
            <Link
              to="/recently-added"
              className="flex gap-4 no-underline p-2.5 text-white brightness-50 hover:brightness-100 [&>svg]:text-primary"
            >
              <Clock size={18} />
              Recently Added
            </Link>
          </li>
          <li className="h-12">
            <Link
              to="/favorite-songs"
              className="flex gap-4 no-underline p-2.5 text-white brightness-50 hover:brightness-100 [&>svg]:text-primary"
            >
              <Star size={18} />
              Favorite Songs
            </Link>
          </li>
          <li className="h-12">
            <Link
              to="/local-files"
              className="flex gap-4 no-underline p-2.5 text-white brightness-50 hover:brightness-100 [&>svg]:text-primary"
            >
              <Folder size={18} />
              Local Files
            </Link>
          </li>
        </ul>
        <h2 className="text-xs font-bold text-gray uppercase flex items-center gap-2">
          PLAYLIST
          <Plus size={18} className="cursor-pointer hover:text-primary" />
        </h2>
        <ul className="list-none font-medium">
          <li className="h-12">
            <Link
              to="/playlist/1"
              className="flex gap-4 no-underline p-2.5 text-white brightness-50 hover:brightness-100 [&>svg]:text-primary"
            >
              <List size={18} />
              My Playlist #1
            </Link>
          </li>
          <li className="h-12">
            <Link
              to="/playlist/2"
              className="flex gap-4 no-underline p-2.5 text-white brightness-50 hover:brightness-100 [&>svg]:text-primary"
            >
              <List size={18} />
              My Playlist #2
            </Link>
          </li>
          <li className="h-12">
            <Link
              to="/playlist/3"
              className="flex gap-4 no-underline p-2.5 text-white brightness-50 hover:brightness-100 [&>svg]:text-primary"
            >
              <List size={18} />
              My Playlist #3
            </Link>
          </li>
        </ul>
        <div className="mt-auto">
          <button
            className="w-full text-left flex justify-between brightness-50 p-4 text-white bg-transparent border-none hover:brightness-100 hover:bg-black/10"
            onClick={handleLogout}
          >
            Log Out <LogOut size={18} />
          </button>
        </div>
      </aside>
    );
  }

  // Right sidebar
  return (
    <aside className="fixed right-0 top-0 flex flex-col gap-9 p-8 h-screen w-67.5 text-white z-10 bg-dark overflow-y-auto">
      <section className="flex justify-between gap-4 items-center text-white hover:bg-black/20">
        <div className="flex items-center gap-4 min-w-0">
          <img
            width="48"
            height="48"
            src="/assets/person.png"
            alt="Profile"
            className="rounded-full shrink-0"
          />
          <div className="flex flex-col gap-1 min-w-0">
            <p className="font-semibold truncate">{user?.email}</p>
            <span className="text-xs font-normal text-gray opacity-80">
              {capitalizeText(user?.tier ?? "")}
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon">
              <ChevronDown size={24} className="shrink-0 cursor-pointer" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={() => console.log("Redirecting to user page")}
            >
              <User size={24} />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard size={24} />
              Billing
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <section className="splide" aria-label="Recommended Artists For You">
        <div className="splide__track">
          <Splide>
            <SplideSlide>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  width="234"
                  height="234"
                  src="/assets/artist-1.png"
                  alt="James Arthur"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full flex flex-col bg-black/50 p-4 gap-1">
                  <span className="text-sm">James Arthur</span>
                  <span className="text-xs text-white/40">Artist</span>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  width="234"
                  height="234"
                  src="/assets/cover-3.png"
                  alt="Meghan Trainor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full flex flex-col bg-black/50 p-4 gap-1">
                  <span className="text-sm">Meghan Trainor</span>
                  <span className="text-xs text-white/40">Artist</span>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  width="234"
                  height="234"
                  src="/assets/cover-2.png"
                  alt="Unknown Artist"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full flex flex-col bg-black/50 p-4 gap-1">
                  <span className="text-xs">Unknown Artist</span>
                  <span className="text-xs text-white/40">Artist</span>
                </div>
              </div>
            </SplideSlide>
          </Splide>
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-4 justify-center items-start">
          <div className="flex w-full justify-between items-center">
            <b className="text-lg">Recently Played</b>
            <button className="font-semibold text-primary hover:text-lighter">
              See All
            </button>
          </div>
          <div className="flex w-full flex-col gap-5">
            {/* Recently played will be populated here */}
          </div>
        </div>
      </section>
    </aside>
  );
}
