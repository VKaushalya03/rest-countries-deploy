"use client";

import { Button } from "./ui/button";
import { useUser } from "../context/user-context";
import { Globe, Heart, LogIn, LogOut, Moon, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { useToast } from "./ui/use-toast";

export default function Navbar() {
  const { isLoggedIn, userEmail, logout } = useUser();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Globe className="h-6 w-6" />
          <span>REST Countries</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isLoggedIn ? (
            <>
              <Link to="/favorites">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  <span>Favorites</span>
                </Button>
              </Link>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm hidden md:inline-block">
                  {userEmail}
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
