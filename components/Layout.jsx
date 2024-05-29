import { useDispatch,useSelector } from 'react-redux';
import {fetchProducts} from '../redux/slices/productSlice';
import { useEffect } from 'react';
import ProductList from './ProductList';

const Layout = () => {
  const dispatch = useDispatch();
 
 

  useEffect(() => {
    dispatch(fetchProducts());
  }, [])

  return (
    <div>
      <p>Front Page</p>
      <ProductList/>
    </div>
  )
}

export default Layout
