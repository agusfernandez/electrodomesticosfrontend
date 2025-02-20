import Header from './Header/Header';
import Footer from './Footer/Footer';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import './css/general.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Header/>  
      </Router>  
       <Footer/>
    </AuthProvider>
    </>
  );
}

export default App;
