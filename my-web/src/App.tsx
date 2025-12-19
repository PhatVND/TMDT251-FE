import { useState } from "react";
import { DesktopLogin } from "./components/DesktopLogin";
import { DesktopHeader } from "./components/DesktopHeader";
import { DesktopFeaturedTrainers } from "./components/DesktopFeaturedTrainers";
import { DesktopPTProfile } from "./components/DesktopPTProfile";
import { BookingFlow } from "./components/BookingFlow";
import { DesktopGymCenters } from "./components/DesktopGymCenters";
import { DesktopGymCenterDetail } from "./components/DesktopGymCenterDetail";
import { DesktopGymStores } from "./components/DesktopGymStores";
import { DesktopGymStoreDetail } from "./components/DesktopGymStoreDetail";
import { DesktopMarketplace } from "./components/DesktopMarketplace";
import { DesktopProductDetail } from "./components/DesktopProductDetail";
import { DesktopCart } from "./components/DesktopCart";
import { DesktopOrders } from "./components/DesktopOrders";
import { DesktopAbout } from "./components/DesktopAbout";
import { DesktopUserProfile } from "./components/DesktopUserProfile";
import { DesktopMyPT } from "./components/DesktopMyPT";
import { DesktopCustomerHome } from "./components/DesktopCustomerHome";
import { DesktopQuickBooking } from "./components/DesktopQuickBooking";
import { DesktopPTDashboard } from "./components/DesktopPTDashboard";
import { DesktopAdminDashboard } from "./components/DesktopAdminDashboard";
import { DesktopUIKit } from "./components/DesktopUIKit";
import { DesktopAgentDashboard } from "./components/DesktopAgentDashboard";
import { DesktopAgentAddGym } from "./components/DesktopAgentAddGym";
import { DesktopAgentGymDetail } from "./components/DesktopAgentGymDetail";
import { DesktopAgentAddProduct } from "./components/DesktopAgentAddProduct";
import { DesktopPTDashboardNew } from "./components/DesktopPTDashboardNew";
import { DesktopPTBookings } from "./components/DesktopPTBookings";
import { DesktopPTMessages } from "./components/DesktopPTMessages";
import { DesktopPTGymInfo } from "./components/DesktopPTGymInfo";
import { DesktopRefundPolicy } from "./components/DesktopRefundPolicy";

type UserType = "customer" | "pt" | "agent" | "admin" | "ui-kit";
type Screen = "home" | "featured-trainers" | "gym-centers" | "gym-center-detail" | "profile" | "booking" | "gym-stores" | "gym-store-detail" | "marketplace" | "product-detail" | "cart" | "orders" | "about" | "user-profile" | "my-pt" | "ui-kit" | "agent-dashboard" | "agent-gym-detail" | "pt-dashboard" | "pt-bookings" | "pt-messages" | "pt-gym-info" | "refund-policy";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>("featured-trainers");
  const [selectedTrainerId, setSelectedTrainerId] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedGymId, setSelectedGymId] = useState<number | null>(null);
  const [selectedGymCenterId, setSelectedGymCenterId] = useState<number | null>(null);
  const [selectedAgentGymId, setSelectedAgentGymId] = useState<number | null>(null);
  const [showQuickBooking, setShowQuickBooking] = useState(false);
  const [showAddGym, setShowAddGym] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);  // Calculate cart count
  // Tính tổng số lượng để hiện trên Header
const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

