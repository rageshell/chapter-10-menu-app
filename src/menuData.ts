import type { MenuItem, ModifierGroup } from './types'

const sauces: ModifierGroup = {
  id: "sauces",
  name: "Sauce",
  required: true,
  options: [
    { id: "sauce-classic", name: "Classic", priceAdjustment: 0 },
    { id: "sauce-bbq", name: "BBQ", priceAdjustment: 0 },
    { id: "sauce-aioli", name: "Aioli", priceAdjustment: 0 },
  ]
};

const extras: ModifierGroup = {
  id: "extras",
  name: "Extra",
  required: false,
  options: [
    { id: "bac", name: "Add Bacon", priceAdjustment: 3 },
    { id: "cheese", name: "Extra Cheese Slice", priceAdjustment: 1 },
    { id: "noonion", name: "No Onion", priceAdjustment: 0 },
  ]
};

const coffee: ModifierGroup = {
  id: "coffee",
  name: "CoffeeOptions",
  required: false,
  options: [
    { id: "ski", name: "Skinny Milk", priceAdjustment: 0 },
    { id: "str", name: "Double Shot", priceAdjustment: 1 },
    { id: "hot", name: "Extra Hot", priceAdjustment: 0 },
  ]
};

const menuData: MenuItem[] = [
  { id: "1", name: "Barramundi", description: "Pan seared, with herbs and olive oil", price: 38, category: "mains", dietary: ["GF", "DF"], modifierGroups: [] },
  { id: "2", name: "Chicken Burger", description: "With free-range grilled chicke fillet, lettuce, tomato, tasty cheese, beetroot and onion",price: 24, category: "mains", dietary: [], modifierGroups: [sauces, extras] },
  { id: "3", name: "Chips", description: "thick cut, seasoned",price: 12, category: "sides", dietary: ["VG", "GF"], modifierGroups: [sauces] },
  { id: "4", name: "Flat White", description: "Classic Aussie",price: 5, category: "drinks", dietary: ["V"], modifierGroups: [coffee] },
  { id: "5", name: "House Red", description: "Perfect with any meat dish", price: 14, category: "drinks", dietary: [], modifierGroups: [] },
];

export default menuData