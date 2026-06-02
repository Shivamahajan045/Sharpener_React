import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="product-card__image"
        />
      </div>
      <div className="product-card__body">
        <div>
          <h3>{product.title}</h3>
        </div>
        <div className="product-card__footer">
          <span>{formatPrice(product.price)}</span>
          <button
            className="button button--primary"
            type="button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
