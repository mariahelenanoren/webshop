import { Box, makeStyles, Typography, Divider } from "@material-ui/core";
import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import CartCard from "./CartCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "1.5rem",
    borderWidth: 1,
    borderColor: theme.palette.secondary.dark,
    borderStyle: "solid",
    "& div>.MuiTypography-body1:first-of-type": {
      marginTop: "3rem",
      marginBottom: "1rem",
    },
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    margin: "0.5rem 0",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  totalCost: {
    fontSize: "1.3rem",
    margin: "0.5rem 0",
  },
  heading: {
    margin: "0.5rem 0 3rem 0",
  },
}));

interface Props {
  deliveryCost: number;
  tax: number;
  cartCost: number;
}

export default function CostCard(props: Props) {
  const classes = useStyles();
  const cartContext = useContext(CartContext);

  return (
    <Box className={classes.root}>
      <Typography className={`${classes.uppercase} ${classes.heading}`}>
        Varukorgsammanfattning
      </Typography>
      {cartContext.cart.map((cartItem) => (
        <CartCard
          onClick={() => cartContext.removeProduct(cartItem)}
          imageUrl={cartItem.imageUrl}
          name={cartItem.name}
          price={cartItem.price}
          quantity={cartItem.quantity}
        />
      ))}
      <Box marginTop={"1.5rem"}>
        <Typography className={`${classes.uppercase} ${classes.heading}`}>
          Ordersammanfattning
        </Typography>
        <Box className={classes.spaceBetween}>
          <Typography variant="subtitle2">Totalbelopp varukorg</Typography>
          <Typography variant="subtitle2">{props.cartCost}&nbsp;kr</Typography>
        </Box>
        <Box className={classes.spaceBetween}>
          <Typography variant="subtitle2">Moms</Typography>
          <Typography variant="subtitle2">{props.tax}&nbsp;kr</Typography>
        </Box>
        <Box className={classes.spaceBetween}>
          <Typography variant="subtitle2">Frakt</Typography>
          <Typography variant="subtitle2">
            {props.deliveryCost}&nbsp;kr
          </Typography>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.spaceBetween}>
          <Typography
            variant="body2"
            className={`${classes.uppercase} ${classes.totalCost}`}
          >
            Totalt
          </Typography>
          <Typography
            variant="body2"
            className={`${classes.uppercase} ${classes.totalCost}`}
          >
            {props.cartCost + props.deliveryCost}&nbsp;kr
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
