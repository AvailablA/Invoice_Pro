import React, { useState } from "react";
import { FormControl, Text } from "@chakra-ui/react";
import parties from "./parties"; // Importing the parties data

const InvoiceForm = () => {
  const [selectParty, setSelectParty] = useState("");

  const partySelect = (e) => {
    const selectName = e.target.value;
    const partyDetails = parties.find((party) => party.name === selectName);
    setSelectParty(partyDetails);
  };

  return (
    <>
      <FormControl>
        <Text>Seller Information</Text>
        <br />
        <Text>Firm Name</Text>

        <select
          placeholder="Select Firm Name"
          value={selectParty?.name || ""}
          onChange={partySelect}
        >
          {parties.map((party, index) => (
            <option key={index} value={party.name}>
              {party.name}
            </option>
          ))}
        </select>

        <br />
      </FormControl>

      <hr />
        <h2><Text>Seller Information</Text></h2>    
        

        {selectParty && (
        <>
          <hr />
          <h4><Text>Consignee Name : {selectParty.name}</Text></h4>
          <Text>Address: {selectParty.address}</Text>
          <Text>City: {selectParty.city}</Text>
          <Text>State: {selectParty.state}</Text>
          <Text>GST No: {selectParty.gstNo}</Text>
        </>
        )}
    </>
  );
};

export default InvoiceForm;


