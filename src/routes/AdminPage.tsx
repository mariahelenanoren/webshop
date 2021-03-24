import Header from "../components/Header";
import ProductCardAdmin from "../components/ProductCardAdmin";
import Grid from "../components/Grid";
import { useState, useContext, useEffect } from "react";
import { Button } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import AdminModal from "../components/AdminModal";
import { ModalContext } from "../contexts/ModalContext";
import { ProductContext } from "../contexts/ProductContext";
import { Product } from "../products";
interface ProductList {
  component: (props: Product) => JSX.Element;
  productProps: Product[];
}

export default function AdminPage() {
  const list = useContext(ProductContext);
  const modal = useContext(ModalContext);

  const [productList, setProductList] = useState<ProductList>({
    component: ProductCardAdmin,
    productProps: list.productList,
  });

  useEffect(() => {
    setProductList({ ...productList, productProps: list.productList });
  }, [list.productList]);

  return (
    <>
      <Header type={"white"} />
      <div className="paddingContainer" style={adminContainer}>
        {modal.modalIsOpen && <AdminModal />}
        <Button
          onClick={() => (
            modal.setModalIsOpen(true), modal.setModalType("add")
          )}
          style={addButton}
          variant="contained"
          color="primary"
        >
          Lägg till produkt
        </Button>
        <Grid products={productList} />
      </div>
    </>
  );
}

const adminContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};
const addButton: CSSProperties = {
  width: "100%",
  maxWidth: "20rem",
  marginBottom: "2rem",
  alignSelf: "flex-end",
  borderRadius: 0,
};
