import FormularioNewsletter from './FormularioNewsletter';
import ListaSuscriptores from './ListaSuscriptores';
import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import './styles/subscripcion.css';

const Subscripcion = () => {
    const [suscriptores, setSuscriptores] = useState([]);

    useEffect(() => {
      const suscriptoresGuardados = JSON.parse(localStorage.getItem('suscriptores')) || [];
      setSuscriptores(suscriptoresGuardados)
    }, []);
  
    const agregarSuscriptor = (correo) => {
      const nuevoSuscriptor = [...suscriptores, correo];
      setSuscriptores(nuevoSuscriptor);
      localStorage.setItem('suscriptores', JSON.stringify(nuevoSuscriptor));
    }
  
    return(
      <Container className="footer-sect"  fluid>
        <h3 className="subtitles">Newsletter</h3>
        <FormularioNewsletter agregarSuscriptor={agregarSuscriptor} />
        <ListaSuscriptores suscriptores={suscriptores} />
      </Container>
    )
}

export default Subscripcion;