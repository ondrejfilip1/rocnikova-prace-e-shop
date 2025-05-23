import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound(props) {
  return (
    <>
      <div className="container mx-auto flex-col px-2 text-red-900 placeholder-min-h-screen text-center flex items-center justify-center">
        <h1 className="text-red-900 text-2xl mb-1.5 font-bold">404</h1>
        <h1 className="text-red-900">{props.description}</h1>
        <Link
          to={props.link}
          onClick={() => useNavigate(props.link, { replace: true })}
        >
          <Button className="my-3 bg-red-900 hover:bg-red-950">
            <Search />
            {props.content}
          </Button>
        </Link>
      </div>
    </>
  );
}
