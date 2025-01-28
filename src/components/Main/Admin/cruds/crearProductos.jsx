import { useState, useRef } from 'react'; 
import { addProductos } from '../services';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CrearProductos = () => {

   const [show, setShow] = useState(false); // Modal
   const handleClose = () => setShow(false); // Cerrar modal
   const handleShow = () => setShow(true); // Abrir modal

   // Datos del Producto
   const [nombre, setNombre] = useState(''); 
   const [marca, setMarca] = useState('');
   const [descripcion, setDescripcion] = useState('');
   const [precio, setPrecio] = useState('');
   const [categoria, setCategoria] = useState(''); 
   const [estado, setEstado] = useState('');
   const [stock, setStock] = useState(''); 

   const inputFileProducto = useRef(); // Para la imagen

   const handleSubmit = () => {
        const productosData = {
            nombre: nombre,
            marca: marca,
            descripcion: descripcion,
            precio: precio,
            imagen: inputFileProducto.current.files[0],  // Imagen
            categoria: categoria,
            estado: estado,  // Aseguramos que el estado se pase correctamente
            stock: stock,
        }

        addProductos(productosData)
        .then((response) => {
            console.log(response);
            handleClose();
            window.location.reload();
        })
        .catch((error) =>{
            console.log('Error al crear producto', error);
        });
   }

   return (
    <>
        <Button onClick={handleShow}>Crear Producto</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Crear Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control type="text" name="nombre" onChange={(event) => { setNombre(event.target.value) }} placeholder="Ingrese el nombre del producto" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicMarca">
                        <Form.Label>Marca del Producto</Form.Label>
                        <Form.Control type="text" name="marca" onChange={(event) => { setMarca(event.target.value) }} />
                    </Form.Group>
            
                    <Form.Group className="mb-3" controlId="formBasicDescripcion">
                        <Form.Label>Descripción del Producto</Form.Label>
                        <Form.Control as="textarea" name="descripcion" onChange={(event) => { setDescripcion(event.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Precio del Producto</Form.Label>
                        <Form.Control type="number" name="precio" onChange={(event) => { setPrecio(event.target.value) }} placeholder="Ingrese el precio del producto" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicImagen">
                        <Form.Label>Cargar una Imagen</Form.Label>
                        <Form.Control type="file" ref={inputFileProducto} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCategoria">
                        <Form.Label>Categoría del Producto</Form.Label>
                        <Form.Select name="categoria" onChange={(event) => { setCategoria(event.target.value) }}>
                            <option value="Selecciona una categoria"></option>
                            <option value="pequeñoseletrodomesticos">Pequeños Electrodomésticos</option>
                            <option value="refrigeradores">Refrigeradores</option>
                            <option value="lavado">Lavado</option>
                            <option value="cocina">Cocina</option>
                            <option value="otro">Otro</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEstado">
                        <Form.Label>Estado del Producto</Form.Label>
                        <Form.Select name="estado" onChange={(event) => { setEstado(event.target.value) }}>
                            <option value="Selecciona un estado"></option>
                            <option value="nuevo">Nuevo</option>
                            <option value="usado">Usado</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicStock">
                        <Form.Label>Stock del Producto</Form.Label>
                        <Form.Control type="number" name="stock" onChange={(event) => { setStock(event.target.value) }} />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                <Button variant="primary" onClick={handleSubmit}>Crear Producto</Button>
            </Modal.Footer>

        </Modal>
    </>
   )
}

export default CrearProductos;
