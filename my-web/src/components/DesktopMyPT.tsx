import { useState, useEffect } from "react";
import { ArrowLeft, Star, Calendar, MessageCircle, Heart, MapPin, Trophy, Clock, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RatePTModal } from "./RatePTModal";
import { ChatWithPTModal } from "./ChatWithPTModal";

// Import Service và Interface
import bookingService, {type BookingAPI, type UserAPI } from "../services/ptService"; // Sửa đường dẫn import cho đúng file của bạn

interface DesktopMyPTProps {
  onBack: () => void;
  onTrainerSelect: (id: number) => void;
  onBookSession: (trainerId: number) => void;
}

// Interface cho UI (đã chế biến từ API)
interface MyTrainerUI {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  sessionsCompleted: number;
  nextSession: string; // "Tomorrow, 10:00 AM" hoặc "No upcoming"
  isFavorite: boolean;
  lastBooked: string; // "2 days ago"
  rawNextSessionDate?: Date; // Dùng để sort
}

export function DesktopMyPT({ onBack, onTrainerSelect, onBookSession }: DesktopMyPTProps) {
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<{
    id: number;
    name: string;
    image: string;
  } | null>(null);

  // State dữ liệu
  const [myTrainers, setMyTrainers] = useState<MyTrainerUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSessions: 0,
    upcomingSessions: 0,
    favoritePTs: 0, // Hiện tại API chưa có field favorite, tạm hardcode hoặc logic riêng
    hoursTrained: 0,
  });

  // --- HÀM HELPER: Format ngày giờ cho giống UI mẫu ---
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatNextSession = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // Check nếu là ngày mai
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    if (date.toDateString() === now.toDateString()) return `Today, ${timeStr}`;
    if (date.toDateString() === tomorrow.toDateString()) return `Tomorrow, ${timeStr}`;
    
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${timeStr}`;
  };

  // --- USE EFFECT: Fetch dữ liệu ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 1. Lấy danh sách booking của User ID 1 (như trong service bạn viết)
        const bookings = await bookingService.getMyBookings(1);

        // 2. Gom nhóm Booking theo Trainer ID
        const trainerMap = new Map<number, { info: UserAPI, bookings: BookingAPI[] }>();
        
        bookings.forEach(booking => {
          if (booking.trainerUser) {
            const tid = booking.trainerUser.id;
            if (!trainerMap.has(tid)) {
              trainerMap.set(tid, { info: booking.trainerUser, bookings: [] });
            }
            trainerMap.get(tid)?.bookings.push(booking);
          }
        });

        // 3. Chuyển đổi sang format UI
        const processedTrainers: MyTrainerUI[] = [];
        let totalSess = 0;
        let upcomingSess = 0;

        trainerMap.forEach((data, trainerId) => {
          const { info, bookings: trainerBookings } = data;

          // Sắp xếp booking của PT này theo thời gian giảm dần
          trainerBookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

          // Tính toán logic
          const now = new Date();
          const completed = trainerBookings.filter(b => b.status === "COMPLETED" || b.status === "CONFIRMED").length; // Giả sử confirm cũng tính là đã chốt
          
          // Tìm next session (booking tương lai gần nhất)
          const futureBookings = trainerBookings.filter(b => new Date(b.date) > now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          const nextSess = futureBookings.length > 0 ? futureBookings[0].date : null;

          // Tìm last booked (booking quá khứ gần nhất hoặc booking vừa tạo)
          const lastSess = trainerBookings.length > 0 ? trainerBookings[0].date : now.toISOString();

          // Cộng dồn thống kê tổng
          totalSess += completed;
          if (nextSess) upcomingSess++;

          processedTrainers.push({
            id: info.id,
            name: info.fullName || "Unknown Trainer",
            specialty: info.specialty || "General Fitness",
            location: info.address || "Online", // Fallback nếu thiếu address
            // Fake data UI cho đẹp (như bạn làm ở ptService)
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(info.fullName || "PT")}&background=random&size=200`,
            rating: 4.8, // API chưa có rating trung bình của PT, fake tạm
            reviews: 10 + Math.floor(Math.random() * 50), // Fake số review
            isFavorite: false, // API chưa có field này
            
            // Dữ liệu tính toán thật
            sessionsCompleted: completed,
            nextSession: nextSess ? formatNextSession(nextSess) : "No upcoming session",
            lastBooked: formatTimeAgo(lastSess),
            rawNextSessionDate: nextSess ? new Date(nextSess) : undefined
          });
        });

        // Sort danh sách PT: Ai có lịch sắp tới thì đưa lên đầu
        processedTrainers.sort((a, b) => {
            if (a.rawNextSessionDate && !b.rawNextSessionDate) return -1;
            if (!a.rawNextSessionDate && b.rawNextSessionDate) return 1;
            if (a.rawNextSessionDate && b.rawNextSessionDate) return a.rawNextSessionDate.getTime() - b.rawNextSessionDate.getTime();
            return 0;
        });

        setMyTrainers(processedTrainers);
        setStats({
          totalSessions: totalSess,
          upcomingSessions: upcomingSess,
          favoritePTs: 0, // Chưa implement
          hoursTrained: totalSess, // Giả sử mỗi session 1 tiếng
        });

      } catch (error) {
        console.error("Failed to load My PTs", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2">My Personal Trainers</h1>
          <p className="text-muted-foreground">
            Trainers you've booked or added to favorites
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="rounded-[20px] border-border p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Sessions</p>
                <p className="text-foreground text-2xl">
                    {isLoading ? "..." : stats.totalSessions}
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-[20px] border-border p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Upcoming</p>
                <p className="text-foreground text-2xl">
                    {isLoading ? "..." : stats.upcomingSessions}
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-[20px] border-border p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Favorite PTs</p>
                <p className="text-foreground text-2xl">
                    {isLoading ? "..." : stats.favoritePTs}
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-[20px] border-border p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Hours Trained</p>
                <p className="text-foreground text-2xl">
                    {isLoading ? "..." : stats.hoursTrained}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Trainers Grid */}
        {isLoading ? (
            <div className="flex justify-center items-center h-64">
                 <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        ) : (
            <div className="space-y-4">
            {myTrainers.map((trainer) => (
                <Card key={trainer.id} className="rounded-[20px] border-border p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-6">
                    {/* Trainer Image */}
                    <div className="relative flex-shrink-0">
                    <div className="w-32 h-32 rounded-[16px] overflow-hidden bg-secondary">
                        <ImageWithFallback
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                        />
                    </div>
                    {trainer.isFavorite && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                        <Heart className="w-4 h-4 text-white fill-white" />
                        </div>
                    )}
                    </div>

                    {/* Trainer Info */}
                    <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                        <h3 className="text-foreground mb-1">{trainer.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{trainer.specialty}</p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-foreground">{trainer.rating}</span>
                            <span className="text-muted-foreground text-sm">({trainer.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground text-sm">
                            <MapPin className="w-4 h-4" />
                            {trainer.location}
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Session Stats */}
                    <div className="flex gap-6 mb-4">
                        <div>
                        <p className="text-muted-foreground text-xs">Sessions Completed</p>
                        <p className="text-foreground">{trainer.sessionsCompleted}</p>
                        </div>
                        <div>
                        <p className="text-muted-foreground text-xs">Last Booked</p>
                        <p className="text-foreground">{trainer.lastBooked}</p>
                        </div>
                        <div>
                        <p className="text-muted-foreground text-xs">Next Session</p>
                        <p className="text-primary font-medium">{trainer.nextSession}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                        className="bg-primary text-white flex-1"
                        onClick={() => onBookSession(trainer.id)}
                        >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Again
                        </Button>
                        <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                            setSelectedTrainer({ id: trainer.id, name: trainer.name, image: trainer.image });
                            setRateModalOpen(true);
                        }}
                        >
                        <Star className="w-4 h-4 mr-2" />
                        Rate PT
                        </Button>
                        <Button
                        variant="outline"
                        onClick={() => onTrainerSelect(trainer.id)}
                        >
                        View Profile
                        </Button>
                        <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                            setSelectedTrainer({ id: trainer.id, name: trainer.name, image: trainer.image });
                            setChatModalOpen(true);
                        }}
                        >
                        <MessageCircle className="w-5 h-5" />
                        </Button>
                    </div>
                    </div>
                </div>

                {/* Upcoming Session Banner - Logic kiểm tra chuỗi "Tomorrow" hoặc "Today" */}
                {(trainer.nextSession.includes("Tomorrow") || trainer.nextSession.includes("Today")) && (
                    <div className="mt-4 p-3 bg-primary/10 rounded-[12px] border border-primary/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <p className="text-sm">
                            <span className="text-primary font-semibold">Upcoming session:</span>{" "}
                            <span className="text-foreground">{trainer.nextSession}</span>
                        </p>
                        </div>
                        <Button size="sm" variant="outline">
                        View Details
                        </Button>
                    </div>
                    </div>
                )}
                </Card>
            ))}
            </div>
        )}

        {/* Empty State for no trainers */}
        {!isLoading && myTrainers.length === 0 && (
          <Card className="rounded-[20px] border-border p-12 text-center">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-foreground mb-2">No trainers yet</h2>
            <p className="text-muted-foreground mb-6">
              Start booking sessions with trainers to see them here
            </p>
            <Button onClick={onBack} className="bg-primary text-white">
              Find Trainers
            </Button>
          </Card>
        )}
      </div>

      {/* Rate PT Modal */}
      {selectedTrainer && (
        <RatePTModal
          isOpen={rateModalOpen}
          onClose={() => {
            setRateModalOpen(false);
            setSelectedTrainer(null);
          }}
          trainerName={selectedTrainer.name}
          trainerImage={selectedTrainer.image}
          onSubmit={(rating, comment) => {
            console.log("Rating submitted:", rating, comment);
            // TODO: Gọi API POST /reviews ở đây nếu muốn
          }}
        />
      )}

      {/* Chat with PT Modal */}
      {selectedTrainer && (
        <ChatWithPTModal
          isOpen={chatModalOpen}
          onClose={() => {
            setChatModalOpen(false);
            setSelectedTrainer(null);
          }}
          trainerName={selectedTrainer.name}
          trainerImage={selectedTrainer.image}
          trainerId={selectedTrainer.id}
        />
      )}
    </div>
  );
}