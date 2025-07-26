import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Leaf, User } from "lucide-react";

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartItemsCount, onCartClick }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-fresh-green" />
          <span className="text-xl font-bold bg-gradient-to-r from-fresh-green to-earth-brown bg-clip-text text-transparent">
            FreshSupply
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
            Login
          </Button>
          
          <Button 
            variant="cart" 
            size="sm" 
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-warm-orange text-white text-xs">
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;