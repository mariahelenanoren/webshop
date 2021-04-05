import { CSSProperties } from "@material-ui/styles";
import {
  Box,
  Button,
  capitalize,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Order } from "../mockedAPI";

interface Props {
  order: Order;
}

const useStyles = makeStyles((theme) => ({
  scrollContainer: {
    flex: 1,
    overflowY: "scroll",
    paddingBottom: "1.5rem",
    borderColor: theme.palette.divider,
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
  },
  priceContainer: {
    padding: "1rem 0",
  },
  greeting: {
    fontSize: "1.2rem",
    fontWeight: 500,
  },
  orderHeading: {
    padding: "0.5rem 1rem 1rem 1rem",
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    margin: "2rem 0 1rem 0",
  },
  divider: {
    margin: "0.5rem 0",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  totalCost: {
    fontSize: "1rem",
  },
  button: {
    width: "100%",
  },
}));

export default function OrderConfirmationModal(props: Props) {
  const classes = useStyles();
  return (
    <div style={darkUnderlay}>
      <div style={modalContainer}>
        <div className={classes.orderHeading}>
          <Typography className={classes.greeting} align="center">
            Tack för ditt köp, {props.order.user.name}!
          </Typography>
          <Typography variant="subtitle1" align="center">
            Ordernummer: {props.order.orderId}
          </Typography>
        </div>
        <div className={classes.scrollContainer}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableBody>
                {props.order.cart.map((cartItem) => (
                  <TableRow key={cartItem.name}>
                    <TableCell component="th" scope="row">
                      {cartItem.name}
                    </TableCell>
                    <TableCell align="right">
                      {cartItem.quantity}&nbsp;st
                    </TableCell>
                    <TableCell align="right">
                      {cartItem.price * cartItem.quantity}&nbsp;kr
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            className={`${classes.uppercase} ${classes.heading}`}
            variant="body1"
          >
            Kunduppgifter
          </Typography>
          <Typography variant="subtitle2">Namn</Typography>
          <Typography variant="subtitle1">{props.order.user.name}</Typography>
          <Typography variant="subtitle2">Adress</Typography>
          <Typography variant="subtitle1">{props.order.user.adress}</Typography>
          <Typography variant="subtitle2">Postadress</Typography>
          <Typography variant="subtitle1">{props.order.user.postal}</Typography>
          <Typography variant="subtitle2">Stad</Typography>
          <Typography variant="subtitle1">{props.order.user.city}</Typography>
          <Typography variant="subtitle2">Email</Typography>
          <Typography variant="subtitle1">{props.order.user.email}</Typography>
          <Typography variant="subtitle2">Telefonnummer</Typography>
          <Typography variant="subtitle1">{props.order.user.phone}</Typography>
          <Typography
            className={`${classes.uppercase} ${classes.heading}`}
            variant="body1"
          >
            Betalning
          </Typography>
          <Typography variant="subtitle2">Betalmetod</Typography>
          <Typography variant="subtitle1">
            {capitalize(props.order.payment.option)}
          </Typography>
          <Typography
            className={`${classes.uppercase} ${classes.heading}`}
            variant="body1"
          >
            Leverans
          </Typography>
          <Typography variant="subtitle2">Leveransmetod</Typography>
          <Typography variant="subtitle1">
            {capitalize(props.order.delivery.supplier)}
          </Typography>
          <Typography variant="subtitle2">Beräknat leveransdatum</Typography>
          <Typography variant="subtitle1">
            {props.order.delivery.date}
          </Typography>
        </div>
        <div className={classes.priceContainer}>
          <Box className={classes.spaceBetween}>
            <Typography variant="subtitle2">Totalbelopp varukorg</Typography>
            <Typography variant="subtitle2">
              {props.order.cartCost}&nbsp;kr
            </Typography>
          </Box>
          <Box className={classes.spaceBetween}>
            <Typography variant="subtitle2">Varav moms</Typography>
            <Typography variant="subtitle2">
              {props.order.tax}&nbsp;kr
            </Typography>
          </Box>
          <Box className={classes.spaceBetween}>
            <Typography variant="subtitle2">Frakt</Typography>
            <Typography variant="subtitle2">
              {props.order.delivery.price}&nbsp;kr
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
              {props.order.cartCost + props.order.delivery.price}&nbsp;kr
            </Typography>
          </Box>
        </div>
        <Link style={{ color: "inherit", textDecoration: "inherit" }} to={"/"}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Ok
          </Button>
        </Link>
      </div>
    </div>
  );
}

const modalContainer: CSSProperties = {
  position: "fixed",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  padding: "2rem 1.5rem",
  top: "50%",
  left: "50%",
  width: "85%",
  maxWidth: "40rem",
  height: "33rem",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#ffff",
  boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.3)",
  zIndex: 1,
};

const darkUnderlay: CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 90,
};
