import { X, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";

interface RatePTModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainerName: string;
  trainerImage: string;
  onSubmit: (rating: number, comment: string) => void;
}

export function RatePTModal({ isOpen, onClose, trainerName, trainerImage, onSubmit }: RatePTModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
      setRating(0);
      setComment("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg rounded-[20px] border-border p-6 bg-white relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-foreground mb-2">Rate & Review</h2>
          <p className="text-muted-foreground text-sm">
            Share your experience with {trainerName}
          </p>
        </div>

        {/* Trainer Info */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-secondary rounded-[16px]">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary">
            <img src={trainerImage} alt={trainerName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-foreground">{trainerName}</h3>
            <p className="text-muted-foreground text-sm">Personal Trainer</p>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="mb-6">
          <label className="text-foreground text-sm mb-3 block">Your Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
          )}
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="text-foreground text-sm mb-3 block">
            Your Review <span className="text-muted-foreground">(Optional)</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience, training results, or what you liked most..."
            className="w-full h-32 p-4 border border-border rounded-[12px] resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground mt-2 text-right">
            {comment.length}/500
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="flex-1 bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Review
          </Button>
        </div>

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          Your review will be visible to other users
        </p>
      </Card>
    </div>
  );
}
