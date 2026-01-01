// Write your code below:
import "./Card.css";
const Card = ({ children, className }) => {
  return <div className={`card ${className || ""}`}>{children}</div>;
};
export default Card;