// 2. Hàm thêm vào giỏ (Logic thông minh: Nếu có rồi thì tăng số lượng)
const handleAddToCart = (product: any, quantity: number = 1, size: string = "M") => {
    setCartItems(prev => {
        const existingItem = prev.find(item => item.id === product.id);
        if (existingItem) {
            return prev.map(item => 
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
        }
        return [...prev, { ...product, quantity, size }];
    });
    alert("Đã thêm vào giỏ hàng!");
};

// Hàm sửa số lượng trong giỏ
const handleUpdateCartQuantity = (id: any, newQty: number) => {
    if (newQty < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
};

// Hàm xóa khỏi giỏ
const handleRemoveFromCart = (id: any) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
};

  // Handle login
  const handleLogin = (type: UserType) => {
    setIsLoggedIn(true);
    setUserType(type);
    // Set appropriate default screen based on user type
    if (type === "agent") {
      setCurrentScreen("agent-dashboard");
    } else if (type === "pt") {
      setCurrentScreen("pt-dashboard");
    } else {
      setCurrentScreen("featured-trainers");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setCurrentScreen("featured-trainers");
    setSelectedTrainerId(null);
    setSelectedProductId(null);
    setShowQuickBooking(false);
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <DesktopLogin onLogin={handleLogin} />;
  }

  // Customer flow
  if (userType === "customer") {
    const headerProps = {
      userType: "Customer",
      onSwitchUser: () => setUserType(null),
      onNavigateHome: () => setCurrentScreen("featured-trainers"),
      onNavigateTrainers: () => setCurrentScreen("featured-trainers"),
      onNavigateMarketplace: () => setCurrentScreen("gym-stores"),
      onNavigateCart: () => setCurrentScreen("cart"),
      onNavigateOrders: () => setCurrentScreen("orders"),
      onNavigateAbout: () => setCurrentScreen("about"),
      onNavigateProfile: () => setCurrentScreen("user-profile"),
      onBookSession: () => setShowQuickBooking(true),
      onNavigateMyPT: () => setCurrentScreen("my-pt"),
    };

    if (currentScreen === "featured-trainers") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopFeaturedTrainers 
            onTrainerClick={(trainerId) => {
              setSelectedTrainerId(trainerId);
              setCurrentScreen("profile");
            }}
            onViewGyms={() => setCurrentScreen("gym-centers")}
            onShopProducts={() => setCurrentScreen("gym-stores")}
            onRefundPolicyClick={() => setCurrentScreen("refund-policy")}
            onProductClick={(productId) => {
            // 1. Lưu ID sản phẩm vào state (ép kiểu sang string vì ProductDetail dùng string)
            setSelectedProductId(String(productId)); 
            // 2. Chuyển sang màn hình chi tiết
            setCurrentScreen("product-detail");
        }}
          />
          <DesktopQuickBooking
            isOpen={showQuickBooking}
            onClose={() => setShowQuickBooking(false)}
            onSelectTrainer={(id) => {
              setSelectedTrainerId(id);
              setCurrentScreen("profile");
            }}
          />
        </div>
      );
    }

    if (currentScreen === "gym-centers") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopGymCenters 
            onBack={() => setCurrentScreen("featured-trainers")}
            onGymClick={(gymCenterId) => {
              setSelectedGymCenterId(gymCenterId);
              setCurrentScreen("gym-center-detail");
            }}
          />
        </div>
      );
    }

    if (currentScreen === "gym-center-detail" && selectedGymCenterId) {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopGymCenterDetail
            gymId={selectedGymCenterId}
            onBack={() => {
              setCurrentScreen("gym-centers");
              setSelectedGymCenterId(null);
            }}
            onTrainerClick={(trainerId) => {
              setSelectedTrainerId(trainerId);
              setCurrentScreen("profile");
            }}
          />
        </div>
      );
    }

    if (currentScreen === "my-pt") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopMyPT
            onBack={() => setCurrentScreen("featured-trainers")}
            onTrainerSelect={(id) => {
              setSelectedTrainerId(id);
              setCurrentScreen("profile");
            }}
            onBookSession={(id) => {
              setSelectedTrainerId(id);
              setCurrentScreen("booking");
            }}
          />
        </div>
      );
    }

    if (currentScreen === "booking") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <BookingFlow
            onBack={() => {
              if (selectedGymCenterId) {
                setCurrentScreen("gym-center-detail");
              } else {
                setCurrentScreen("profile");
              }
            }}
          />
        </div>
      );
    }

if (currentScreen === "profile" && selectedTrainerId) {
  return (
    <div>
      <DesktopHeader {...headerProps} cartCount={cartCount} />
      <DesktopPTProfile
        // THÊM DÒNG NÀY:
        trainerId={selectedTrainerId} 
        
        onBack={() => {
          if (selectedGymCenterId) {
            setCurrentScreen("gym-center-detail");
          } else {
            setCurrentScreen("featured-trainers");
          }
          setSelectedTrainerId(null);
        }}
        onBooking={() => setCurrentScreen("booking")}
      />
    </div>
  );
}

    if (currentScreen === "gym-stores") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopGymStores 
            onBack={() => setCurrentScreen("featured-trainers")}
            onGymClick={(gymId) => {
              setSelectedGymId(gymId);
              setCurrentScreen("gym-store-detail");
            }}
          />
        </div>
      );
    }

if (currentScreen === "gym-store-detail" && selectedGymId) {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopGymStoreDetail
            gymId={selectedGymId}
            onBack={() => {
              setCurrentScreen("gym-stores");
              setSelectedGymId(null);
            }}
            onProductClick={(productId) => {
              setSelectedProductId(productId);
              setCurrentScreen("product-detail");
            }}
            // 👇 ĐÃ SỬA: Dùng cartItems và handleAddToCart
            cartItems={cartItems} 
            onAddToCart={handleAddToCart} 
          />
        </div>
      );
    }

    if (currentScreen === "marketplace") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopMarketplace 
            onBack={() => setCurrentScreen("featured-trainers")}
            onProductClick={(productId) => {
              setSelectedProductId(productId);
              setCurrentScreen("product-detail");
            }}
            // 👇 ĐÃ SỬA: Dùng cartItems và handleAddToCart
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
          />
        </div>
      );
    }

    if (currentScreen === "product-detail" && selectedProductId) {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopProductDetail
            productId={selectedProductId}
            onBack={() => {
              if (selectedGymId) {
                setCurrentScreen("gym-store-detail");
              } else {
                setCurrentScreen("marketplace");
              }
            }}
        onAddToCart={(product, qty, size) => handleAddToCart(product, qty, size)}/>
        </div>
      );
    }

