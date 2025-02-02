import React from "react";
import Grid from "@material-ui/core/Grid";
import { Product } from "../products";

interface Props {
  products: {
    component: (prop: Product) => JSX.Element;
    productProps: Product[];
  };
}

function GridContainer(props: Props) {
  return (
    <div>
      <Grid container spacing={3}>
        {props.products.productProps.map((productProp: Product) => (
          <Grid item xs={6} sm={4} md={3} key={productProp.id}>
            {React.createElement(props.products.component, productProp)}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default GridContainer;
