import {
  Instagram,
  Facebook,
  Youtube,
  Link as LinkIcon,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addEmail } from "@/models/Mail";

import s from "./Footer.module.css";
import classNames from "classnames";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

export default function Footer() {
  const styles = {
    link: "text-sm relative inline-block w-fit after:block after:h-[1px] after:content-[''] after:absolute after:bg-red-900/50 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-bottom-right hover:after:origin-bottom-left",
  };

  const [emailInput, setEmailInput] = useState("");

  const handleAddEmail = async () => {
    // koukam se jestli je zadany email platny
    // https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(emailInput)) {
      const email = await addEmail({ email: emailInput });
      console.log(email);
      if (email.status === 201)
        toast("Váš email byl přidán do newsletteru", {
          description: emailInput,
          action: {
            label: <X />,
          },
        });
      else
        toast("Tento email již odebírá newsletter", {
          description: emailInput,
          action: {
            label: <X />,
          },
        });
    } else {
      toast("Zadejte prosím platný email", {
        action: {
          label: <X />,
        },
      });
    }
  };

  return (
    <>
      <div className="h-[2px] mt-4 container mx-auto sm:px-0 px-4">
        <div className={classNames("w-full h-full", s.divider_gradient)} />
      </div>

      <div className="text-red-900 font-medium flex container lg:max-w-[1024px] sm:px-0 px-4 mx-auto mb-8">
        <div className="w-1/2 ml-2">
          <div className="mb-2 mt-6 flex gap-1">
            <span>Odkazy</span>
            <LinkIcon className="p-1" />
          </div>
          <div className="flex flex-col text-sm gap-1 opacity-75">
            <Link to="/" className={styles.link}>
              Domovská stránka
            </Link>
            <Link to="/about" className={styles.link}>
              O nás
            </Link>
            <Link to="/produkty" className={styles.link}>
              Produkty
            </Link>
            <Link to="/recenze" className={styles.link}>
              Recenze
            </Link>
            <Link to="/centrum-pomoci" className={styles.link}>
              Centrum pomoci
            </Link>
          </div>
        </div>

        <div className="w-1/2">
          <div className="mb-2 mt-6">
            <span>Sledujte nás</span>
          </div>
          <div className="flex text-red-900 my-2 gap-2">
            <Link to="https://www.instagram.com">
              <Instagram
                strokeWidth={1.5}
                className="background-button-hover transition-colors p-1.5 w-8 h-8 rounded-lg"
              />
            </Link>
            <Link to="https://www.facebook.com">
              <Facebook
                strokeWidth={1.5}
                className="background-button-hover transition-colors p-1.5 w-8 h-8 rounded-lg"
              />
            </Link>
            <Link to="https://www.youtube.com">
              <Youtube
                strokeWidth={1.5}
                className="background-button-hover transition-colors p-1.5 w-8 h-8 rounded-lg"
              />
            </Link>
          </div>
          <div className="flex gap-2">
            <Input
              className="placeholder:text-red-900/50 border-red-900/10 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-transparent backdrop-background-color backdrop-background-color-hover transition-colors backdrop-blur-md"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <Button
              className="bg-red-900 hover:bg-red-950"
              onClick={handleAddEmail}
            >
              Odebírat
            </Button>
          </div>
          <span className="text-xs opacity-50 mt-2">
            Kliknutím na tlačítko "Odebírat" se přihlásíte k odběru našeho
            newsletteru
          </span>
        </div>
      </div>
      <div className="w-full text-center text-red-900 opacity-75 text-sm mb-4">
        © Pigress {new Date().getFullYear()}
      </div>
      <Toaster
        position="bottom-right"
        className="font-manrope"
        toastOptions={{
          unstyled: false,
          classNames: {
            toast: "background-primary-light border-red-900/20",
            title: "text-red-900",
            description: "text-red-900",
            actionButton:
              "!text-red-900 !bg-transparent background-button-hover !p-1 !h-7 !w-7 !transition-colors",
            cancelButton:
              "!text-red-900 !bg-transparent background-button-hover !p-1 !h-7 !w-7 !transition-colors",
            closeButton:
              "!text-red-900 !bg-transparent background-button-hover !p-1 !h-7 !w-7 !transition-colors",
          },
        }}
      />
    </>
  );
}
