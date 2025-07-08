import { InspectionPanel } from "lucide-react";

const MobileTopBar = () => {
  return (
    <header className="w-full fixed top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-center gap-2 py-3 px-4">
        <InspectionPanel size={28} className="text-[#2563eb]" />
        <h1 className="text-xl font-semibold text-[#2563eb] tracking-wide font-mono">
          TapNews
        </h1>
      </div>
    </header>
  );
};

export default MobileTopBar;
