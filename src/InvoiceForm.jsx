import React, { useState } from "react";
import { FormControl, Text, Input, Button, Box, useColorModeValue, VStack, HStack, Divider } from "@chakra-ui/react";
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
  // Color theme based on Chakra UI's colorModeValue hook
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const styles = {
    container: {
      display: 'flex', // Ensure proper layout for inline elements
      flexDirection: 'column', // Text and select appear vertically
      alignItems: 'center', // Center content horizontally
      width: '300px',
      height: '150px',
    },
    text: {
      fontSize: 'xl',
      fontWeight: 'bold',
      color: textColor,
      textAlign: 'center',
      marginBottom: '10px', // Add some spacing between text and select
      // marginLeft: '5px 
    },
    select: {
      width: '100%', // Make the select fill the container's width
      height: '30px', // Set the desired height for the select element
      padding: '5px', // Adjust padding as needed
      // Add other select styles as needed (e.g., border, background-color)
    },
    form: {
      display: 'flex',
      flexDirection: 'column', // Change to column for vertical layout
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    input: {
      marginRight:'13px',
      height: '20px', // Set the desired height for the select element
      //padding: '5px', // Adjust padding as needed
    },
  }
  const [error, setError] = useState("");

  const [productName, setProductName] = useState("");
  const handleName = (e) => setProductName(e.target.value);

  const [productHSNCode, setProductHSNCode] = useState("");
  const handleCode = (e) => setProductHSNCode(e.target.value);

  const [productQuantity, setProductQuantity] = useState("");
  const handleQuantity = (e) => setProductQuantity(e.target.value);

  const [productRate, setProductRate] = useState("");
  const handleRate = (e) => setProductRate(e.target.value);

  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !productHSNCode || !productQuantity || !productRate) {
      setError("Please fill the details of the product.");
      return;
    }
    setShowPreview(true);
  };


  return (
    <VStack 
      spacing={4} 
      bg="rgb(224,224,224)" 
      border="2px solid black" 
      p={50} 
      borderRadius="md" 
      boxShadow="lg" 
      w="100%" 
      maxW="1100px" 
      m="auto">

      <Text style={styles.text}>Tax Invoice</Text>

      <HStack 
        spacing={8} 
        justifyContent="space-between" 
        alignItems="start" 
        w="100%">


        {/* Seller Information Card */}
        <Box 
          bg={bgColor} 
          border="1px solid #ddd" 
          p={4} 
          borderRadius="md" 
          w="48%">


          <FormControl>
            <Text 
              fontSize="xl" 
              fontWeight="bold" 
              color={textColor} 
              textAlign="center"
              >

              Seller Information
            </Text>
            
              <select style={styles.select} value={selectSellerParty?.name || ""} onChange={sellerPartySelect}>
                <option value="" disabled>Select Seller Firm Name</option>
                {parties.map((party, index) => (
                  <option key={index} value={party.name}>{party.name}</option>
                ))}
              </select>
          
          </FormControl>
        </Box>

        {/* Buyer Information Card */}
        <Box bg={bgColor} border="1px solid #ddd" p={4} borderRadius="md" w="48%">
          <FormControl>
            <Text fontSize="xl" fontWeight="bold" color={textColor} textAlign="center">
              Buyer Information
            </Text>
            <select style={styles.select} value={selectBuyerParty?.name || ""} onChange={buyerPartySelect}>
              <option value="" disabled>Select Buyer Firm Name</option>
              {parties.map((party, index) => (
                <option key={index} value={party.name}>{party.name}</option>
              ))}
            </select>
          </FormControl>
        </Box>
      </HStack>

      {/* Product Information */}
      <FormControl as="form" onSubmit={handleSubmit} style={styles.form}>
      <Text style={styles.text}>Product Description</Text>

      <Text>Product Name: 
        <Input 
          type="text" 
          placeholder="Enter the Product name" 
          value={productName} 
          onChange={handleName} 
          style={styles.input}
        />
      </Text>
      

      <Text>Product HSN Code : 
        <Input 
          type="text" 
          placeholder="Enter Product HSN Code" 
          value={productHSNCode} 
          onChange={handleCode} 
          style={styles.input} 
        />
      </Text>
      

      <Text>Product Quantity in Kg : 
        <Input 
          type="text" 
          placeholder="Quantity" 
          value={productQuantity} 
          onChange={handleQuantity} 
          style={styles.input} 
        />
      </Text>
      

      <Text>Product Rate in Kg : 
        <Input 
          type="text" 
          placeholder="Rate" 
          value={productRate} 
          onChange={handleRate} 
          style={styles.input} 
        />
      </Text>

      
      <Button mt={4} colorScheme="blue" type="submit">
        Submit
      </Button>
      {error && <Text color="red.500">{error}</Text>}
    </FormControl>

      {showPreview && (
        <>
          <Divider my={6} />
          <Box bg="gray.50" p={5} borderRadius="md" boxShadow="md" w="100%">
            <Text fontSize="lg" fontWeight="bold">Invoice Preview</Text>

            {/* Seller Information */}
            {selectSellerParty && (
              <Box mt={4}>
                <Text fontWeight="bold">Seller Information:</Text>
                <Text>Name: {selectSellerParty.name}</Text>
                <Text>Address: {selectSellerParty.address}</Text>
                <Text>City: {selectSellerParty.city}</Text>
                <Text>State: {selectSellerParty.state}</Text>
                <Text>GST No: {selectSellerParty.gstNo}</Text>
              </Box>
            )}

            {/* Buyer Information */}
            {selectBuyerParty && (
              <Box mt={4}>
                <Text fontWeight="bold">Buyer Information:</Text>
                <Text>Name: {selectBuyerParty.name}</Text>
                <Text>Address: {selectBuyerParty.address}</Text>
                <Text>City: {selectBuyerParty.city}</Text>
                <Text>State: {selectBuyerParty.state}</Text>
                <Text>GST No: {selectBuyerParty.gstNo}</Text>
              </Box>
            )}

            {/* Product Information */}
            <Box mt={4}>
              <Text fontWeight="bold">Product Details:</Text>
              <Text>Product Name: {productName}</Text>
              <Text>HSN Code: {productHSNCode}</Text>
              <Text>Quantity in Kg: {productQuantity}</Text>
              <Text>Rate per Kg: {productRate}</Text>
            </Box>
          </Box>
        </>
      )}
    </VStack>
  );
};

export default InvoiceForm;
