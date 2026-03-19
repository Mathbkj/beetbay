import {
  Home,
  Compass,
  Radio,
  Music,
  Mic,
  Clock,
  Star,
  Folder, List, User
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar, SidebarRail
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
  {title:"Profile", url:"/profile", icon:User, page:"profile"}
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
