import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  InputField,
  CreditOrderDetail,
  CreditOrderShip,
  CreditOrderTotal,
  CardPayButton,
} from "../basic";
import OrderBump from "./orderBump";
import SecurityLogo from "./securityLogo";
import { getValueFromString } from "../../utils/metafields";

const CreditOrder = (props) => {
  let tmp_button_text = "",
    tmp_button_text_color,
    tmp_button_color,
    tmp_default_discount = 0,
    tmp_default_quantity = 0,
    tmp_short_name = "",
    tmp_bump_text = "",
    tmp_bump_amount = 0;

  if (props.metadata.length > 0) {
    props.metadata.map((field) => {
      if (field.key === "button_text")
        tmp_button_text = getValueFromString(field.value, "html");
      if (field.key === "button_text_color")
        tmp_button_text_color = field.value;
      if (field.key === "order_bump_text")
        tmp_bump_text = getValueFromString(field.value, "html");
      if (field.key === "button_color") tmp_button_text = field.value;
      if (field.key === "offer_discount_1") tmp_default_discount = field.value;
      if (field.key === "offer_quantity_1") tmp_default_quantity = field.value;
      if (field.key === "product_shortname") tmp_short_name = field.value;
      if (field.key === "order_bump_amount") tmp_bump_amount = field.value;
    });
  }

  const button_text = tmp_button_text;
  const button_text_color = tmp_button_text_color;
  const button_color = tmp_button_color;
  const default_discount = tmp_default_discount;
  const default_quantity = tmp_default_quantity;
  const short_name = tmp_short_name;
  const bump_text = tmp_bump_text;
  const bump_amount = tmp_bump_amount;

  const [selected, setSelected] = useState(false);
  const checkBump = (value) => {
    setSelected(!value);
  };

  const order = useSelector((state) => state.order);
  const price =
    order.price > 0
      ? order.price
      : ((props.price * (100 - default_discount)) / 100).toFixed(2) *
        default_quantity;

  const total_price = (value) => {
    let final_sum = parseFloat(value);
    if (selected) {
      final_sum = final_sum - parseFloat(bump_amount);
    }
    if (props.discount.type === "fixed_amount")
      final_sum = final_sum + parseFloat(props.discount.value);
    else
      final_sum = (final_sum * (100 + parseFloat(props.discount.value))) / 100;
    return final_sum.toFixed(2);
  };

  return (
    <Box mt={20}>
      <Card>
        <Box>
          <h3>STEP 6: ORDER SUMMARY</h3>
        </Box>
        <hr />
        <Box>
          <OrderBump {...props} active={selected} checkBump={checkBump} />
        </Box>
        <Box>
          <InputField
            placeholder="enter"
            onBlur={(ev) => props.checkDiscount(ev.target.value)}
          />
        </Box>
        <Box mt="17.6px">
          <CreditOrderDetail
            style={{ background: `${selected ? "whitesmoke" : "white"}` }}
          >
            <Box>
              {" "}
              {short_name}
              {order.count > 1 ? "s" : ""}
            </Box>
            <Box>${price}</Box>
          </CreditOrderDetail>
        </Box>
        {selected && (
          <CreditOrderDetail>
            <Box dangerouslySetInnerHTML={{ __html: bump_text }} />
            <Box>${bump_amount}</Box>
          </CreditOrderDetail>
        )}
        <Box>
          <CreditOrderShip>
            <Box>SHIPPING:</Box>
            <Box color="#1ab22c">
              <strong>FREE</strong>
            </Box>
          </CreditOrderShip>
          <CreditOrderTotal>
            <Box>
              <strong>TOTAL:&nbsp;</strong>(before taxes)
            </Box>
            <Box>${total_price(price)}</Box>
          </CreditOrderTotal>
        </Box>
        <Box>
          <CardPayButton
            style={{ backgroundColor: button_color, color: button_text_color }}
          >
            <div dangerouslySetInnerHTML={{ __html: button_text }} />
          </CardPayButton>
        </Box>
        <Box mt="17.6px">
          <SecurityLogo {...props} />
        </Box>
      </Card>
    </Box>
  );
};

export default CreditOrder;
