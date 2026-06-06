import type { OrderItem } from "./types";
import { Button } from "@/components/ui/button";

interface OrderPanelProps {
  order: OrderItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onPlace: () => void;
  isPlaced: boolean;
}

export default function OrderPanel({ order, onRemove, onClear, onPlace, isPlaced }: OrderPanelProps) {
  const total = order.reduce(
    (sum, item) => sum + (item.menuItem.price + item.selectedModifiers.reduce(
      (s, mod) => s + mod.priceAdjustment, 0
    )) * item.quantity, 0
  );
  const gst = total / 11;
  const totalItems = order.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-80 bg-white rounded-xl p-5 shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Order ({totalItems} {totalItems === 1 ? "item" : "items"})
      </h2>

      {order.length === 0 && (
        <p className="text-sm text-gray-400 mb-4">No items yet. Tap a dish to add it.</p>
      )}

      <div className="flex flex-col gap-2 mb-4">
        {order.map(item => {
          const modifierTotal = item.selectedModifiers.reduce(
            (s, mod) => s + mod.priceAdjustment, 0
          );
          const linePrice = (item.menuItem.price + modifierTotal) * item.quantity;

          return (
            <div key={item.id} className="flex justify-between items-start">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  {item.menuItem.name}
                </span>
                {item.quantity > 1 && (
                  <span className="text-xs text-gray-400 ml-1">× {item.quantity}</span>
                )}
                {item.selectedModifiers.length > 0 && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.selectedModifiers.map(m => m.name).join(", ")}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">${linePrice.toFixed(2)}</span>
                <Button
                  variant="ghost"
                  className="h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                  onClick={() => onRemove(item.id)}
                >
                  ×
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 pt-3 mb-4 flex flex-col gap-1">
        <div className="flex justify-between text-sm text-gray-500">
          <span>GST included</span>
          <span>${gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>

      {isPlaced && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-green-700 font-medium">✓ Order placed! Kitchen has been notified.</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Button
          className="w-full py-3 text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={order.length === 0}
          onClick={onPlace}
        >
          Place Order
        </Button>
        <Button variant="outline" className="w-full py-3" onClick={onClear}>
          Clear Order
        </Button>
      </div>
    </div>
  );
}