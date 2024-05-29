import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Image, Text, Box } from '@chakra-ui/react';

const ProductDetailModal = ({ isOpen, onClose, product }) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image 
            src={product.avatar === "" ? "https://via.placeholder.com/150" : product.avatar} 
            alt={product.name} 
            width="100%"
            height="200px"
            objectFit="cover"
          />
          <Text mt="2">
            {product.description}
          </Text>
          <Text mt="2">
            {product.productPrice}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductDetailModal;
