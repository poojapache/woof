import { Box, Paper, TextField } from "@mui/material";
import Button from "../buttons/Button";
import { useState } from "react";
import { auth } from "../../api/endpoints/auth";
import { useAtom } from "jotai";
import {
  userName,
  userEmail,
  isCookieSet,
  error,
  errorMessage,
} from "../../globalStore/atom";

export default function LoginForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [, setName] = useAtom(userName);
  const [email, setEmail] = useAtom(userEmail);
  const [, setCookieSet] = useAtom(isCookieSet);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [, setErrorOcurred] = useAtom(error);
  const [, setErrorOcurredMsg] = useAtom(errorMessage);

  const style = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#F97316",
      },
    },
  };

  /*Function to validate first name and last name*/
  const validateName = (name: string): boolean | string => {
    const nameRegex = /^[A-Za-z]+$/;
    return (
      name.trim() &&
      nameRegex.test(name) &&
      name.length >= 2 &&
      name.length <= 50
    );
  };

  /*Function to validate email */
  const validateEmail = (email: string): boolean | string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() && emailRegex.test(email);
  };

  /*Function to validate first name, last name, and email fields */
  const validateFields = (): boolean | string => {
    const isFirstNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName);
    const isEmailValid = validateEmail(email);

    setFirstNameError(!isFirstNameValid);
    setLastNameError(!isLastNameValid);
    setEmailError(!isEmailValid);

    return isFirstNameValid && isLastNameValid && isEmailValid;
  };

  /*Function to validate fields, call login api on clicking submit button in the login container */
  const handleOnClickSubmit = () => {
    /*Validating login fields */
    if (validateFields()) {
      const postData = {
        name: firstName.trim() + " " + lastName.trim(),
        email: email.trim(),
      };

      /*Calling login api*/
      auth
        .login(postData)
        .then((res) => {
          setName(postData.name);
          setEmail(postData.email);
          setCookieSet(true);
          return res;
        })
        .catch((err) => {
          setErrorOcurred(true);
          setErrorOcurredMsg(err);
        });
    } else {
      setErrorOcurred(true);
      setErrorOcurredMsg("Form validation failed.");
    }
  };

  return (
    <Paper className="p-6 rounded-md shadow-lg m-8">
      <Box id="title-container">
        <h1 className="text-xl text-orange-500 font-bold">Login</h1>
      </Box>
      <Box id="name-container" className="w-full flex justify-between p-1">
        <div className="p-2">
          <TextField
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={firstNameError}
            id="first-name"
            label="First Name"
            helperText={firstNameError ? "Enter a valid first name." : ""}
            variant="outlined"
            placeholder="First Name"
            InputProps={{
              style: { backgroundColor: "white" },
            }}
            sx={style}
          />
        </div>
        <div className="p-2">
          <TextField
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={lastNameError}
            id="last-name"
            label="Last Name"
            helperText={lastNameError ? "Enter a valid last name." : ""}
            variant="outlined"
            placeholder="Last Name"
            InputProps={{
              style: { backgroundColor: "white" },
            }}
            sx={style}
          />
        </div>
      </Box>
      <Box className={`w-full p-1`}>
        <div className="p-2 w-full">
          <TextField
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            id="email"
            label="Email"
            helperText={emailError ? "Enter a valid email address." : ""}
            variant="outlined"
            placeholder="Email"
            InputProps={{
              style: { backgroundColor: "white" },
            }}
            sx={style}
            className="w-full"
          />
        </div>
      </Box>
      <Box className="w-full flex justify-center p-4">
        <Button title={"Submit"} onClick={handleOnClickSubmit} icon={null} />
      </Box>
    </Paper>
  );
}
