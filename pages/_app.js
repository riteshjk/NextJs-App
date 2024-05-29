import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from 'react-redux';
import store from '../redux/store';

function MyApp({ Component, pageProps }) {
  // console.log(Component)
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
export default MyApp;
