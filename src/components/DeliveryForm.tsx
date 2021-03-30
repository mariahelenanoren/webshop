import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core";
import { DateTime } from "luxon";
import { CSSProperties, useEffect } from "react";
import { theme } from "../styling/colorTheme";
import { Validation } from "../routes/CheckoutPage";

export interface Delivery {
  supplier: string;
  date: string;
  price: number;
}
interface Props {
  delivery: Delivery;
  setDelivery: (delivery: Delivery) => void;
  validation: Validation;
  setValidation: (validation: React.SetStateAction<Validation>) => void;
}

export default function DeliveryForm({
  delivery,
  setDelivery,
  validation,
  setValidation,
}: Props) {
  const dt = DateTime.now();
  const postnordDelivery = dt
    .plus({ days: 4 })
    .toLocaleString(DateTime.DATE_FULL);
  const instaboxDelivery = dt
    .plus({ days: 2 })
    .toLocaleString(DateTime.DATE_FULL);
  const DHLDelivery = dt.plus({ days: 3 }).toLocaleString(DateTime.DATE_FULL);

  function handleChange(supplier: string, date: string, price: number) {
    setDelivery({
      supplier: supplier,
      date: date,
      price: price,
    });
    setValidation((prevValidation) => ({
      ...prevValidation,
      deliveryValidation: true,
    }));
  }

  useEffect(() => {
    setDelivery({
      supplier: "postnord",
      date: postnordDelivery,
      price: 39,
    });
    setValidation((prevValidation) => ({
      ...prevValidation,
      deliveryValidation: true,
    }));
  }, [postnordDelivery, setDelivery, setValidation]);

  return (
    <Box paddingY={"1rem"}>
      <RadioGroup value={delivery.supplier}>
        <FormControlLabel
          onChange={() => handleChange("postnord", postnordDelivery, 39)}
          value="postnord"
          control={<Radio style={{ color: theme.palette.primary.main }} />}
          label={
            <div style={label}>
              <Typography variant="body1">Postnord 39kr</Typography>
              <Typography variant="body2">
                4 dagar (Beräknad leverans den {postnordDelivery})
              </Typography>
            </div>
          }
        />
        <FormControlLabel
          onChange={() => handleChange("instabox", instaboxDelivery, 49)}
          value="instabox"
          control={<Radio style={{ color: theme.palette.primary.main }} />}
          label={
            <div style={label}>
              <Typography variant="body1">Instabox 49kr</Typography>
              <Typography variant="body2">
                2 dagar (Beräknad leverans den {instaboxDelivery})
              </Typography>
            </div>
          }
        />
        <FormControlLabel
          onChange={() => handleChange("DHL", DHLDelivery, 29)}
          value="DHL"
          control={<Radio style={{ color: theme.palette.primary.main }} />}
          label={
            <div style={label}>
              <Typography variant="body1">DHL 29kr</Typography>
              <Typography variant="body2">
                3 dagar (Beräknad leverans den {DHLDelivery})
              </Typography>
            </div>
          }
        />
      </RadioGroup>
    </Box>
  );
}

const label: CSSProperties = {
  margin: "0 0 1.5rem 0",
};
