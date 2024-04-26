import { showLoadingSpinner, hideLoadingSpinner } from './loader.mjs';
import { fetchDataFromAPI } from './common.mjs';

async function fetchProductDetails() {
    try {
        showLoadingSpinner();

        // Get the product ID from the URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        console.log('Product ID:', productId); // Log product ID for debugging

        if (!productId) {
            throw new Error("Product ID is missing in the URL");
        }

        // Fetch product details from the API based on the product ID
        const productData = await fetchDataFromAPI(productId);
        console.log('Product Data:', productData); // Log product data for debugging

        // Construct the HTML for the product details
        const productHTML = `
            <h1>${productData.title}</h1>
            <img src="${productData.image}" alt="Product Image">
            <p>Sizes: ${productData.sizes ? productData.sizes.join(", ") : "Sizes not available"}</p>
            <p>Base Color: ${productData.baseColor}</p>
            <p>Price: ${productData.price}</p>
            <p>Description: ${productData.description}</p>
        `;

        // Populate the product details container with the generated HTML
        document.getElementById("product-details").innerHTML = productHTML;

        hideLoadingSpinner();
    } catch (error) {
        console.error("Error fetching product details:", error);
        hideLoadingSpinner();
    }
}

// Call the fetchProductDetails function when the page loads
window.addEventListener('DOMContentLoaded', fetchProductDetails);



