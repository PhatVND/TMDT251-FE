import { ArrowLeft, Star, Calendar, MessageCircle, Heart, MapPin, Trophy, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RatePTModal } from "./RatePTModal";
import { ChatWithPTModal } from "./ChatWithPTModal";
import { useState } from "react";

interface DesktopMyPTProps {
  onBack: () => void;
  onTrainerSelect: (id: number) => void;
  onBookSession: (trainerId: number) => void;
}

export function DesktopMyPT({ onBack, onTrainerSelect, onBookSession }: DesktopMyPTProps) {
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<{
    id: number;
    name: string;
    image: string;
  } | null>(null);

  const myTrainers = [
    {
      id: 1,
      name: "Marcus Steel",
      specialty: "Strength Training",
      rating: 4.9,
      reviews: 234,
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
      sessionsCompleted: 12,
      nextSession: "Tomorrow, 10:00 AM",
      isFavorite: true,
      lastBooked: "2 days ago",
    },
    {
      id: 2,
      name: "Sarah Power",
      specialty: "CrossFit",
      rating: 4.8,
      reviews: 187,
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
      sessionsCompleted: 8,
      nextSession: "Nov 28, 3:00 PM",
      isFavorite: true,
      lastBooked: "5 days ago",
    },
    {
      id: 3,
      name: "Jake Thunder",
      specialty: "HIIT & Cardio",
      rating: 4.7,
      reviews: 156,
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&q=80",
      sessionsCompleted: 5,
      nextSession: "Dec 1, 6:00 PM",
      isFavorite: false,
      lastBooked: "1 week ago",
    },
  ];

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
                <p className="text-foreground text-2xl">25</p>
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
                <p className="text-foreground text-2xl">3</p>
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
                <p className="text-foreground text-2xl">2</p>
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
                <p className="text-foreground text-2xl">37</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Trainers Grid */}
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
                      <p className="text-primary">{trainer.nextSession}</p>
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

              {/* Upcoming Session Banner */}
              {trainer.nextSession.includes("Tomorrow") && (
                <div className="mt-4 p-3 bg-primary/10 rounded-[12px] border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <p className="text-sm">
                        <span className="text-primary">Upcoming session:</span>{" "}
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

        {/* Empty State for no trainers */}
        {myTrainers.length === 0 && (
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
            // Handle rating submission
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