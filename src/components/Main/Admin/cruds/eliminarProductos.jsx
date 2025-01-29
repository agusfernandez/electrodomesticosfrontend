import {useState, useEffect} from 'react';
import { deleteProductos, getProductos } from '../services';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EliminarProductos = () => {
    const [productos, setProductos] = useState([]);
    const [productoSele, setProductoSeleccionado] = useState({}); 

    useEffect(()=>{
        async function cargarProductos(){
            const response = await getProductos();
            
            if(response.status === 200 ){
                setProductos(response.data.productos);
            }

        }

        cargarProductos();
    },[]);


  
    const handleSelProducto = (event) => {
        setProductoSeleccionado(event.target.value);
        console.log(productoSele);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false); 
    const handleShow = () => setShow(true); 

    const handleDelete = () => {
        const  confirmDelete = window.confirm(`¿Estas seguro que querés eliminar el curso?`);

        if(confirmDelete){
            deleteProductos(productoSele)
            .then((response) => {
                console.log(response);
                handleClose();
                window.location.reload();
            })

            .catch((error)=> {
                console.log('Error en eliminar', error);
            })
        }
    }

    return (
        <>
             <Button className='m-3' variant="primary" type="submit" value="Enviar" onClick={handleShow}>Borrar Producto</Button>
             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                            <Form.Select value={productoSele} onChange={handleSelProducto}>
                                    <option>Seleccionar un producto</option>
                                        {productos.map((producto) =>(
                                        <option key={producto._id} value={producto._id}>
                                                 {producto._id} - {producto.nombre}
                                         </option>
                                    ))}
                            </Form.Select>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="primary" type="submit" onClick={handleDelete}>Borrar Producto</Button>
                        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                </Modal.Footer>
             </Modal>

             
            
        </>
    )
    


}

export default EliminarProductos;