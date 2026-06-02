const tours = [
  {
    date: "JUL 16",
    city: "DETROIT, MI",
    venue: "DTE ENERGY MUSIC THEATRE",
  },
  {
    date: "JUL 19",
    city: "TORONTO, ON",
    venue: "BUDWEISER STAGE",
  },
  {
    date: "JUL 22",
    city: "BRISTOW, VA",
    venue: "JIGGY LUBE LIVE",
  },
  {
    date: "JUL 29",
    city: "PHOENIX, AZ",
    venue: "AK-CHIN PAVILION",
  },
  {
    date: "AUG 2",
    city: "LAS VEGAS, NV",
    venue: "T-MOBILE ARENA",
  },
  {
    date: "AUG 7",
    city: "CONCORD, CA",
    venue: "CONCORD PAVILION",
  },
];

function ToursSection() {
  return (
    <section className="tours-section">
      <h2 className="section-title">Tours</h2>
      <div className="tours-list">
        {tours.map((tour) => (
          <div className="tour-row" key={`${tour.date}-${tour.city}`}>
            <span className="tour-row__date">{tour.date}</span>
            <span className="tour-row__city">{tour.city}</span>
            <span className="tour-row__venue">{tour.venue}</span>
            <button className="tour-row__button" type="button">
              BUY TICKETS
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ToursSection;
