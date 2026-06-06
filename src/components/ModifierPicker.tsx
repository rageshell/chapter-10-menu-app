import { useState } from "react";
import type { MenuItem, ModifierGroup, ModifierOption } from "../types";
import { Button } from "@/components/ui/button";

interface ModifierPickerProps {
  item: MenuItem | null;
  onConfirm: (item: MenuItem, selectedModifiers: ModifierOption[]) => void;
  onClose: () => void;
}

export default function ModifierPicker({ item, onConfirm, onClose }: ModifierPickerProps) {
  const [selectedOptions, setSelectedOptions] = useState<ModifierOption[]>([]);

  // Nothing to show if no item is selected
  if (!item) return null;

  function handleOptionClick(group: ModifierGroup, option: ModifierOption) {
    if (group.required) {
      // Single-select — strip existing selection from this group, add new one
      setSelectedOptions([
        ...selectedOptions.filter(o => !group.options.some(go => go.id === o.id)),
        option
      ]);
    } else {
      // Multi-select — toggle on/off
      const alreadySelected = selectedOptions.some(o => o.id === option.id);
      if (alreadySelected) {
        setSelectedOptions(selectedOptions.filter(o => o.id !== option.id));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  }

  function isSelected(option: ModifierOption) {
    return selectedOptions.some(o => o.id === option.id);
  }

  // Block confirm if any required group has no selection
  const requiredGroupsMet = item.modifierGroups
    .filter(g => g.required)
    .every(g => g.options.some(o => selectedOptions.some(s => s.id === o.id)));

  function handleConfirm() {
    onConfirm(item!, selectedOptions);
    setSelectedOptions([]); // reset for next time
    onClose();
  }

  const modifierTotal = selectedOptions.reduce((sum, o) => sum + o.priceAdjustment, 0);

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal panel — stop clicks propagating to backdrop */}
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
        <p className="text-sm text-gray-500 mt-1 mb-5">{item.description}</p>

        {/* Modifier groups */}
        {item.modifierGroups.map(group => (
          <div key={group.id} className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-gray-700">{group.name}</span>
              {group.required
                ? <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Required</span>
                : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Optional</span>
              }
            </div>

            <div className="flex flex-wrap gap-2">
              {group.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(group, option)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
                    ${isSelected(option)
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-emerald-400"
                    }`}
                >
                  {option.name}
                  {option.priceAdjustment > 0 && ` +$${option.priceAdjustment.toFixed(2)}`}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1 py-3" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            disabled={!requiredGroupsMet}
            onClick={handleConfirm}
          >
            Add to Order · ${(item.price + modifierTotal).toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
}