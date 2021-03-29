import { TextField, Box, makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import { theme } from "../styling/colorTheme";
import { useEffect, useState } from "react";
import { Validation } from "../routes/CheckoutPage";
import {
  validateAddress,
  validateCity,
  validateName,
  validatePostalcode,
  validatePhone,
  validateEmail,
} from "../../src/validation";

export interface UserInfo {
  name: string;
  adress: string;
  postal: string;
  city: string;
  email: string;
  phone: string;
}

interface Props {
  user: UserInfo;
  setUser: (user: UserInfo) => void;
  validation: Validation;
  setValidation: (validation: React.SetStateAction<Validation>) => void;
}

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export default function UserForm({
  user,
  setUser,
  validation,
  setValidation,
}: Props) {
  const classes = useStyles();
  const [error, setError] = useState({
    nameError: "",
    adressError: "",
    postalError: "",
    cityError: "",
    emailError: "",
    phoneError: "",
  });

  useEffect(() => {
    if (
      error.nameError.length +
        error.adressError.length +
        error.postalError.length +
        error.cityError.length +
        error.emailError.length +
        error.phoneError.length ===
        0 &&
      (user.name, user.adress, user.postal, user.city, user.email, user.phone)
    ) {
      setValidation((prevValidation) => ({
        ...prevValidation,
        userValidation: true,
      }));
    } else {
      setValidation((prevValidation) => ({
        ...prevValidation,
        userValidation: false,
      }));
    }
  }, [user, error, setValidation]);

  const handleChange = (field: keyof UserInfo, fieldValue: string) => {
    setUser({ ...user, [field]: fieldValue });

    if (field === "name") {
      setError((prevState) => ({
        ...prevState,
        nameError: validateName(fieldValue),
      }));
    }
    if (field === "adress") {
      setError((prevState) => ({
        ...prevState,
        adressError: validateAddress(fieldValue),
      }));
    }
    if (field === "postal") {
      setError((prevState) => ({
        ...prevState,
        postalError: validatePostalcode(fieldValue),
      }));
    }
    if (field === "city") {
      setError((prevState) => ({
        ...prevState,
        cityError: validateCity(fieldValue),
      }));
    }
    if (field === "email") {
      setError((prevState) => ({
        ...prevState,
        emailError: validateEmail(fieldValue),
      }));
    }
    if (field === "phone") {
      setError((prevState) => ({
        ...prevState,
        phoneError: validatePhone(fieldValue),
      }));
    }
  };

  return (
    <Box paddingY={"1rem"}>
      <TextField
        value={user.name}
        onChange={(e) => handleChange("name", e.target.value)}
        inputProps={{ autoComplete: "name", style: inputField }}
        className={classes.inputField}
        placeholder="Namn"
        variant="outlined"
        error={Boolean(error.nameError)}
        helperText={error.nameError}
      />
      <TextField
        value={user.adress}
        onChange={(e) => handleChange("adress", e.target.value)}
        error={Boolean(error.adressError)}
        helperText={error.adressError}
        className={classes.inputField}
        inputProps={{ autoComplete: "street-address", style: inputField }}
        placeholder="Adress"
        variant="outlined"
      />
      <TextField
        value={user.postal}
        onChange={(e) => handleChange("postal", e.target.value)}
        error={Boolean(error.postalError)}
        helperText={error.postalError}
        className={classes.inputField}
        inputProps={{
          autoComplete: "postal-code",
          style: inputField,
        }}
        name="ZipCode"
        placeholder="Postnummer"
        variant="outlined"
      />
      <TextField
        value={user.city}
        onChange={(e) => handleChange("city", e.target.value)}
        error={Boolean(error.cityError)}
        helperText={error.cityError}
        className={classes.inputField}
        inputProps={{
          autoComplete: "address-level2",
          style: inputField,
        }}
        placeholder="Stad"
        variant="outlined"
      />
      <TextField
        value={user.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={Boolean(error.emailError)}
        helperText={error.emailError}
        className={classes.inputField}
        inputProps={{ autoComplete: "email", style: inputField }}
        placeholder="Mail"
        variant="outlined"
      />
      <TextField
        value={user.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        error={Boolean(error.phoneError)}
        helperText={error.phoneError}
        className={classes.inputField}
        placeholder="Telefonnummer"
        variant="outlined"
        inputProps={{ autoComplete: "tel", style: inputField }}
      />
    </Box>
  );
}

const inputField: CSSProperties = {
  backgroundColor: theme.palette.secondary.main,
};
