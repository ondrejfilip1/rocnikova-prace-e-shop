import React from "react";
import { Fragment } from "react";
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
  PackageOpen,
  ArrowRight,
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

const components = [
  {
    title: "Nike",
    href: "/produkty/boty?search=Nike",
    description:
      "Světově proslulá značka sportovního oblečení a obuvi, která kombinuje inovaci, styl a výkonnost.",
    iconPath: Nike,
  },
  {
    title: "Adidas",
    href: "/produkty/boty?search=Adidas",
    description:
      "Přední značka sportovní módy známá svými ikonickými třemi pruhy a prvotřídní kvalitou.",
    iconPath: Adidas,
  },
  {
    title: "Tommy Hilfiger",
    href: "/produkty/boty?search=Tommy+Hilfiger",
    description:
      "Luxusní značka známá svým nadčasovým designem a americkým stylem.",
    iconPath: TommyHilfiger,
  },
  {
    title: "Vans",
    href: "/produkty/boty?search=Vans",
    description:
      "Legendární značka pro milovníky streetwearu a skateboardingu, která přináší stylové a pohodlné kousky.",
    iconPath: Vans,
  },
  {
    title: "Jordan",
    href: "/produkty/boty?search=Jordan",
    description:
      "Prémiová sportovní značka inspirovaná legendárním Michaelem Jordanem, zaměřená na basketbalovou obuv a módu.",
    iconPath: Jordan,
  },
  {
    title: "Puma",
    href: "/produkty/boty?search=Puma",
    description:
      "Dynamická značka spojující sportovní výkon a trendy design, ideální pro aktivní životní styl.",
    iconPath: Puma,
  },
  {
    title: "Reebok",
    href: "/produkty/boty?search=Reebok",
    description:
      "Ikonická značka s důrazem na fitness, sportovní oblečení a inovativní technologie.",
    iconPath: Reebok,
  },
  {
    title: "Skechers",
    href: "/produkty/boty?search=Skechers",
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

export default function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState();
  const [totalItems, setTotalItems] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [hasSettings, setHasSettings] = useState(
    localStorage.getItem("profileSettings")
  );
  const [settings, setSettings] = useState();

  const navigate = useNavigate();
  let cart;

  // logika pro nacteni kosiku
  const loadCart = () => {
    cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) setCartItems(cart);
    if (cart) setTotalItems(cart.length);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleNavigate = (link) => {
    useNavigate(`/produkty/${link}`, {
      replace: true,
    });
  };

  const updateTotalItems = () => {
    cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) setTotalItems(cart.length);
    else setTotalItems(0);
  };

  const loadSettings = () => {
    if (hasSettings)
      setSettings(JSON.parse(localStorage.getItem("profileSettings")));
  };

  useEffect(() => {
    updateTotalItems();
    loadSettings();
  }, []);

  // pokazdy kdyz nekde odebereme, nebo pridame polozku do kosiku, tak vysleme event "totalItemsUpdate"
  // credit: https://stackoverflow.com/questions/56660153/how-to-listen-to-localstorage-value-changes-in-react
  window.addEventListener("totalItemsUpdate", () => {
    updateTotalItems();
  });

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
              className={classnames(
                "select-none absolute top-3 left-1/2 transform -translate-x-1/2",
                s.header_icon
              )}
              draggable="false"
            />
          </Link>
          <div className="flex items-center gap-1">
            <DropdownMenu
              onOpenChange={(isOpen) => isOpen && loadCart()}
              modal={false}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  className={classnames(
                    "bg-transparent background-button-hover text-red-900 relative",
                    s.icon_responsivity
                  )}
                >
                  <ShoppingCartIcon />
                  <span className={s.dissapear_650px}>Nákupní košík</span>
                  {totalItems ? (
                    <span className="max-[650px]:text-[0.5rem] max-[650px]:leading-[0.7rem] text-[0.6rem] leading-[0.9rem] absolute top-0.5 right-0.5 background-primary rounded-full max-[650px]:min-w-3 min-w-3.5 max-[650px]:h-3 h-3.5 text-primary-light text-center px-1">
                      {totalItems}
                    </span>
                  ) : (
                    ""
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={classnames(
                  "mr-2 bg-transparent text-red-900 border-none backdrop-blur-2xl backdrop-background-color",
                  s.custom_shadow,
                  cartItems && cartItems.length > 0 ? "w-96" : ""
                )}
              >
                {cartItems && cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item, index) => {
                      return (
                        <Fragment key={`${item.productId}-${index}`}>
                          <div className="w-full text-sm font-medium my-2 mx-1 ">
                            <CartItem
                              cartItems={item}
                              index={index}
                              reloadCart={loadCart}
                            />
                          </div>
                          <div className="border-b border-red-900/25 my-1 mx-2" />
                        </Fragment>
                      );
                    })}
                    <Link to="/objednavky">
                      <Button
                        className={classnames(
                          "bg-transparent background-button-hover text-red-900 mx-2 my-2 w-full",
                          s.width_fix_button
                        )}
                      >
                        <PackageOpen />
                        <span>Objednávky a zboží</span>
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="flex align-center justify-center flex-col place-items-center w-56">
                    <ShoppingBasket
                      size={30}
                      strokeWidth={1}
                      className="my-3"
                    />
                    <span className="font-medium text-sm text-center mb-1">
                      V košíku nic nemáte
                    </span>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu onOpenChange={() => loadSettings()}>
              <DropdownMenuTrigger asChild>
                <Button
                  className={classnames(
                    "bg-transparent background-button-hover text-red-900 focus-visible:!ring-0 !ring-offset-0",
                    s.icon_responsivity
                  )}
                >
                  <User />
                  <span className={s.dissapear_650px}>Účet</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={classnames(
                  "w-56 bg-transparent text-red-900 border-none backdrop-blur-2xl backdrop-background-color mr-2",
                  s.custom_shadow
                )}
              >
                <DropdownMenuLabel className="font-medium">
                  {hasSettings && settings
                    ? `${settings.firstName} ${settings.lastName}`
                    : "Můj účet"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-red-900/25 mx-2" />
                <Link to="/oblibene">
                  <DropdownMenuItem
                    className={classnames(
                      "background-button-hover font-medium",
                      s.button_fix
                    )}
                  >
                    <Heart />
                    <span>Oblíbené</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className={classnames(
                    "background-button-hover font-medium",
                    s.button_fix
                  )}
                >
                  <Star />
                  <span>Trendy</span>
                </DropdownMenuItem>
                <Link to="/platby">
                <DropdownMenuItem
                  className={classnames(
                    "background-button-hover font-medium",
                    s.button_fix
                  )}
                >
                  <CreditCard />
                  <span>Platby</span>
                </DropdownMenuItem></Link>
                <DropdownMenuSeparator className="bg-red-900/25 mx-2" />
                <Link to="/settings">
                  <DropdownMenuItem
                    className={classnames(
                      "background-button-hover font-medium",
                      s.button_fix
                    )}
                  >
                    <Settings />
                    <span>Nastavení</span>
                  </DropdownMenuItem>
                </Link>
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
                      {/* ZJEDNODUSIT!!!!!!!! */}
                      <Link
                        to="/produkty/mikiny"
                        onClick={() => handleNavigate("mikiny")}
                      >
                        Mikiny
                      </Link>
                      <Link
                        to="/produkty/tricka"
                        onClick={() => handleNavigate("tricka")}
                      >
                        Trička
                      </Link>
                      <Link
                        to="/produkty/bundy"
                        onClick={() => handleNavigate("bundy")}
                      >
                        Bundy
                      </Link>
                      <Link
                        to="/produkty/dziny"
                        onClick={() => handleNavigate("dziny")}
                      >
                        Džíny
                      </Link>
                      <Link
                        to="/produkty/kalhoty"
                        onClick={() => handleNavigate("kalhoty")}
                      >
                        Kalhoty
                      </Link>
                      <Link
                        to="/produkty/plavky"
                        onClick={() => handleNavigate("plavky")}
                      >
                        Plavky
                      </Link>
                    </li>
                    <li
                      className={classnames(
                        "row-span-1 text-red-900 font-medium text-sm",
                        s.link_custom
                      )}
                    >
                      <Link
                        to="/produkty/svetry"
                        onClick={() => handleNavigate("svetry")}
                      >
                        Svetry
                      </Link>
                      <Link
                        to="/produkty/pradlo"
                        onClick={() => handleNavigate("pradlo")}
                      >
                        Prádlo
                      </Link>
                      <Link
                        to="/produkty/obleky"
                        onClick={() => handleNavigate("obleky")}
                      >
                        Obleky
                      </Link>
                      <Link
                        to="/produkty/smokingy"
                        onClick={() => handleNavigate("smokingy")}
                      >
                        Smokingy
                      </Link>
                      <Link
                        to="/produkty/kosile"
                        onClick={() => handleNavigate("kosile")}
                      >
                        Košile
                      </Link>
                      <Link
                        to="/produkty/kabaty"
                        onClick={() => handleNavigate("kabaty")}
                      >
                        Kabáty
                      </Link>
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
                    <Link
                      onClick={() =>
                        useNavigate("/produkty/boty", {
                          replace: true,
                        })
                      }
                      to="/produkty/boty"
                      className="text-sm font-medium ml-3 flex items-center gap-0.5"
                    >
                      Zobrazit vše
                      <ArrowRight className="!h-4" />
                    </Link>
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
              to={`/produkty?search=${searchQuery}`}
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
              onChange={handleSearch}
              // kdyz zmacknu enter tak to vyhleda produkty podle jmena
              onKeyPress={(e) =>
                e.charCode == 13 && !onSearch
                  ? navigate(`/produkty?search=${searchQuery}`, {
                      replace: true,
                    })
                  : false
              }
              value={searchQuery}
            />
          </div>
        </div>
      </div>
    </>
  );
}
