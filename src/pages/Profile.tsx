import { Mail, User, Crown } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { InputFile } from "@/components/InputFile";
import { Button } from "@/ui/Button";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [filePath, setFilePath] = useState<string | null>(null);

  const handleUpdateProfilePicture = async () => {
    const response = await fetch("/api/upload-pfp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath }),
    });
  };
  useEffect(() => {
    console.log(filePath);
  }, [filePath]);
  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar position="left" currentPage="home">
        <main className="flex-1 p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>

          <div className="max-w-2xl w-full">
            <div className="bg-zinc-900 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-6 mb-8">
                {/* <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">
                  <User className="w-12 h-12 text-zinc-500" />
                </div> */}
                <InputFile onChange={setFilePath} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-zinc-400">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg">
                  <Crown className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-zinc-400">Subscription</p>
                    <p className="font-medium">{user?.tier || "Free Tier"}</p>
                  </div>
                </div>
              </div>
              <div className="flex mt-2 gap-2">
                <Button variant="ghost">Cancel</Button>
                <Button onClick={handleUpdateProfilePicture}>Update</Button>
              </div>
            </div>
          </div>
        </main>
      </Sidebar>
    </div>
  );
}
