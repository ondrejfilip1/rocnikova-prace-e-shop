import ReviewBox from "./box";
import { useState, useEffect, Fragment } from "react";
import DialogWarning from "../dialogwarning";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getAllReviews } from "@/models/Reviews";

export default function AdminReviewList() {
  const [reviews, setReviews] = useState();
  const [isLoaded, setLoaded] = useState();
  const [hasPassword, setHasPassword] = useState(
    localStorage.getItem("adminPassword")
  );

  const load = async () => {
    const data = await getAllReviews();
    if (data.status === 200) {
      setReviews(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (hasPassword) load();
    else setLoaded(true);
    document.title = "Pigress - Admin panel";
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <div className="text-center h-screen flex justify-center items-center text-lg">
          Recenze nenalezeny
        </div>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <div className="text-center h-screen flex justify-center items-center text-lg">
          Recenze se načítají...
        </div>
      </>
    );
  }
  return (
    <>
      <DialogWarning pass={hasPassword} />
      {hasPassword && (
        <div className="container mx-auto px-2">
          <div className="flex justify-between items-center my-3">
            <h1 className=" text-2xl">List recenzí</h1>
            <Link to={"/admin"}>
              <Button variant="outline" className="gap-1 pl-3">
                <ChevronLeft />
                <span>Jít zpět</span>
              </Button>
            </Link>
          </div>
          <div className="my-2 h-[1px] bg-black/10" />
          {reviews.map((reviewItem, index) => (
            <Fragment key={index}>
              <ReviewBox {...reviewItem} />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
