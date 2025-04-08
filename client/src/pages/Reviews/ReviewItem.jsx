import moment from "moment";
import { CommentRatings } from "@/components/ui/ratings";

export default function ReviewItem(props) {
  return (
    <>
      <div className="sm:w-1/3 w-full card_background p-4 rounded-xl">
        <div className="flex justify-between items-center text-xs gap-2">
          <CommentRatings
            rating={props.rating}
            variant="star"
            totalStars={5}
            size={20}
            className="pointer-events-none"
          />
          <div className="cut_text">
            {moment(props.createdAt).locale("cz").format("D.M.YYYY")} od{" "}
            {props.username}
          </div>
        </div>
        <div className="mt-2 text-sm">{props.content}</div>
      </div>
    </>
  );
}
