import { useState, useRef, useEffect } from 'react';
import { getProductos, updateProductos } from '../services';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ActualizarProductos = () => {
    const [productos, setProductos] = useState([]);
    const [productoSele, setProductoSele] = useState("");
    const [datosProductos, setDatosProductos] = useState({});

    useEffect(() => {
        async function obtenerProductos() {
            const response = await getProductos();

            if (response.status === 200) {
                setProductos(response.data.productos);
                console.log(response.data.productos);
            } else {
                console.log("Error al obtener productos con el estado:", response.status);
            }
        }
        obtenerProductos();
    }, []); 


    const handleSetProducto = (event) => {
        const productoSeleccionado = productos.find((producto) => producto._id === event.target.value);
        setProductoSele(event.target.value);
        setDatosProductos(productoSeleccionado);
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const inputFileRef = useRef();

    const handleSubmit = async () => {
        const confirmarActualizacion = window.confirm("¿Estás seguro de actualizar el producto?");
        
        if (!confirmarActualizacion) return;
    
        const formData = new FormData();
        formData.append("nombre", datosProductos.nombre);
        formData.append("marca", datosProductos.marca);
        formData.append("precio", datosProductos.precio);
        formData.append("descripcion", datosProductos.descripcion);
        formData.append("categoria", datosProductos.categoria);
        formData.append("estado", datosProductos.estado);
        formData.append("stock", datosProductos.stock);
    
        // Agregar la nueva imagen si se seleccionó
        if (inputFileRef.current?.files[0]) {
            formData.append("imagen", inputFileRef.current.files[0]);
        }
    
        try {
            const response = await updateProductos(productoSele, formData);
            console.log(response);
            handleClose();
            window.location.reload();
        } catch (error) {
            console.log('Error en actualización', error);
        }
    };
    
    return (
        <>
            <div>
                <Button className='m-3' variant="primary" type="submit" value="Enviar" onClick={handleShow}>Actualizar Producto</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Actualizar Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="productos">
                                <Form.Label>Seleccionar un Producto</Form.Label>
                                <Form.Select value={productoSele} onChange={handleSetProducto}>
                                    <option>Seleccionar un producto</option>
                                    {productos.map((producto) => (
                                        <option key={producto._id} value={producto._id}>
                                           {producto._id} - {producto.nombre}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <br />

                            {productoSele && (
                                <>
                                    <Form.Group controlId="nombre">
                                        <Form.Label>Nombre del Producto</Form.Label>
                                        <Form.Control
                                            defaultValue={datosProductos.nombre}
                                            name="nombre"
                                            onChange={(event) => {
                                                setDatosProductos({ ...datosProductos, nombre: event.target.value });
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="precio">
                                        <Form.Label>Precio del Producto</Form.Label>
                                        <Form.Control
                                            defaultValue={datosProductos.precio}
                                            name="precio"
                                            onChange={(event) => {
                                                setDatosProductos({ ...datosProductos, precio: event.target.value });
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="imagen">
                                        <Form.Label>Imagen del Producto</Form.Label>
                                        <Form.Control type="file" ref={inputFileRef}/>


                                    </Form.Group>
                                    <Form.Group controlId="stock">
                                        <Form.Label>Stock del Producto</Form.Label>
                                        <Form.Control
                                            defaultValue={datosProductos.stock}
                                            name="stock"
                                            onChange={(event) => {
                                                setDatosProductos({ ...datosProductos, stock: event.target.value });
                                            }}
                                        />
                                    </Form.Group>

                            

                                    
                              
                                </>
                            )}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Actualizar Producto
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default ActualizarProductos;
