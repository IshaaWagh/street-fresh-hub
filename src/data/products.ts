import { Product, Category } from "@/types/product";

export const categories: Category[] = [
  {
    id: "dairy",
    name: "Dairy & Milk",
    icon: "🥛",
    description: "Fresh milk, cheese, yogurt, and dairy products"
  },
  {
    id: "vegetables", 
    name: "Fresh Vegetables",
    icon: "🥬",
    description: "Seasonal vegetables, herbs, and leafy greens"
  },
  {
    id: "grains",
    name: "Grains & Cereals", 
    icon: "🌾",
    description: "Rice, wheat, flour, and other grains"
  },
  {
    id: "spices",
    name: "Spices & Herbs",
    icon: "🌶️", 
    description: "Fresh and dried spices, herbs, and seasonings"
  },
  {
    id: "oils",
    name: "Oils & Condiments",
    icon: "🫒",
    description: "Cooking oils, vinegars, and condiments"
  },
  {
    id: "proteins",
    name: "Proteins",
    icon: "🥚",
    description: "Eggs, paneer, tofu, and protein sources"
  }
];

export const products: Product[] = [
  // Dairy & Milk
  {
    id: "milk-1",
    name: "Fresh Whole Milk",
    category: "dairy",
    price: 60,
    unit: "1L",
    image: "/placeholder.svg", // Replace with: import milkImage from "@/assets/products/dairy/milk-fresh-whole.jpg"
    description: "Farm-fresh whole milk from local dairy farms",
    inStock: true,
    sustainabilityScore: 85,
    freshnessDays: 2
  },
  {
    id: "paneer-1", 
    name: "Fresh Paneer",
    category: "dairy",
    price: 120,
    unit: "250g",
    image: "/placeholder.svg",
    description: "Soft, fresh paneer made daily from pure milk",
    inStock: true,
    sustainabilityScore: 80,
    freshnessDays: 3
  },
  {
    id: "yogurt-1",
    name: "Greek Yogurt",
    category: "dairy", 
    price: 80,
    unit: "200g",
    image: "/placeholder.svg",
    description: "Thick, creamy Greek yogurt with live cultures",
    inStock: true,
    sustainabilityScore: 75,
    freshnessDays: 5
  },

  // Fresh Vegetables
  {
    id: "onion-1",
    name: "Red Onions",
    category: "vegetables",
    price: 40,
    unit: "1kg",
    image: "/placeholder.svg", 
    description: "Fresh red onions, perfect for cooking",
    inStock: true,
    sustainabilityScore: 90,
    freshnessDays: 14
  },
  {
    id: "tomato-1",
    name: "Fresh Tomatoes", 
    category: "vegetables",
    price: 60,
    unit: "1kg",
    image: "/placeholder.svg",
    description: "Ripe, juicy tomatoes sourced from local farms",
    inStock: true,
    sustainabilityScore: 85,
    freshnessDays: 7
  },
  {
    id: "potato-1",
    name: "Organic Potatoes",
    category: "vegetables",
    price: 45,
    unit: "1kg", 
    image: "/placeholder.svg",
    description: "Organic potatoes, perfect for frying and cooking",
    inStock: true,
    sustainabilityScore: 95,
    freshnessDays: 21
  },
  {
    id: "coriander-1",
    name: "Fresh Coriander",
    category: "vegetables",
    price: 20,
    unit: "100g",
    image: "/placeholder.svg",
    description: "Fresh coriander leaves for garnishing",
    inStock: true,
    sustainabilityScore: 90,
    freshnessDays: 5
  },

  // Grains & Cereals
  {
    id: "rice-1",
    name: "Basmati Rice",
    category: "grains",
    price: 150,
    unit: "1kg",
    image: "/placeholder.svg",
    description: "Premium long grain basmati rice",
    inStock: true,
    sustainabilityScore: 70,
    freshnessDays: 365
  },
  {
    id: "wheat-1",
    name: "Whole Wheat Flour",
    category: "grains", 
    price: 50,
    unit: "1kg",
    image: "/placeholder.svg",
    description: "Fresh ground whole wheat flour",
    inStock: true,
    sustainabilityScore: 85,
    freshnessDays: 90
  },
  {
    id: "chickpea-1",
    name: "Chickpea Flour", 
    category: "grains",
    price: 80,
    unit: "500g",
    image: "/placeholder.svg",
    description: "Fine chickpea flour for batters and cooking",
    inStock: true,
    sustainabilityScore: 90,
    freshnessDays: 120
  },

  // Spices & Herbs  
  {
    id: "turmeric-1",
    name: "Turmeric Powder",
    category: "spices",
    price: 100,
    unit: "100g",
    image: "/placeholder.svg",
    description: "Pure turmeric powder with high curcumin content",
    inStock: true,
    sustainabilityScore: 95,
    freshnessDays: 180
  },
  {
    id: "chili-1",
    name: "Red Chili Powder",
    category: "spices",
    price: 120,
    unit: "100g", 
    image: "/placeholder.svg",
    description: "Spicy red chili powder for authentic flavors",
    inStock: true,
    sustainabilityScore: 90,
    freshnessDays: 180
  },
  {
    id: "cumin-1",
    name: "Cumin Seeds",
    category: "spices",
    price: 200,
    unit: "100g",
    image: "/placeholder.svg",
    description: "Aromatic cumin seeds for tempering",
    inStock: true,
    sustainabilityScore: 85,
    freshnessDays: 365
  },

  // Oils & Condiments
  {
    id: "oil-1",
    name: "Sunflower Oil",
    category: "oils",
    price: 140,
    unit: "1L",
    image: "/placeholder.svg",
    description: "Pure sunflower oil for cooking and frying",
    inStock: true,
    sustainabilityScore: 70,
    freshnessDays: 365
  },
  {
    id: "oil-2",
    name: "Mustard Oil",
    category: "oils", 
    price: 160,
    unit: "500ml",
    image: "/placeholder.svg",
    description: "Cold-pressed mustard oil with authentic flavor",
    inStock: true,
    sustainabilityScore: 85,
    freshnessDays: 180
  },

  // Proteins
  {
    id: "eggs-1",
    name: "Farm Fresh Eggs",
    category: "proteins",
    price: 80,
    unit: "12 pieces",
    image: "/placeholder.svg",
    description: "Free-range eggs from local farms",
    inStock: true,
    sustainabilityScore: 90,
    freshnessDays: 21
  },
  {
    id: "tofu-1", 
    name: "Silken Tofu",
    category: "proteins",
    price: 90,
    unit: "200g",
    image: "/placeholder.svg",
    description: "Soft silken tofu, perfect for curries",
    inStock: true,
    sustainabilityScore: 95,
    freshnessDays: 7
  }
];