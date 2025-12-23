import { X, Star, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";
import ptService from "../services/ptService";

interface RatePTModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainerId: number; 
  trainerName: string;
  trainerImage: string;
}

export function RatePTModal({ isOpen, onClose, trainerId, trainerName, trainerImage }: RatePTModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá!");
      return;
    }

    setIsSubmitting(true);
    try {
      // FIX PAYLOAD: Ép kiểu Number để tránh lỗi 500
      const payload = {
        comment: comment || "Dịch vụ rất tốt", // Không để trống comment
        rating: Number(rating),
        traineeId: 1, // Thay bằng ID login thật nếu có
        trainerId: Number(trainerId), // trainerId lấy từ props truyền xuống
      };

      console.log("Payload gửi đi:", payload); // Kiểm tra log này phải có 4 trường

      await ptService.createReview(payload);

      alert("Gửi đánh giá thành công!");
      setRating(0);
      setComment("");
      onClose();
    } catch (error) {
      console.error("Lỗi 500:", error);
      alert("Lỗi máy chủ (500). Kiểm tra xem traineeId=1 đã tồn tại chưa!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md p-8 bg-card border-border shadow-2xl relative">
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4"><X /></Button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Đánh giá huấn luyện viên</h2>
          <p className="text-muted-foreground">{trainerName}</p>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Avatar PT */}
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img src={trainerImage} alt="" className="w-full h-full object-cover" />
          </div>

          {/* Star Rating */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                onClick={() => setRating(s)}
                onMouseEnter={() => setHoveredRating(s)}
                onMouseLeave={() => setHoveredRating(0)}
                className={`w-10 h-10 cursor-pointer transition-colors ${
                  s <= (hoveredRating || rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <textarea
            placeholder="Viết nhận xét..."
            className="w-full h-32 p-4 rounded-xl border border-border bg-background"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full py-6 font-bold">
            {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Gửi đánh giá"}
          </Button>
        </div>
      </Card>
    </div>
  );
}