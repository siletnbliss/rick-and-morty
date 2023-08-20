"use client";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import { Logo } from "../ui/logo";
import {
  FilmIcon,
  HomeIcon,
  LogOutIcon,
  LucideIcon,
  MenuIcon,
  RocketIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { Drawer } from "../ui/drawer";
import { useDisclosure } from "@/hooks/use-disclosure";
import { usePathname } from "next/navigation";
interface MenuItem {
  title: string;
  link: string;
  Icon: LucideIcon;
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", link: "/auth", Icon: HomeIcon },
  { title: "Characters", link: "/auth/characters", Icon: RocketIcon },
  { title: "Episodes", link: "/auth/episodes", Icon: FilmIcon },
];

export const SideBar = () => {
  const { visible, toggle } = useDisclosure();
  const pathname = usePathname();
  const SideBarContent = (
    <NavigationMenu
      className={`bg-card h-screen flex-col items-start justify-start  w-full max-w-full p-5 ${styles.container}`}
    >
      <Logo size={42} className="mt-5 mb-12 mx-4 hidden md:inline " />
      <NavigationMenuList className="flex-col w-full max-w-full justify-start">
        {menuItems.map((item, index) => (
          <NavigationMenuItem className="w-full mb-2" key={index}>
            <Link href={item.link} className="w-full" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle({
                  className: `bg-card w-full ${styles.element} ${
                    pathname === item.link && "bg-accent"
                  }`,
                })}
              >
                {<item.Icon className="mr-3" size={"24px"} />}
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem className="w-full mt-10">
          <Link href="/" className="w-full" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle({
                className: `bg-card w-full ${styles.element} `,
              })}
            >
              {<LogOutIcon className="mr-3" width={24} height={24} />}
              Sign Out
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
  const HeaderContent = (
    <div className="bg-card h-20 w-screen md:hidden sticky top-0 flex items-center p-5">
      <MenuIcon onClick={toggle} />{" "}
      <Drawer
        isOpen={visible}
        title={<Logo size={32} />}
        setIsOpen={toggle}
        className="w-screen sm:w-72 max-w-screen"
      >
        {SideBarContent}
      </Drawer>
    </div>
  );
  return (
    <div className="w-72 max-w-screen">
      <div className=" md:inline hidden"> {SideBarContent}</div>
      {HeaderContent}
    </div>
  );
};
