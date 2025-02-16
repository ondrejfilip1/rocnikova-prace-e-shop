import { Instagram, Facebook, Youtube, Link as LinkIcon, Rss } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {

  const styles = {
    link: "text-sm relative inline-block w-fit after:block after:h-[1px] after:content-[''] after:absolute after:bg-red-900/50 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-bottom-right hover:after:origin-bottom-left"
  }

  return (
    <>
      <div className="bg-red-900/10 h-[2px] mt-4 container mx-auto" />

      <div className="text-red-900 font-medium flex container mx-auto mb-8">
        <div className="w-1/2">
          <div className="mb-2 mt-6 flex gap-1">
            <span>Odkazy</span>
            <LinkIcon className="p-1" />
          </div>
          <div className="flex flex-col text-sm gap-1 opacity-75">
            <Link to="/" className={styles.link}>Domovská stránka</Link>
            <Link to="/about" className={styles.link}>O nás</Link>
            <Link to="/view-products" className={styles.link}>Produkty</Link>
            <Link to="/" className={styles.link}>Výprodej</Link>
            <Link to="/objednavky" className={styles.link}>Nákupní košík</Link>
          </div>
        </div>

        <div className="w-1/2">
        <div className="mb-2 mt-6 flex gap-1">
            <span>Sledujte nás</span>
            <Rss className="p-1" />
          </div>
          <div className="flex text-red-900 mb-8 mt-2 gap-2">
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
        </div>
      </div>
      <div className="w-full text-center text-red-900 opacity-75 text-sm mb-4">
        © Pigress {new Date().getFullYear()}
      </div>
    </>
  );
}
