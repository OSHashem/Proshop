import {useState,useEffect} from 'react'
import axios from 'axios'

import {Row, Col} from 'react-bootstrap'
import Product from "../components/Product";
// import products from '../products'

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API
    const fetchProducts = async () => {
      try {
        const {data} = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
    <h1>Latest Products</h1>
    <Row>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
    </>
  )
} 

export default HomeScreen