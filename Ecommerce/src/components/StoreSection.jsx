import ProductGrid from "./ProductGrid";

function StoreSection({ title, products }) {
  return (
    <section className="store-section" id="store">
      <div className="section-title store-section__header">{title}</div>
      <ProductGrid products={products} />
    </section>
  );
}

export default StoreSection;
