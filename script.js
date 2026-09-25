let cart = [];

const checkoutForm = document.getElementById('checkout-form');
const confirmOrderBtn = document.getElementById('confirm-order-btn');

// Items add karne ka function
function addToCart(itemName, itemPrice) {
    let existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    
    alert(itemName + ' cart mein add ho gaya! 🛒');
    checkoutForm.style.display = 'block';
    checkoutForm.scrollIntoView({ behavior: 'smooth' });
}

function toggleTxField() {
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const txContainer = document.getElementById('tx-container');
    
    if (payment === 'Online') {
        txContainer.style.display = 'block';
    } else {
        txContainer.style.display = 'none';
        document.getElementById('transaction-id').value = '';
    }
}

confirmOrderBtn.addEventListener('click', () => {
    const name = document.getElementById('customer-name').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const paymentElement = document.querySelector('input[name="payment"]:checked');
    const payment = paymentElement ? paymentElement.value : 'COD';
    const txId = document.getElementById('transaction-id').value.trim();

    if (name === '' || address === '') {
        alert('Please enter your name and delivery address!');
        return;
    }

    if (cart.length === 0) {
        alert('Please add items to your cart first!');
        return;
    }

    let message = `New Order!%0A- Name: ${name}%0A- Address: ${address}%0A- Payment: ${payment}%0A%0AItems:`;
    
    let totalBill = 0;
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        totalBill += itemTotal;
        message += `%0A- ${item.name} x ${item.quantity} = Rs. ${itemTotal}`;
    });

    message += `%0A%0ATotal Bill: Rs. ${totalBill}`;

    if (payment === 'Online') {
        if (txId === '') {
            alert('Please enter Transaction ID for online payment!');
            return;
        }
        message += `%0A- Transaction ID: ${txId}`;
    }

    const whatsappUrl = `https://wa.me/923712303171?text=${message}`;
    window.location.href = whatsappUrl;
});
