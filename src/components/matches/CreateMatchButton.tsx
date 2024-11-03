import AddSvg from "../../assets/add.svg";

interface CreateMatchButton {
  onClick: () => void;
}

export const CreateMatchButton = ({ onClick }: CreateMatchButton) => {
  return (
    <button
      className="fixed bottom-6 right-6 bg-cyan-700 rounded-full p-2 hover:bg-cyan-800 hover:scale-95 transition-all duration-75"
      type="button"
      onClick={onClick}
    >
      <img src={AddSvg} alt="Agregar partido" />
    </button>
  );
};
