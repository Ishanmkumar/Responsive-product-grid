const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// Simulate fetching data via AJAX (in real case, replace with fetch('/api/products'))
async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data.map(p => ({
    id: p.id,
    name: p.title,
    category: p.category,
    price: `$${p.price}`,
    image: p.image
  }));
}

let products = [];

async function init() {
  products = await fetchProducts();
  renderProducts(products);
}

// Render the product grid
function renderProducts(list) {
  productGrid.innerHTML = "";

  if (list.length === 0) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="price">${p.price}</p>
        <p>Category: ${p.category}</p>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Filter products by search and category
function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchText) &&
    (selectedCategory === "all" || p.category.toLowerCase() === selectedCategory)
  );

  renderProducts(filtered);
}

// Event listeners
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// Initialize app
init();
