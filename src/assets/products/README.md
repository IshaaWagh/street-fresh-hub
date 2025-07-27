# Product Images Organization

## Folder Structure
```
src/assets/products/
├── dairy/
│   ├── milk-fresh-whole.jpg
│   ├── paneer-fresh.jpg
│   └── yogurt-greek.jpg
├── vegetables/
│   ├── onions-red.jpg
│   ├── tomatoes-fresh.jpg
│   ├── potatoes-organic.jpg
│   └── coriander-fresh.jpg
├── grains/
│   ├── rice-basmati.jpg
│   ├── flour-wheat-whole.jpg
│   └── flour-chickpea.jpg
├── spices/
│   ├── turmeric-powder.jpg
│   ├── chili-red-powder.jpg
│   └── cumin-seeds.jpg
├── oils/
│   ├── oil-sunflower.jpg
│   └── oil-mustard.jpg
└── proteins/
    ├── eggs-farm-fresh.jpg
    └── tofu-silken.jpg
```

## Image Guidelines
- **Format**: JPG or PNG
- **Size**: 400x400px recommended
- **Quality**: High resolution for product showcase
- **Naming**: Use descriptive, lowercase names with hyphens

## Usage in Code
Import images as ES6 modules:
```typescript
import milkImage from "@/assets/products/dairy/milk-fresh-whole.jpg";
import onionImage from "@/assets/products/vegetables/onions-red.jpg";
```