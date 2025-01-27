import { useState, useEffect } from "react";
import { getProductos } from './services';

import CrearProductos from "./cruds/crearProductos";
import ActualizarProductos from "./cruds/actualizarProductos";
import EliminarProductos from "./cruds/eliminarProductos";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export const AdminProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() =>{
        async function obtenerProductos() {
            const response = await getProductos();
            if (response.status === 200) {
                setProductos(response.data.productos)
            }
        }
        obtenerProductos();
    }, []);

    return (
        <>
            <Container>
                <CrearProductos />
                <ActualizarProductos />
                <EliminarProductos />
            </Container>

            <Container>
                {productos.length > 0 ? (
                    productos.map(({ _id, nombre, marca, descripcion, precio, imagen, categoria, estado, stock }) => (
                        <Card key={_id} className="mb-3">
                            <Card.Img 
                                src={process.env.PUBLIC_URL + imagen} 
                                alt="img" 
                                style={{ maxWidth: '50px', maxHeight: '50px' }} 
                            />
                            <Card.Body>
                                <Card.Text className="conditiontag">
                                    {estado}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{marca}</Card.Subtitle>
                                <Card.Title>{nombre}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{categoria}</Card.Subtitle>
                                <Card.Text>
                                    {descripcion}
                                </Card.Text>
                                <Card.Text>
                                    ${precio}
                                </Card.Text>
                                <Card.Text>
                                    stock: {stock}
                                </Card.Text>
                                <Button variant="primary">Comprar</Button>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No hay productos disponibles.</p>
                )}
            </Container>
        </>
    );
};

export default AdminProductos;
