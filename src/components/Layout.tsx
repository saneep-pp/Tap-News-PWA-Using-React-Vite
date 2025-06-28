import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Users, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import MobileTopBar from "./MobileTopBar"; // ✅ import it
import { InspectionPanel } from "lucide-react";

export default function Layout() {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [showInstall, setShowInstall] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      window.innerWidth < 768 &&
      localStorage.getItem("showInstallPrompt") === "true"
    ) {
      setShowInstall(true);
    }
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = (window as any).deferredPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      const result = await promptEvent.userChoice;
      if (result.outcome === "accepted") {
        console.log("PWA installed");
        localStorage.removeItem("showInstallPrompt");
        setShowInstall(false);
      }
    }
  };

  return (
    <>
      {/* ✅ Desktop Top Nav */}
      {!isMobile && (
        <nav className="top-nav fixed w-full flex justify-between gap-6 bg-white shadow z-40 py-3 border-b border-gray-200">
          <div className="flex items-center justify-center gap-2 py-3 px-4">
            <InspectionPanel size={28} className="text-[#2563eb]" />
            <h1 className="text-xl font-semibold text-[#2563eb] tracking-wide font-mono">
              TapNews
            </h1>
          </div>
          <div className="h-full flex justify-center items-center gap-5 pr-10 pt-4 ">
            {["/", "/users", "/profile"].map((path, index) => {
              const labels = ["Home", "Users", "Profile"];
              return (
                <Link
                  key={path}
                  to={path}
                  className={`px-2 text-sm ${
                    pathname === path
                      ? "text-[#2563eb] font-semibold border-2 border-[#2563eb] p-2 rounded-md"
                      : "text-gray-500"
                  }`}
                >
                  {labels[index]}
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* ✅ Mobile Top Bar */}
      {isMobile && <MobileTopBar />}

      {/* ✅ Install Prompt (mobile) */}
      {isMobile && showInstall && (
        <div className="fixed top-16 right-4 z-50 animate-fade-in">
          <div className="bg-white border border-blue-300 rounded-xl shadow-2xl px-4 py-3 flex items-center gap-3">
            <div className="flex flex-col">
              <p className="text-sm text-gray-800 font-medium">
                Install this app
              </p>
              <p className="text-xs text-gray-500">
                For faster access on your device
              </p>
            </div>
            <button
              onClick={handleInstallClick}
              className="ml-2 bg-[#2563eb] hover:bg-blue-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg shadow transition"
            >
              Install
            </button>
          </div>
        </div>
      )}

      <main className="main-content pt-16 pb-16">
        <Outlet />
      </main>

      {/* ✅ Mobile Bottom Tab Nav */}
      {isMobile && (
        <nav className="bottom-tab fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around py-2 z-40 shadow-md">
          {[
            { to: "/", icon: <Home size={24} />, label: "Home" },
            { to: "/users", icon: <Users size={24} />, label: "Users" },
            {
              to: "/profile",
              icon: <UserCircle size={24} />,
              label: "Profile",
            },
          ].map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center text-xs ${
                pathname === to
                  ? "text-[#2563eb] font-semibold"
                  : "text-gray-500"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
