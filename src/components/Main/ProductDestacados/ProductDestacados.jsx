import React, {useState, useEffect} from 'react';
import { getDestacados } from './services';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Spinner  from 'react-bootstrap/Spinner';



export const ProductosDestacados = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        //async-await

        async function cargarProductos(){
            setLoading(true);

            try{
                const response = await getDestacados();
                if (response && response.status === 200) {
                    setProductos(response.data.productos || []);
                } else {
                    console.error('Error en la respuesta:', response);
                    setError('No se pudo cargar los productos. Verifica la API.');
                }
            } catch(error){
                console.error('Error en la carga de prodcutos' , error);
                setError('Ocurrrio un error al cargar los productos');
            } finally {
                setLoading(false);
            }
        }

        cargarProductos();

    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        );
    }


    if (error) {
        return <div className="text-center text-danger mt-5">{error}</div>;
    }

    if (!productos.length) {
        return <div className="text-center mt-5">No se encontraron productos disponibles.</div>;
    }

    return (
        <Container className="backGround d-flex flex-wrap gap-3 justify-content-center mt-5">
            {productos.map((producto) => (
                <Card key={producto.id} style={{ width: '18rem' }}>
                    <Card.Img
                        variant="top"
                        src={producto.imagen}
                        style={{ height: '400px' }}
                        alt={producto.nombre}
                    />
                    <Card.Body>
                        <Card.Text className="conditiontag">
                            {producto.estado}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">{producto.marca}</Card.Subtitle>

                        <Card.Title>{producto.nombre}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{producto.categoria}</Card.Subtitle>

                        <Card.Text>
                            {producto.descripcion}
                        </Card.Text>
                        <Card.Text>
                            ${producto.precio}
                        </Card.Text>
                        <Button variant="primary">Comprar</Button>

                    </Card.Body>

                </Card>
            ))}
        </Container>
    );



}

export default ProductosDestacados;