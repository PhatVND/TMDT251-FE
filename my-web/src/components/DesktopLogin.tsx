import { Dumbbell, Eye, EyeOff, Home, Lock, Mail, Package, Shield } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { LoginResponse } from "../types/auth";
import { MascotFull } from "./MascotFull";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// --- MOCK DATABASE (COMMENTED OUT) ---
// const MOCK_DB: Record<string, User & { password: string }> = {
//   "customer@fitconnect.com": {
//     id: 1,
//     email: "customer@fitconnect.com",
//     password: "customer123",
//     fullName: "John Anderson",
//     role: "TRAINEE",
//     isTrainee: true, isTrainer: false, isBusinesses: false,
//     gender: "MALE",
//     phoneNumber: "0901234567"
//   },
//   "trainer@fitconnect.com": {
//     id: 2,
//     email: "trainer@fitconnect.com",
//     password: "trainer123",
//     fullName: "Marcus Steel",
//     role: "TRAINER",
//     isTrainee: false, isTrainer: true, isBusinesses: false,
//     specialty: "Bodybuilding",
//     experienceYear: 5,
//     gender: "MALE"
//   },
//   "agent@fitconnect.com": {
//     id: 3,
//     email: "agent@fitconnect.com",
//     password: "agent123",
//     fullName: "Sarah Chen",
//     role: "BUSINESS",
//     isTrainee: false, isTrainer: false, isBusinesses: true,
//     businessName: "California Fitness D1",
//     taxCode: "TAX-001",
//     address: "District 1, HCMC"
//   },
//   "admin@fitconnect.com": {
//     id: 99,
//     email: "admin@fitconnect.com",
//     password: "admin123",
//     fullName: "Alex Morgan",
//     role: "ADMIN",
//     isTrainee: false, isTrainer: false, isBusinesses: false
//   },
// };

export function DesktopLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"TRAINEE" | "TRAINER" | "BUSINESS" | "ADMIN" | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const roleConfig = [
    { type: "TRAINEE", email: "customer@fitconnect.com", icon: Home, color: "bg-blue-500", label: "Trainee" },
    { type: "TRAINER", email: "trainer@fitconnect.com", icon: Dumbbell, color: "bg-primary", label: "Trainer" },
    { type: "BUSINESS", email: "agent@fitconnect.com", icon: Package, color: "bg-green-500", label: "Business" },
    { type: "ADMIN", email: "admin@fitconnect.com", icon: Shield, color: "bg-purple-500", label: "Admin" },
  ] as const;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Vui lòng chọn vai trò.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role: selectedRole })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed.");
        return;
      }

      const responseData: LoginResponse = await response.json();
      login(responseData);
      navigate('/');
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectRole = (role: "TRAINEE" | "TRAINER" | "BUSINESS" | "ADMIN", email: string) => {
    setSelectedRole(role);
    setEmail(email);
    setError("");
  };

  // Demo accounts (các user thử nghiệm - COMMENTED OUT)
  // const fillDemoCredentials = (demoEmail: string) => {
  //   setEmail(demoEmail);
  //   const user = MOCK_DB[demoEmail];
  //   if (user) setPassword(user.password);
  //   setError("");
  // };
  //
  // const demoAccounts = [
  //   { type: "customer", email: "customer@fitconnect.com", icon: Home, color: "bg-blue-500", label: "Trainee" },
  //   { type: "pt", email: "trainer@fitconnect.com", icon: Dumbbell, color: "bg-primary", label: "Trainer" },
  //   { type: "agent", email: "agent@fitconnect.com", icon: Package, color: "bg-green-500", label: "Business" },
  //   { type: "admin", email: "admin@fitconnect.com", icon: Shield, color: "bg-purple-500", label: "Admin" },
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col items-center justify-center text-center">
          <MascotFull className="w-96 h-96 mb-8" />
          <h1 className="text-foreground mb-3">Welcome to FitConnect</h1>
          <p className="text-muted-foreground text-lg max-w-md">
            Your ultimate fitness platform connecting trainers, customers, and wellness products
          </p>
          <div className="mt-8 flex gap-3">
            <Badge className="bg-primary text-white px-4 py-2">Find Trainers</Badge>
            <Badge className="bg-primary text-white px-4 py-2">Book Sessions</Badge>
            <Badge className="bg-primary text-white px-4 py-2">Shop Products</Badge>
          </div>
        </div>

        <Card className="rounded-[20px] border-border p-8 bg-card shadow-lg">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">Sign In</h2>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email" type="email" placeholder="email@fitconnect.com" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-[20px] pl-10 border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password" type={showPassword ? "text" : "password"} placeholder="******" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-[20px] pl-10 pr-10 border-border"
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-[20px]">
                {error}
              </div>
            )}

            {selectedRole && (
              <div className="bg-primary/10 border border-primary/20 text-primary p-3 rounded-[20px]">
                Role: <span className="font-semibold">{roleConfig.find(r => r.type === selectedRole)?.label}</span>
              </div>
            )}

            <Button type="submit" className="w-full h-12 rounded-[20px] bg-primary text-white" disabled={isLoading || !selectedRole}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-semibold">
              Register Now
            </Link>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-4 text-muted-foreground">Select Role</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {roleConfig.map((role) => {
              const Icon = role.icon;
              return (
                <Button
                  key={role.type}
                  type="button"
                  variant="outline"
                  className={`h-auto py-3 rounded-[20px] border-2 transition-all ${selectedRole === role.type
                      ? "border-primary bg-primary/10"
                      : "hover:border-primary hover:bg-primary/5"
                    }`}
                  onClick={() => selectRole(role.type, role.email)}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 ${role.color} rounded-full flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs capitalize">{role.label}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
