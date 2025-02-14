export const Cell = ({ children, updateBoard, index }) => {
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div className="cell" onClick={handleClick}>
      {children}
    </div>
  );
};
