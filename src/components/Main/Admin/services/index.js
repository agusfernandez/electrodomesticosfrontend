import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getProductos() {
    try{
        const response = await axios({
            url: `${baseUrl}/productos`,
            method: "GET",
        })
        return response
    }
    catch (e) {
        console.log(e)
    }
}

export async function addProductos(productosData) {

    const token = localStorage.getItem('token'); 


    const formData = new FormData();
    formData.append('nombre', productosData.nombre);
    formData.append('marca', productosData.marca);
    formData.append('descripcion', productosData.descripcion);
    formData.append('precio', productosData.precio);
    formData.append('imagen', productosData.imagen);
    formData.append('categoria', productosData.categoria);
    formData.append('estado', productosData.estado);
    formData.append('stock', productosData.stock);

    try {
        const response = await axios.post(`${baseUrl}/productos`, formData, {
            headers: {
                 'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log('Producto agregado:', response.data);
        return response.data;


    } catch (error) { 
        console.error('Error al agregar producto:', error);
        throw error;
    }
}


export async function updateProductos(_id, datosNuevo) {
    const token = localStorage.getItem('token'); 
    try{
        const response = await axios({
            url: `${baseUrl}/productos/${_id}`,
            method: "PUT",
            data: datosNuevo,
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    }
    catch (e) {
        console.log(e)
    
    }
}

export async function deleteProductos(_id) {

    const token = localStorage.getItem('token'); 

    try {
        const response = await axios({
            url: `${baseUrl}/productos/${_id}`,
            method: "DELETE",
            headers : {
                'Authorization': `Bearer ${token}`           
            }
        })
        return response
    }
    catch (e) {
        console.log(e)
    }

}