
import React from "react";
// import { Box } from "@chakra-ui/react";
import {Box, Text, Center, Button} from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';


function Home() {

    const navigate = useNavigate();

    const goToForm = () => 
    {
        navigate("/InvoiceForm");
    };
    return (
        <>
        
        <Text textAlign="center"> Generate Invoice</Text>
        <Center h="10vh">
            <Box 
            p="15" 
            maxW="320px" 
            borderWidth="1px"            >
                <Button 
                cursor="pointer"
                onClick={goToForm}    > 
                    <Text 
                    fontWeight="bold"
                    fontSize="sm">
                        Tax Invoice
                    </Text>
                </Button>
            </Box>
        </Center>
        </>
    );
};

export default Home;

