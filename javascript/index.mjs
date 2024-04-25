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

            // Create an image element and set its source and alt text
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.title || "Product Image";
            itemDiv.appendChild(img);

            // Create a heading element for the title and set its text content
            const title = document.createElement("h2");
            title.textContent = item.title;
            itemDiv.appendChild(title);

            // Create a heading element for the sizes and set its text content
            const sizes = document.createElement("h4");
            sizes.textContent = item.sizes;
            itemDiv.appendChild(sizes);

            // Create a paragraph element for the base color and set its text content
            const baseColor = document.createElement("p");
            baseColor.textContent = item.baseColor;
            itemDiv.appendChild(baseColor);

            // Create a paragraph element for the price and set its text content
            const price = document.createElement("p");
            price.textContent = item.price;
            itemDiv.appendChild(price);

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
