import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, MapPin, Phone, User, CheckCircle } from "lucide-react";
import { CartItem } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

interface DeliverySchedule {
  date: string;
  items: CartItem[];
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
  onOrderComplete: () => void;
}

const CheckoutModal = ({ isOpen, onClose, cartItems, totalAmount, onOrderComplete }: CheckoutModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryDate: "",
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    // Validate form
    if (!formData.name || !formData.phone || !formData.address || !formData.deliveryDate) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to place your order",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      
      toast({
        title: "Order placed successfully!",
        description: `Your order for ₹${totalAmount.toFixed(2)} has been confirmed`,
      });

      // Complete the order after showing success
      setTimeout(() => {
        onOrderComplete();
        setOrderPlaced(false);
        setFormData({ name: "", phone: "", address: "", deliveryDate: "" });
        onClose();
      }, 2000);
    }, 2000);
  };

  // Get tomorrow's date as minimum delivery date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get maximum delivery date (1 week from today)
  const getMaxDeliveryDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    return maxDate.toISOString().split('T')[0];
  };

  if (orderPlaced) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-fresh-green mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-fresh-green mb-2">Order Confirmed!</h3>
            <p className="text-muted-foreground mb-4">
              Your order has been placed successfully and will be delivered on {formData.deliveryDate}
            </p>
            <Badge className="bg-fresh-green text-white">
              Order Total: ₹{totalAmount.toFixed(2)}
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-fresh-green">
            <CreditCard className="h-5 w-5" />
            Checkout
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-fresh-green">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-fresh-green">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-fresh-green">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Delivery Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your complete address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Delivery Date
                </Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                  min={getTomorrowDate()}
                  max={getMaxDeliveryDate()}
                />
              </div>

              <div className="bg-gradient-to-r from-cream to-secondary/50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Delivery Time:</strong> 6:00 AM - 8:00 AM<br />
                  <strong>Scheduling:</strong> Order up to 7 days in advance<br />
                  Orders placed before 9:00 PM will be delivered the next day.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            variant="hero"
            size="lg"
            className="flex-1"
          >
            {isProcessing ? "Processing..." : `Pay ₹${totalAmount.toFixed(2)}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;