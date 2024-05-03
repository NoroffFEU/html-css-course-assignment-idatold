document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
    attachEventListeners();
});

function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear previous items
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        const itemName = document.createElement('h3');
        itemName.textContent = item.name;
        itemDiv.appendChild(itemName);

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        itemDiv.appendChild(img);

        

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

    const totalDiv = document.createElement('div');
    totalDiv.id = 'total-price';
    totalDiv.textContent = `Total Price: $${total.toFixed(2)}`;
    cartContainer.appendChild(totalDiv);
}

function attachEventListeners() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-btn')) {
            const index = parseInt(event.target.dataset.index);
            removeItem(index);
        }
    });
}

function addItemToCart(newItem) {
    // Check if newItem has all necessary properties
    if (typeof newItem.price === 'undefined' || typeof newItem.quantity === 'undefined' || isNaN(newItem.price) || isNaN(newItem.quantity)) {
        console.error("Attempted to add item with invalid or missing price/quantity:", newItem);
        alert("Failed to add item. Price and quantity must be numeric and not undefined.");
        return; // Exit the function if data is not valid
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
