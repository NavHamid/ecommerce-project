import axios from 'axios';
import { useState } from 'react';
import { formatMoney } from '../../utils/money';

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  const addToCart = async () => {
    await axios.post('/api/cart-items', {
      productId: product.id,
      quantity
    });
    await loadCart();
  };

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };

  // Magnifier Zoom effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.8)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  // Deterministic ratings distribution based on product.id
  const getRatingBreakdown = (productId) => {
    const seed = productId.charCodeAt(0) || 0;
    const fiveStar = 50 + (seed % 35);
    const fourStar = Math.floor((100 - fiveStar) * 0.6);
    const threeStar = Math.floor((100 - fiveStar - fourStar) * 0.5);
    const twoStar = Math.floor((100 - fiveStar - fourStar - threeStar) * 0.5);
    const oneStar = 100 - fiveStar - fourStar - threeStar - twoStar;
    return { 5: fiveStar, 4: fourStar, 3: threeStar, 2: twoStar, 1: oneStar };
  };

  return (
    <>
      <div className="product-container" data-testid="product-container">
        <div 
          className="product-image-container" 
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: 'pointer' }}
        >
          <img 
            className="product-image"
            data-testid="product-image"
            src={product.image} 
            alt={product.name}
          />
        </div>

        <div 
          className="product-name limit-text-to-2-lines" 
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: 'pointer' }}
        >
          {product.name}
        </div>

        <div className="product-rating-container">
          <img className="product-rating-stars"
            data-testid="product-rating-stars-image"
            src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
          <div className="product-rating-count link-primary" style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(true)}>
            {product.rating.count}
          </div>
        </div>

        <div className="product-price">
          {formatMoney(product.priceCents)}
        </div>

        <div className="product-quantity-container">
          <select value={quantity} onChange={selectQuantity}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="product-spacer"></div>

        <div className="added-to-cart">
          <img src="images/icons/checkmark.png" />
          Added
        </div>

        <button className="add-to-cart-button button-primary"
          data-testid="add-to-cart-button"
          onClick={addToCart}>
          Add to Cart
        </button>
      </div>

      {/* Interactive Details Modal */}
      {isModalOpen && (
        <div className="product-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="product-modal-close" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <div className="product-modal-grid">
              <div className="product-modal-left">
                <div 
                  className="zoom-image-container" 
                  onMouseMove={handleMouseMove} 
                  onMouseLeave={handleMouseLeave}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="zoom-image" 
                    style={zoomStyle} 
                  />
                </div>
                <div className="zoom-instruction">Hover over image to zoom</div>
              </div>
              <div className="product-modal-right">
                <h2 className="modal-product-name">{product.name}</h2>
                <div className="product-rating-container modal-ratings">
                  <img className="product-rating-stars" src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                  <span className="rating-count-text">{product.rating.count} ratings</span>
                </div>
                
                <div className="ratings-breakdown">
                  <div className="breakdown-title">Customer Ratings</div>
                  {Object.entries(getRatingBreakdown(product.id)).reverse().map(([stars, pct]) => (
                    <div key={stars} className="breakdown-row">
                      <span className="breakdown-star-label">{stars} star</span>
                      <div className="breakdown-bar-bg">
                        <div className="breakdown-bar-fill" style={{ width: `${pct}%` }}></div>
                      </div>
                      <span className="breakdown-pct-label">{pct}%</span>
                    </div>
                  ))}
                </div>

                <div className="modal-product-price">
                  Price: <span className="price-highlight">{formatMoney(product.priceCents)}</span>
                </div>

                {product.keywords && product.keywords.length > 0 && (
                  <div className="modal-keywords-container">
                    <span className="keywords-title">Keywords: </span>
                    {product.keywords.map((kw, i) => (
                      <span key={i} className="keyword-tag">{kw}</span>
                    ))}
                  </div>
                )}

                <div className="modal-quantity">
                  <span>Quantity:</span>
                  <select value={quantity} onChange={selectQuantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <button 
                  className="add-to-cart-button modal-add-button button-primary" 
                  onClick={() => { addToCart(); setIsModalOpen(false); }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}