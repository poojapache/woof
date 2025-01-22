import Confetti from "react-confetti";
import DogMatch from "./DogMatch";
import { Paper } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  city?: string;
  state?: string;
}

export default function MatchPopup({
  matchResult,
  onClose,
}: {
  matchResult: Dog | null;
  onClose: () => void;
}): JSX.Element {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Paper className="absolute top-0 bottom-0 left-0 right-0 flex flex-col bg-white z-50">
      <div className="w-full">
        <Close
          className="float-right m-5 hover:cursor-pointer"
          onClick={onClose}
        />
      </div>

      {showConfetti && <Confetti />}
      <DogMatch dog={matchResult} />
    </Paper>
  );
}
