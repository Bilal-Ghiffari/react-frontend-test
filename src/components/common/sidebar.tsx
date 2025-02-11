import * as React from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { cn } from "../../utils";
import { deleteAccessUser } from "../../services/localStorage";
import { CookingPot, FolderKanban, LogOut } from "lucide-react";

interface ISideBarProps {
  isOpenSide: boolean;
  setIsOpenSide: (isOpen: boolean) => void;
}

const SideBar: React.FunctionComponent<ISideBarProps> = ({
  isOpenSide,
  setIsOpenSide,
}) => {
  const location = useLocation();
  const naviagation = useNavigate();
  const mainMenus = [
    {
      key: "inventoryManagementPage",
      label: "Inventory Management",
      slug: "/",
      icon: <FolderKanban />,
    },
    {
      key: "recipePage",
      label: "Recipe",
      slug: "/recipe",
      icon: <CookingPot />,
    },
  ];
  const handleLogout = () => {
    deleteAccessUser();

    naviagation(0);
  };
  return (
    <div
      className={cn(
        "hidden lg:block fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[999]",
        isOpenSide ? "block" : "hidden"
      )}
      id="sidebarHRIS"
    >
      <div className="px-6 py-[50px] gap-y-[50px] flex flex-col">
        <div className="flex items-center justify-between">
          <div
            id="toggleCloseSidebar"
            className="lg:hidden"
            onClick={() => setIsOpenSide(!isOpenSide)}
          >
            <svg
              className="w-6 h-6 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-sm text-grey">Daily Use</div>
          {mainMenus.map((menu, index) => {
            let isActive = false;
            if (!!menu) {
              if (
                location.pathname === menu.slug ||
                (location.pathname.startsWith(menu.slug) &&
                  location.pathname.charAt(menu.slug.length) === "/")
              ) {
                isActive = true;
              }
            }
            return (
              <NavLink to={menu.slug} className="w-full" key={index}>
                <span
                  className={cn(
                    isActive && "active",
                    "nav-link bg-gray-300/20 rounded-2xl"
                  )}
                >
                  {menu.icon} {menu.label}
                </span>
              </NavLink>
            );
          })}
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-sm text-grey">Others</div>

          <div
            className="nav-link bg-gray-300/20 rounded-2xl cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
