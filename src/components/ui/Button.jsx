export function Button({
  children,
  onClick,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
  active = false,
}) {
  const baseStyles = `
    font-medium transition-colors focus:outline-none
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  const sizeStyles = {
    sm: "text-sm px-4 py-1.5",
    md: "text-base px-5 py-2",
  };

  const variantStyles = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: active
      ? "bg-green-600 text-white"
      : "text-green-600 hover:bg-green-50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
