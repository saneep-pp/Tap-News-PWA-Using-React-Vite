// src/components/SplashScreen.tsx
import { useEffect } from "react";
import { InspectionPanel } from "lucide-react";
export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // splash lasts 2 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center animate-fade-in">
      <InspectionPanel size={28} className="text-[#2563eb] animate-bounce" />
      <h1 className="mt-4 text-xl font-bold text-[#2563eb] animate-pulse">
        TAP NEWS
      </h1>
    </div>
  );
}
