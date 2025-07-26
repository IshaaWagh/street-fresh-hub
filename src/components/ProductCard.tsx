import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Minus, Leaf, Clock } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

const ProductCard = ({ product, quantity, onAddToCart, onUpdateQuantity }: ProductCardProps) => {
  const handleIncrease = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      onUpdateQuantity(product.id, quantity - 1);
    }
  };

  const getSustainabilityColor = (score: number) => {
    if (score >= 90) return "bg-fresh-green";
    if (score >= 80) return "bg-sage";
    if (score >= 70) return "bg-warm-orange";
    return "bg-earth-brown";
  };

  const getFreshnessText = (days: number) => {
    if (days <= 3) return "Use within 3 days";
    if (days <= 7) return "Fresh for 1 week";
    if (days <= 30) return "Fresh for 1 month";
    return "Long shelf life";
  };

  return (
    <Card className="group hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:scale-105 bg-gradient-to-b from-card to-cream">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg bg-muted"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <Badge 
              className={`${getSustainabilityColor(product.sustainabilityScore)} text-white px-2 py-1 text-xs`}
            >
              <Leaf className="h-3 w-3 mr-1" />
              {product.sustainabilityScore}%
            </Badge>
            {product.freshnessDays <= 7 && (
              <Badge className="bg-warm-orange text-white px-2 py-1 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Fresh
              </Badge>
            )}
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-fresh-green transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-fresh-green">
              ₹{product.price} <span className="text-sm text-muted-foreground">/ {product.unit}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {getFreshnessText(product.freshnessDays)}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {quantity === 0 ? (
          <Button 
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            variant="sustainable"
            className="w-full"
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrease}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-semibold px-4 py-2 bg-cream rounded-md min-w-[60px] text-center">
              {quantity}
            </span>
            <Button
              variant="sustainable"
              size="icon"
              onClick={handleIncrease}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;