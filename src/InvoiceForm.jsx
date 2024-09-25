import React, { useState } from "react";
import { FormControl, Text } from "@chakra-ui/react";
import parties from "./parties"; // Importing the parties data

const InvoiceForm = () => {
  // Seller data
  const [selectSellerParty, setSelectSellerParty] = useState(null);

  const sellerPartySelect = (e) => {
    const selectName = e.target.value;
    const partyDetails = parties.find((party) => party.name === selectName);
    setSelectSellerParty(partyDetails);
  };

  // Buyer data
  const [selectBuyerParty, setSelectBuyerParty] = useState(null);

  const buyerPartySelect = (e) => {
    const selectName = e.target.value;
    const partyDetails = parties.find((party) => party.name === selectName);
    setSelectBuyerParty(partyDetails);
  };

  return (
    <>
      <FormControl>
        <Text>Seller Information</Text>
        <br />
        <select
          // placeholder="Select Seller Firm Name"
          value={selectSellerParty?.name || ""}
          onChange={sellerPartySelect}
        >
          <option value="" disabled>
            Select Seller Firm Name
          </option>
          {parties.map((party, index) => (
            <option key={index} value={party.name}>
              {party.name}
            </option>
          ))}
        </select>
        <hr />
        <Text>Buyer Information</Text>
        <select
          // placeholder="Select Buyer Firm Name"
          value={selectBuyerParty?.name || ""}
          onChange={buyerPartySelect}
        >
          <option value="" disabled>
            Select Buyer Firm Name
          </option>
          {parties.map((party, index) => (
            <option key={index} value={party.name}>
              {party.name}
            </option>
          ))}
        </select>
        <br />
      </FormControl>

      <hr />
      <h2>
        <Text>Seller Information</Text>
      </h2>

      {selectSellerParty && (
        <>
          <h4>
            <Text>Consignee Name: {selectSellerParty.name}</Text>
          </h4>
          <Text>Address: {selectSellerParty.address}</Text>
          <Text>City: {selectSellerParty.city}</Text>
          <Text>State: {selectSellerParty.state}</Text>
          <Text>GST No: {selectSellerParty.gstNo}</Text>
        </>
      )}

      <hr />
      <h2>Buyer Information</h2>

      {selectBuyerParty && (
        <>
          <hr />
          <h4>
            <Text>Consignee Name: {selectBuyerParty.name}</Text>
          </h4>
          <Text>Address: {selectBuyerParty.address}</Text>
          <Text>City: {selectBuyerParty.city}</Text>
          <Text>State: {selectBuyerParty.state}</Text>
          <Text>GST No: {selectBuyerParty.gstNo}</Text>
        </>
      )}
    </>
  );
};

export default InvoiceForm;