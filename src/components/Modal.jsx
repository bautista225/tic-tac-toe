export const Modal = ({ title, children }) => {
  return (
    <section className="modal">
      <div className="content">
        <span className="title">{title}</span>
        {children}
      </div>
    </section>
  );
};
