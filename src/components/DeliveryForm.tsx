import { Box, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { DateTime } from "luxon";
import { CSSProperties } from "react";
import { theme } from "../styling/colorTheme";
import { Validation } from "../routes/CheckoutPage";

export interface DeliveryInfo {
  supplier?: string;
  date?: string;
  price?: number;
}
interface Props {
  delivery: DeliveryInfo;
  setDelivery: (delivery: DeliveryInfo) => void;
  validation: Validation;
  setValidation: (validation: Validation) => void;
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
  const homeDelivery = dt.plus({ days: 3 }).toLocaleString(DateTime.DATE_FULL);

  function handleChange(supplier: string, date: string, price: number) {
    setDelivery({
      supplier: supplier,
      date: date,
      price: price,
    });
    setValidation({
      ...validation,
      deliveryValidation: true,
    });
  }

  return (
    <Box paddingY={"1rem"}>
      <RadioGroup>
        <FormControlLabel
          onChange={() => handleChange("postnord", postnordDelivery, 39)}
          value="postnord"
          control={<Radio style={{ color: theme.palette.primary.main }} />}
          label={
            <p style={label}>
              <b>Postnord 39kr</b> <br /> Levereras {postnordDelivery} (4 dagar)
            </p>
          }
        />
        <FormControlLabel
          onChange={() => handleChange("instabox", instaboxDelivery, 49)}
          value="instabox"
          control={<Radio style={{ color: theme.palette.primary.main }} />}
          label={
            <p style={label}>
              <b>Instabox 49kr</b> <br /> Levereras {instaboxDelivery} (3 dagar)
            </p>
          }
        />
        <FormControlLabel
          onChange={() => handleChange("klarna", homeDelivery, 59)}
          value="Klarna"
          control={<Radio style={{ color: theme.palette.primary.main }} />}
          label={
            <p style={label}>
              <b>Hemleverans 59kr</b> <br /> Levereras {homeDelivery} (3 dagar)
            </p>
          }
        />
      </RadioGroup>
    </Box>
  );
}

const label: CSSProperties = {
  margin: "0 0 1.5rem 0",
};
