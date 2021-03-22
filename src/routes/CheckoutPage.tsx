import { Box, Button } from "@material-ui/core";
import React, { CSSProperties, useState } from "react";
import DeliveryForm from "../components/DeliveryForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PaymentForm from "../components/PaymentForm";
import UserForm from "../components/UserForm";
import CartView from "../components/CartView";

interface DeliveryInfo {
  supplier: string;
  date: string;
}

export default function CheckoutPage() {
  const [delivery, setDelivery] = useState<DeliveryInfo | undefined>();

  return (
    <>
      <Header type="white" />
      <Box style={checkoutContainer}>
        <CartView />
        <div style={formContainer}>
          <p style={heading}>Dina Uppgifter</p>
          <UserForm />
        </div>
        <div style={formContainer}>
          <p style={heading}>Betalning</p>
          <PaymentForm />
        </div>
        <div style={formContainer}>
          <p style={heading}>Leveransmetod</p>
          <DeliveryForm
            returnValues={(delivery: DeliveryInfo | undefined) =>
              setDelivery(delivery)
            }
          />
        </div>
        <Button variant="contained" color="primary" style={confirmationButton}>
          Slutför köp
        </Button>
      </Box>
      <Footer />
    </>
  );
}

const checkoutContainer: CSSProperties = {
  display: "flex",
  flex: 1,
  margin: "auto",
  padding: "2rem 1rem 4rem 1rem",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  maxWidth: "41rem",
};

const formContainer: CSSProperties = {
  width: "100%",
  padding: "1rem 0",
};

const heading: CSSProperties = {
  margin: "1rem 0 1.5rem 0",
  textAlign: "center",
};

const confirmationButton: CSSProperties = {
  width: "100%",
  fontWeight: 600,
  borderRadius: 0,
  marginTop: "1rem",
};
