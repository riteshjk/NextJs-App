import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Spinner, Text, SimpleGrid } from '@chakra-ui/react';
import ProductCart from './ProductCart';
import { fetchProducts } from '@/redux/slices/productSlice';
import ProductDetailModal from './ProductDetail';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, page, hasMore, loadingMore } = useSelector(state => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === null) {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const fetchMoreData = () => {
    if (!loadingMore && hasMore) {
      dispatch(fetchProducts(page));
    }
  };

  const handleViewDetails =(product) =>{
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box p={4}>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <Box textAlign="center" py="4">
            <Spinner size="xl" />
          </Box>
        }
        endMessage={
          <Box textAlign="center" py="4">
            <Text fontWeight="bold">Yay! You have seen it all</Text>
          </Box>
        }
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {items.map(item => (
            <ProductCart key={item.id} items={item} onViewDetails={handleViewDetails}/>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
      {loadingMore && (
        <Box textAlign="center" py="4">
          <Spinner size="xl" />
        </Box>
      )}
      <ProductDetailModal isOpen={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />
    </Box>
  );
};

export default ProductList;
