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

  const cart = useContext(CartContext);

  if (props.type === "transparent") {
    bgColor = "transparent";
    textColor = "#ffff";
  } else {
    bgColor = "white";
    textColor = theme.palette.primary.main;
  }

  return (
    <div
      className="headerContainer"
      style={{
        ...headerStyling,
        backgroundColor: bgColor,
      }}
    >
      <Link style={{ textDecoration: "none" }} to={{ pathname: "/" }}>
        <h1
          style={{
            color: textColor,
            fontSize: "1.8rem",
          }}
        >
          HEMMA
        </h1>
      </Link>
      <Link
        style={{ textDecoration: "none", color: textColor }}
        to={{ pathname: "/checkout" }}
      >
        <div style={{ position: "relative" }}>
          <ShoppingCartIcon
            style={{
              ...cartIcon,
              color: textColor,
            }}
          />
          <div style={circle}>{cart.cart.length}</div>
        </div>
      </Link>
    </div>
  );
}

const headerStyling: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "6rem",
  width: "100%",
  zIndex: 20,
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
  backgroundColor: "#78b445",
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "white",
};
