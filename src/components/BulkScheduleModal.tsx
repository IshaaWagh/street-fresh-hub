import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, MapPin, Phone, User, CheckCircle, Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

interface DeliverySchedule {
  date: string;
  items: CartItem[];
}

interface BulkScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

const BulkScheduleModal = ({ isOpen, onClose, cartItems, onOrderComplete }: BulkScheduleModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [deliverySchedules, setDeliverySchedules] = useState<DeliverySchedule[]>([
    { date: getTomorrowDate(), items: [...cartItems] }
  ]);
  const { toast } = useToast();

  function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  function getMaxDeliveryDate() {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 10);
    return maxDate.toISOString().split('T')[0];
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addDeliveryDate = () => {
    if (deliverySchedules.length >= 10) {
      toast({
        title: "Maximum limit reached",
        description: "You can schedule up to 10 delivery dates",
        variant: "destructive",
      });
      return;
    }

    const lastDate = deliverySchedules[deliverySchedules.length - 1]?.date || getTomorrowDate();
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 1);
    
    setDeliverySchedules(prev => [
      ...prev,
      { date: nextDate.toISOString().split('T')[0], items: [...cartItems] }
    ]);
  };

  const updateDeliveryDate = (index: number, date: string) => {
    setDeliverySchedules(prev => 
      prev.map((schedule, i) => 
        i === index ? { ...schedule, date } : schedule
      )
    );
  };

  const updateItemQuantity = (scheduleIndex: number, itemId: string, quantity: number) => {
    if (quantity < 0) return;
    
    setDeliverySchedules(prev => 
      prev.map((schedule, i) => 
        i === scheduleIndex 
          ? {
              ...schedule,
              items: schedule.items.map(item =>
                item.id === itemId ? { ...item, quantity } : item
              ).filter(item => item.quantity > 0)
            }
          : schedule
      )
    );
  };

  const removeDeliveryDate = (index: number) => {
    if (deliverySchedules.length === 1) {
      toast({
        title: "Cannot remove",
        description: "At least one delivery date is required",
        variant: "destructive",
      });
      return;
    }
    
    setDeliverySchedules(prev => prev.filter((_, i) => i !== index));
  };

  const getTotalAmount = () => {
    return deliverySchedules.reduce((total, schedule) => {
      return total + schedule.items.reduce((scheduleTotal, item) => {
        return scheduleTotal + (item.price * item.quantity);
      }, 0);
    }, 0);
  };

  const handlePayment = async () => {
    // Validate form
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "Please fill all fields",
        description: "Name, phone, and address are required",
        variant: "destructive",
      });
      return;
    }

    // Validate schedules
    const validSchedules = deliverySchedules.filter(schedule => 
      schedule.items.length > 0 && schedule.date
    );

    if (validSchedules.length === 0) {
      toast({
        title: "No valid deliveries",
        description: "Please add at least one delivery with items",
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
        title: "Bulk order placed successfully!",
        description: `${validSchedules.length} deliveries scheduled for ₹${getTotalAmount().toFixed(2)}`,
      });

      // Complete the order after showing success
      setTimeout(() => {
        onOrderComplete();
        setOrderPlaced(false);
        setFormData({ name: "", phone: "", address: "" });
        setDeliverySchedules([{ date: getTomorrowDate(), items: [...cartItems] }]);
        onClose();
      }, 3000);
    }, 2000);
  };

  if (orderPlaced) {
    const validSchedules = deliverySchedules.filter(schedule => 
      schedule.items.length > 0 && schedule.date
    );
    
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-fresh-green mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-fresh-green mb-2">Bulk Order Confirmed!</h3>
            <p className="text-muted-foreground mb-4">
              {validSchedules.length} deliveries scheduled successfully
            </p>
            <Badge className="bg-fresh-green text-white">
              Total: ₹{getTotalAmount().toFixed(2)}
            </Badge>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Delivery dates:</p>
              {validSchedules.map((schedule, index) => (
                <p key={index}>• {new Date(schedule.date).toLocaleDateString()}</p>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-fresh-green">
            <Calendar className="h-5 w-5" />
            Bulk Order Scheduling (Up to 10 Days)
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-3 gap-6">
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

              <div className="bg-gradient-to-r from-cream to-secondary/50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Delivery Time:</strong> 6:00 AM - 8:00 AM<br />
                  <strong>Bulk Scheduling:</strong> Order for up to 10 days<br />
                  Same items, same address, different dates.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Schedules */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Delivery Schedule</CardTitle>
              <Button 
                onClick={addDeliveryDate} 
                disabled={deliverySchedules.length >= 10}
                variant="outline" 
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Date
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {deliverySchedules.map((schedule, scheduleIndex) => (
                <Card key={scheduleIndex} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <Input
                          type="date"
                          value={schedule.date}
                          onChange={(e) => updateDeliveryDate(scheduleIndex, e.target.value)}
                          min={getTomorrowDate()}
                          max={getMaxDeliveryDate()}
                          className="w-auto"
                        />
                      </div>
                      {deliverySchedules.length > 1 && (
                        <Button
                          onClick={() => removeDeliveryDate(scheduleIndex)}
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {schedule.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-background/50 p-2 rounded">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => updateItemQuantity(scheduleIndex, item.id, item.quantity - 1)}
                              variant="outline"
                              size="sm"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              onClick={() => updateItemQuantity(scheduleIndex, item.id, item.quantity + 1)}
                              variant="outline"
                              size="sm"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <span className="w-16 text-right text-fresh-green font-medium">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-2 border-t border-border/50">
                      <div className="flex justify-between font-medium">
                        <span>Date Total:</span>
                        <span className="text-fresh-green">
                          ₹{schedule.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium">Total for {deliverySchedules.filter(s => s.items.length > 0).length} deliveries:</span>
              <span className="text-xl font-bold text-fresh-green">₹{getTotalAmount().toFixed(2)}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Free delivery on all scheduled dates • Same items delivered fresh daily
            </p>
          </CardContent>
        </Card>

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
            {isProcessing ? "Processing..." : `Place Bulk Order ₹${getTotalAmount().toFixed(2)}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkScheduleModal;