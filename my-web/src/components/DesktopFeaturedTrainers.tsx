import { useState } from "react";

// 1. MỚI: Thêm icon ShoppingBag
import { TrendingUp, Users, Star, Heart, MapPin, Dumbbell, Filter, ShoppingBag, ArrowRight } from "lucide-react"; 
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// 2. MỚI: Mock Data cho sản phẩm bán chạy (Sau này thay bằng API)
const mockBestSellers = [
  { id: 101, name: "Whey Protein Gold Standard", price: 1550000, category: "Supplement", image: "https://images.unsplash.com/photo-1593095191071-82b0cdd66110?w=400" },
  { id: 102, name: "Thảm tập Yoga Premium", price: 450000, category: "Gear", image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400" },
  { id: 103, name: "Dây kháng lực (Bộ 5)", price: 250000, category: "Gear", image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400" },
  { id: 104, name: "Găng tay Gym Thoáng khí", price: 180000, category: "Accessories", image: "https://images.unsplash.com/photo-1593095191071-82b0cdd66110?w=400" },
  { 
    id: 105, 
    name: "Bình nước giữ nhiệt Sport", 
    price: 350000, 
    category: "Accessories", 
    image: "https://images.unsplash.com/photo-1602143407151-df111dbd274c?w=400" 
  },
];

// --- QUAN TRỌNG: Giữ export để Profile dùng ---
export const allTrainers = [
  {
    id: 1,
    name: "Marcus Steel",
    specialty: "Strength Training",
    gym: "PowerFit Training Center",
    gymLogo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200",
    rating: 4.9,
    reviews: 234,
    price: 80,
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400",
    featured: true,
    favorite: false
  },
  {
    id: 2,
    name: "Sarah Power",
    specialty: "CrossFit",
    gym: "CrossFit Evolution",
    gymLogo: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=200",
    rating: 4.8,
    reviews: 187,
    price: 75,
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    featured: true,
    favorite: true
  },
  {
    id: 3,
    name: "Jake Thunder",
    specialty: "HIIT & Cardio",
    gym: "Thunder Box Gym",
    gymLogo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200",
    rating: 4.7,
    reviews: 158,
    price: 65,
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400",
    featured: true,
    favorite: false
  },
  {
    id: 4,
    name: "Nina Flex",
    specialty: "Yoga & Mobility",
    gym: "Zen Fitness Studio",
    gymLogo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200",
    rating: 4.9,
    reviews: 298,
    price: 70,
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    featured: true,
    favorite: true
  },
  {
    id: 5,
    name: "Alex Storm",
    specialty: "Boxing",
    gym: "Thunder Box Gym",
    gymLogo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200",
    rating: 4.8,
    reviews: 142,
    price: 85,
    location: "Boston, MA",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400",
    featured: false,
    favorite: false
  },
  {
    id: 6,
    name: "Lisa Champion",
    specialty: "Nutrition",
    gym: "Zen Fitness Studio",
    gymLogo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200",
    rating: 4.9,
    reviews: 201,
    price: 90,
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400",
    featured: false,
    favorite: false
  },
  {
    id: 7,
    name: "Mike Titan",
    specialty: "Bodybuilding",
    gym: "Iron Temple",
    gymLogo: "https://images.unsplash.com/photo-1558151508-2f82a2f7a7a8?w=200",
    rating: 4.8,
    reviews: 176,
    price: 95,
    location: "Denver, CO",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400",
    featured: false,
    favorite: false
  },
  {
    id: 8,
    name: "Emma Swift",
    specialty: "HIIT",
    gym: "Urban Fitness Hub",
    gymLogo: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=200",
    rating: 4.7,
    reviews: 134,
    price: 68,
    location: "Portland, OR",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400",
    featured: false,
    favorite: true
  },
  {
    id: 9,
    name: "Ryan Atlas",
    specialty: "Strength Training",
    gym: "PowerFit Training Center",
    gymLogo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200",
    rating: 4.8,
    reviews: 189,
    price: 78,
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400",
    featured: false,
    favorite: false
  },
  {
    id: 10,
    name: "Sophia Grace",
    specialty: "Pilates",
    gym: "Zen Fitness Studio",
    gymLogo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200",
    rating: 4.9,
    reviews: 223,
    price: 72,
    location: "San Diego, CA",
    image: "https://images.unsplash.com/photo-1594744803329-e917b8c04e8e?w=400",
    featured: false,
    favorite: false
  },
  {
    id: 11,
    name: "Carlos Mendez",
    specialty: "CrossFit",
    gym: "CrossFit Evolution",
    gymLogo: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=200",
    rating: 4.7,
    reviews: 167,
    price: 77,
    location: "Phoenix, AZ",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400",
    featured: false,
    favorite: false
  },
  {
    id: 12,
    name: "Kelly Burst",
    specialty: "Cardio",
    gym: "Athletic Performance Lab",
    gymLogo: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=200",
    rating: 4.8,
    reviews: 198,
    price: 74,
    location: "Tampa, FL",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    featured: false,
    favorite: true
  }
];

interface DesktopFeaturedTrainersProps {
  onTrainerClick: (trainerId: number) => void;
  onViewGyms: () => void;
  onShopProducts: () => void;
  onRefundPolicyClick?: () => void;
  onProductClick?: (productId: number) => void;
}

export function DesktopFeaturedTrainers({ 
  onTrainerClick, 
  onViewGyms,
  onShopProducts,
  onRefundPolicyClick,
  onProductClick
}: DesktopFeaturedTrainersProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("highest");
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: "top", label: "Top Trainers" },
    { id: "all", label: "All Trainers" },
    { id: "strength", label: "Strength" },
    { id: "crossfit", label: "CrossFit" },
    { id: "hiit", label: "HIIT" },
    { id: "yoga", label: "Yoga" },
    { id: "boxing", label: "Boxing" },
    { id: "nutrition", label: "Nutrition" }
  ];

  const filteredTrainers = allTrainers.filter(trainer => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "top") return trainer.featured;
    return trainer.specialty.toLowerCase().includes(selectedCategory.toLowerCase());
  }).sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  const toggleFavorite = (trainerId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(trainerId) 
        ? prev.filter(id => id !== trainerId)
        : [...prev, trainerId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-background to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-foreground mb-4">Connect with Elite Trainers</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Connect with elite personal trainers and access premium gym equipment. Start your transformation today.
              </p>
              
              <div className="flex gap-4 mb-12">
                <Button className="bg-primary text-white gap-2" size="lg" onClick={onViewGyms}>
                  <Dumbbell className="w-5 h-5" />
                  Find a Trainer
                </Button>
                <Button variant="outline" size="lg" onClick={onShopProducts}>
                  Shop Products
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary text-3xl">450+</span>
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">Active Trainers</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary text-3xl">12K+</span>
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">Happy Clients</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary text-3xl">4.9</span>
                    <Star className="w-5 h-5 fill-primary text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-[400px] rounded-[20px] overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
                alt="Fitness training"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. MỚI: SECTION SẢN PHẨM BÁN CHẠY (Nằm giữa Banner và Filter) */}
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Sản phẩm bán chạy</h2>
            </div>
            <Button variant="ghost" onClick={onShopProducts} className="text-primary gap-1">
                Xem tất cả cửa hàng <ArrowRight className="w-4 h-4" />
            </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {mockBestSellers.map((product) => (
                <div key={product.id} onClick={() => onProductClick && onProductClick(product.id)} 
            className="cursor-pointer group"
        >
                    <Card className="overflow-hidden border-border bg-card hover:shadow-lg transition-all h-full">
                        <div className="relative h-48 overflow-hidden bg-muted">
                             <ImageWithFallback 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                             />
                             <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Hot</Badge>
                        </div>
                        <div className="p-4">
                            <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                            <h3 className="font-semibold truncate mb-2 text-foreground">{product.name}</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-primary">{product.price.toLocaleString('vi-VN')}đ</span>
                                <Button size="sm" variant="secondary" className="hover:bg-primary hover:text-white transition-colors">Mua ngay</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
      </div>

      {/* Filters and Trainers */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Tabs */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id ? "bg-primary text-white" : ""}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-card border-border">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-lg">Danh sách Huấn Luyện Viên</span>
            <span className="text-muted-foreground ml-2">({filteredTrainers.length} available)</span>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-4 gap-6">
          {filteredTrainers.map((trainer) => (
            <div 
              key={trainer.id}
              onClick={() => onTrainerClick(trainer.id)}
              className="cursor-pointer"
            >
              <Card
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border bg-card group h-full"
              >
                <div className="relative h-72">
                  <ImageWithFallback
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(trainer.id, e)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors shadow-lg"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        favorites.includes(trainer.id) || trainer.favorite
                          ? "fill-white text-white" 
                          : "text-white"
                      }`} 
                    />
                  </button>

                  {/* Gym Logo Badge */}
                  <div className="absolute top-3 left-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg bg-card">
                      <ImageWithFallback
                        src={trainer.gymLogo}
                        alt={trainer.gym}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-foreground mb-1">{trainer.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{trainer.specialty}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-foreground text-sm">{trainer.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">({trainer.reviews})</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">{trainer.location}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-primary text-xl">${trainer.price}</span>
                      <span className="text-muted-foreground text-sm">/session</span>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTrainerClick(trainer.id);
                      }}
                      size="sm"
                      className="bg-primary text-white"
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {filteredTrainers.length === 0 && (
          <Card className="p-12 text-center border-border bg-card">
            <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-foreground mb-2">No Trainers Found</h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </Card>
        )}
      </div>
    </div>
  );
}