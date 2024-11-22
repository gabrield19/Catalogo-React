import { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/styles_catalogo.css';

const Catalogo = () => {
  const [carrito, setCarrito] = useState([]);
  const [carritoVisible, setCarritoVisible] = useState(false); // Estado para controlar la visibilidad del carrito
  
  const products = [
    // Lista de productos
    {
        title: "BAJAJ Dominar 400",
        price: 16000000,
        imgSrc: "./images/1-dominar-400-gris-piedra.webp",
      },
      {
        title: "BMW GS 650",
        price: 26000000,
        imgSrc: "./images/BmwGS650.png",
      },
      {
        title: "HERO DASH 125",
        price: 8690000,
        imgSrc: "./images/Dash125_Verde_Negro.png",
      },
      {
        title: "HERO ECO 100",
        price: 4990000,
        imgSrc: "./images/Eco100co.png",
      },
      {
        title: "HERO XPULSE 200 4V",
        price: 1990000,
        imgSrc: "./images/xpulse2004vNegro.png",
      },
      {
        title: "BAJAJ BOXER S",
        price: 5499900,
        imgSrc: "./images/2-Boxer-s-gris-grafito.webp",
      },
      {
        title: "AKT DS 200",
        price: 9790000,
        imgSrc: "./images/TT_DS_200_roja_2024.png",
      },
      {
        title: "BAJAJ PULSAR NS 200",
        price: 11899000,
        imgSrc: "./images/PULSAR NS 200.png",
      },
      {
        title: "SUZUKI DR 150 FI ABS",
        price: 12990000,
        imgSrc: "./images/DR-150-1-removebg-preview.png",
      },
      {
        title: "HONDA XRE 300",
        price: 27400000,
        imgSrc: "./images/HONDA_XRE_300_ABS-PORTADA-removebg-preview.png",
      },
      {
        title: "VICTORY MRX ARIZONA",
        price: 10990000,
        imgSrc: "./images/moto_victory_mrx200_arizona_arena_2023_foto01.png",
      },
      {
        title: "SUSUKI GIXXER 250",
        price: 15580000,
        imgSrc: "./images/GIXXER-150-FI-ABS-NEGRA-3_4-brillante-2048x1965.webp",
      },
  ];

  const toggleCarrito = () => {
    setCarritoVisible(!carritoVisible);
  };

  const handleAddToCart = (product) => {
    if (carrito.find((item) => item.title === product.title)) {
      alert("Este artículo ya existe en el carrito.");
      return;
    }
    setCarrito([...carrito, { ...product, quantity: 1 }]);
  };

  const handleRemoveFromCart = (title) => {
    setCarrito(carrito.filter((item) => item.title !== title));
  };

  const handleQuantityChange = (title, quantity) => {
    setCarrito(
      carrito.map((item) =>
        item.title === title ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const calculateTotal = () => {
    return carrito.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (carrito.length === 0) {
      alert("No hay productos en el carrito. Escoge un producto primero.");
      return;
    }
    alert("Su pedido se realizó con éxito :)");
    setCarrito([]); // Vaciar el carrito después de la compra
  };

  return (
    <div className="App">
      <header>
        <div className="container">
          <a href="#" className="logo" title="Nacional Motos">
            <h1>
              <b>Nacional </b> Motos
            </h1>
          </a>
    
        <div/>
          <Link to="/">
            <object data="./images/log-out-regular-24.png" type="image/png" id="cerrar-icon" title="Cerrar Sesión" />
          </Link>
          <object
            data="./images/shopping-bag-regular-24.png"
            type="image/png"
            id="carrito-icon"
            onClick={toggleCarrito}
            title="Carrito de Compra"
          />
        </div>
      </header>

      <section className="tienda container">
        <h2 className="tienda-title">Nuestros Productos</h2>

        <div className="tienda-content">
          {products.map((product, index) => (
            <div key={index} className="producto-box">
              <img src={product.imgSrc} alt={product.title} className="producto-img" />
              <h2 className="producto-title">{product.title}</h2>
              <span className="producto-price">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                }).format(product.price)}
              </span>
              <object
                data="./images/shopping-bag-regular-24.png"
                type="image/png"
                className="carrito-add"
                onClick={() => handleAddToCart(product)}
                title="Agregar al Carrito"
              >
                <p>Agregar al Carrito</p>
              </object>
            </div>
          ))}
        </div>
      </section>

      {carritoVisible && (
        <div className="carrito">
          <h2 className="carrito-title">Carrito de Compra</h2>
          <div className="carrito-content">
            {carrito.map((item, index) => (
              <div key={index} className="carrito-box">
                <img src={item.imgSrc} alt={item.title} className="carrito-img" />
                <div className="detail-box">
                  <div className="carrito-producto-title">{item.title}</div>
                  <div className="carrito-price">
                    {new Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                    }).format(item.price * item.quantity)}
                  </div>
                  <input
                    type="number"
                    className="carrito-quantity"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.title, parseInt(e.target.value, 10))}
                  />
                </div>
                <button onClick={() => handleRemoveFromCart(item.title)} className="carrito-remove">
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="total">
            <div className="total_title">Total</div>
            <div className="total-price">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
              }).format(calculateTotal())}
            </div>
          </div>
          <button className="btn-buy" onClick={handleCheckout}>Comprar Ahora</button>
        </div>
      )}
    </div>
  );
};

export default Catalogo;