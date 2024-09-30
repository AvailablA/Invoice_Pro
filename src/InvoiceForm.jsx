import React, { useState } from "react";
import { FormControl, Text, Input, Button } from "@chakra-ui/react";
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

  const [productName, setProductName] = useState("");
  const handleName = (e)=>{
    const name = e.target.value;
    setProductName(name);
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log("Product Name: ", productName)
  }


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
        <Text>Product Description</Text>
        <Text>Product Name: </Text>
          <Input
            type="text"
            name= "name"
            placeholder="Enter the Product name"
            value={productName}
            onChange={handleName}
             />

        <Button mt={4} colorScheme="blue" type="submit">
        Submit
      </Button>
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
          <h4>
            <Text>Consignee Name: {selectBuyerParty.name}</Text>
          </h4>
          <Text>Address: {selectBuyerParty.address}</Text>
          <Text>City: {selectBuyerParty.city}</Text>
          <Text>State: {selectBuyerParty.state}</Text>
          <Text>GST No: {selectBuyerParty.gstNo}</Text>
          <hr/>
        </>
      )}

      {productName && (
        <>
          <Text>Product name: {productName}</Text>
        </>
      )}
    </>
  );
};

export default InvoiceForm;