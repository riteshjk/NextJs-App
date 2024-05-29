import React from 'react';
import { Box, Button, Image, Text } from '@chakra-ui/react';

const ProductCart = ({ items,onViewDetails }) => {
  return (
    <Box 
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center" // Center child elements horizontally
    >
      <Image 
        src={items.avatar === "" ? "https://via.placeholder.com/150" : items.avatar} 
        alt={items.name} 
        width="100%"
        height="200px"
        objectFit="cover"
        mx="auto"
      />
      <Text mt="2" fontWeight="bold" textAlign="center">
        {items.name}
      </Text>
      <Button mt="2" alignSelf="center" onClick={() => onViewDetails(items)}>
        View Details
      </Button>
    </Box>
  );
};

export default ProductCart;
