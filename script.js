// Cart data structure: { itemName: { price, quantity } }
const cart = {};

// Grab all Add to Cart buttons
const addToCartButtons = document.querySelectorAll('.menu-item button');

// Create cart summary element and add to body
const cartSummary = document.createElement('div');
cartSummary.classList.add('cart-summary');
cartSummary.style.position = 'fixed';
cartSummary.style.bottom = '20px';
cartSummary.style.right = '20px';
cartSummary.style.backgroundColor = '#ff6347';
cartSummary.style.color = 'white';
cartSummary.style.padding = '1rem';
cartSummary.style.borderRadius = '10px';
cartSummary.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
cartSummary.style.cursor = 'pointer';
cartSummary.innerHTML = `🛒 Cart: <span id="cart-count">0</span> items - $<span id="cart-total">0.00</span>`;
document.body.appendChild(cartSummary);

// Update cart summary UI
function updateCartSummary() {
  const items = Object.values(cart);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  document.getElementById('cart-count').textContent = totalQuantity;
  document.getElementById('cart-total').textContent = totalPrice.toFixed(2);
}

// Add event listeners to Add to Cart buttons
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const menuItem = button.parentElement;
    const itemName = menuItem.querySelector('h3').textContent;
    const priceText = menuItem.querySelector('p').textContent;
    const price = parseFloat(priceText.replace('$', ''));

    if (cart[itemName]) {
      cart[itemName].quantity += 1;
    } else {
      cart[itemName] = { price, quantity: 1 };
    }

    updateCartSummary();
  });
});

// Optional: clicking cart summary shows alert (or you can make it show modal later)
cartSummary.addEventListener('click', () => {
  let message = '🛒 Your Cart:\n\n';
  for (const [itemName, item] of Object.entries(cart)) {
    message += `${itemName} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}\n`;
  }
  alert(message);
});
