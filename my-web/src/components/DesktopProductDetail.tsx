import { ArrowLeft, ShoppingCart, Star, Check, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface DesktopProductDetailProps {
  productId: string;
  onBack: () => void;
  onAddToCart: () => void;
}

export function DesktopProductDetail({ productId, onBack, onAddToCart }: DesktopProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  // Mock product data
  const product = {
    id: productId,
    name: "Premium Resistance Bands Set",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviewCount: 234,
    description: "Professional-grade resistance bands set perfect for home workouts, physical therapy, and strength training. Includes 5 resistance levels from light to extra heavy.",
    category: "equipment", // equipment, supplements, apparel
    inStock: true,
    stockCount: 47,
    images: [
      "https://images.unsplash.com/photo-1626143955141-e3016ac1fbdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXF1aXBtZW50JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjIyNTQ2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "5 resistance levels (10-50 lbs)",
      "Premium latex material",
      "Includes door anchor and handles",
      "Portable carrying bag included",
      "Lifetime warranty",
    ],
    specifications: {
      Material: "Premium Latex",
      Weight: "2.5 lbs",
      Dimensions: "48 x 2 inches",
      Color: "Black/Orange",
      Brand: "FitConnect Pro",
    },
  };

  // Refund policy based on product category
  const getRefundPolicy = (category: string) => {
    switch (category) {
      case "supplements":
        return {
          returnable: "Conditional",
          conditions: [
            "Unopened products: Full refund within 30 days",
            "Opened products: NOT REFUNDABLE for health and safety reasons",
            "Damaged/defective items: Full refund with photo evidence",
            "Must be in original packaging with intact seal",
          ],
          timeframe: "30 days from delivery",
          restockingFee: "None for unopened items",
          shippingRefund: "Original shipping costs are non-refundable",
          notes: "For health and safety regulations, opened supplement products cannot be returned or refunded unless defective."
        };
      case "equipment":
        return {
          returnable: "Yes",
          conditions: [
            "Unused condition with all original packaging",
            "All accessories and manuals included",
            "Item must be in resalable condition",
            "No signs of wear or assembly",
          ],
          timeframe: "30 days from delivery",
          restockingFee: "15% for opened boxes",
          shippingRefund: "Return shipping paid by customer",
          notes: "Equipment must be unused and in original condition. Assembly voids return eligibility."
        };
      case "apparel":
        return {
          returnable: "Yes",
          conditions: [
            "Unworn with tags attached",
            "No signs of wear, washing, or odor",
            "Hygiene items (underwear, swimwear) must be unopened",
            "Original packaging preferred",
          ],
          timeframe: "30 days from delivery",
          restockingFee: "None",
          shippingRefund: "Free return shipping on defective items only",
          notes: "For hygiene reasons, certain items cannot be returned once opened or tried on."
        };
      default:
        return {
          returnable: "Yes",
          conditions: [
            "Item must be unused and in original condition",
            "Original packaging required",
          ],
          timeframe: "30 days from delivery",
          restockingFee: "None",
          shippingRefund: "Return shipping paid by customer",
          notes: "Standard return policy applies."
        };
    }
  };

  const refundPolicy = getRefundPolicy(product.category);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "Oct 15, 2024",
      comment: "Excellent quality! These bands are perfect for my home workouts. Very durable and the resistance levels are accurate.",
      verified: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "Oct 10, 2024",
      comment: "Great product overall. The door anchor is very secure. Would recommend for anyone looking to add resistance training to their routine.",
      verified: true,
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 5,
      date: "Oct 5, 2024",
      comment: "Best resistance bands I've owned! The quality is superior to other brands I've tried. Worth every penny.",
      verified: true,
    },
  ];

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <Card className="rounded-[20px] overflow-hidden bg-secondary border-border">
              <ImageWithFallback
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </Card>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <Card
                  key={index}
                  className={`rounded-[20px] overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-white">Best Seller</Badge>
                {product.inStock ? (
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    <Check className="w-3 h-3 mr-1" />
                    In Stock ({product.stockCount} available)
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-red-500 text-red-600">
                    Out of Stock
                  </Badge>
                )}
              </div>
              <h1 className="text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-foreground ml-2">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-primary text-4xl">${product.price}</span>
                <span className="text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
                <Badge className="bg-green-500 text-white">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
              </div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-foreground mb-3">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={`w-16 ${
                      selectedSize === size ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-foreground mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-foreground w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-primary text-white gap-2"
                size="lg"
                onClick={onAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <Card className="rounded-[20px] border-border p-6">
              <h3 className="text-foreground mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Shipping Info */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="rounded-[20px] border-border p-4 text-center">
                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </Card>
              <Card className="rounded-[20px] border-border p-4 text-center">
                <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">30-Day Returns</p>
              </Card>
              <Card className="rounded-[20px] border-border p-4 text-center">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Warranty</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Tabs for Details and Reviews */}
        <div className="mt-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="overview" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Overview
              </TabsTrigger>
              <TabsTrigger value="details" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Product Details
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab with Refund Policy */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Product Description */}
                <Card className="rounded-[20px] border-border p-6">
                  <h3 className="text-foreground mb-4">About This Product</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <h4 className="text-foreground mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Refund Policy */}
                <Card className="rounded-[20px] border-border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <RotateCcw className="w-5 h-5 text-primary" />
                    <h3 className="text-foreground">Return & Refund Policy</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Returnable Status */}
                    <div className="bg-secondary/50 rounded-[12px] p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Returnable:</span>
                        <Badge className={refundPolicy.returnable === "Yes" ? "bg-green-500 text-white" : refundPolicy.returnable === "Conditional" ? "bg-yellow-500 text-white" : "bg-red-500 text-white"}>
                          {refundPolicy.returnable}
                        </Badge>
                      </div>
                    </div>

                    {/* Conditions */}
                    <div>
                      <h4 className="text-foreground text-sm mb-2">Conditions:</h4>
                      <ul className="space-y-2">
                        {refundPolicy.conditions.map((condition, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="mt-0.5">{condition}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Timeframe */}
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Return Window:</span>
                        <span className="text-foreground">{refundPolicy.timeframe}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Restocking Fee:</span>
                        <span className="text-foreground">{refundPolicy.restockingFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Return Shipping:</span>
                        <span className="text-foreground text-right flex-1 ml-4">{refundPolicy.shippingRefund}</span>
                      </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-[12px] p-4">
                      <p className="text-xs text-yellow-800">
                        <strong>⚠️ Important:</strong> {refundPolicy.notes}
                      </p>
                    </div>

                    {/* How to Return */}
                    <div className="border-t border-border pt-3">
                      <h4 className="text-foreground text-sm mb-2">How to Request a Return:</h4>
                      <ol className="space-y-1 text-xs text-muted-foreground list-decimal list-inside">
                        <li>Go to "My Orders" {'>'} "Delivered" tab</li>
                        <li>Click "Request Return" on the order</li>
                        <li>Fill out the return form with reason and photos</li>
                        <li>Wait for admin approval (1-2 business days)</li>
                        <li>Ship item back once approved</li>
                        <li>Refund processed within 5-7 days after receiving item</li>
                      </ol>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <Card className="rounded-[20px] border-border p-6">
                <h3 className="text-foreground mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="rounded-[20px] border-border p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-foreground">{review.name}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                              <Check className="w-3 h-3 mr-1" />
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-primary text-primary"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}