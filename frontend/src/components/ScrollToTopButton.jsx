const ScrollToTopButton = ({ show, onClick }) =>
  show ? (
    <button
      onClick={onClick}
      className="btn btn-yellow btn-shadow btn-scroll-top"
    >
      ↑ Top
    </button>
  ) : null;

export default ScrollToTopButton;
