import { Button } from "@material-ui/core";
import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { theme } from "../styling/colorTheme";
import "../styling/style.css";

interface Props {
  type: "customer" | "admin";
}

const buttonStyle: CSSProperties = {
  padding: "0 1rem",
  height: "2rem",
  fontSize: "0.8rem",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  borderRadius: 0,
  fontFamily: "Roboto",
  textTransform: "capitalize",
  fontWeight: 500,
};

const boxStyle: CSSProperties = {
  width: "100%",
  position: "static",
  bottom: 0,
  display: "flex",
  justifyContent: "flex-end",
  backgroundColor: theme.palette.primary.main,
};

export default function Footer(props: Props) {
  return (
    <div className={"footerDiv"} style={boxStyle}>
      {props.type === "customer" ? (
        <Link style={{ textDecoration: "none" }} to={{ pathname: "/admin" }}>
          <Button className={"footerButton"} style={buttonStyle}>
            Adminstratörssidan
          </Button>
        </Link>
      ) : (
        <Link style={{ textDecoration: "none" }} to={{ pathname: "/" }}>
          <Button className={"footerButton"} style={buttonStyle}>
            Startssidan
          </Button>
        </Link>
      )}
    </div>
  );
}
