import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import SearchFilter from './SearchFilter';
import './styles/products.css';


const Products = ({ addToCart }) => {  // Asegúrate de recibir `addToCart`
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const searchResponse = await axios.get('https://api.mercadolibre.com/sites/MLA/search?q=electrodomesticos');
        const productIds = searchResponse.data.results.map(product => product.id);
        const productDetailsPromises = productIds.map(id => axios.get(`https://api.mercadolibre.com/items/${id}`));
        const productDetailsResponses = await Promise.all(productDetailsPromises);
        const productsData = productDetailsResponses.map(response => response.data);
        setProducts(productsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = (filteredProducts.length > 0 ? filteredProducts : products).slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return (
    <div className="spinner-container">
      <Spinner animation="grow" role="status" className="custom-spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Container fluid className="bannerCatalog">
        <Row>
          <Image src="/img/banner/banner1.png" className="banner-img-catalog"/>
        </Row>
      </Container>

      <SearchFilter onSearch={handleSearch} />

      <Container fluid="md" className="productsContainer">
        <Row>
          <Col className="productsBlock">
            {currentProducts.map(item => (
              <Card key={item.id} className="card">
                <Card.Text className="conditiontag">
                  {item.condition}
                </Card.Text>
                <Card.Img variant="center" src={item.pictures[0]?.secure_url} className="imageCard" />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>${item.price}</Card.Text>
                  {/* Aquí pasamos la función addToCart al botón */}
                  <Button 
                    variant="primary" 
                    className="btn-primary-card" 
                    onClick={() => addToCart(item)}>
                    Comprar
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>

      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length > 0 ? filteredProducts.length : products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default Products;