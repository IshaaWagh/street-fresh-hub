import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import CheckoutModal from "@/components/CheckoutModal";
import BulkScheduleModal from "@/components/BulkScheduleModal";
import { useCart } from "@/hooks/useCart";
import { products, categories } from "@/data/products";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBulkScheduleOpen, setIsBulkScheduleOpen] = useState(false);
  
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getCartItemQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  // Count products per category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(category => {
      counts[category.id] = products.filter(p => p.category === category.id).length;
    });
    return counts;
  }, []);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBulkSchedule = () => {
    setIsCartOpen(false);
    setIsBulkScheduleOpen(true);
  };

  const handleOrderComplete = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setIsBulkScheduleOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <Hero />
      
      <main className="container py-12">
        <section id="products">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            productCounts={productCounts}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={getCartItemQuantity(product.id)}
                onAddToCart={addToCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </section>
      </main>

      <Cart
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
        onBulkSchedule={handleBulkSchedule}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={getTotalPrice()}
        onOrderComplete={handleOrderComplete}
      />

      <BulkScheduleModal
        isOpen={isBulkScheduleOpen}
        onClose={() => setIsBulkScheduleOpen(false)}
        cartItems={cartItems}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
};

export default Index;
