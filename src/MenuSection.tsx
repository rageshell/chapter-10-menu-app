import MenuItem from './MenuItem'

interface MenuItemData {
  id: number;
  name: string;
  price: number;
  description: string;
  dietary: string[];
}

interface MenuSectionProps {
  title: string;
  items: MenuItemData[];
}

function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      {items.map(item => (
        <MenuItem
          key={item.id}
          name={item.name}
          price={item.price}
          description={item.description}
          dietary={item.dietary}
        />
      ))}
    </section>
  )
}

export default MenuSection