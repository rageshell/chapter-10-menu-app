export interface ModifierOption {
  id: string;
  name: string;
  priceAdjustment: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  dietary: string[];
  modifierGroups: ModifierGroup[];
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedModifiers: ModifierOption[];
}