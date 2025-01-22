import CancelIcon from "@mui/icons-material/Cancel";
import LoginForm from "../../components/forms/LoginForm";
import { useAtom } from "jotai";
import { isLoginClicked } from "../../globalStore/atom";
import boneTile from "../../images/boneTile.png";

export default function LoginContainer(): JSX.Element {
  const [openLogin, setOpenLogin] = useAtom(isLoginClicked);

  /*Function to close login side bar */
  const handleOnClose = () => {
    setOpenLogin(false);
  };

  return (
    <div
      className={`flex-1 h-full shadow-2xl bg-orange-500 flex flex-col justify-center ${
        openLogin ? "absolute top-0 right-0" : "hidden"
      }`}
      style={{
        backgroundImage: `url(${boneTile}), linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6))`, // Path to your image
        backgroundRepeat: "repeat",
        backgroundSize: "50px 50px",
      }}
    >
      <div className="flex w-full justify-start p-4">
        <CancelIcon
          className={`text-slate-700 text-xl hover:cursor-pointer`}
          onClick={handleOnClose}
        />
      </div>
      <div className="flex-1 flex justify-center items-center h-full">
        <LoginForm />
      </div>
    </div>
  );
}
