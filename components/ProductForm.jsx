import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '@/redux/slices/productSlice';
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

const ProductForm = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProduct({ ...product, name, description }));
      onClose(); 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
      </FormControl>
      <Button type="submit" colorScheme="blue" mr={3}>
        Save
      </Button>
      <Button type="button" onClick={onClose}>
        Cancel
      </Button>
    </Box>
  );
};

export default ProductForm;
