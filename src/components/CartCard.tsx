import { Box } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  quantity?: number;
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

export default function CartCard(props: Props) {
  return (
    <Box style={box}>
      <div style={imgContainer}>
        <img style={productImg} src={props.imageUrl} alt="product" />
      </div>
      <div style={spaceBetween}>
        <div className={"flex-direction alignStart"}>
          <p style={itemSpacing}>{props.name}</p>
        </div>
        <div className={"flex-direction alignEnd"}>
          <p style={itemSpacing}>{props.price} kr</p>
          <DeleteIcon style={{ cursor: "pointer" }} onClick={props.onClick} />
        </div>
      </div>
    </Box>
  );
}

const spaceBetween: CSSProperties = {
  display: "flex",
  width: "100%",
  height: "100%",
  justifyContent: "space-between",
  flexDirection: "row",
  padding: "1.5rem",
};

const itemSpacing: CSSProperties = {
  margin: "0",
};

const box: CSSProperties = {
  display: "flex",
  height: "6.5rem",
  width: "100%",
  marginBottom: "1rem",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "white",
};

const productImg: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
};

const imgContainer: CSSProperties = {
  height: "100%",
  width: "7.5rem",
};
