import React, { useState } from "react";
import { FormControl, Text, Input, Button, Box, VStack, HStack, Divider } from "@chakra-ui/react";
import parties from "./parties"; // Importing the parties data
import './InvoiceForm.css';


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

  const [error, setError] = useState("");

  const [productName, setProductName] = useState("");
  const handleName = (e) => setProductName(e.target.value);

  const [productHSNCode, setProductHSNCode] = useState("");
  const handleCode = (e) => setProductHSNCode(e.target.value);

  const [productQuantity, setProductQuantity] = useState("");
  const handleQuantity = (e) => setProductQuantity(e.target.value);

  const [productRate, setProductRate] = useState("");
  const handleRate = (e) => setProductRate(e.target.value);

  const [taxableValue, setTaxableValue] = useState("");


  // for GST selection
  const [gstType, setGstType] = useState(""); 
  const handleGstSelect = (e) => {
    const selectedGst = e.target.value;
    setGstType(selectedGst);
    calculateTotal(selectedGst);
  };

  const [gstAmount, setGstAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const [invoiceNo, setInvoiceNo] = useState(""); // New state for invoice number
  const handleInvoiceNo = (e)=> setInvoiceNo(e.target.value);

    // Transport details
    const [transportStart, setTransportStart] = useState("");
    const handleTransportStart = (e) => setTransportStart(e.target.value);
  
    const [transportEnd, setTransportEnd] = useState("");
    const handleTransportEnd = (e) => setTransportEnd(e.target.value);
  
    const [transporterName, setTransporterName] = useState("");
    const handleTransporterName = (e) => setTransporterName(e.target.value);
  
    const [truckNumber, setTruckNumber] = useState("");
    const handleTruckNumber = (e) => setTruckNumber(e.target.value);
  
    const [lrNumber, setLrNumber] = useState("");
    const handleLrNumber = (e) => setLrNumber(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !productHSNCode || !productQuantity || !productRate || !transportStart || !transportEnd || !transporterName || !truckNumber || !lrNumber) {
      setError("Please fill all the required fields.");
      return;
    }

    const quantity = parseFloat(productQuantity);
    const rate = parseFloat(productRate);
    if (isNaN(quantity) || isNaN(rate)) {
      setError("Please enter valid numerical values for quantity and rate.");
      return;
    }

    const taxable = quantity * rate;
    setTaxableValue(taxable);
    setError("");
    setShowPreview(true);
    calculateTotal(gstType, taxable);

//     Generate random invoice number (this can be replaced with any other method for invoice numbering)
//    const newInvoiceNo = `INV-${Math.floor(Math.random() * 1000000)}`;
//    setInvoiceNo(newInvoiceNo);
  };

  // Function to calculate GST and total
  const calculateTotal = (gstType, taxable = taxableValue) => {
    let gst = 0;
    if (gstType === "sgst-cgst") {
      gst = (9 + 9) * taxable / 100; // 9% SGST + 9% CGST
    } else if (gstType === "igst") {
      gst = 18 * taxable / 100; // 18% IGST
    }
    setGstAmount(gst);
    setTotalAmount(taxable + gst);
  };

  return (
    <VStack spacing={4} className="invoice-form-wrapper">
      <Text className="form-header">Tax Invoice</Text>
      <HStack className="input-row">
            <Text className="input-label">Invoice No. :</Text>
            <Input value={invoiceNo} onChange={handleInvoiceNo} className="input-field" />
      </HStack>

      {/* Seller & Buyer Info */}
      <HStack spacing={8} justifyContent="space-between" className="seller-buyer-wrapper">
        <Box className="party-box">
          <FormControl>
            <Text className="party-header">Seller Information</Text>
            <select
              value={selectSellerParty?.name || ""}
              onChange={sellerPartySelect}
              className="party-select"
            >
              <option value="" disabled>Select Seller Firm Name</option>
              {parties.map((party, index) => (
                <option key={index} value={party.name}>{party.name}</option>
              ))}
            </select>
          </FormControl>
        </Box>

        <Box className="party-box">
          <FormControl>
            <Text className="party-header">Buyer Information</Text>
            <select
              value={selectBuyerParty?.name || ""}
              onChange={buyerPartySelect}
              className="party-select"
            >
              <option value="" disabled>Select Buyer Firm Name</option>
              {parties.map((party, index) => (
                <option key={index} value={party.name}>{party.name}</option>
              ))}
            </select>
          </FormControl>
        </Box>
      </HStack>

      {/* Product Information */}
      <FormControl as="form" onSubmit={handleSubmit}>
        <Text className="product-transport-header">Product & Transport Information</Text>

        <VStack spacing={4} align="stretch" className="product-transport-wrapper">
          {/* Product Details */}
          <HStack className="input-row">
            <Text className="input-label">Product Name:</Text>
            <Input value={productName} onChange={handleName} className="input-field" />
          </HStack>

          <HStack className="input-row">
            <Text className="input-label">Product HSN Code:</Text>
            <Input value={productHSNCode} onChange={handleCode} className="input-field" />
          </HStack>

          <HStack className="input-row">
            <Text className="input-label">Quantity (Kg):</Text>
            <Input value={productQuantity} onChange={handleQuantity} className="input-field" />
          </HStack>

          <HStack className="input-row">
            <Text className="input-label">Rate (₹ per Kg):</Text>
            <Input value={productRate} onChange={handleRate} className="input-field" />
          </HStack>
          {/* GST Selection */}
          <HStack className="input-row">
            <Text className="input-label">GST Type:</Text>
            <select value={gstType} onChange={handleGstSelect} className="gst-select">
              <option value="">Select GST Type</option>
              <option value="sgst-cgst">SGST + CGST (18%)</option>
              <option value="igst">IGST (18%)</option>
            </select>
          </HStack>

          {/* Transport Details */}
          <HStack className="input-row">
            <Text className="input-label">Transport Start Place:</Text>
            <Input value={transportStart} onChange={handleTransportStart} className="input-field" />
          </HStack>

          <HStack className="input-row">
            <Text className="input-label">Transport End Place:</Text>
            <Input value={transportEnd} onChange={handleTransportEnd} className="input-field" />
          </HStack>

          <HStack className="input-row">
            <Text className="input-label">Transporter Name:</Text>
            <Input value={transporterName} onChange={handleTransporterName} className="input-field" />
          </HStack>

          <HStack className="input-row">
            <Text className="input-label">Vehicle/Truck No:</Text>
            <Input value={truckNumber} onChange={handleTruckNumber} className="input-field" />
          </HStack>

          <HStack className="input-row">
            <Text className="input-label">LR Number:</Text>
            <Input value={lrNumber} onChange={handleLrNumber} className="input-field" />
          </HStack>

          <Button type="submit" className="submit-button">Generate Invoice</Button>
        </VStack>
      </FormControl>

      {error && <Text className="error-text">{error}</Text>}

      {/* Invoice Preview */}
      {showPreview && (
        <Box className="invoice-preview">
          <Text className="preview-header">Invoice Preview</Text>

          <Divider />

          <Text><strong>Invoice Number:</strong> {invoiceNo}</Text>
          {/* Display Seller details  */}
          <Text><strong>Seller:</strong> {selectSellerParty?.name}</Text>
          <Text><strong>Address:</strong> {selectSellerParty.address}</Text>
          <Text><strong>City:</strong> {selectSellerParty.city}</Text>
          <Text><strong>State:</strong> {selectSellerParty.state}</Text>
          <Text><strong>GST No:</strong> {selectSellerParty.gstNo}</Text>
          
          {/* Displai Buyer details */}
          <Text><strong>Buyer:</strong> {selectBuyerParty?.name}</Text>
          <Text><strong>Name:</strong> {selectSellerParty.name}</Text>
          <Text><strong>Address:</strong> {selectSellerParty.address}</Text>
          <Text><strong>City:</strong> {selectSellerParty.city}</Text>
          <Text><strong>State:</strong> {selectSellerParty.state}</Text>
          <Text><strong>GST No:</strong> {selectSellerParty.gstNo}</Text>
          
          {/* Display product and Tax details */}
          <Text><strong>Product:</strong> {productName}</Text>
          <Text><strong>HSN Code:</strong> {productHSNCode}</Text>
          <Text><strong>Quantity:</strong> {productQuantity} Kg</Text>
          <Text><strong>Rate:</strong> ₹{productRate} per Kg</Text>
          <Text><strong>Taxable Value:</strong> ₹{taxableValue}</Text>
          <Text><strong>GST:</strong> ₹{gstAmount}</Text>
          <Text><strong>Total Amount:</strong> ₹{totalAmount}</Text>

          <Divider />

          {/* Display transportation details */}
          <Text className="transport-header">Transport Details</Text>
          <Text><strong>Starting Point:</strong> {transportStart}</Text>
          <Text><strong>Destination:</strong> {transportEnd}</Text>
          <Text><strong>Transporter Name:</strong> {transporterName}</Text>
          <Text><strong>Truck Number:</strong> {truckNumber}</Text>
          <Text><strong>LR Number:</strong> {lrNumber}</Text>
        </Box>
      )}
    </VStack>
  );
};

export default InvoiceForm;