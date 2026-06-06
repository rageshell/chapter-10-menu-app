interface PriceTagProps {
  price: number;
}

function PriceTag({ price }: PriceTagProps) {
  let colour = "green";

  if (price > 40) {
    colour = "red";
  } else if (price >= 20) {
    colour = "orange";
  }

  return (
    <span style={{ color: colour}}>
        ${price.toFixed(2)}
    </span>
  )
}

export default PriceTag