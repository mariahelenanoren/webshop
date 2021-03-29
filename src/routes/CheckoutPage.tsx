import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Header from "../components/Header";
import UserForm, { UserInfo } from "../components/UserForm";
import { Box } from "@material-ui/core";
import CartView from "../components/CartView";
import { generateOrderID } from "../helper";
import { CartContext } from "../contexts/CartContext";
import PaymentForm, { Card, PaymentInfo } from "../components/PaymentForm";
import DeliveryForm, { DeliveryInfo } from "../components/DeliveryForm";
import { Order, sendOrderToApi } from "../mockedAPI";
import OrderConfirmationModal from "../components/OrderConfirmationModal";

export interface Validation {
  cartValidation: boolean;
  paymentValidation: boolean;
  userValidation: boolean;
  deliveryValidation: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "45rem",
    margin: "auto",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ["Dina uppgifter", "Betaluppgifter", "Fraktsätt"];
}

function getStepContent(
  step: number,
  user: UserInfo,
  setUser: (user: UserInfo) => void,
  paymentInfo: PaymentInfo,
  setPaymentInfo: (paymentInfo: PaymentInfo) => void,
  paymentOption: string,
  setPaymentOption: (paymentOption: string) => void,
  delivery: DeliveryInfo,
  setDelivery: (delivery: DeliveryInfo) => void,
  validation: Validation,
  setValidation: (validation: React.SetStateAction<Validation>) => void
) {
  switch (step) {
    case 0:
      return (
        <UserForm
          user={user}
          setUser={setUser}
          validation={validation}
          setValidation={setValidation}
        />
      );
    case 1:
      return (
        <PaymentForm
          userPhone={user.phone}
          paymentInfo={paymentInfo}
          setPaymentInfo={setPaymentInfo}
          paymentOption={paymentOption}
          setPaymentOption={setPaymentOption}
          validation={validation}
          setValidation={setValidation}
        />
      );
    case 2:
      return (
        <DeliveryForm
          delivery={delivery}
          setDelivery={setDelivery}
          validation={validation}
          setValidation={setValidation}
        />
      );
    default:
      return "Unknown error";
  }
}

export default function CheckoutPage() {
  const cartContext = useContext(CartContext);
  const [validation, setValidation] = useState<Validation>({
    cartValidation: false,
    userValidation: false,
    paymentValidation: false,
    deliveryValidation: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([...cartContext.cart]);
  const [orderId] = useState(generateOrderID());
  const [totalPriceOfCart, setTotalPriceOfCart] = useState(
    cartContext.getTotalPriceOfCart
  );
  const [user, setUser] = useState<UserInfo>({
    name: "",
    adress: "",
    postal: "",
    city: "",
    email: "",
    phone: "",
  });
  const [paymentOption, setPaymentOption] = useState("");
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    swish: "",
    card: {
      cardNumber: "",
      cvv: "",
      validity: "",
    },
    klarna: "",
  });
  const [delivery, setDelivery] = useState<DeliveryInfo>({});
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const confirmOrder = () => {
    let payment: string | Card;
    switch (paymentOption) {
      case "swish":
        payment = paymentInfo.swish;
        break;
      case "card":
        payment = paymentInfo.card;
        break;
      case "klarna":
        payment = paymentInfo.klarna;
        break;
      default:
        payment = "";
    }
    const order: Order = {
      cart: cartContext.cart,
      user: user,
      payment: { paymentOption: paymentOption, paymentInfo: payment },
      delivery: delivery,
    };

    setCart([...cartContext.cart]);
    sendOrderToApi(order).then(() => {
      setTotalPriceOfCart(cartContext.getTotalPriceOfCart);
      setShowModal(true);
      cartContext.emptyCart();
    });
  };
  const handleNext = () => {
    activeStep === steps.length - 1
      ? confirmOrder()
      : setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    setValidation((prevValidation) => ({
      ...prevValidation,
      cartValidation: Boolean(cartContext.cart.length),
    }));
  }, [cartContext, setValidation]);

  return (
    <>
      <OrderConfirmationModal
        display={showModal}
        orderId={orderId}
        products={cart}
        name={user.name}
        totalCost={delivery.price! + totalPriceOfCart}
      />
      <Header type="white" />
      <div className={`paddingContainer ${classes.root}`}>
        <CartView />
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Box>
                  {getStepContent(
                    index,
                    user,
                    setUser,
                    paymentInfo,
                    setPaymentInfo,
                    paymentOption,
                    setPaymentOption,
                    delivery,
                    setDelivery,
                    validation,
                    setValidation
                  )}
                </Box>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Bakåt
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={
                        Object.values(validation)[index + 1] &&
                        validation.cartValidation
                          ? false
                          : true
                      }
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? "Slutför köp"
                        : "Nästa"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    </>
  );
}
