import { Box } from "@mui/material";
import LoginContainer from "./LoginContainer";
import PictureContainer from "./PictureContainer";
import { useAtom } from "jotai";
import { isLoginClicked } from "../../globalStore/atom";
import Footer from "../../components/footer/Footer";

export default function MainContentContainer(): JSX.Element {
  const [openLogin] = useAtom(isLoginClicked);
  return (
    <>
      <Box className="bg-white flex w-full flex-1">
        <PictureContainer />
        {openLogin && <LoginContainer />}
      </Box>
      <Footer />
    </>
  );
}
