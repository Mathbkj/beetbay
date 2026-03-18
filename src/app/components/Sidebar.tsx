import { Link } from "react-router-dom";
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
import { useNavigate } from "react-router";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/ui/sidebar";
import { ReactNode } from "react";

export type ActivePage = "home" | "discover" | "radio" | "albums" | "podcast";

export interface SidebarProps {
  position: "left" | "right";
  children?: ReactNode;
}

export const mainNavItems = [
  { title: "Home", url: "/", icon: Home, page: "home" },
  { title: "Discover", url: "/discover", icon: Compass, page: "discover" },
  { title: "Radio", url: "/radio", icon: Radio, page: "radio" },
  { title: "Albums", url: "/albums", icon: Music, page: "albums" },
  { title: "Podcast", url: "/podcast", icon: Mic, page: "podcast" },
  { title: "Favorites", url: "/favorites", icon: Star, page: "favorites" },
] as const;

export const libraryItems = [
  { title: "Recently Added", url: "/recently-added", icon: Clock },
  { title: "Favorite Songs", url: "/favorite-songs", icon: Star },
  { title: "Local Files", url: "/local-files", icon: Folder },
] as const;

export const playlistItems = [
  { title: "My Playlist #1", url: "/playlist/1", icon: List },
  { title: "My Playlist #2", url: "/playlist/2", icon: List },
  { title: "My Playlist #3", url: "/playlist/3", icon: List },
] as const;

/**
 * Positional sidebar wrapper.
 */
export function LeftSidebarContent() {
  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <img
            width="123"
            height="48"
            src="/assets/logo.svg"
            alt="BeatBay Logo"
            className="group-data-[collapsible=icon]:hidden"
          />
          <SidebarTrigger className="text-white hover:bg-white/10" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link to={item.url}>
                    <item.icon className="text-primary" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Library</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {libraryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="text-primary" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pb-28">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Log Out">
              <LogOut className="text-primary" />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

export function RightSidebarContent() {
  const navigate = useNavigate();
  return (
    <>
      <section className="flex justify-between gap-4 items-center text-white hover:bg-black/20">
        <div className="flex items-center gap-4 min-w-0">
          <img
            width="48"
            height="48"
            src={"/assets/profile-pic.png"}
            alt="Profile"
            className="rounded-full shrink-0"
          />
          <div className="flex flex-col gap-1 min-w-0">
            <p className="font-semibold truncate">example@hotmail.com</p>
            <span className="text-xs font-normal text-gray opacity-80">
              Free Account
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
            <DropdownMenuItem onSelect={() => navigate("/profile")}>
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
    </>
  );
}

/**
 * Positional sidebar wrapper.
 */
export default function Sidebar({ position, children }: SidebarProps) {
  if (position === "left") {
    return (
      <ShadcnSidebar collapsible="icon" className="border-r-0">
        {children}
        <SidebarRail />
      </ShadcnSidebar>
    );
  }

  return (
    <aside className="fixed right-0 top-0 flex flex-col gap-9 p-8 h-screen w-67.5 text-white z-10 bg-sidebar-primary overflow-y-auto">
      {children}
    </aside>
  );
}
