import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Box,
} from "@material-ui/core";
import React, { CSSProperties, useEffect, useState } from "react";
import { Validation } from "../routes/CheckoutPage";
import {
  validateCardNumber,
  validateCVV,
  validateKlarna,
  validateSwish,
  validateValidity,
} from "../../src/validation";
import { theme } from "../styling/colorTheme";
import "../styling/style.css";

export interface Payment {
  option: "swish" | "card" | "klarna";
  info: {
    swish: string;
    card: Card;
    klarna: string;
  };
}

export interface Card {
  cardNumber: string;
  cvv: string;
  validity: string;
}

interface Props {
  userPhone: string;
  payment: Payment;
  setPayment: (payment: React.SetStateAction<Payment>) => void;
  validation: Validation;
  setValidation: (validation: React.SetStateAction<Validation>) => void;
}

export default function PaymentForm({
  userPhone,
  payment,
  setPayment,
  validation,
  setValidation,
}: Props) {
  const [error, setError] = useState({
    swishError: "",
    cardError: "",
    cvvError: "",
    validityError: "",
    klarnaError: "",
  });

  function resetState() {
    setError({
      swishError: "",
      cardError: "",
      cvvError: "",
      validityError: "",
      klarnaError: "",
    });
    setValidation({ ...validation, paymentValidation: false });
  }

  useEffect(() => {
    if (payment.option === "swish") {
      if (error.swishError.length === 0 && payment.info.swish) {
        setValidation((prevValidation) => ({
          ...prevValidation,
          paymentValidation: true,
        }));
      } else {
        setValidation((prevValidation) => ({
          ...prevValidation,
          paymentValidation: false,
        }));
      }
    } else if (payment.option === "card") {
      if (
        error.cardError.length +
          error.cvvError.length +
          error.validityError.length ===
          0 &&
        (payment.info.card.cardNumber,
        payment.info.card.cvv,
        payment.info.card.validity)
      ) {
        setValidation((prevValidation) => ({
          ...prevValidation,
          paymentValidation: true,
        }));
      } else {
        setValidation((prevValidation) => ({
          ...prevValidation,
          paymentValidation: false,
        }));
      }
    } else if (payment.option === "klarna") {
      if (error.klarnaError.length === 0 && payment.info.klarna) {
        setValidation((prevValidation) => ({
          ...prevValidation,
          paymentValidation: true,
        }));
      } else {
        setValidation((prevValidation) => ({
          ...prevValidation,
          paymentValidation: false,
        }));
      }
    }
  }, [error, setValidation, payment]);

  function handleRadioChange(radio: "swish" | "card" | "klarna") {
    setPayment((prevState) => ({ ...prevState, option: radio }));
    resetState();
  }

  function handleInputChange(field: string, fieldValue: string) {
    if (field === "cardNumber" || field === "cvv" || field === "validity") {
      setPayment((prevState) => ({
        ...prevState,
        info: {
          ...prevState.info,
          card: { ...prevState.info.card, [field]: fieldValue },
        },
      }));
    } else {
      setPayment((prevState) => ({
        ...prevState,
        info: { ...prevState.info, [field]: fieldValue },
      }));
    }

    if (field === "swish") {
      setError((prevState) => ({
        ...prevState,
        swishError: validateSwish(fieldValue),
      }));
    }
    if (field === "cardNumber") {
      setError((prevState) => ({
        ...prevState,
        cardError: validateCardNumber(fieldValue),
      }));
    }
    if (field === "cvv") {
      setError((prevState) => ({
        ...prevState,
        cvvError: validateCVV(fieldValue),
      }));
    }
    if (field === "validity") {
      setError((prevState) => ({
        ...prevState,
        validityError: validateValidity(fieldValue),
      }));
    }
    if (field === "klarna") {
      setError((prevState) => ({
        ...prevState,
        klarnaError: validateKlarna(fieldValue),
      }));
    }
  }

  return (
    <Box paddingY={"1rem"}>
      <RadioGroup style={radioContainer} value={payment.option}>
        <p style={heading}>Swish</p>
        <div style={radioContainer}>
          <FormControlLabel
            style={radioButton}
            className="radioButton"
            value="swish"
            onChange={() => {
              handleRadioChange("swish");
              handleInputChange("swish", userPhone);
            }}
            control={<Radio style={{ color: theme.palette.primary.main }} />}
            label={
              <TextField
                style={textField}
                helperText={error.swishError}
                value={payment.info.swish}
                error={Boolean(error.swishError)}
                onChange={(e) => handleInputChange("swish", e.target.value)}
                placeholder={"Telefonnummer"}
                disabled={payment.option === "swish" ? false : true}
                variant="outlined"
                required
                inputProps={{
                  style: textFieldBackground,
                  autoComplete: "tel",
                }}
              />
            }
          />
        </div>
        <p style={heading}>Kort</p>
        <div style={radioContainer}>
          <FormControlLabel
            style={radioButton}
            className="radioButton"
            value="card"
            onChange={() => {
              handleRadioChange("card");
              handleInputChange("cardNumber", "");
              handleInputChange("cvv", "");
              handleInputChange("validity", "");
            }}
            control={<Radio style={{ color: theme.palette.primary.main }} />}
            label={
              <div style={columnContainer}>
                <TextField
                  style={textField}
                  helperText={error.cardError}
                  value={payment.info.card.cardNumber}
                  error={Boolean(error.cardError)}
                  onChange={(e) =>
                    handleInputChange("cardNumber", e.target.value)
                  }
                  placeholder={"Kortnummer"}
                  disabled={payment.option === "card" ? false : true}
                  variant="outlined"
                  inputProps={{
                    style: textFieldBackground,
                    autoComplete: "cc-number",
                  }}
                />
                <div className="rowContainer">
                  <TextField
                    className="textFieldRow"
                    helperText={error.cvvError}
                    value={payment.info.card.cvv}
                    error={Boolean(error.cvvError)}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    placeholder={"CVV/CVC"}
                    disabled={payment.option === "card" ? false : true}
                    variant="outlined"
                    inputProps={{
                      style: textFieldBackground,
                      autoComplete: "cc-csc",
                    }}
                  />
                  <TextField
                    className="textFieldRow"
                    helperText={error.validityError}
                    value={payment.info.card.validity}
                    error={Boolean(error.validityError)}
                    onChange={(e) =>
                      handleInputChange("validity", e.target.value)
                    }
                    disabled={payment.option === "card" ? false : true}
                    variant="outlined"
                    placeholder={"Giltighetsperiod MM/YY"}
                    inputProps={{
                      style: textFieldBackground,
                      autoComplete: "cc-exp",
                    }}
                  />
                </div>
              </div>
            }
          />
        </div>
        <p style={heading}>Klarna</p>
        <div style={radioContainer}>
          <FormControlLabel
            style={radioButton}
            className="radioButton"
            value="klarna"
            onChange={() => {
              handleRadioChange("klarna");
              handleInputChange("klarna", "");
            }}
            control={<Radio style={{ color: theme.palette.primary.main }} />}
            label={
              <TextField
                style={textField}
                helperText={error.klarnaError}
                value={payment.info.klarna}
                error={Boolean(error.klarnaError)}
                onChange={(e) => handleInputChange("klarna", e.target.value)}
                placeholder={"Personnummer"}
                disabled={payment.option === "klarna" ? false : true}
                variant="outlined"
                className={"inputPayment"}
                inputProps={{
                  style: textFieldBackground,
                  autoComplete: "on",
                }}
              />
            }
          />
        </div>
      </RadioGroup>
    </Box>
  );
}

const radioButton: CSSProperties = {
  width: "100%",
  alignSelf: "flex-start",
  margin: "0.5rem 0 0 0",
};

const textField: CSSProperties = {
  width: "100%",
  margin: "0.5rem 0",
};

const textFieldBackground: CSSProperties = {
  backgroundColor: "#ffff",
  borderRadius: 0,
};

const radioContainer: CSSProperties = {
  display: "flex",
  width: "100%",
  flexDirection: "row",
};

const columnContainer: CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
};

const heading: CSSProperties = {
  margin: "1rem 0 0 2.5rem",
};
