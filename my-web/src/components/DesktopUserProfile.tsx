import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit, Camera, Save, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface DesktopUserProfileProps {
  onBack: () => void;
  userType?: string;
  onLogout?: () => void;
}

export function DesktopUserProfile({ onBack, userType = "Customer", onLogout }: DesktopUserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    dateOfBirth: "1990-05-15",
    bio: "Fitness enthusiast passionate about strength training and healthy living. Looking to achieve my best physique and overall wellness.",
    fitnessGoals: "Build muscle, Lose weight, Improve endurance",
    memberSince: "Jan 2024",
  });

  const stats = [
    { label: "Sessions Booked", value: "24" },
    { label: "Products Purchased", value: "12" },
    { label: "Reviews Written", value: "8" },
    { label: "Member Level", value: "Gold" },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to backend
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="space-y-6">
            <Card className="rounded-[20px] border-border p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" />
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 bg-primary text-white"
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                </div>
                <h2 className="text-foreground mb-1">{profileData.name}</h2>
                <p className="text-muted-foreground mb-2">{userType}</p>
                <Badge className="bg-primary text-white">Gold Member</Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {profileData.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {profileData.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {profileData.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Member since {profileData.memberSince}
                </div>
              </div>
            </Card>

            {/* Stats Card */}
            <Card className="rounded-[20px] border-border p-6">
              <h3 className="text-foreground mb-4">Activity Stats</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Logout Button */}
            <Button 
              variant="outline" 
              className="w-full h-12 rounded-[20px] border-2 border-border hover:border-destructive hover:text-destructive hover:bg-destructive/10 transition-colors gap-2"
              onClick={onLogout || onBack}
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </div>

          {/* Main Content - Profile Details */}
          <div className="col-span-2">
            <Card className="rounded-[20px] border-border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-foreground">Profile Information</h2>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-primary text-white gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
                  <TabsTrigger
                    value="personal"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="fitness"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    Fitness Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    Preferences
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({ ...profileData, name: e.target.value })
                        }
                        disabled={!isEditing}
                        className="border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                        disabled={!isEditing}
                        className="border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, phone: e.target.value })
                        }
                        disabled={!isEditing}
                        className="border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) =>
                          setProfileData({ ...profileData, dateOfBirth: e.target.value })
                        }
                        disabled={!isEditing}
                        className="border-border"
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Location</Label>
                      <Input
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({ ...profileData, location: e.target.value })
                        }
                        disabled={!isEditing}
                        className="border-border"
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Bio</Label>
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({ ...profileData, bio: e.target.value })
                        }
                        disabled={!isEditing}
                        rows={4}
                        className="border-border resize-none"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="fitness" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Fitness Goals</Label>
                      <Input
                        value={profileData.fitnessGoals}
                        onChange={(e) =>
                          setProfileData({ ...profileData, fitnessGoals: e.target.value })
                        }
                        disabled={!isEditing}
                        className="border-border"
                        placeholder="e.g., Build muscle, Lose weight"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Current Weight (lbs)</Label>
                        <Input
                          type="number"
                          placeholder="180"
                          disabled={!isEditing}
                          className="border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Target Weight (lbs)</Label>
                        <Input
                          type="number"
                          placeholder="170"
                          disabled={!isEditing}
                          className="border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Height (cm)</Label>
                        <Input
                          type="number"
                          placeholder="175"
                          disabled={!isEditing}
                          className="border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Fitness Level</Label>
                        <Input
                          placeholder="Intermediate"
                          disabled={!isEditing}
                          className="border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Medical Conditions / Injuries</Label>
                      <Textarea
                        placeholder="Any conditions your trainer should know about..."
                        disabled={!isEditing}
                        rows={3}
                        className="border-border resize-none"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Preferred Training Time</Label>
                      <Input
                        placeholder="Morning / Afternoon / Evening"
                        disabled={!isEditing}
                        className="border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Training Type</Label>
                      <Input
                        placeholder="Strength, Cardio, Yoga, etc."
                        disabled={!isEditing}
                        className="border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Budget Range (per session)</Label>
                      <Input
                        placeholder="$50 - $100"
                        disabled={!isEditing}
                        className="border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Special Requirements</Label>
                      <Textarea
                        placeholder="Any special requirements or preferences..."
                        disabled={!isEditing}
                        rows={3}
                        className="border-border resize-none"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}