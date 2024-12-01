import React from "react";
import s from "./Header.module.css";
import { Button } from "@/components/ui/button";
import logo from "../../assets/images/logo_transparent.png";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  LogOut,
  Settings,
  User,
  ShoppingCartIcon,
  Heart,
  Star,
  SearchIcon,
  ShoppingBasket,
  BadgePercent,
  Shirt,
  Footprints,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import TommyHilfiger from "../../assets/icons/tommy_hilfiger.svg";
import Vans from "../../assets/icons/vans.svg";
import Jordan from "../../assets/icons/jordan.svg";
import Puma from "../../assets/icons/puma.svg";
import Nike from "../../assets/icons/nike.svg";
import Reebok from "../../assets/icons/reebok.svg";
import Adidas from "../../assets/icons/adidas.svg";
import Skechers from "../../assets/icons/skechers.svg";

import classnames from "classnames";

const components = [
  {
    title: "Nike",
    href: "",
    description:
      "Světově proslulá značka sportovního oblečení a obuvi, která kombinuje inovaci, styl a výkonnost.",
    iconPath: Nike,
  },
  {
    title: "Adidas",
    href: "",
    description:
      "Přední značka sportovní módy známá svými ikonickými třemi pruhy a prvotřídní kvalitou.",
    iconPath: Adidas,
  },
  {
    title: "Tommy Hilfiger",
    href: "",
    description:
      "Luxusní značka známá svým nadčasovým designem a americkým stylem.",
    iconPath: TommyHilfiger,
  },
  {
    title: "Vans",
    href: "",
    description:
      "Legendární značka pro milovníky streetwearu a skateboardingu, která přináší stylové a pohodlné kousky.",
    iconPath: Vans,
  },
  {
    title: "Jordan",
    href: "",
    description:
      "Prémiová sportovní značka inspirovaná legendárním Michaelem Jordanem, zaměřená na basketbalovou obuv a módu.",
    iconPath: Jordan,
  },
  {
    title: "Puma",
    href: "",
    description:
      "Dynamická značka spojující sportovní výkon a trendy design, ideální pro aktivní životní styl.",
    iconPath: Puma,
  },
  {
    title: "Reebok",
    href: "",
    description:
      "Ikonická značka s důrazem na fitness, sportovní oblečení a inovativní technologie.",
    iconPath: Reebok,
  },
  {
    title: "Skechers",
    href: "",
    description:
      "Populární značka obuvi zaměřená na pohodlí, funkčnost a moderní design.",
    iconPath: Skechers,
  },
];

