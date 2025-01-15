import { Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="bg-red-900/10 h-[2px] mt-4 mx-14" />

      <div className="text-red-900 text-center mb-2 mt-6 font-medium">Sledujte nás</div>
      <div className="flex justify-center items-center text-red-900 mb-8 mt-2 gap-2">
        <Link to="https://www.instagram.com">
          <Instagram
            strokeWidth={1.5}
            className="background-button-hover transition-colors p-2 w-10 h-10 rounded-lg"
          />
        </Link>
        <Link to="https://www.facebook.com">
          <Facebook
            strokeWidth={1.5}
            className="background-button-hover transition-colors p-2 w-10 h-10 rounded-lg"
          />
        </Link>
        <Link to="https://www.youtube.com">
          <Youtube
            strokeWidth={1.5}
            className="background-button-hover transition-colors p-2 w-10 h-10 rounded-lg"
          />
        </Link>
      </div>
    </>
  );
}
