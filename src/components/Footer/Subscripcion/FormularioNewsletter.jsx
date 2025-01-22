import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const FormularioNewsletter = ({agregarSuscriptor}) =>{
    const [correo, setCorreo] = useState('');

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (correo){
            agregarSuscriptor(correo);
            setCorreo('');//Limpiar el campo una vez agregado
        }
    }

    return(
        <>        
        
        <Form onSubmit={manejarEnvio} className="newsletterformsection">
            <Form.Group className="mb-3 newsletterform" controlId="exampleForm.ControlInput1">
                <Form.Control type="email" placeholder="name@example.com"   value={correo}
            onChange={(e) => setCorreo(e.target.value)} className="newsletter-input"/>
                <Button variant="primary" type="submit" className="btn-newsletter">Enviar</Button>

            </Form.Group>
        </Form>
        

        </>

    )

};

export default FormularioNewsletter;