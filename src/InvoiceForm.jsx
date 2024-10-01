import React, { useState } from "react";
import { FormControl, Text, Input, Button, Box } from "@chakra-ui/react";
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

  const [error, setError]= useState("");

  const [productName, setProductName] = useState("");
  const handleName = (e)=>{
    const name = e.target.value;
    setProductName(name);
  }

  const [productHSNCode, setProductHSNCode] = useState("");
  const handleCode = (e)=>{
    const hsnCode = e.target.value;
    setProductHSNCode(hsnCode);
  }

  const [productQuantity, setProductQuantity] = useState("");
  const handleQuantity = (e)=>{
    const quantity = e.target.value;
    setProductQuantity(quantity);
  }

  const [productRate, setProductRate] = useState("");
  const handleRate = (e)=>{
    const rate = e.target.value;
    setProductRate(rate);
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    if (!productName || !productHSNCode || !productQuantity || !productRate) {
      setError("Please fill the details of the product.");
      return;
    }
    console.log("Product Name: ", productName);
    console.log("Product HSN-Code: ", productHSNCode);
    console.log("Product Quantity: ", productQuantity);
    console.log("Product Rate: ", productRate);
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
        <FormControl as="form" onSubmit={handleSubmit}>
          <Text>Product Description</Text>
          <Text>Product Name: </Text>
            <Input
              type="text"
              placeholder="Enter the Product name"
              value={productName}
              onChange={handleName}
            />

            <Text>Product HSN Code</Text>
            <Input
              type="text"
              // name="code"
              placeholder="Enter Product HSN Code"
              value={productHSNCode}
              onChange={handleCode}
            />

            <Text>Product Quantity in Kg</Text>
            <Input
              type="text"
              placeholder="Quantity"
              value={productQuantity}
              onChange={handleQuantity}
            />

            <Text>Product Rate in Kg</Text>
            <Input
              type="text"
              placeholder="Rate"
              value={productRate}
              onChange={handleRate}
            />

            <Button mt={4} colorScheme="blue" type="submit">
              Submit
            </Button>
          </FormControl>
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

      {productName && productHSNCode && productQuantity && productRate &&(
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold">
            Product Details:
          </Text>
          <Text>Product Name: {productName}</Text>
          <Text>HSN Code: {productHSNCode}</Text>
          <Text>Quantity in Kg: {productQuantity}</Text>
          <Text>Rate per Kg: {productRate}</Text>
        </Box>
      )}
    </>
  );
};

export default InvoiceForm;