import DietaryBadge from './DietaryBadge'
import PriceTag from './PriceTag'

interface MenuItemProps {
  name: string;
  price: number;
  description: string;
  dietary: string[];
}

function MenuItem({ name, price, description, dietary }: MenuItemProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>{name}</span>
          <DietaryBadge tags={dietary} />
        </div>
        <PriceTag price={price} />
      </div>
      <p style={{ margin: "4px 0 0 0", color: "grey" }}>{description}</p>
    </div>
  )
}

export default MenuItem