import Image from "next/image";


interface CollapseMenuProps {
    toggleNavbar: () => void;
    collapsed: boolean;
  }

  const CollapseMenu = ({ toggleNavbar, collapsed }: CollapseMenuProps) => {
  return (
    <button onClick={toggleNavbar}>
      <Image src={collapsed ? "/menu-icon.png" : "/left-arrow.png" } width={30} height={40} alt="left arrow" className="mr-3" />
    </button>
  );
};

export default CollapseMenu;
