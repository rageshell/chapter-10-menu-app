interface DietaryBadgeProps {
  tags: string[];
}

function DietaryBadge({ tags }: DietaryBadgeProps) {
  return (
    <div> {tags.map(tag => (
        <span key={tag}>[{tag}]</span>
        ))}
    </div>
  ) 
}

export default DietaryBadge