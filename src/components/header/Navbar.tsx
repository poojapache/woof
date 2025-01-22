import { Box } from "@mui/material";
import Button from "../../components/buttons/Button";
import { useAtomValue } from "jotai";
import { isLoginClicked } from "../../globalStore/atom";
import { LoginOutlined } from "@mui/icons-material";

interface NavbarProps {
  handleOnClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Navbar({ handleOnClick }: NavbarProps): JSX.Element {
  const isLogin = useAtomValue(isLoginClicked);
  return (
    <Box className="flex justify-end items-center w-full px-6 py-4 h-20">
      {!isLogin && (
        <Button
          title={"Login"}
          onClick={handleOnClick}
          icon={<LoginOutlined className="text-white text-sm" />}
        />
      )}
    </Box>
  );
}
