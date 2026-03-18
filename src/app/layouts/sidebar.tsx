import { Route } from "../layouts/+types/sidebar";
import { NavLink, Outlet, redirect, useLocation, useNavigate } from "react-router";
import Sidebar, { mainNavItems } from "@/components/Sidebar";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/ui/sidebar";
import { ArrowLeft, ArrowRight, Bell, LogOut, Search } from "lucide-react";
import { Button } from "@/ui/Button";
import { useState } from "react";
import { getUserFromServer } from "@/storage/getUserFromServer";
import Cookies from "js-cookie";

export async function loader({ request }: Route.LoaderArgs) {
  const user = getUserFromServer(request);
  if(user.email === "example@example.com"){
    return redirect("/login")
  }
  return { email:user.email };
}

export default function SidebarLayout({ loaderData }: Route.ComponentProps) {
  const { email } = loaderData;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const currentIndex = mainNavItems.findIndex((item) => item.url === pathname);

  const prevItem = currentIndex > 0 ? mainNavItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < mainNavItems.length - 1
      ? mainNavItems[currentIndex + 1]
      : null;

  function navigateToPrevious() {
    if (prevItem) {
      navigate(prevItem.url);
    }
  }

  function navigateToNext() {
    if (nextItem) {
      navigate(nextItem.url);
    }
  }
  function handleLogout(){
    Cookies.remove("jwt_token");
    navigate(0);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  return (
    <SidebarProvider>
      <Sidebar position="left">
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
                    <SidebarMenuButton>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex gap-4 group items-center w-full text-start rounded-lg p-2 ${isActive ? "text-green-500 font-medium bg-white/10" : "text-white brightness-50 hover:brightness-75"}`
                        }
                      >
                        <item.icon size={16} className="text-primary" />
                        <span className="text-inherit">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="pb-28">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Log Out">
                  <LogOut className="text-primary" />
                  <span>Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </>
      </Sidebar>
      <SidebarInset>
        <header className="flex justify-center mx-auto my-4 items-center w-full">
          <div className="w-full flex justify-around items-center">
            <div className="flex gap-6 items-center justify-start">
              <Button size="icon" variant="ghost" onClick={navigateToPrevious}>
                <ArrowLeft size={14} />
              </Button>

              <div className="flex gap-2 items-center">
                <span className="text-white/40 text-sm font-semibold">
                  {prevItem ? prevItem.title : "No previous item"}
                </span>
                <Button onClick={navigateToNext} size="icon" variant="ghost">
                  <ArrowRight size={14} />
                </Button>
                <span className="text-sm font-semibold">{nextItem?.title}</span>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex gap-3 px-4 py-3 bg-white/10 rounded-xl items-center">
                <Search size={18} className="text-white/50" />
                <input
                  type="search"
                  placeholder="Search for songs, artists, albums..."
                  value={search}
                  onChange={handleSearch}
                  className="bg-transparent text-white outline-none border-none text-xs"
                />
              </div>
              <div className="bg-white/10 rounded-xl p-3.5">
                <Bell size={18} />
              </div>
            </div>
            <div className="flex gap-3 items-center justify-center">
              <img
                width={36}
                height={36}
                src="/assets/user-icon.svg"
                alt="User Icon"
                className="size-10 rounded-full"
              />
              {email && <span className="text-white/50 text-sm">{email}</span>}
            </div>
          </div>
        </header>
        <main className="min-h-screen w-full mx-auto bg-black">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
