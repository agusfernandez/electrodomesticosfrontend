
import Miniaturas from './Miniaturas/Miniaturas'
import Carrusel from './Carrusel/Carrusel';
import ProductRecommendations from './ProductRecommen/ProductRecommendations';
import Banners from './Banners/Banners';
import './styles/home.css';


const Home = ({ addToCart }) =>  {
    return (
       
      <>
        <Carrusel/>
        <ProductRecommendations/>
        <Banners/>
        <Miniaturas/>
      </>

    )
}

export default Home;