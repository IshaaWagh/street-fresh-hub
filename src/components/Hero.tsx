import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Truck, Clock } from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-white space-y-6">
          <div className="inline-flex items-center gap-2 bg-fresh-green/20 backdrop-blur-sm rounded-full px-4 py-2 border border-fresh-green/30">
            <Leaf className="h-4 w-4 text-fresh-green" />
            <span className="text-sm font-medium">100% Fresh & Sustainable</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Fresh Raw Materials
            <span className="block bg-gradient-to-r from-fresh-green to-warm-orange bg-clip-text text-transparent">
              For Street Vendors
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 max-w-lg">
            Source the freshest dairy, vegetables, and grains directly from local suppliers. 
            Promote sustainability while ensuring quality for your street food business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="hero" 
              size="hero" 
              onClick={scrollToProducts}
              className="group"
            >
              Shop Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="hero" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Truck className="h-8 w-8 text-fresh-green mb-4" />
            <h3 className="text-white font-semibold mb-2">Daily Delivery</h3>
            <p className="text-gray-200 text-sm">Fresh supplies delivered to your location every morning</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Leaf className="h-8 w-8 text-warm-orange mb-4" />
            <h3 className="text-white font-semibold mb-2">Sustainable</h3>
            <p className="text-gray-200 text-sm">Eco-friendly packaging and locally sourced products</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 sm:col-span-2">
            <Clock className="h-8 w-8 text-fresh-green mb-4" />
            <h3 className="text-white font-semibold mb-2">Flexible Orders</h3>
            <p className="text-gray-200 text-sm">Schedule orders in advance and cancel anytime before delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;