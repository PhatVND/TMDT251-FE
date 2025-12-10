import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Dumbbell, Package, Shield, Home, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { MascotFull } from "./MascotFull";
import { Badge } from "./ui/badge";

// Mock user accounts for demonstration
const MOCK_USERS = {
  "customer@fitconnect.com": { password: "customer123", type: "customer", name: "John Anderson" },
  "trainer@fitconnect.com": { password: "trainer123", type: "pt", name: "Marcus Steel" },
  "agent@fitconnect.com": { password: "agent123", type: "agent", name: "Sarah Chen" },
  "admin@fitconnect.com": { password: "admin123", type: "admin", name: "Alex Morgan" },
};

type UserType = "customer" | "pt" | "agent" | "admin";

interface DesktopLoginProps {
  onLogin: (userType: UserType) => void;
}

export function DesktopLogin({ onLogin }: DesktopLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const user = MOCK_USERS[email as keyof typeof MOCK_USERS];
      
      if (!user) {
        setError("Email not found. Please check your credentials.");
        setIsLoading(false);
        return;
      }

      if (user.password !== password) {
        setError("Incorrect password. Please try again.");
        setIsLoading(false);
        return;
      }

      // Success - login with user type
      onLogin(user.type as UserType);
      setIsLoading(false);
    }, 800);
  };

  const demoAccounts = [
    { type: "customer", email: "customer@fitconnect.com", icon: Home, color: "bg-blue-500" },
    { type: "pt", email: "trainer@fitconnect.com", icon: Dumbbell, color: "bg-primary" },
    { type: "agent", email: "agent@fitconnect.com", icon: Package, color: "bg-green-500" },
    { type: "admin", email: "admin@fitconnect.com", icon: Shield, color: "bg-purple-500" },
  ];

  const fillDemoCredentials = (demoEmail: string) => {
    setEmail(demoEmail);
    const user = MOCK_USERS[demoEmail as keyof typeof MOCK_USERS];
    if (user) {
      setPassword(user.password);
    }
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
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

        {/* Right Side - Login Form */}
        <Card className="rounded-[20px] border-border p-8 bg-card shadow-lg">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">Sign In</h2>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@fitconnect.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-[20px] pl-10 border-border"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-[20px] pl-10 pr-10 border-border"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-[20px]">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-[20px] bg-primary text-white hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-4 text-muted-foreground">Demo Accounts</span>
            </div>
          </div>

          {/* Demo Account Buttons */}
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm mb-3">Quick login with demo accounts:</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((account) => {
                const Icon = account.icon;
                return (
                  <Button
                    key={account.type}
                    type="button"
                    variant="outline"
                    className="h-auto py-3 rounded-[20px] border-2 hover:border-primary hover:bg-primary/5 transition-all"
                    onClick={() => fillDemoCredentials(account.email)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 ${account.color} rounded-full flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs capitalize">{account.type === "pt" ? "Trainer" : account.type}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              All demo accounts use password: <code className="bg-secondary px-2 py-1 rounded">customer123 / trainer123 / agent123 / admin123</code>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <a href="#" className="text-primary hover:underline">
                Sign Up
              </a>
            </p>
            <Button
              type="button"
              variant="ghost"
              className="w-full gap-2 text-muted-foreground hover:text-primary"
              onClick={() => onLogin("ui-kit" as UserType)}
            >
              <Palette className="w-4 h-4" />
              View UI Kit & Design System
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}