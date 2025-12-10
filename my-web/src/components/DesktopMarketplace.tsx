import { useState } from "react";
import { Search, Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const products = [
  {
    id: 1,
    name: "Premium Whey Protein",
    category: "supplements",
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    rating: 4.8,
    reviews: 156,
    seller: "Marcus Steel",
    image: "https://images.unsplash.com/photo-1709976142774-ce1ef41a8378?w=400",
    stock: 24
  },
  {
    id: 2,
    name: "Adjustable Dumbbells Set",
    category: "equipment",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.9,
    reviews: 89,
    seller: "FitGear Agent",
    image: "https://images.unsplash.com/photo-1652492041264-efba848755d6?w=400",
    stock: 12
  },
  {
    id: 3,
    name: "Performance Tank Top",
    category: "apparel",
    price: 34.99,
    rating: 4.7,
    reviews: 203,
    seller: "FitGear Agent",
    image: "https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?w=400",
    stock: 45
  },
  {
    id: 4,
    name: "Pre-Workout Energy",
    category: "supplements",
    price: 39.99,
    originalPrice: 54.99,
    discount: 27,
    rating: 4.6,
    reviews: 124,
    seller: "Sarah Power",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400",
    stock: 31
  },
  {
    id: 5,
    name: "Resistance Bands Set",
    category: "equipment",
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    rating: 4.8,
    reviews: 178,
    seller: "Jake Thunder",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400",
    stock: 67
  },
  {
    id: 6,
    name: "Compression Shorts",
    category: "apparel",
    price: 44.99,
    rating: 4.5,
    reviews: 92,
    seller: "FitGear Agent",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400",
    stock: 28
  },
  {
    id: 7,
    name: "BCAA Recovery",
    category: "supplements",
    price: 34.99,
    rating: 4.7,
    reviews: 145,
    seller: "Marcus Steel",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400",
    stock: 56
  },
  {
    id: 8,
    name: "Yoga Mat Premium",
    category: "equipment",
    price: 59.99,
    originalPrice: 89.99,
    discount: 33,
    rating: 4.9,
    reviews: 201,
    seller: "Nina Flex",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    stock: 33
  },
  {
    id: 9,
    name: "Training Gloves",
    category: "apparel",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    rating: 4.6,
    reviews: 87,
    seller: "FitGear Agent",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    stock: 41
  }
];

interface DesktopMarketplaceProps {
  onBack: () => void;
  onProductClick?: (productId: string) => void;
  cart: Record<number, number>;
  onAddToCart: (productId: number) => void;
}

export function DesktopMarketplace({ onBack, onProductClick, cart, onAddToCart }: DesktopMarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === Number(id));
    return sum + (product?.price || 0) * qty;
  }, 0);

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <h1 className="text-foreground">Marketplace</h1>

            <div className="w-[120px]"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-6">
            <Card className="p-5 border-border bg-card">
              <h3 className="text-foreground mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </Card>

            <Card className="p-5 border-border bg-card">
              <h3 className="text-foreground mb-4">Categories</h3>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full" orientation="vertical">
                <TabsList className="w-full flex-col h-auto bg-transparent gap-2">
                  <TabsTrigger value="all" className="w-full justify-start">All Products</TabsTrigger>
                  <TabsTrigger value="supplements" className="w-full justify-start">Supplements</TabsTrigger>
                  <TabsTrigger value="equipment" className="w-full justify-start">Equipment</TabsTrigger>
                  <TabsTrigger value="apparel" className="w-full justify-start">Apparel</TabsTrigger>
                </TabsList>
              </Tabs>
            </Card>

            <Card className="p-5 border-border bg-card">
              <h3 className="text-foreground mb-4">Sort By</h3>
              <Select defaultValue="popular">
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </Card>

            {cartCount > 0 && (
              <Card className="p-5 border-primary bg-primary/5 border-2">
                <h3 className="text-foreground mb-3">Cart Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items:</span>
                    <span className="text-foreground">{cartCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Total:</span>
                    <span className="text-primary">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full bg-primary text-white">
                  Checkout
                </Button>
              </Card>
            )}
          </div>

          {/* Products Grid */}
          <div className="col-span-3">
            <div className="mb-6">
              <p className="text-muted-foreground">{filteredProducts.length} products found</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-border bg-card group"
                  onClick={() => onProductClick?.(String(product.id))}
                >
                  <div className="relative h-56">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.discount && (
                      <Badge className="absolute top-3 left-3 bg-primary text-white border-0">
                        -{product.discount}% OFF
                      </Badge>
                    )}
                    {product.stock < 20 && (
                      <Badge className="absolute top-3 right-3 bg-destructive text-white border-0">
                        Low Stock
                      </Badge>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-foreground mb-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">by {product.seller}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-foreground text-sm">{product.rating}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex flex-col gap-1">
                        {product.originalPrice ? (
                          <>
                            <span className="text-muted-foreground text-sm line-through">${product.originalPrice}</span>
                            <span className="text-primary text-xl">${product.price}</span>
                          </>
                        ) : (
                          <span className="text-primary text-xl">${product.price}</span>
                        )}
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product.id);
                        }}
                        size="sm"
                        className="bg-primary text-white"
                      >
                        {cart[product.id] ? `In Cart (${cart[product.id]})` : "Add to Cart"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}