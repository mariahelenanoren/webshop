import { Box } from "@material-ui/core";
import React from "react";
import DeliveryForm from "../components/DeliveryForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PaymentForm from "../components/PaymentForm";
import UserForm from "../components/UserForm";
import CartView from "../components/CartView";




export default function CheckoutPage() {

//Lägg leveransmetod även i Context och användhär

  return (
    <>

      <Header type="white" />
      <Box
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
       
        <CartView/>
         <p>Dina Uppgifter</p>
        <UserForm/>
        <p>Betalning</p>
        <PaymentForm />
        <p>Leveransmetod</p>
        <DeliveryForm />
      </Box>
      <Footer />
    </>

  );
}
