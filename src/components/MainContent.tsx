import { useState } from 'react';

import HelpArea from './HelpArea';
import SideBar from "./Sidebar";

function MainContent() {
  const [helpVisible, setHelpVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleHelp() {
    setHelpVisible((isVisible) => !isVisible);
  }

  return (
    <>
      <SideBar
        items={[
          { label: "Home", href: "#", onClick: () => alert("Go to Home") },
          { label: "About", href: "#", onClick: () => alert("Go to About") },
          {
            label: "Contact",
            href: "#",
            onClick: () => alert("Go to Contact"),
          },
        ]}
        isOpen={sidebarOpen}
        onToggle={setSidebarOpen}
        showToggleButton={false}
      />
      <main className="mx-auto p-8 max-w-[50rem] bg-[#292d2d] rounded-lg text-white">
        <div className="flex gap-4 mb-4 justify-center items-center">
          <button
            onClick={() => setSidebarOpen((open) => !open)}
            className="cursor-pointer bg-black text-white py-1 px-4 rounded border border-black font-[inherit]"
          >
            {sidebarOpen ? "Close" : "Open"} Sidebar
          </button>
          <button
            onClick={toggleHelp}
            className="cursor-pointer bg-black text-white py-1 px-4 rounded border border-black font-[inherit]"
          >
            {helpVisible ? "Hide" : "Show"} Help
          </button>
        </div>
        {helpVisible && <HelpArea />}
      </main>
    </>
  );
}

export default MainContent;
