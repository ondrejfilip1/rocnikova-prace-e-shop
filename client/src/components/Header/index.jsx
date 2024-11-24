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
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchIcon } from "lucide-react";
import classnames from "classnames";

export default function Header() {
  return (
    <>
      <div className={s.header_container}>
        <div className="flex items-center text-sm">
          <SearchIcon className="text-red-900 relative left-7 top-3 transform -translate-y-1/2" />
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
          <Button className="bg-transparent background-button-hover text-red-900">
            <ShoppingCartIcon />
            Nákupní košík
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-transparent background-button-hover text-red-900 font-manrope">
                <User />
                Účet
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-transparent text-red-900 border-none backdrop-blur-lg">
              <DropdownMenuLabel>Můj účet</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-red-900/25" />
                <DropdownMenuItem className="background-button-hover">
                  <User />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="background-button-hover">
                  <CreditCard />
                  <span>Platby</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="background-button-hover">
                  <Settings />
                  <span>Nastavení</span>
                </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-red-900/25" />
              <DropdownMenuItem className="background-button-hover">
                <Heart />
                <span>Oblíbené</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="background-button-hover">
                <Star />
                <span>Trendy</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-red-900/25" />
              <DropdownMenuItem className="background-button-hover">
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
