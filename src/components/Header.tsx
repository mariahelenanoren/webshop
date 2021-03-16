import { CSSProperties } from "@material-ui/styles";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { theme } from "../styling/colorTheme";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

interface Props {
  type: "transparent" | "white";
}

export default function Header(props: Props) {
  let bgColor: string;
  let textColor: string;
  let backgroundGradient: string;

  const cart = useContext(CartContext);

  if (props.type === "transparent") {
    bgColor = "transparent";
    textColor = theme.palette.secondary.main;
    backgroundGradient =
      "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)";
  } else {
    bgColor = "white";
    textColor = theme.palette.primary.main;
    backgroundGradient = "";
  }

  console.log(cart.cart);

  return (
    <div
      style={{
        ...headerStyling,
        backgroundColor: bgColor,
        background: backgroundGradient,
      }}
    >
      <Link style={{ textDecoration: "none" }} to={{ pathname: "/" }}>
        <h1
          style={{
            color: textColor,
            textShadow: "(0px 0px 3px rgba(0,0,0,0.4))",
          }}
        >
          HEMMA
        </h1>
      </Link>
      <Link style={{ textDecoration: "none" }} to={{ pathname: "/checkout" }}>
        <div style={{ position: "relative" }}>
          <ShoppingCartIcon style={{ ...cartIcon, color: textColor }} />
          <div style={circle}>{cart.cart.length}</div>
        </div>
      </Link>
    </div>
  );
}

const headerStyling: CSSProperties = {
  display: "flex",
  padding: "0 3.5rem",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "7rem",
  width: "100%",
  position: "sticky",
};

const cartIcon: CSSProperties = {
  fontSize: "2rem",
};

const circle: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "1.5rem",
  width: "1.5rem",
  padding: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  background: theme.palette.primary.main,
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "white",
};
