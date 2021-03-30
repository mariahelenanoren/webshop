import {
  Box,
  Button,
  ButtonGroup,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { CSSProperties } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  quantity?: number;
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

const useStyles = makeStyles((theme) => ({
  icon: {
    position: "absolute",
    right: 0,
    top: "0.5rem",
    color: theme.palette.primary.main,
    "&hover": {
      color: "red",
    },
  },
  lineHeight: {
    lineHeight: 1.5,
  },
  buttonGroup: {
    position: "absolute",
    bottom: "0.5rem",
    borderRadius: 0,
    "&>.MuiButton-outlined:nth-of-type(1), &>.MuiButton-outlined:nth-of-type(3)": {
      backgroundColor: theme.palette.secondary.main,
    },
    "&>.MuiButton-outlined": {
      borderRadius: 0,
      minWidth: "2.5rem",
      padding: "0.1rem 0.3rem",
    },
  },
}));

export default function CartCard(props: Props) {
  const classes = useStyles();
  return (
    <Box style={cardContainer}>
      <div style={imgContainer}>
        <img style={productImg} src={props.imageUrl} alt="product" />
      </div>
      <div style={contentContainer}>
        <div style={informationContainer}>
          <Typography className={classes.lineHeight} variant="subtitle1">
            {props.name}
          </Typography>
          <Typography className={classes.lineHeight} variant="subtitle2">
            {props.price}&nbsp;kr
          </Typography>
        </div>
        <DeleteIcon className={classes.icon} onClick={props.onClick} />
        <ButtonGroup
          className={classes.buttonGroup}
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button>+</Button>
          <Button>{props.quantity}</Button>
          <Button>-</Button>
        </ButtonGroup>
      </div>
    </Box>
  );
}

const cardContainer: CSSProperties = {
  display: "flex",
  width: "100%",
  height: "8rem",
  alignItems: "flex-start",
  flexDirection: "row",
  marginBottom: "1rem",
};

const contentContainer: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  padding: "0.5rem 0 0.5rem 1.5rem",
};

const informationContainer: CSSProperties = {
  marginRight: "2rem",
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
