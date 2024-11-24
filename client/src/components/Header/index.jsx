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
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import classnames from "classnames";

export default function Header() {
  return (
    <>
      <div className={s.header_container}>
        <div className="flex items-center text-sm">
          <Link
            to="/search"
            className={classnames("text-red-900 absolute left-10 top-9 transform -translate-y-1/2", s.search_icon)}
          >
            <SearchIcon />
          </Link>
          <Input
            placeholder="Vyhledat"
            className={classnames(
              "max-w-sm pl-10 bg-transparent background-button-hover text-red-900 transition-colors font-medium",
              s.custom_input
            )}
          />
        </div>
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
              <DropdownMenuItem
                className={classnames(
                  "background-button-hover font-medium",
                  s.button_fix
                )}
              >
                <LogOut />
                <span>Odhlásit se</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
