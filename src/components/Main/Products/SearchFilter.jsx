import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './styles/SearchFilter.css'

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Manejador de cambio en el input
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Container className="search-filter">
      <Form onSubmit={handleSubmit} className="search-block">
        <Form.Group controlId="search" className="search-block-group">
          <Form.Control className="search-input" type="text" placeholder="Ingresa el nombre del producto" value={searchTerm} onChange={handleInputChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-search-primary">
          Buscar
        </Button>
      </Form>
    </Container>
  );
};

export default SearchFilter;