if (currentScreen === "cart") {
    return (
        <div>
            <DesktopHeader {...headerProps} cartCount={cartCount} />
            <DesktopCart
                cartItems={cartItems} // Truyền mảng hàng thật
                onBack={() => setCurrentScreen("gym-stores")}
                onCheckout={() => { /* Logic sau khi thanh toán xong */ }}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveFromCart}
                onClearCart={() => setCartItems([])} // Xóa giỏ khi mua xong
            />
        </div>
    );
}

    if (currentScreen === "orders") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopOrders onBack={() => setCurrentScreen("featured-trainers")} />
        </div>
      );
    }

    if (currentScreen === "about") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopAbout onBack={() => setCurrentScreen("featured-trainers")} />
        </div>
      );
    }

    if (currentScreen === "refund-policy") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopRefundPolicy onBack={() => setCurrentScreen("featured-trainers")} />
        </div>
      );
    }

    if (currentScreen === "user-profile") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopUserProfile 
            onBack={() => setCurrentScreen("featured-trainers")} 
            userType="Customer"
            onLogout={handleLogout}
          />
        </div>
      );
    }

    return (
      <div>
        <DesktopHeader {...headerProps} cartCount={cartCount} />
        <DesktopCustomerHome
          onTrainerSelect={(id) => {
            // Navigate to featured trainers page
            setCurrentScreen("featured-trainers");
          }}
          onMarketplaceClick={() => setCurrentScreen("gym-stores")}
        />
        <DesktopQuickBooking
          isOpen={showQuickBooking}
          onClose={() => setShowQuickBooking(false)}
          onSelectTrainer={(id) => {
            setSelectedTrainerId(id);
            setCurrentScreen("profile");
          }}
        />
      </div>
    );
  }

  // PT Dashboard
  if (userType === "pt") {
    if (currentScreen === "pt-bookings") {
      return (
        <DesktopPTBookings 
          onBack={() => setCurrentScreen("pt-dashboard")}
          onMessageClient={(clientName) => {
            setCurrentScreen("pt-messages");
          }}
        />
      );
    }

    if (currentScreen === "pt-messages") {
      return (
        <DesktopPTMessages 
          onBack={() => setCurrentScreen("pt-dashboard")}
        />
      );
    }

    if (currentScreen === "pt-gym-info") {
      return (
        <DesktopPTGymInfo 
          onBack={() => setCurrentScreen("pt-dashboard")}
        />
      );
    }

    return (
      <DesktopPTDashboardNew 
        onViewBookings={() => setCurrentScreen("pt-bookings")}
        onViewMessages={() => setCurrentScreen("pt-messages")}
        onViewGym={() => setCurrentScreen("pt-gym-info")}
      />
    );
  }

  // Agent Dashboard
  if (userType === "agent") {
    if (currentScreen === "agent-gym-detail" && selectedAgentGymId) {
      return (
        <div>
          <DesktopHeader userType="Agent" onSwitchUser={() => setUserType(null)} />
          <DesktopAgentGymDetail
            gymId={selectedAgentGymId}
            onBack={() => {
              setCurrentScreen("agent-dashboard");
              setSelectedAgentGymId(null);
            }}
            onAddProduct={() => setShowAddProduct(true)}
          />
          <DesktopAgentAddProduct
            isOpen={showAddProduct}
            onClose={() => setShowAddProduct(false)}
            onSubmit={(productData) => {
              console.log("New product:", productData);
              setShowAddProduct(false);
              // Here you would add the product to the gym
            }}
          />
        </div>
      );
    }

    return (
      <div>
        <DesktopHeader userType="Agent" onSwitchUser={() => setUserType(null)} />
        <DesktopAgentDashboard 
          onAddGym={() => setShowAddGym(true)}
          onGymClick={(gymId) => {
            setSelectedAgentGymId(gymId);
            setCurrentScreen("agent-gym-detail");
          }}
        />
        <DesktopAgentAddGym
          isOpen={showAddGym}
          onClose={() => setShowAddGym(false)}
          onSubmit={(gymData) => {
            console.log("New gym:", gymData);
            setShowAddGym(false);
            // Here you would add the gym to the database
          }}
        />
      </div>
    );
  }

  // Admin Dashboard
  if (userType === "admin") {
    return (
      <div>
        <DesktopHeader userType="Admin" onSwitchUser={() => setUserType(null)} />
        <DesktopAdminDashboard />
      </div>
    );
  }

  // UI Kit
  if (userType === "ui-kit") {
    return (
      <DesktopUIKit onBack={() => {
        setIsLoggedIn(false);
        setUserType(null);
      }} />
    );
  }

  return null;
}