interface ButtonProps {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  onClick,
  title,
  icon = null,
  disabled = false,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`rounded-md shadow-md text-white px-5 py-3 float-right ${
        disabled ? "bg-slate-800" : "bg-orange-500"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-row items-center">
        <h1 className="text-white mr-2">{title}</h1>
        {icon ? icon : ""}
      </div>
    </button>
  );
}
