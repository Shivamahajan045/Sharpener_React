function Header({ compact = false, showActions = false }) {
  return (
    <header className={`hero ${compact ? "hero--compact" : ""}`} id="home">
      <div className="hero__content">
        <h1>The Generics.</h1>
        {showActions ? (
          <>
            <button className="hero__album-button" type="button">
              Get our Latest Album
            </button>
            <button
              className="hero__play-button"
              type="button"
              aria-label="Play latest music"
            >
              <span className="hero__play-icon" aria-hidden="true">
                {">"}
              </span>
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
