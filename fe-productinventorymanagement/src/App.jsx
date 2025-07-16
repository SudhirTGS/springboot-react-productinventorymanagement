import { useState, useEffect } from 'react'
import './App.css'

// Add a simple SVG logo (or you can replace with an image if you have one)
function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      background: '#1976d2',
      color: '#fff',
      padding: '10px 24px',
      marginBottom: '24px',
      boxShadow: '0 2px 8px #e3e3e3'
    }}>
      <span style={{ marginRight: '16px', display: 'flex', alignItems: 'center' }}>
        {/* Simple SVG logo */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="6" width="28" height="20" rx="4" fill="#fff" stroke="#1565c0" strokeWidth="2"/>
          <rect x="7" y="11" width="18" height="10" rx="2" fill="#1976d2" />
          <circle cx="16" cy="16" r="2.5" fill="#fff"/>
        </svg>
      </span>
      <span style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '1px' }}>
        ProductInventoryManagement
      </span>
    </nav>
  );
}

function Cart({ cartItems, onRemove }) {
  const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.productPrice), 0);

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      background: '#fff',
      border: '1px solid #1976d2',
      borderRadius: '8px',
      boxShadow: '0 2px 8px #e3e3e3',
      padding: '16px',
      minWidth: '220px',
      zIndex: 1000
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>Cart</h3>
      {cartItems.length === 0 ? (
        <p style={{ color: '#888', margin: 0 }}>No items in cart</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {cartItems.map(item => (
              <li key={item.productId} style={{ marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                  <span style={{ fontWeight: 500 }}>{item.productName}</span>
                  <br />
                  <span style={{ fontSize: '0.9em', color: '#555' }}>${item.productPrice}</span>
                </span>
                <button
                  style={{
                    marginLeft: '8px',
                    background: '#e53935',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '0.85em'
                  }}
                  onClick={() => onRemove(item.productId)}
                >
                  Unselect
                </button>
              </li>
            ))}
          </ul>
          <div style={{ borderTop: '1px solid #eee', marginTop: '10px', paddingTop: '8px', textAlign: 'right', fontWeight: 600 }}>
            Total Amount: ${totalAmount.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of cards per page
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8090/products')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched products:', data); // Debug log
        // If data is an object with a products property, use that
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  const handleAddToCart = (product) => {
    // Prevent duplicates
    if (!cart.find(item => item.productId === product.productId)) {
      setCart([...cart, product]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  return (
    <>
      <Navbar />
      <Cart cartItems={cart} onRemove={handleRemoveFromCart} />
      <h1>Product Inventory</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {paginatedProducts.map(product => (
              <div
                key={product.productId}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '16px',
                  width: '250px',
                  boxShadow: '2px 2px 8px #eee'
                }}
              >
                <h3>{product.productName}</h3>
                <p>{product.productDescription}</p>
                <p><b>Price:</b> ${product.productPrice}</p>
                <p><b>Quantity:</b> {product.productQuantity}</p>
                <p><small>ID: {product.productId}</small></p>
                <button
                  style={{
                    marginTop: '10px',
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    cursor: cart.find(item => item.productId === product.productId) ? 'not-allowed' : 'pointer',
                    opacity: cart.find(item => item.productId === product.productId) ? 0.6 : 1
                  }}
                  onClick={() => handleAddToCart(product)}
                  disabled={!!cart.find(item => item.productId === product.productId)}
                >
                  {cart.find(item => item.productId === product.productId) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </>
  )
}

export default App
