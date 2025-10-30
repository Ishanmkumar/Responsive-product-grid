// --- Selectors ---
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// --- Loader UI ---
function showLoader() {
  productGrid.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
      <p>Loading products...</p>
    </div>
  `;
}

// --- Fetch products (AJAX with fetch API) ---
async function fetchProducts() {
  showLoader();
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    // Clean up data structure
    return data.map(p => ({
      id: p.id,
      name: p.title,
      category: p.category,
      price: `$${p.price}`,
      image: p.image
    }));
  } catch (error) {
    productGrid.innerHTML = `<p class="error">⚠️ Failed to load products. Please try again later.</p>`;
    console.error("Error fetching products:", error);
    return [];
  }
}

// --- Variables ---
let products = [];

// --- Initialize app ---
async function init() {
  products = await fetchProducts();
  renderProducts(products);
}

// --- Render products to grid ---
function renderProducts(list) {
  productGrid.innerHTML = "";

  if (list.length === 0) {
    productGrid.innerHTML = `<p class="no-results">No products found 😔</p>`;
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="product-info">
        <div>
          <h3>${p.name}</h3>
          <p class="price">${p.price}</p>
          <p>Category: ${p.category}</p>
        </div>
        <a href="#" class="btn">View Details</a>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// --- Filter products by search and category ---
function filterProducts() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value.toLowerCase();

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchText);
    const matchCategory = selectedCategory === "all" || p.category.toLowerCase() === selectedCategory;
    return matchSearch && matchCategory;
  });

  renderProducts(filtered);
}

// --- Event listeners ---
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// --- Initialize ---
init();
