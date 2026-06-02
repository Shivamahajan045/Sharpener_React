function Footer() {
  return (
    <footer className="footer" style={{ backgroundColor: "black" }}>
      <div>
        <p className="footer__brand">The Generics</p>
        <p className="footer__copy">
          Built in React with a storefront flow inspired by the reference page.
        </p>
      </div>

      <div className="footer__links">
        <a href="#facebook">Facebook</a>
        <a href="#youtube">Youtube</a>
        <a href="#instagram">Instagram</a>
      </div>
    </footer>
  );
}

export default Footer;
