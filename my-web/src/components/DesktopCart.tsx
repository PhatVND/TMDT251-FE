import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Truck, CheckCircle, RotateCcw, MapPin, Banknote, QrCode, Loader2, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Input } from "./ui/input";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

interface DesktopCartProps {
  cartItems: any[]; 
  onBack: () => void;
  onCheckout: () => void;
  onUpdateQuantity: (id: any, newQuantity: number) => void;
  onRemoveItem: (id: any) => void;
  onClearCart: () => void;
}

export function DesktopCart({ cartItems, onBack, onCheckout, onUpdateQuantity, onRemoveItem, onClearCart }: DesktopCartProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout'>('cart');
  const [isLoading, setIsLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({ fullName: "", phone: "", address: "", city: "" });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'banking'>('cod');
  
  // --- LOGIC KHUYẾN MÃI & TÍNH TIỀN ---
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE10") {
        setAppliedPromo("SAVE10");
        alert("Áp dụng mã SAVE10 thành công!");
    } else {
        alert("Mã giảm giá không hợp lệ (Thử: SAVE10)");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedPromo === "SAVE10" ? subtotal * 0.1 : 0; // Giảm 10%
  const shipping = subtotal > 1000000 ? 0 : 30000; // Freeship đơn > 1 triệu
  const tax = (subtotal - discount) * 0.08; // Thuế 8%
  const total = subtotal - discount + shipping + tax;

  const handlePayment = async () => {
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
        alert("Vui lòng nhập thông tin giao hàng!"); return;
    }
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        alert(`Đặt hàng thành công! Tổng thanh toán: ${total.toLocaleString()}đ`);
        onClearCart();
        setCheckoutStep('cart');
        setAppliedPromo(null); // Reset mã giảm giá
        onCheckout();
    }, 1500);
  };

  // MOCK DATA ĐƠN HÀNG
  const orders = {
    inTransit: [
      { id: "ORD-123", date: "Nov 1, 2024", status: "In Transit", total: 1550000, items: [{ name: "Whey Protein", img: "https://images.unsplash.com/photo-1593095191071-82b0cdd66110?w=200", qty: 1 }] }
    ],
    delivered: [
      { id: "ORD-111", date: "Oct 25, 2024", status: "Delivered", total: 450000, items: [{ name: "Yoga Mat", img: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=200", qty: 1 }] }
    ]
  };

  // --- MÀN HÌNH THANH TOÁN (CHECKOUT) ---
  if (checkoutStep === 'checkout') {
    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="border-b border-border bg-white sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <Button variant="ghost" onClick={() => setCheckoutStep('cart')} className="gap-2"><ArrowLeft className="w-4 h-4" /> Quay lại giỏ hàng</Button>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <Card className="p-6 border-border">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary"/> Địa chỉ giao hàng</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Họ tên</Label>
                                    <Input 
                                        value={shippingInfo.fullName} 
                                        onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} 
                                        placeholder="Nguyễn Văn A" 
                                        className="border-orange-400 focus-visible:ring-orange-500" // <--- VIỀN CAM
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>SĐT</Label>
                                    <Input 
                                        value={shippingInfo.phone} 
                                        onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} 
                                        placeholder="0909xxxxxx" 
                                        className="border-orange-400 focus-visible:ring-orange-500" // <--- VIỀN CAM
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label>Địa chỉ</Label>
                                    <Input 
                                        value={shippingInfo.address} 
                                        onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} 
                                        placeholder="Số nhà, Tên đường" 
                                        className="border-orange-400 focus-visible:ring-orange-500" // <--- VIỀN CAM
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label>Ghi chú (Tùy chọn)</Label>
                                    <Input 
                                        placeholder="Ví dụ: Giao giờ hành chính" 
                                        className="border-orange-400 focus-visible:ring-orange-500" // <--- VIỀN CAM
                                    />
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6 border-border">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Banknote className="w-5 h-5 text-primary"/> Phương thức thanh toán</h2>
                            <div className="space-y-3">
                                <div className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : ''}`} onClick={() => setPaymentMethod('cod')}>
                                    <Banknote className="w-6 h-6"/> <div><p className="font-medium">COD</p><p className="text-sm text-muted-foreground">Thanh toán khi nhận hàng</p></div>
                                </div>
                                <div className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer ${paymentMethod === 'banking' ? 'border-primary bg-primary/5' : ''}`} onClick={() => setPaymentMethod('banking')}>
                                    <QrCode className="w-6 h-6"/> <div><p className="font-medium">Chuyển khoản QR</p><p className="text-sm text-muted-foreground">Quét mã VietQR</p></div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div>
                        <Card className="p-6 border-border sticky top-24">
                            <h3 className="font-bold text-lg mb-4">Chi tiết đơn hàng</h3>
                            <div className="space-y-3 text-sm mb-4">
                                <div className="flex justify-between"><span>Tạm tính</span><span>{subtotal.toLocaleString()}đ</span></div>
                                <div className="flex justify-between"><span>Phí ship</span><span>{shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()}đ`}</span></div>
                                <div className="flex justify-between"><span>Thuế (8%)</span><span>{tax.toLocaleString()}đ</span></div>
                                {discount > 0 && <div className="flex justify-between text-green-600"><span>Giảm giá ({appliedPromo})</span><span>-{discount.toLocaleString()}đ</span></div>}
                                <Separator className="my-2"/>
                                <div className="flex justify-between font-bold text-lg text-primary"><span>Tổng cộng</span><span>{total.toLocaleString()}đ</span></div>
                            </div>
                            <Button className="w-full bg-primary text-white h-12" onClick={handlePayment} disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin"/> : "Xác nhận đặt hàng"}
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  // --- MÀN HÌNH GIỎ HÀNG ---
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2"><ArrowLeft className="w-4 h-4" /> Tiếp tục mua sắm</Button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-foreground mb-6">Giỏ hàng & Đơn hàng</h1>
        <Tabs defaultValue="cart" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
            <TabsTrigger value="cart" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary gap-2 p-3">
              <ShoppingBag className="w-4 h-4" /> Giỏ hàng ({cartItems.length})
            </TabsTrigger>
            <TabsTrigger value="in-transit" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary gap-2 p-3">
              <Truck className="w-4 h-4" /> Đang giao ({orders.inTransit.length})
            </TabsTrigger>
            <TabsTrigger value="delivered" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary gap-2 p-3">
              <CheckCircle className="w-4 h-4" /> Đã giao ({orders.delivered.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cart">
            {cartItems.length === 0 ? (
              <Card className="p-12 text-center border-border">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-foreground mb-2">Giỏ hàng trống</h2>
                <Button onClick={onBack} className="bg-primary text-white mt-4">Mua sắm ngay</Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="p-4 flex gap-4 border-border">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                        <ImageWithFallback src={item.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between">
                            <div><h3 className="font-medium">{item.name}</h3><p className="text-sm text-muted-foreground">{item.size}</p></div>
                            <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}><Minus className="w-3 h-3" /></Button>
                                <span className="w-6 text-center text-sm">{item.quantity}</span>
                                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}><Plus className="w-3 h-3" /></Button>
                            </div>
                            <span className="font-bold">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <Card className="p-6 border-border sticky top-6">
                    <h3 className="font-semibold mb-4">Tóm tắt đơn hàng</h3>
                    <div className="space-y-3 text-sm mb-4">
                        <div className="flex justify-between text-muted-foreground"><span>Tổng tiền hàng</span><span>{subtotal.toLocaleString()}đ</span></div>
                        {discount > 0 && <div className="flex justify-between text-green-600"><span>Giảm giá ({appliedPromo})</span><span>-{discount.toLocaleString()}đ</span></div>}
                        <div className="flex justify-between text-muted-foreground"><span>Vận chuyển</span><span>{shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()}đ`}</span></div>
                        <div className="flex justify-between text-muted-foreground"><span>Thuế (8%)</span><span>{tax.toLocaleString()}đ</span></div>
                    </div>

                    {/* Ô NHẬP MÃ GIẢM GIÁ - CÓ VIỀN CAM */}
                    <div className="mb-4">
                        <div className="flex gap-2">
                            <Input 
                                placeholder="Mã giảm giá (VD: SAVE10)" 
                                value={promoCode} 
                                onChange={e => setPromoCode(e.target.value)}
                                disabled={appliedPromo !== null}
                                className="border-orange-400 focus-visible:ring-orange-500" // <--- VIỀN CAM
                            />
                            <Button variant="outline" onClick={applyPromo} disabled={appliedPromo !== null || !promoCode.trim()}>
                                Áp dụng
                            </Button>
                        </div>
                        {appliedPromo && <p className="text-green-600 text-xs mt-1 flex items-center"><Check className="w-3 h-3 mr-1"/> Đã áp dụng mã giảm giá</p>}
                    </div>

                    <Separator className="my-4"/>
                    <div className="flex justify-between font-bold text-lg mb-6 text-primary"><span>Tổng thanh toán</span><span>{total.toLocaleString()}đ</span></div>
                    <Button className="w-full bg-primary text-white h-12" onClick={() => setCheckoutStep('checkout')}>Tiến hành đặt hàng</Button>
                    
                    {subtotal < 1000000 && (
                        <p className="text-xs text-center mt-3 text-muted-foreground">Mua thêm <span className="font-bold">{(1000000 - subtotal).toLocaleString()}đ</span> để được Freeship</p>
                    )}
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Tab In Transit */}
          <TabsContent value="in-transit" className="space-y-4">
            {orders.inTransit.map(order => (
                <Card key={order.id} className="p-6 border-border">
                    <div className="flex justify-between mb-4"><h3 className="font-bold">{order.id}</h3><Badge className="bg-blue-500">{order.status}</Badge></div>
                    <div className="flex gap-4">
                        <img src={order.items[0].img} className="w-16 h-16 rounded object-cover" />
                        <div><p className="font-medium">{order.items[0].name}</p><p className="text-sm text-muted-foreground">{order.date}</p></div>
                        <div className="ml-auto font-bold">{order.total.toLocaleString()}đ</div>
                    </div>
                </Card>
            ))}
          </TabsContent>

          {/* Tab Delivered */}
          <TabsContent value="delivered" className="space-y-4">
            {orders.delivered.map(order => (
                <Card key={order.id} className="p-6 border-border">
                    <div className="flex justify-between mb-4"><h3 className="font-bold">{order.id}</h3><Badge className="bg-green-500">{order.status}</Badge></div>
                    <div className="flex gap-4">
                        <img src={order.items[0].img} className="w-16 h-16 rounded object-cover" />
                        <div><p className="font-medium">{order.items[0].name}</p><p className="text-sm text-muted-foreground">{order.date}</p></div>
                        <div className="ml-auto font-bold">{order.total.toLocaleString()}đ</div>
                    </div>
                </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}