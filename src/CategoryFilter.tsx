interface CategoryFilterProps {
  categories: string[];
}

function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <div style={{ margin: "24px 0" }}>
      {categories.map(category => (
        <button key={category}>{category}</button>
      ))}
    </div>
  )
}

export default CategoryFilter