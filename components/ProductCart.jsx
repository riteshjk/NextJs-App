import React from 'react';
import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';

const ProductCart = ({ items, onViewDetails, onDelete, onUpdate }) => {
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
      alignItems="center"
    >
      <Image 
        src={items.avatar === "" ? "https://via.placeholder.com/150" : items.avatar} 
        alt={items.name} 
        width="100%"
        height="300px"
        objectFit="cover"
        mx="auto"
      />
      <Text mt="2" fontWeight="bold" textAlign="center">
        {items.name}
      </Text>
      <Text mt="2" fontWeight="bold" textAlign="center">
        Price - {items.productPrice}
      </Text>
      <Button mt="2" alignSelf="center" onClick={() => onViewDetails(items)}>
        View Details
      </Button>
      <HStack mt="2" spacing="2">
        <Button size="sm" colorScheme="blue" onClick={() => onUpdate(items)}>
          Update
        </Button>
        <Button size="sm" colorScheme="red" onClick={() => onDelete(items.id)}>
          Delete
        </Button>
      </HStack>
    </Box>
  );
};

export default ProductCart;
