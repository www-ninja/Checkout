import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Card,
  DiscountBrand,
  DiscoundDash,
  DiscountDescription,
} from "../basic";
import {
  getValueFromString,
  getValueFromObjectString,
} from "../../utils/metafields";
import DiscoundCard from "./dicountCard";

const SelectQuantity = (props) => {
  let tmp_offer_discount = [],
    tmp_offer_quantity = [],
    tmp_right_text = "",
    tmp_short_name = "",
    tmp_discount_headline = "",
    tmp_discount_head_color = "",
    tmp_discount_icon = "",
    tmp_discount_subline = "";

  if (props.metadata.length > 0) {
    props.metadata.map((field) => {
      if (field.key === "offer_discount_1") tmp_offer_discount[0] = field.value;
      if (field.key === "offer_discount_2") tmp_offer_discount[1] = field.value;
      if (field.key === "offer_discount_3") tmp_offer_discount[2] = field.value;
      if (field.key === "offer_discount_4") tmp_offer_discount[3] = field.value;
      if (field.key === "offer_discount_5") tmp_offer_discount[4] = field.value;

      if (field.key === "offer_quantity_1") tmp_offer_quantity[0] = field.value;
      if (field.key === "offer_quantity_2") tmp_offer_quantity[1] = field.value;
      if (field.key === "offer_quantity_3") tmp_offer_quantity[2] = field.value;
      if (field.key === "offer_quantity_4") tmp_offer_quantity[3] = field.value;
      if (field.key === "offer_quantity_5") tmp_offer_quantity[4] = field.value;

      if (field.key === "offer_right_text") tmp_right_text = field.value;
      if (field.key === "product_shortname") tmp_short_name = field.value;

      if (field.key === "discount_headline")
        tmp_discount_headline = getValueFromString(field.value, "html");
      if (field.key === "discount_subheadline")
        tmp_discount_subline = getValueFromString(field.value, "html");
      if (field.key === "discount_icon")
        tmp_discount_icon = getValueFromObjectString(field.value, "src");
      if (field.key === "discount_header_color")
        tmp_discount_head_color = field.value;
    });
  }

  const offer_discount = tmp_offer_discount;
  const offer_quantity = tmp_offer_quantity;
  const right_text = tmp_right_text;
  const short_name = tmp_short_name;

  const discount_headline = tmp_discount_headline;
  const discount_subheadline = tmp_discount_subline;
  const discount_icon = tmp_discount_icon;
  const discount_head_color = tmp_discount_head_color;

  const [nIndex, setNIndex] = useState(0);
  const dispatch = useDispatch();

  const selectOrder = (index) => {
    setNIndex(index);
    const order = {
      name: short_name,
      price:
        ((props.price * (100 - offer_discount[index])) / 100).toFixed(2) *
        offer_quantity[index],
      count: offer_quantity[index],
    };
    dispatch({ type: "ORDER", payload: { order } });
  };

  return (
    <Box mt={20}>
      <Card>
        <Box display="flex" alignItems="center">
          {/* <DiscountBrand>
                        <DiscoundDash />
                        <Box>
                            <Box>{'55%'}</Box>
                            <Box>OFF</Box>
                        </Box>
                    </DiscountBrand> */}
          <Box height="120px">
            <img src={discount_icon} height="100%" />
          </Box>
          <DiscountDescription color={discount_head_color}>
            <Box dangerouslySetInnerHTML={{ __html: discount_headline }} />
            <Box dangerouslySetInnerHTML={{ __html: discount_subheadline }} />
          </DiscountDescription>
        </Box>
        <Box>
          <h3>STEP 1: SELECT ORDER QUANTITY</h3>
        </Box>
        <hr />
        <Box>
          {offer_discount.length > 0 && (
            <Box>
              {offer_discount.map((offer, index) => {
                return (
                  <DiscoundCard
                    price={props.price}
                    active={nIndex === index}
                    selectOrder={selectOrder}
                    index={index}
                    key={index}
                    discount={offer}
                    quantity={offer_quantity[index]}
                    rightText={right_text}
                    shortName={short_name}
                  />
                );
              })}
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default SelectQuantity;
