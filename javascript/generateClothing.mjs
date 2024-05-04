export function generateClothingHtml(clothing) {
    const container = document.createElement('div');
  
    const title = document.createElement('h3');
    title.textContent = clothing.title;
  
    const description = document.createElement('p');
    description.textContent = clothing.description;
  
    const price = document.createElement('div');
    price.textContent = clothing.price;
  
    container.append(title, description, price);
  
    return container;
  }