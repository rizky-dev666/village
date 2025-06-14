export function Card({ children, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white overflow-hidden ${className} cursor-pointer`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
