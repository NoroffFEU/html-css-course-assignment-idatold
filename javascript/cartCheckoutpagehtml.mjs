document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    attachEventListeners();
});

function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear previous items
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.style.width = "50px";
        img.style.height = "50px";
        itemDiv.appendChild(img);

        const itemName = document.createElement('h3');
        itemName.textContent = item.name;
        itemDiv.appendChild(itemName);

        const itemSize = document.createElement('p');
        itemSize.textContent = `Size: ${item.size}`;
        itemDiv.appendChild(itemSize);

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `Price: $${item.price.toFixed(2)}`;
        itemDiv.appendChild(itemPrice);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.dataset.index = index;
        itemDiv.appendChild(removeButton);

        cartContainer.appendChild(itemDiv);
    });

    if (cartItems.length > 0) {
        const totalDiv = document.createElement('div');
        totalDiv.id = 'total-price';
        totalDiv.textContent = `Total Price: $${total.toFixed(2)}`;
        cartContainer.appendChild(totalDiv);
    } else {
        cartContainer.textContent = 'Your cart is empty';
    }
}

function attachEventListeners() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            const index = parseInt(event.target.dataset.index);
            removeItem(index);
        }
    });
}

function addItemToCart(newItem) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.name === newItem.name && item.size === newItem.size);

    if (existingItemIndex === -1) { // Only add new items that do not exist in the cart
        newItem.quantity = 1; // Each item can only be added once
        cartItems.push(newItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems();
    } else {
        alert("This item is already in your cart.");
    }
}

function removeItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (index >= 0 && index < cartItems.length) {
        cartItems.splice(index, 1); // Remove the item at the specified index
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems(); // Refresh the display to show the updated cart
    }
}
