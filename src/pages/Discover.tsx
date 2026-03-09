import Sidebar from "../components/Sidebar";

export default function Discover() {
  return (
    <div className="font-[Manrope] min-h-screen bg-black">
      <Sidebar position="left" currentPage="discover">
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-white mb-4">Discover</h1>
          <p className="text-zinc-400">Discover new music and artists</p>
        </main>
      </Sidebar>
    </div>
  );
}
