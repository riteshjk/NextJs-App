import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Spinner, Text, SimpleGrid } from '@chakra-ui/react';
import ProductCart from './ProductCart';
import { fetchProducts } from '@/redux/slices/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, page, hasMore, loadingMore } = useSelector(state => state.products);

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
            <ProductCart key={item.id} items={item} />
          ))}
        </SimpleGrid>
      </InfiniteScroll>
      {loadingMore && (
        <Box textAlign="center" py="4">
          <Spinner size="xl" />
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
