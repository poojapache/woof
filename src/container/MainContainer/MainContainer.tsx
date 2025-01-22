import { Box } from "@mui/material";
import Navbar from "../../components/header/Navbar";
import MainContentContainer from "./MainContentContainer";
import { useAtom } from "jotai";
import {
  error,
  errorMessage,
  isCookieSet,
  isLoginClicked,
} from "../../globalStore/atom";
import DogSearchContainer from "../DogSearchContainer/DogSearchContainer";
import ErrorContainer from "../ErrorContainer/ErrorContainer";

export default function MainContainer() {
  const [openLogin, setOpenLogin] = useAtom(isLoginClicked);
  const [showHomePage] = useAtom(isCookieSet);
  const [errorOccurred] = useAtom(error);
  const [errorOccurredMsg] = useAtom(errorMessage);

  /*Function to refresh/reset the app */
  const onReset = () => {
    window.location.reload();
  };

  /*Function to open/close login side panel */
  const onLoginButtonClick = () => {
    setOpenLogin(!openLogin);
  };

  return (
    <>
      {errorOccurred && errorOccurredMsg ? (
        <ErrorContainer message={errorOccurredMsg} />
      ) : (
        <>
          {!showHomePage ? (
            <Box className="w-screen h-screen flex flex-col">
              <Navbar handleOnClick={onLoginButtonClick} />
              <MainContentContainer />
            </Box>
          ) : (
            <DogSearchContainer onReset={onReset} />
          )}
        </>
      )}
    </>
  );
}
