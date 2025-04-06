import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/LoadingScreen";
import { createReview, getNewestReviews } from "@/models/Reviews";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { CommentRatings } from "@/components/ui/ratings";
import ReviewItem from "./ReviewItem";
import React from "react";
import { X } from "lucide-react";
import { getReviewCount } from "@/models/Reviews";

export default function Reviews() {
  const [newestReviews, setNewestReviews] = useState();
  const [reviewCount, setReviewCount] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [starRating, setStarRating] = useState();
  const [formData, setFormData] = useState();
  const [maxReview, setMaxReview] = useState();

  const loadReviews = async () => {
    const data = await getNewestReviews();
    //console.log(data.status);
    if (data.status === 200) {
      setNewestReviews(data.payload);
    } else {
      setLoaded(null);
    }

    const data2 = await getReviewCount();
    if (data2.status === 200) {
      setReviewCount(data2.payload);
    } else {
      setLoaded(null);
    }

    let maxReviewVar = 0;
    Object.values(data2.payload).forEach((value) => {
      if (value > maxReviewVar) maxReviewVar = value;
    });
    setMaxReview(maxReviewVar);

    if (data.status === 200 && data2.status === 200) setLoaded(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    //console.log(formData);
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (formData.content && formData.rating) postForm();
    else
      toast("Vyplňte prosím všechny údaje", {
        action: {
          label: <X />,
        },
      });
  };

  const postForm = async () => {
    const review = await createReview(formData);
    if (review.status === 201) {
      toast("Recenze byla odeslána", {
        action: {
          label: <X />,
        },
      });
      loadReviews();
    } else {
      toast("Chyba " + review.status + " při vytváření recenze", {
        description: review.message,
        action: {
          label: <X />,
        },
      });
    }
  };

  const handleStarChange = (value) => {
    setStarRating(value);
    handleChange({ target: { value: value, name: "rating" } });
  };

  useEffect(() => {
    document.title = "Pigress - Recenze";
    loadReviews();
  }, []);

  if (isLoaded === false) return <LoadingScreen />;

  const inputStyles = {
    styles:
      "placeholder:text-red-900/50 border-transparent border-red-900/10 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-transparent backdrop-background-color backdrop-background-color-hover transition-colors backdrop-blur-md",
  };

  return (
    <>
      <div className="background pb-[1px]">
        <Header />
        <div className="mt-3.5" />
        <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6">
          <span>Recenze</span>
        </div>
        <div className="container mx-auto pb-24 font-medium px-2 text-red-900 placeholder-min-h-screen flex flex-col lg:max-w-screen-lg">
          <h1 className="text-3xl my-4">Nejnovější recenze</h1>
          {isLoaded ? (
            <>
              <div className="flex gap-2 sm:flex-row flex-col my-2">
                {newestReviews.map((item, index) => (
                  <React.Fragment key={index}>
                    <ReviewItem {...item} />
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-center my-4">Recenze nebyly nalezeny</h1>
            </>
          )}
          <h1 className="text-3xl my-4">Celkové hodnocení</h1>
          {isLoaded ? (
            <>
              <div className="flex gap-2 flex-col">
                {Object.keys(reviewCount)
                  .reverse()
                  .map((item, index) => {
                    const progress = (reviewCount[item] / maxReview) * 100;
                    const count = Object.keys(reviewCount).length - index;
                    return (
                      <React.Fragment key={index}>
                        <div className="flex justify-between gap-2">
                          {
                            {
                              5: "Excelentní",
                              4: "Velmi dobré",
                              3: "Dobré",
                              2: "Špatné",
                              1: "Velmi špatné",
                            }[count]
                          }
                          <div>{reviewCount[item]}</div>
                        </div>
                        <Progress
                          value={progress}
                          className="w-full backdrop-background-color backdrop-blur-md border border-red-900/10"
                          indicatorClassName={
                            {
                              5: "bg-green-500",
                              4: "bg-lime-400",
                              3: "bg-yellow-500",
                              2: "bg-orange-500",
                              1: "bg-red-500",
                            }[count]
                          }
                        />
                      </React.Fragment>
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-center my-4">Recenze nebyly nalezeny</h1>
            </>
          )}
          <h1 className="text-3xl my-4">Chcete napsat recenzi?</h1>
          <form className="flex flex-col gap-2">
            <Label className="text-xs">Jméno (nepovinné)</Label>
            <Input
              className={inputStyles.styles}
              type="text"
              name="username"
              required
              placeholder="Zadejte jméno"
              onChange={handleChange}
              maxLength={50}
            />
            <Label className="text-xs">Zpráva (povinné)</Label>
            <Textarea
              placeholder="Napište zprávu"
              className={inputStyles.styles}
              onChange={handleChange}
              maxLength={255}
              name="content"
            />
            <Label className="text-xs">Hodnocení (povinné)</Label>
            <CommentRatings
              rating={0}
              variant="star"
              totalStars={5}
              size={22}
              onRatingChange={handleStarChange}
            />
            <Button
              variant="ghost"
              onClick={handlePost}
              className="w-fit !text-white bg-red-900 hover:bg-red-950 my-2"
            >
              <span>Odeslat recenzi</span>
            </Button>
          </form>
        </div>
        <Footer />
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
      </div>
    </>
  );
}
