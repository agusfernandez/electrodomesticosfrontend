import { useState, useEffect, useContext } from "react";
import { getProductos } from "./services";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

import CrearProductos from "./cruds/crearProductos";
import ActualizarProductos from "./cruds/actualizarProductos";
import EliminarProductos from "./cruds/eliminarProductos";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

export const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    const { user, loading } = useContext(AuthContext);

    console.log("Usuario en AdminProductos:", user);


    useEffect(() => {
        async function obtenerProductos() {
            try {
                const response = await getProductos();
                if (response.status === 200) {
                    setProductos(response.data.productos);
                }
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        }
        
        
        if (user && user.role === "admin") {
            obtenerProductos();
        }
    }, [user]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    // Evaluamos permisos después de la carga
    if (!user || user.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Container fluid className="backGround d-flex flex-wrap gap-3 justify-content-center mt-5">
                <CrearProductos />
                <ActualizarProductos />
                <EliminarProductos />
            </Container>

            <Container fluid="md" className="productsContainer">
                <Row>
                    <Col className="productsBlock">
                        {productos.length > 0 ? (
                            productos.map(({ _id, nombre, marca, descripcion, precio, imagen, categoria, estado, stock }) => (
                                <Card key={_id} className="mb-3 card">
                                    <Card.Img 
                                        src={process.env.PUBLIC_URL + imagen} 
                                        alt="img" 
                                        className="imageCard"
                                    />
                                    <Card.Body>
                                        <Card.Text className="conditiontag">{estado}</Card.Text>
                                        <Card.Subtitle className="mb-2 text-muted">{marca}</Card.Subtitle>
                                        <Card.Title>{nombre}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{categoria}</Card.Subtitle>
                                        <Card.Text className="card-description">{descripcion}</Card.Text>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>${precio}</ListGroup.Item>
                                            <ListGroup.Item>Stock: {stock}</ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p>No hay productos disponibles.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AdminProductos;
