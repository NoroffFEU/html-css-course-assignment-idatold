

// Function to fetch products from the API
async function fetchProducts() {
  try {
    const response = await fetch('https://api.noroff.dev/api/v1/rainy-days');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Function to update the carousel with random products
async function updateCarousel() {
  const products = await fetchProducts();
  const randomProducts = getRandomProducts(products, 3);

  document.getElementById('product1').innerHTML = generateProductHTML(randomProducts[0]);
  document.getElementById('product2').innerHTML = generateProductHTML(randomProducts[1]);
  document.getElementById('product3').innerHTML = generateProductHTML(randomProducts[2]);
}

// Function to generate HTML for a product
function generateProductHTML(product) {
  return `
      <div>
        <img src="${product.image}" alt="${product.title}" style="width: 250px; height: 300px;">
        <h3>${product.title}</h3>
      </div>
    `;
}

// Function to get random products from an array
function getRandomProducts(array, numProducts) {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, numProducts);
}

// Update carousel initially
updateCarousel();

// Set interval to update carousel every 5 seconds
setInterval(updateCarousel, 5000);
