import { showLoadingSpinner, hideLoadingSpinner } from './loader.mjs';
import { fetchDataFromAPI } from './common.mjs';

async function fetchData() {
    try {
        showLoadingSpinner();

        // Fetch data using the imported function
        const data = await fetchDataFromAPI();
        console.log(data)

        // Get the container element where the fetched data will be displayed
        const container = document.getElementById("jackets-card");

        // Update UI with fetched data
        data.forEach((item) => {
            // Create a div to hold each item's information
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("product");

            // Create an anchor element to wrap the product details
            const anchor = document.createElement("a");
            anchor.href = `./product/index.html?id=${item.id}`; // Assuming you have an 'id' property in your data
            anchor.classList.add("product-link"); // Add a class for styling
            anchor.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent the default behavior of anchor click
                // Navigate to the product page
                window.location.href = anchor.href;
            });

            // Create an image element and set its source and alt text
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.title || "Product Image";
            anchor.appendChild(img);

            // Create a heading element for the title and set its text content
            const title = document.createElement("h2");
            title.textContent = item.title;
            anchor.appendChild(title);

            // Create a paragraph element for the sizes and set its text content
            const sizes = document.createElement("p");
            sizes.textContent = "" + item.sizes.join(", ");
            anchor.appendChild(sizes);

            // Create a paragraph element for the base color and set its text content
            const baseColor = document.createElement("p");
            baseColor.textContent = "" + item.baseColor;
            anchor.appendChild(baseColor);

            // Create a paragraph element for the price and set its text content
            const price = document.createElement("h3");
            price.textContent = "" + item.price;
            anchor.appendChild(price);

            // Append the anchor element to the item div
            itemDiv.appendChild(anchor);

            // Append the item div to the container
            container.appendChild(itemDiv);
        });

        hideLoadingSpinner();
    } catch (error) {
        console.error("Error fetching data:", error);
        hideLoadingSpinner();
    }
}

fetchData();


