import Home from '../components/Home';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import ProductDetail from '../components/ProductDetail';
import NotFound from '../components/NotFound';

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;