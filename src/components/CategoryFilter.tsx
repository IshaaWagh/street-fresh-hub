import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/types/product";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  productCounts: Record<string, number>;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, productCounts }: CategoryFilterProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Button
          variant={selectedCategory === "all" ? "sustainable" : "outline"}
          onClick={() => onCategoryChange("all")}
          className="h-auto p-4 flex flex-col items-center gap-2 relative"
        >
          <span className="text-2xl">🛒</span>
          <span className="text-sm font-medium">All Products</span>
          <Badge className="absolute -top-2 -right-2 bg-warm-orange text-white">
            {Object.values(productCounts).reduce((a, b) => a + b, 0)}
          </Badge>
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "sustainable" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className="h-auto p-4 flex flex-col items-center gap-2 relative"
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="text-sm font-medium text-center">{category.name}</span>
            {productCounts[category.id] > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-warm-orange text-white">
                {productCounts[category.id]}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;