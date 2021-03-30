import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Header from "../components/Header";
import UserForm, { User } from "../components/UserForm";
import { Box, Container, Typography } from "@material-ui/core";
import { CartContext } from "../contexts/CartContext";
import PaymentForm, { Payment } from "../components/PaymentForm";
import DeliveryForm, { Delivery } from "../components/DeliveryForm";
import { Order, sendOrderToApi } from "../mockedAPI";
import OrderConfirmationModal from "../components/OrderConfirmationModal";
import OrderSummaryContainer from "../components/OrderSummaryContainer";
import { generateOrderID } from "../helper";

export interface Validation {
  cartValidation: boolean;
  paymentValidation: boolean;
  userValidation: boolean;
  deliveryValidation: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  stepContainer: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "3rem",
    },
    padding: 0,
    marginRight: 30,
    flex: 6,
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
  costContainer: {
    padding: 0,
    flex: 4,
  },
  heading: {
    fontWeight: 500,
    textTransform: "uppercase",
  },
}));

function getSteps() {
  return ["Dina uppgifter", "Betaluppgifter", "Fraktsätt"];
}

function getStepContent(
  step: number,
  user: User,
  setUser: (user: User) => void,
  payment: Payment,
  setPayment: (payment: React.SetStateAction<Payment>) => void,
  delivery: Delivery,
  setDelivery: (delivery: Delivery) => void,
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
          payment={payment}
          setPayment={setPayment}
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
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const cartContext = useContext(CartContext);
  const [validation, setValidation] = useState<Validation>({
    cartValidation: false,
    userValidation: false,
    paymentValidation: false,
    deliveryValidation: false,
  });
  const [modal, showModal] = useState(false);
  const [user, setUser] = useState<User>({
    name: "",
    adress: "",
    postal: "",
    city: "",
    email: "",
    phone: "",
  });
  const [payment, setPayment] = useState<Payment>({
    option: "swish",
    info: {
      swish: user.phone,
      card: {
        cardNumber: "",
        cvv: "",
        validity: "",
      },
      klarna: "",
    },
  });

  const [delivery, setDelivery] = useState<Delivery>({
    supplier: "",
    date: "",
    price: 0,
  });

  const [order, setOrder] = useState<Order>({
    cart: cartContext.cart,
    user: user,
    payment: {
      option: payment.option,
      info: payment.info[payment.option],
    },
    delivery: delivery,
    cartCost: cartContext.getTotalPriceOfCart(),
    tax: cartContext.getTotalPriceOfCart() * 0.25,
    orderId: generateOrderID(),
  });

  const confirmOrder = () => {
    setOrder({
      cart: cartContext.cart,
      user: user,
      payment: {
        option: payment.option,
        info: payment.info[payment.option],
      },
      delivery: delivery,
      cartCost: cartContext.getTotalPriceOfCart(),
      tax: cartContext.getTotalPriceOfCart() * 0.25,
      orderId: generateOrderID(),
    });
    sendOrderToApi(order).then(() => {
      showModal(true);
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

  useEffect(() => {
    setPayment((prevState) => ({
      ...prevState,
      info: { ...prevState.info, swish: user.phone },
    }));
  }, [setPayment, user.phone]);

  return (
    <>
      {modal && <OrderConfirmationModal order={order} />}
      <Header type="white" />
      <div className={"paddingContainer"}>
        <div className={classes.root}>
          <div className={classes.stepContainer}>
            <Typography className={classes.heading} align="center" variant="h5">
              Utcheckning
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel style={{ color: "#78b445" }}>{label}</StepLabel>
                  <StepContent>
                    <Box>
                      {getStepContent(
                        index,
                        user,
                        setUser,
                        payment,
                        setPayment,
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
          <Container className={classes.costContainer}>
            <OrderSummaryContainer
              deliveryCost={delivery.price}
              tax={order.tax}
              cartCost={order.cartCost}
            />
          </Container>
        </div>
      </div>
    </>
  );
}
