export const Turn = ({ children, isSelected }) => {
  const className = `player ${isSelected ? "is-selected" : ""}`;
  return <div className={className}>{children}</div>;
};
