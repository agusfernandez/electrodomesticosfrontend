import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFacebook, FaInstagram, FaTwitter, FaArrowDown } from 'react-icons/fa'; // Importar iconos
import { useState, useEffect } from 'react';
import './styles/footer.css';

const FooterLinks = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    useEffect(() => {
        // Actualizar el estado si la pantalla cambia de tamaño
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Container className="footer-links" fluid>
                <Row className="footer">
                    {/* Sobre Nosotros */}
                    <Col xs={12} md={4} className="footer-section about">
                        <h3 onClick={() => isMobile && toggleSection('about')}>
                            Sobre Nosotros
                            {isMobile && <FaArrowDown className={`arrow ${activeSection === 'about' ? 'rotated' : ''}`} />}
                        </h3>
                        {!isMobile || activeSection === 'about' ? (
                            <p>Somos una tienda especializada en electrodomésticos de alta calidad.</p>
                        ) : null}
                    </Col>

                    {/* Enlaces Rápidos */}
                    <Col xs={12} md={4} className="footer-section links">
                        <h3 onClick={() => isMobile && toggleSection('links')}>
                            Enlaces Rápidos
                            {isMobile && <FaArrowDown className={`arrow ${activeSection === 'links' ? 'rotated' : ''}`} />}
                        </h3>
                        {!isMobile || activeSection === 'links' ? (
                            <ul>
                                <li><a href="/contact">Contacto</a></li>
                                <li><a href="/privacy">Política de Privacidad</a></li>
                                <li><a href="/terms">Términos de Servicio</a></li>
                            </ul>
                        ) : null}
                    </Col>

                    {/* Síguenos */}
                    <Col xs={12} md={4} className="footer-section social">
                        <h3 onClick={() => isMobile && toggleSection('social')}>
                            Síguenos
                            {isMobile && <FaArrowDown className={`arrow ${activeSection === 'social' ? 'rotated' : ''}`} />}
                        </h3>
                        {!isMobile || activeSection === 'social' ? (
                            <div className="social-icons">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook size="2em"  className="socialicons"/>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram size="2em" className="socialicons"/>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter size="2em" className="socialicons"/>
                                </a>
                            </div>
                        ) : null}
                    </Col>

                    {/* Footer inferior */}
                    <Col xs={12} md={12} className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} ElectroShop. Todos los derechos reservados.</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FooterLinks;
