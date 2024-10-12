import { showLoadingSpinner, hideLoadingSpinner } from "./loader.mjs";
import { fetchDataFromAPI } from "./common.mjs";

async function fetchProductDetails() {
  try {
    showLoadingSpinner();

    // Get the product ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
   

    if (!productId) {
      throw new Error("Product ID is missing in the URL");
    }

    // Fetch product details from the API based on the product ID
    const productData = await fetchDataFromAPI();
    

    // Find the product with the matching ID
    const product = productData.find(product => product.id === productId);

    if (!product) {
      throw new Error("Product not found");
    }

    // Construct the HTML for the product details
    let sizeOptionsHTML = "";
    if (product.sizes && product.sizes.length > 0) {
      sizeOptionsHTML = product.sizes.map(size => `<option value="${size}">${size}</option>`).join("");
    } else {
      sizeOptionsHTML = '<option value="">Sizes not available</option>';
    }

    const productHTML = `
      <h1>${product.title}</h1>
      <img src="${product.image}" alt="Product Image">
      <p>${product.baseColor}</p>
      <p>Price: ${product.price}</p>
      <p>${product.description}</p>
      <select id="size-dropdown">${sizeOptionsHTML}</select>
      <button id="add-to-cart">Add to Cart</button>
    `;

    // Populate the product details container with the generated HTML
    document.getElementById("product-details").innerHTML = productHTML;

    // Add event listener for the "Add to Cart" button
    document.getElementById("add-to-cart").addEventListener("click", function() {
      const selectedSize = document.getElementById("size-dropdown").value;
      const productToAddToCart = {
        name: product.title,
        price: product.price,
        image: product.image,
        size: selectedSize
      };

      // Retrieve existing cart data from localStorage
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      cartItems.push(productToAddToCart);

      // Save updated cart data back to localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Confirmation message or UI update
      
      alert("Product added to cart!");  // Optional: alert user or show some UI feedback
    });

    hideLoadingSpinner();
  } catch (error) {
    console.error("Error fetching product details:", error);
    hideLoadingSpinner();
  }
}

// Call the fetchProductDetails function when the page loads
window.addEventListener("DOMContentLoaded", fetchProductDetails);

