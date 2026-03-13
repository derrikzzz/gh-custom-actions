import { useState } from "react";

type NavItem = {
  id?: string;
  label: string;
  href: string;
  onClick?: () => void;
};

type SidebarProps = {
  items?: NavItem[];
  children?: React.ReactNode;
  position?: "left" | "right";
  width?: string;
  bgColor?: string;
  textColor?: string;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
  showToggleButton?: boolean;
  toggleButtonText?: { open: string; close: string };
};

function SideBar({
  items,
  children,
  position = "left",
  width = "w-64",
  bgColor = "bg-[#292d2d]",
  textColor = "text-white",
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  className = "",
  showToggleButton = true,
  toggleButtonText = { open: "Open", close: "Close" },
}: SidebarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  // Use controlled state if provided, otherwise use internal state
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  function toggleSidebar() {
    const newState = !isOpen;
    if (onToggle) {
      onToggle(newState);
    } else {
      setInternalIsOpen(newState);
    }
  }

  const positionClasses = position === "left" ? "left-0" : "right-0";
  const transformClasses =
    position === "left"
      ? isOpen
        ? "translate-x-0" //visible on screen
        : "-translate-x-full" //hidden to left
      : isOpen
        ? "translate-x-0" //visible
        : "translate-x-full"; //hidden to right

  return (
    <aside
      className={`fixed top-0 ${positionClasses} h-full ${width} ${bgColor} ${textColor} p-4 transition-transform transform ${transformClasses} ${className}`}
    >
      {showToggleButton && (
        <button
          onClick={toggleSidebar}
          className="mb-4 cursor-pointer bg-black text-white py-1 px-4 rounded border border-black font-[inherit]"
          aria-label={isOpen ? toggleButtonText.close : toggleButtonText.open}
        >
          {isOpen ? toggleButtonText.close : toggleButtonText.open} Sidebar
        </button>
      )}

      {children ? (
        children
      ) : items && items.length > 0 ? (
        <nav>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="mb-2">
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </aside>
  );
}

export default SideBar;
