import { useState } from "react";
import { loadProfile, PlayerProfile } from "@/lib/storage";
import RightSidebar from "@/components/RightSidebar";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";

type Page = "home" | "profile" | "settings";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [profile, setProfile] = useState<PlayerProfile>(loadProfile);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage profile={profile} />;
      case "profile":
        return <ProfilePage profile={profile} onUpdate={setProfile} />;
      case "settings":
        return <SettingsPage profile={profile} onUpdate={setProfile} />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <main className="flex-1 overflow-hidden" key={page}>
        <div className="h-full animate-fade-in">
          {renderPage()}
        </div>
      </main>
      <RightSidebar current={page} onChange={setPage} profile={profile} />
    </div>
  );
}
