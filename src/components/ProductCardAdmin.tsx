import { useContext } from "react";
import { CSSProperties } from "@material-ui/styles";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { ModalContext } from "../contexts/ModalContext";
import { ProductContext } from "../contexts/ProductContext";
import { Product } from "../products";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      position: "absolute",
      bottom: "1rem",
      fontSize: "2rem",
      filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.4))",
      cursor: "pointer",
      color: "#ffff",
      "&:hover": {
        color: theme.palette.secondary.dark,
      },
    },
    leftIcon: {
      left: "1rem",
    },
    rightIcon: {
      right: "1rem",
    },
  })
);

export default function ProductCardAdmin(props: Product) {
  const classes = useStyles();
  const modal = useContext(ModalContext);
  const products = useContext(ProductContext);

  const handleClick = () => {
    modal.setModalIsOpen(true);
    modal.setModalType("edit");
    modal.setEditProduct(props);
  };

  return (
    <>
      <div style={productContainer}>
        <div style={imageContainer}>
          <img style={productImage} src={props.imageUrl} alt={props.name}></img>
          <Delete
            className={`${classes.rightIcon} ${classes.icon}`}
            onClick={() => products.removeProduct(props)}
          />
          <Edit
            className={`${classes.leftIcon} ${classes.icon}`}
            onClick={handleClick}
          />
        </div>
        <div style={productDescription}>
          <h2 style={productName}>{props.name}</h2>
          <p style={productPrice}>{props.price}&nbsp;kr</p>
        </div>
      </div>
    </>
  );
}

const productContainer: CSSProperties = {
  width: "100%",
  height: "fit-content",
};

const imageContainer: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "75%",
};

const productImage: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
};

const productDescription: CSSProperties = {
  padding: "1rem 0",
};

const productName: CSSProperties = {
  margin: 0,
  fontSize: "1.2rem",
  fontWeight: 400,
};

const productPrice: CSSProperties = {
  marginTop: "0.5rem",
  fontSize: "0.9rem",
  fontWeight: 700,
};