const ListItem = React.forwardRef(
  ({ className, title, children, iconPath, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={classnames(
              "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none flex justify-between items-center">
              {title}
              <img src={iconPath} className={s.brand_icons} />
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default function Header() {
  return (
    <>
      <div className={s.header_container}>
        <div
          className={classnames(
            "flex items-center justify-between mb-2 text-red-900 ml-4",
            s.custom_radio_group
          )}
        >
          <RadioGroup defaultValue="muzi" className="flex">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="muzi" id="r1" defaultChecked />
              <Label htmlFor="r1">Muži</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="zeny" id="r2" />
              <Label htmlFor="r2">Ženy</Label>
            </div>
          </RadioGroup>
          <Link to="/">
            <img
              src={logo}
              alt="icon"
              className={classnames("select-none", s.header_icon)}
              draggable="false"
            />
          </Link>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={classnames(
                    "bg-transparent background-button-hover text-red-900",
                    s.icon_responsivity
                  )}
                >
                  <ShoppingCartIcon />
                  <span className={s.dissapear_650px}>Nákupní košík</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={classnames(
                  "w-56 bg-transparent text-red-900 border-none backdrop-blur-lg flex align-center justify-center flex-col place-items-center",
                  s.custom_shadow
                )}
              >
                <ShoppingBasket size={30} strokeWidth={1} className="my-3" />
                <span className="font-medium text-sm text-center mb-1">
                  V košíku nic nemáte
                </span>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={classnames(
                    "bg-transparent background-button-hover text-red-900",
                    s.icon_responsivity
                  )}
                >
                  <User />
                  <span className={s.dissapear_650px}>Účet</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={classnames(
                  "w-56 bg-transparent text-red-900 border-none backdrop-blur-lg",
                  s.custom_shadow
                )}
              >
                <DropdownMenuLabel className="font-medium">
                  Můj účet
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-red-900/25 mx-2" />
                <DropdownMenuItem
                  className={classnames(
                    "background-button-hover font-medium",
                    s.button_fix
                  )}
                >
                  <User />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={classnames(
                    "background-button-hover font-medium",
                    s.button_fix
                  )}
                >
                  <CreditCard />
                  <span>Platby</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={classnames(
                    "background-button-hover font-medium",
                    s.button_fix
                  )}
                >
                  <Settings />
                  <span>Nastavení</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-red-900/25 mx-2" />
                <DropdownMenuItem
                  className={classnames(
                    "background-button-hover font-medium",
                    s.button_fix
                  )}
                >
                  <Heart />
                  <span>Oblíbené</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={classnames(
                    "background-button-hover font-medium",
                    s.button_fix
                  )}
                >
                  <Star />
                  <span>Trendy</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-red-900/25 mx-2" />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <span
                      className={classnames(
                        "font-medium relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus:bg-neutral-800 dark:focus:text-neutral-50 background-button-hover",
                        s.button_fix
                      )}
                    >
                      <LogOut />
                      Odhlásit se
                    </span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Opravdu se chcete odhlásit?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Zrušit</AlertDialogCancel>
                      <AlertDialogAction
                        className={classnames(
                          "bg-transparent background-button-hover text-red-900",
                          s.button_fix
                        )}
                      >
                        Odhlásit se
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <NavigationMenu className="text-red-900">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={classnames(
                    "bg-transparent background-button-hover background-button-focus text-red-900 focus:text-red-900",
                    s.button_fix
                  )}
                >
                  <Shirt size={16} className="mr-2" />
                  Oblečení
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-6 w-[300px] grid-cols-[1fr_1fr] flex column">
                    <li
                      className={classnames(
                        "row-span-1 text-red-900 font-medium text-sm",
                        s.link_custom
                      )}
                    >
                      <Link>Mikiny</Link>
                      <Link>Trička</Link>
                      <Link>Bundy</Link>
                      <Link>Džíny</Link>
                      <Link>Kalhoty</Link>
                      <Link>Tepláky</Link>
                    </li>
                    <li
                      className={classnames(
                        "row-span-1 text-red-900 font-medium text-sm",
                        s.link_custom
                      )}
                    >
                      <Link>Svetry</Link>
                      <Link>Prádlo</Link>
                      <Link>Obleky</Link>
                      <Link>Smokingy</Link>
                      <Link>Košile</Link>
                      <Link>Kabáty</Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={classnames(
                    "bg-transparent background-button-hover background-button-focus text-red-900 focus:text-red-900 hover:text-transparent:hover",
                    s.button_fix,
                    s.button_fix_2
                  )}
                >
                  <Footprints size={16} className="mr-2" />
                  Boty
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        iconPath={component.iconPath}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  className={classnames(
                    "bg-transparent background-button-hover background-button-focus text-red-900 focus:text-red-900",
                    s.button_fix
                  )}
                  asChild
                >
                  <Link href="/">
                    <BadgePercent />
                    Výprodej
                  </Link>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center text-sm relative">
            <Link
              to="/view-products"
              className={classnames(
                "text-red-900 absolute left-3 top-5 transform -translate-y-1/2",
                s.search_icon
              )}
            >
              <SearchIcon size={18} className="mr-2" />
            </Link>
            <Input
              placeholder="Vyhledat"
              className={classnames(
                "max-w-sm pl-10 bg-transparent background-button-hover text-red-900 transition-colors font-medium text-sm",
                s.custom_input
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}
