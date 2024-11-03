interface ButtonProps {
  onClick?: () => void | null;
  variant: "create" | "cancel";
  type: "button" | "submit";
}

export const Button = ({ onClick, variant, type }: ButtonProps) => {
  const colorClass =
    variant === "create"
      ? "bg-blue-500 hover:bg-blue-700"
      : "bg-red-500 hover:bg-red-700";
  const buttonText = variant === "create" ? "Añadir" : "Cancelar";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-none px-3 py-1 rounded-lg ${colorClass} text-white transition-all duration-75`}
    >
      {buttonText}
    </button>
  );
};
