import React, { useState } from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
  },
  destructive: {
    star: "text-red-500",
    emptyStar: "text-red-200",
  },
  star: {
    star: "text-red-900",
    emptyStar: "text-red-900/50",
  },
}

export const CommentRatings = ({
  rating: initialRating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = "default",
  onRatingChange,
  ...props
}) => {
  const [hoverRating, setHoverRating] = useState(null)
  const [currentRating, setCurrentRating] = useState(initialRating)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = (event) => {
    setIsHovering(true)
    const starIndex = parseInt(
      (event.currentTarget).dataset.starIndex || "0"
    )
    setHoverRating(starIndex)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setHoverRating(null)
  }

  const handleClick = (event) => {
    const starIndex = parseInt(
      (event.currentTarget).dataset.starIndex || "0"
    )
    setCurrentRating(starIndex)
    setHoverRating(null)
    onRatingChange?.(starIndex)
  }

  const displayRating = hoverRating ?? currentRating
  const fullStars = Math.floor(displayRating)
  const partialStar =
    displayRating % 1 > 0 ? (
      <PartialStar
        fillPercentage={displayRating % 1}
        size={size}
        className={cn(ratingVariants[variant].star)}
        Icon={Icon}
      />
    ) : null

  return (
    <div
      className={cn("flex w-fit items-center gap-2 ")}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="flex items-center" onMouseEnter={handleMouseEnter}>
        {[...Array(fullStars)].map((_, i) =>
          React.cloneElement(Icon, {
            key: i,
            size,
            className: cn(
              fill ? "fill-current stroke-1" : "fill-transparent",
              ratingVariants[variant].star, "cursor-pointer"
            ),
            onClick: handleClick,
            onMouseEnter: handleMouseEnter,
            "data-star-index": i + 1,
          })
        )}
        {partialStar}
        {[
          ...Array(Math.max(0, totalStars - fullStars - (partialStar ? 1 : 0))),
        ].map((_, i) =>
          React.cloneElement(Icon, {
            key: i + fullStars + 1,
            size,
            className: cn("stroke-[1.5]", ratingVariants[variant].emptyStar),
            onClick: handleClick,
            onMouseEnter: handleMouseEnter,
            "data-star-index": i + fullStars + 1,
          })
        )}
      </div>
    </div>
  )
}

const PartialStar = ({ ...props }) => {
  const { fillPercentage, size, className, Icon } = props
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(Icon, {
        size,
        className: cn("fill-transparent", className),
      })}
      <div
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: `${fillPercentage * 100}%`,
        }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn("fill-current", className),
        })}
      </div>
    </div>
  )
}
