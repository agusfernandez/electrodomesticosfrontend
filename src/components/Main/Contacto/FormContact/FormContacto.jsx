import {useState} from 'react';
import '../styles/Contacto.css';
import '../styles/Error.css';

const FormContacto = () => {
    const [values, setValues] = useState({
      nombre:"",
      email:"",
      phone:"",
      message:"",
      
    });

   
    const [errors, setErrors] = useState({
        nombre: "",
        email: "",
        phone: "",
        message: "",
        pedido:"",
    })


    
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setValues({
            ...values,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: "",
        });
        
    };
    
    
   

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!values.nombre) {
            newErrors.nombre = "El campo nombre y apellido es requerido*";
            isValid = false;
        }

        if (!values.email) {
            newErrors.email = "Intruduzca un mail válido*";
            isValid = false;
        }

        if (!values.phone) {
            newErrors.phone = "Introduzca un número de teléfono válido*";
            isValid = false;
        }
        
        if (!values.pedido) {
            newErrors.pedido = "Introduzca un número de pedido válido*";
            isValid = false;
        }


        if (!values.message) {
            newErrors.message = "El campo mensaje es requerido*";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };



    const handleForm = (event) =>{
        event.preventDefault();
        if (validateForm()) {
        console.log(values);

        setValues({
            nombre: "",
            email: "",
            phone: "",
            message: "",
            pedido: "",
        });

        console.log("Formulario enviado correctamente")
    } else {
        console.log("Formulario no válido");
    }
};



    return(
        <div>
            <form onSubmit={handleForm} className="formContacto">
                <h1>Contacto</h1>
                
                <label htmlFor="">Nombre y Apellido</label>
                <input
                 type="text" 
                 name="nombre" 
                 value={values.nombre} 
                 placeholder=""
                 onChange={handleInputChange} 
                 />
                {errors.nombre && <p className="error">{errors.nombre}</p>}
                <br />
                <label htmlFor="">Correo Eléctronico</label>
                <input 
                type="email" 
                name="email" 
                value={values.email} 
                placeholder="" 
                onChange={handleInputChange} 
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <br />
                <label htmlFor="">Teléfono</label>
                <input 
                type="tel" 
                name="phone" 
                value={values.phone}
                placeholder="" 
                onChange={handleInputChange} 
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
                <br />

                <label htmlFor="">Número de pedido</label>
                <input 
                type="text" 
                name="pedido" 
                value={values.pedido}
                placeholder="vv-xxxxxx-elctr" 
                onChange={handleInputChange} 
                />
                {errors.pedido && <p className="error">{errors.pedido}</p>}
                <br />

                <textarea 
                name="message" 
                value={values.message}
                placeholder="Escriba aquí su consulta y/o reclamo" 
                onChange={handleInputChange} 
                />
                {errors.message && <p className="error">{errors.message}</p>}
                <button type="submit" className="btn-send">Enviar</button>
                <br />
            
            </form>

        </div>
    )

}


export default FormContacto;
