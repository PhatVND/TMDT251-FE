import { useState } from "react";
import { Star, MapPin, Calendar, Clock, Shield, Award, Users, Heart, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const trainerData = {
  name: "Marcus Steel",
  specialty: "Strength Training",
  location: "New York, NY",
  rating: 4.9,
  reviewCount: 234,
  clients: 450,
  experience: "8 years",
  image: "https://images.unsplash.com/photo-1643142313816-0d9c86c49f91?w=800",
  bio: "Elite strength coach specializing in powerlifting and muscle building. Certified NSCA-CPT with 8 years of experience transforming bodies and minds. I focus on creating personalized training programs that deliver real, measurable results.",
  certifications: ["NSCA-CPT", "USAW Level 2", "Precision Nutrition", "Functional Movement Screen"],
  packages: [
    { id: 1, name: "Single Session", price: 80, duration: "60 min", sessions: 1, description: "Perfect for trying out or one-time sessions" },
    { id: 2, name: "Weekly Pack", price: 280, duration: "60 min", sessions: 4, popular: true, description: "Most popular - train 4 times per week" },
    { id: 3, name: "Monthly Elite", price: 960, duration: "60 min", sessions: 16, description: "Best value - comprehensive monthly program" }
  ],
  reviews: [
    { id: 1, name: "John Davis", rating: 5, text: "Best trainer I've ever worked with! Transformed my body in 3 months. Marcus is professional, knowledgeable, and really pushes you to achieve your goals.", date: "2 weeks ago", avatar: "JD" },
    { id: 2, name: "Sarah Martinez", rating: 5, text: "Marcus knows his stuff. Every session is challenging and effective. I've gained strength I never thought possible.", date: "1 month ago", avatar: "SM" },
    { id: 3, name: "Mike Roberts", rating: 4, text: "Great trainer, very professional and knowledgeable. Would recommend to anyone serious about strength training.", date: "2 months ago", avatar: "MR" }
  ]
};

interface DesktopPTProfileProps {
  onBack: () => void;
  onBooking: () => void;
}

export function DesktopPTProfile({ onBack, onBooking }: DesktopPTProfileProps) {
  const [selectedPackage, setSelectedPackage] = useState(2);
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button onClick={onBack} variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Trainers
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="border-border bg-card">
              <div className="relative h-80">
                <ImageWithFallback
                  src={trainerData.image}
                  alt={trainerData.name}
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-xl" />
                
                <Button
                  onClick={() => setLiked(!liked)}
                  size="icon"
                  className="absolute top-4 right-4 rounded-full bg-white/90 hover:bg-white"
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-primary text-primary" : "text-foreground"}`} />
                </Button>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h1 className="text-white mb-1 text-3xl">{trainerData.name}</h1>
                      <p className="text-white/90 text-lg">{trainerData.specialty}</p>
                    </div>
                    <Badge className="bg-primary text-white border-0">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified Pro
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-4 gap-4 p-6 border-t border-border">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <span className="text-foreground text-xl">{trainerData.rating}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{trainerData.reviewCount} reviews</p>
                </div>
                <div className="text-center border-l border-border">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-foreground text-xl">{trainerData.clients}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Clients</p>
                </div>
                <div className="text-center border-l border-border">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-foreground text-xl">{trainerData.experience}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Experience</p>
                </div>
                <div className="text-center border-l border-border">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">{trainerData.location}</p>
                </div>
              </div>
            </Card>

            {/* Content Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full bg-card border border-border">
                <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6 mt-6">
                <Card className="p-6 border-border bg-card">
                  <h3 className="text-foreground mb-3">About Me</h3>
                  <p className="text-muted-foreground leading-relaxed">{trainerData.bio}</p>
                </Card>

                <Card className="p-6 border-border bg-card">
                  <h3 className="text-foreground mb-4">Certifications & Qualifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {trainerData.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="text-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4 mt-6">
                {trainerData.reviews.map((review) => (
                  <Card key={review.id} className="p-6 border-border bg-card">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary">{review.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-foreground">{review.name}</h4>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2">{review.text}</p>
                        <p className="text-muted-foreground text-sm">{review.date}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            <Card className="p-6 border-border bg-card sticky top-24">
              <h3 className="text-foreground mb-4">Select Package</h3>
              <div className="space-y-3 mb-6">
                {trainerData.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                      selectedPackage === pkg.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-foreground">{pkg.name}</h4>
                        {pkg.popular && (
                          <Badge className="bg-primary text-white border-0 text-xs">Popular</Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-foreground">${pkg.price}</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{pkg.description}</p>
                    <div className="flex items-center gap-3 text-muted-foreground text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{pkg.sessions} sessions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                    {pkg.sessions > 1 && (
                      <div className="mt-2 pt-2 border-t border-border">
                        <span className="text-primary text-sm">${(pkg.price / pkg.sessions).toFixed(0)}/session</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Button onClick={onBooking} className="w-full h-12 bg-primary text-white">
                Book Now - ${trainerData.packages.find(p => p.id === selectedPackage)?.price}
              </Button>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>100% Money-back guarantee</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
