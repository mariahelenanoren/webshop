import { CSSProperties } from "@material-ui/styles";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { theme } from "../styling/colorTheme";
import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Badge } from "@material-ui/core";

interface Props {
  type: "transparent" | "white" | "admin";
}

export default function Header(props: Props) {
  let bgColor: string;
  let textColor: string;
  let boxShadow: string;

  const { cart } = useContext(CartContext);

  if (props.type === "transparent") {
    bgColor = "transparent";
    textColor = "#ffff";
    boxShadow = "";
  } else {
    bgColor = "white";
    textColor = theme.palette.primary.main;
    boxShadow = "0px 2px 5px 0px rgba(0,0,0,0.1)";
  }

  return (
    <div
      className="headerContainer"
      style={{
        ...headerStyling,
        backgroundColor: bgColor,
        boxShadow: boxShadow,
      }}
    >
      <Link style={{ textDecoration: "none" }} to={{ pathname: "/" }}>
        <h1
          style={{
            color: textColor,
            fontSize: "1.6rem",
          }}
        >
          HEMMA
        </h1>
      </Link>
      {props.type === "admin" ? null : (
        <Link
          style={{ textDecoration: "none", color: textColor }}
          to={{ pathname: "/checkout" }}
        >
          <Badge badgeContent={cart.length} color="primary">
            <ShoppingCartIcon
              style={{ ...cartIcon, color: textColor }}
              color="primary"
            />
          </Badge>
        </Link>
      )}
    </div>
  );
}

const headerStyling: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "5.5rem",
  width: "100%",
  zIndex: 20,
};

const cartIcon: CSSProperties = {
  fontSize: "1.8rem",
};
