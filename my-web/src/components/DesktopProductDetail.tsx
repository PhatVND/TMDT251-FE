import { ArrowLeft, ShoppingCart, Star, Check, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useMemo, useEffect } from "react";

// --- KHO DỮ LIỆU CHI TIẾT ---
const PRODUCTS_DB: Record<string, any> = {
  "101": {
    id: 101, name: "Whey Protein Gold Standard", price: 1550000, originalPrice: 1850000, rating: 4.9, reviewCount: 1250, description: "Sữa tăng cơ Whey Gold Standard cung cấp 24g protein chất lượng cao mỗi lần dùng.", category: "supplements", inStock: true, stockCount: 150,
    images: ["https://images.unsplash.com/photo-1593095191071-82b0cdd66110?w=800", "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800"],
    sizes: ["2Lbs", "5Lbs", "10Lbs"], features: ["24g Protein Isolate", "5.5g BCAAs", "Hương Chocolate"], specifications: { "Trọng lượng": "2.27kg", "Số lần dùng": "74 lần", "Xuất xứ": "USA" }
  },
  "102": { id: 102, name: "Thảm tập Yoga Premium", price: 450000, originalPrice: 650000, rating: 4.7, reviewCount: 340, description: "Thảm tập Yoga cao cấp chống trượt tuyệt đối.", category: "equipment", inStock: true, stockCount: 85, images: ["https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800"], sizes: ["6mm", "8mm"], features: ["Chống trượt 2 mặt", "TPE cao cấp"], specifications: { "Kích thước": "183 x 61 cm", "Độ dày": "6mm" } },
  "103": { id: 103, name: "Dây kháng lực (Bộ 5)", price: 250000, originalPrice: 350000, rating: 4.8, reviewCount: 234, description: "Bộ dây kháng lực chuyên nghiệp 5 cấp độ.", category: "equipment", inStock: true, stockCount: 47, images: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800"], sizes: ["Free Size"], features: ["5 cấp độ kháng lực", "Chất liệu Latex"], specifications: { "Chất liệu": "Latex", "Số lượng": "5 dây" } },
  "104": { id: 104, name: "Găng tay Gym Thoáng khí", price: 180000, originalPrice: 250000, rating: 4.6, reviewCount: 180, description: "Găng tay tập Gym thiết kế hở ngón.", category: "apparel", inStock: false, stockCount: 0, images: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800"], sizes: ["M", "L", "XL"], features: ["Đệm Silicon", "Vải lưới"], specifications: { "Chất liệu": "Microfiber", "Size": "M/L/XL" } },
  "105": { id: 105, name: "Bình nước giữ nhiệt Sport", price: 350000, originalPrice: 450000, rating: 5.0, reviewCount: 42, description: "Bình nước thể thao dung tích 1L.", category: "accessories", inStock: true, stockCount: 100, images: ["https://images.unsplash.com/photo-1602143407151-df111dbd274c?w=800"], sizes: ["1L", "1.5L"], features: ["Giữ nhiệt 24h", "Thép không gỉ"], specifications: { "Dung tích": "1000ml", "Chất liệu": "Inox 304" } }
};

interface DesktopProductDetailProps {
  productId: string;
  onBack: () => void;
  onAddToCart: (product: any, quantity: number, size: string) => void;
}

export function DesktopProductDetail({ productId, onBack, onAddToCart }: DesktopProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const product = useMemo(() => {
    const found = PRODUCTS_DB[productId.toString()];
    return found || PRODUCTS_DB["103"]; 
  }, [productId]);

  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
    if (product?.sizes?.length > 0) setSelectedSize(product.sizes[0]);
  }, [product]);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Marketplace
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <Card className="rounded-[20px] overflow-hidden bg-secondary border-border">
              <ImageWithFallback src={product.images[selectedImage]} alt={product.name} className="w-full h-[500px] object-cover" />
            </Card>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image: string, index: number) => (
                <Card key={index} className={`rounded-[20px] overflow-hidden cursor-pointer border-2 ${selectedImage === index ? "border-primary" : "border-border"}`} onClick={() => setSelectedImage(index)}>
                  <ImageWithFallback src={image} alt={`${product.name} ${index + 1}`} className="w-full h-24 object-cover" />
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-white">Best Seller</Badge>
                {product.inStock ? <Badge variant="outline" className="border-green-500 text-green-600"><Check className="w-3 h-3 mr-1" /> In Stock ({product.stockCount})</Badge> : <Badge variant="outline" className="border-red-500 text-red-600">Out of Stock</Badge>}
              </div>
              <h1 className="text-foreground mb-2 text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-gray-300"}`} />)}
                  <span className="text-foreground ml-2 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-primary text-4xl font-bold">{product.price.toLocaleString()}đ</span>
                <span className="text-muted-foreground line-through text-lg">{product.originalPrice.toLocaleString()}đ</span>
              </div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div>
              <h3 className="text-foreground mb-3 font-semibold">Phân loại</h3>
              <div className="flex gap-2">
                {product.sizes.map((size: string) => (
                  <Button key={size} variant={selectedSize === size ? "default" : "outline"} onClick={() => setSelectedSize(size)}>{size}</Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-foreground mb-3 font-semibold">Số lượng</h3>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={!product.inStock}>-</Button>
                <span className="text-foreground w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))} disabled={!product.inStock}>+</Button>
              </div>
            </div>

            {/* --- ĐÃ SỬA ĐOẠN NÀY --- */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-primary text-white gap-2 h-12 text-lg"
                size="lg"
                onClick={() => onAddToCart(product, quantity, selectedSize)}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="flex-1 h-12 text-lg" disabled={!product.inStock}>
                Buy Now
              </Button>
            </div>
            {/* ----------------------- */}

            <Card className="rounded-[20px] border-border p-6 bg-secondary/20">
              <h3 className="text-foreground mb-4 font-semibold">Đặc điểm nổi bật</h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground"><Check className="w-5 h-5 text-primary mt-0.5" />{feature}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="overview" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-6 py-3">Overview</TabsTrigger>
              <TabsTrigger value="details" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary px-6 py-3">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-8">
                <Card className="p-6 border-border">
                    <h3 className="font-bold mb-2">About Product</h3>
                    <p className="text-muted-foreground">{product.description}</p>
                </Card>
            </TabsContent>
            <TabsContent value="details" className="mt-8">
                <Card className="p-6 border-border">
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(product.specifications).map(([k, v]) => (
                            <div key={k} className="flex justify-between border-b py-2"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v as string}</span></div>
                        ))}
                    </div>
                </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}