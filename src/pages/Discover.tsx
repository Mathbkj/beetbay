import Sidebar from "../components/Sidebar";

export default function Discover() {
  return (
    <div className="font-[Manrope] flex min-h-screen bg-dark">
      <Sidebar currentPage="discover" />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-white mb-4">Discover</h1>
        <p className="text-light">Discover new music and artists</p>
      </main>
    </div>
  );
}
