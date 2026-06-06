import { useState } from "react";
import type { OrderItem, MenuItem, ModifierOption } from "./types";
import menuData from "./menuData";
import OrderPanel from "./OrderPanel";
import ModifierPicker from "./components/ModifierPicker";

export default function App() {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [isPlaced, setIsPlaced] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  function handleAddToOrder(item: MenuItem, selectedModifiers: ModifierOption[]) {
    const existing = order.find(o =>
      o.menuItem.id === item.id &&
      JSON.stringify(o.selectedModifiers) === JSON.stringify(selectedModifiers)
    );

    if (existing) {
      setOrder(order.map(o =>
        o.id === existing.id ? { ...o, quantity: o.quantity + 1 } : o
      ));
    } else {
      setOrder([...order, {
        id: crypto.randomUUID(),
        menuItem: item,
        quantity: 1,
        selectedModifiers,
      }]);
    }
    setIsPlaced(false);
  }

  function handleRemoveItem(id: string) {
    setOrder(
      order.map(o => o.id === id ? { ...o, quantity: o.quantity - 1 } : o)
        .filter(o => o.quantity > 0)
    );
  }

  function handleClear() {
    setOrder([]);
    setIsPlaced(false);
  }

  // Group menu items by category
  const categories = [...new Set(menuData.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">The Anchor POS</h1>

      <div className="flex gap-6 items-start">

        {/* LEFT — Menu */}
        <div className="flex-1">
          {categories.map(category => (
            <div key={category} className="mb-6">
              <h2 className="text-lg font-bold text-gray-700 capitalize mb-3">
                {category}
              </h2>
              <div className="flex flex-col gap-3">
                {menuData.filter(item => item.category === category).map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm cursor-pointer hover:border-emerald-400 hover:shadow-md transition-all"
                    onClick={() => {
                      if (item.modifierGroups.length === 0) {
                        handleAddToOrder(item, []);
                      } else {
                        setSelectedItem(item);
                      }
                    }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-900">{item.name}</span>
                      <span className="text-green-600 font-medium">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                    {item.dietary.length > 0 && (
                      <div className="flex gap-2">
                        {item.dietary.map(tag => (
                          <span key={tag} className="text-xs font-medium px-2 py-1 bg-gray-200 text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — Order Panel */}
        <OrderPanel
          order={order}
          onRemove={handleRemoveItem}
          onClear={handleClear}
          onPlace={() => setIsPlaced(true)}
          isPlaced={isPlaced}
        />

      </div>

      {/* Modifier Picker Modal */}
      <ModifierPicker
        item={selectedItem}
        onConfirm={handleAddToOrder}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}