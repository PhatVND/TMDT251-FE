import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Truck, CheckCircle, RotateCcw, Eye, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Input } from "./ui/input";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { DesktopReturnRequestModal } from "./DesktopReturnRequestModal";

interface DesktopCartProps {
  onBack: () => void;
  onCheckout: () => void;
}

export function DesktopCart({ onBack, onCheckout }: DesktopCartProps) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Resistance Bands Set",
      price: 49.99,
      quantity: 2,
      size: "M",
      image: "https://images.unsplash.com/photo-1626143955141-e3016ac1fbdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXF1aXBtZW50JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjIyNTQ2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      inStock: true,
    },
    {
      id: 2,
      name: "Protein Powder - Chocolate",
      price: 39.99,
      quantity: 1,
      size: "2kg",
      image: "https://images.unsplash.com/photo-1709976142411-26dfc86b13fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBzdXBwbGVtZW50cyUyMG51dHJpdGlvbnxlbnwxfHx8fDE3NjIyNTQ2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      inStock: true,
    },
    {
      id: 3,
      name: "Yoga Mat - Premium",
      price: 29.99,
      quantity: 1,
      size: "Standard",
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
      inStock: false,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [returnRequestModal, setReturnRequestModal] = useState<any>(null);
  const [returnRequests, setReturnRequests] = useState<any[]>([]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.trim()) {
      setAppliedPromo(promoCode);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedPromo === "SAVE10" ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.06;
  const total = subtotal - discount + shipping + tax;

  // Order data from My Orders
  const orders = {
    inTransit: [
      {
        id: "ORD-2024-1234",
        date: "Nov 1, 2024",
        status: "In Transit",
        estimatedDelivery: "Nov 8, 2024",
        items: [
          {
            name: "Premium Resistance Bands Set",
            quantity: 2,
            price: 49.99,
            image: "https://images.unsplash.com/photo-1626143955141-e3016ac1fbdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXF1aXBtZW50JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjIyNTQ2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
          },
        ],
        total: 99.98,
        trackingNumber: "TRK123456789",
      },
      {
        id: "ORD-2024-1235",
        date: "Nov 2, 2024",
        status: "Processing",
        estimatedDelivery: "Nov 10, 2024",
        items: [
          {
            name: "Protein Powder - Chocolate",
            quantity: 1,
            price: 39.99,
            image: "https://images.unsplash.com/photo-1709976142411-26dfc86b13fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBzdXBwbGVtZW50cyUyMG51dHJpdGlvbnxlbnwxfHx8fDE3NjIyNTQ2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
          },
        ],
        total: 39.99,
        trackingNumber: null,
      },
    ],
    delivered: [
      {
        id: "ORD-2024-1220",
        date: "Oct 25, 2024",
        deliveredDate: "Oct 30, 2024",
        status: "Delivered",
        items: [
          {
            name: "Yoga Mat - Premium",
            quantity: 1,
            price: 29.99,
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
          },
          {
            name: "Water Bottle - 1L",
            quantity: 2,
            price: 15.99,
            image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
          },
        ],
        total: 61.97,
      },
      {
        id: "ORD-2024-1215",
        date: "Oct 20, 2024",
        deliveredDate: "Oct 24, 2024",
        status: "Delivered",
        items: [
          {
            name: "Dumbbells Set - 10kg",
            quantity: 1,
            price: 89.99,
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
          },
        ],
        total: 89.99,
      },
    ],
    returns: [
      {
        id: "RET-2024-0045",
        originalOrderId: "ORD-2024-1200",
        date: "Oct 15, 2024",
        returnDate: "Oct 18, 2024",
        status: "Refund Processed",
        reason: "Size not suitable",
        items: [
          {
            name: "Compression Shorts",
            quantity: 1,
            price: 34.99,
            image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80",
          },
        ],
        refundAmount: 34.99,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-foreground mb-6">Shopping Cart & Orders</h1>

        <Tabs defaultValue="cart" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
            <TabsTrigger
              value="cart"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Shopping Cart ({cartItems.length})
            </TabsTrigger>
            <TabsTrigger
              value="in-transit"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary gap-2"
            >
              <Truck className="w-4 h-4" />
              In Transit ({orders.inTransit.length})
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Delivered ({orders.delivered.length})
            </TabsTrigger>
            <TabsTrigger
              value="returns"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Returns ({orders.returns.length})
            </TabsTrigger>
          </TabsList>

          {/* Shopping Cart Tab */}
          <TabsContent value="cart">
            {cartItems.length === 0 ? (
              <Card className="rounded-[20px] border-border p-12 text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-foreground mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Add some products to get started
                </p>
                <Button onClick={onBack} className="bg-primary text-white">
                  Browse Products
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="rounded-[20px] border-border p-6">
                      <div className="flex gap-6">
                        <div className="w-32 h-32 rounded-[12px] overflow-hidden bg-secondary flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-foreground mb-1">{item.name}</h3>
                              <p className="text-muted-foreground text-sm mb-2">Size: {item.size}</p>
                              {!item.inStock && (
                                <p className="text-red-500 text-sm">Out of stock</p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-red-500"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="text-foreground w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <span className="text-foreground text-xl">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="space-y-4">
                  <Card className="rounded-[20px] border-border p-6 sticky top-6">
                    <h3 className="text-foreground mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({appliedPromo})</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Tax (6%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-foreground text-xl">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Promo Code */}
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Promo Code</label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          disabled={appliedPromo !== null}
                          className="border-border"
                        />
                        <Button
                          variant="outline"
                          onClick={applyPromo}
                          disabled={appliedPromo !== null || !promoCode.trim()}
                        >
                          Apply
                        </Button>
                      </div>
                      {appliedPromo && (
                        <p className="text-green-600 text-xs">Promo code applied!</p>
                      )}
                      <p className="text-xs text-muted-foreground">Try: SAVE10 for 10% off</p>
                    </div>

                    <Separator className="my-4" />

                    <Button
                      className="w-full bg-primary text-white"
                      size="lg"
                      onClick={onCheckout}
                      disabled={cartItems.some(item => !item.inStock)}
                    >
                      Proceed to Checkout
                    </Button>

                    {subtotal < 100 && (
                      <p className="text-xs text-muted-foreground text-center mt-3">
                        Add ${(100 - subtotal).toFixed(2)} more for free shipping
                      </p>
                    )}
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          {/* In Transit Orders */}
          <TabsContent value="in-transit" className="space-y-4">
            {orders.inTransit.map((order) => (
              <Card key={order.id} className="rounded-[20px] border-border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-foreground mb-1">Order {order.id}</h3>
                    <p className="text-muted-foreground text-sm">Placed on {order.date}</p>
                  </div>
                  <Badge className={order.status === "In Transit" ? "bg-blue-500 text-white" : "bg-yellow-500 text-white"}>
                    {order.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-20 h-20 rounded-[12px] overflow-hidden bg-secondary flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-foreground">{item.name}</h4>
                        <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                        <p className="text-foreground">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div>
                    <p className="text-muted-foreground text-sm">Estimated Delivery</p>
                    <p className="text-foreground">{order.estimatedDelivery}</p>
                    {order.trackingNumber && (
                      <p className="text-muted-foreground text-xs mt-1">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-sm">Total</p>
                    <p className="text-foreground text-xl">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Track Order
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    Contact Support
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Delivered Orders */}
          <TabsContent value="delivered" className="space-y-4">
            {orders.delivered.map((order) => (
              <Card key={order.id} className="rounded-[20px] border-border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-foreground mb-1">Order {order.id}</h3>
                    <p className="text-muted-foreground text-sm">Placed on {order.date}</p>
                    <p className="text-green-600 text-sm">Delivered on {order.deliveredDate}</p>
                  </div>
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {order.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-20 h-20 rounded-[12px] overflow-hidden bg-secondary flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-foreground">{item.name}</h4>
                        <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                        <p className="text-foreground">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="text-right ml-auto">
                    <p className="text-muted-foreground text-sm">Total</p>
                    <p className="text-foreground text-xl">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1" size="sm">
                    Buy Again
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    Write Review
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    size="sm"
                    onClick={() => setReturnRequestModal(order)}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Request Return
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Returns */}
          <TabsContent value="returns" className="space-y-4">
            {orders.returns.map((returnItem) => (
              <Card key={returnItem.id} className="rounded-[20px] border-border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-foreground mb-1">Return {returnItem.id}</h3>
                    <p className="text-muted-foreground text-sm">
                      Original Order: {returnItem.originalOrderId}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Return Date: {returnItem.returnDate}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Reason: {returnItem.reason}
                    </p>
                  </div>
                  <Badge className="bg-green-500 text-white">
                    {returnItem.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  {returnItem.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-20 h-20 rounded-[12px] overflow-hidden bg-secondary flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-foreground">{item.name}</h4>
                        <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                        <p className="text-foreground">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="text-right ml-auto">
                    <p className="text-muted-foreground text-sm">Refund Amount</p>
                    <p className="text-green-600 text-xl">${returnItem.refundAmount.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Return Request Modal */}
      {returnRequestModal && (
        <DesktopReturnRequestModal
          order={returnRequestModal}
          onClose={() => setReturnRequestModal(null)}
          onSubmit={(returnData) => {
            // Add new return request to list
            const newReturn = {
              id: `RET-2024-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
              originalOrderId: returnData.orderId,
              date: new Date().toLocaleDateString(),
              returnDate: returnData.submittedDate,
              status: "Pending Review",
              reason: returnData.reason,
              description: returnData.description,
              items: returnRequestModal.items,
              refundAmount: returnRequestModal.total,
            };
            setReturnRequests([...returnRequests, newReturn]);
            alert("Return request submitted successfully! Admin will review within 1-2 business days.");
          }}
        />
      )}
    </div>
  );
}