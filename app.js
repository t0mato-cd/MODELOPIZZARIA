const WHATSAPP_NUMBER = "5571999999999";

const menu = {
  pizzas: [
    {
      id: "margherita",
      name: "Margherita da Casa",
      description: "Molho artesanal, mussarela, tomate confit, manjericão e azeite da casa.",
      price: 49.9,
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Pizza margherita com tomate e manjericão",
    },
    {
      id: "calabresa",
      name: "Calabresa Especial",
      description: "Calabresa fatiada, cebola roxa, mussarela, orégano e borda crocante.",
      price: 54.9,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Pizza de calabresa com queijo derretido",
    },
    {
      id: "nobre",
      name: "Forno Nobre",
      description: "Mussarela, pepperoni, bacon, tomate seco, catupiry e toque de parmesão.",
      price: 64.9,
      image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Pizza artesanal premium com borda crocante",
    },
    {
      id: "frango",
      name: "Frango Cremoso",
      description: "Frango temperado, catupiry, milho, mussarela e batata palha finalizada.",
      price: 57.9,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Pizza cremosa servida em tábua",
    },
    {
      id: "quatro-queijos",
      name: "Quatro Queijos",
      description: "Mussarela, provolone, gorgonzola, parmesão e molho branco suave.",
      price: 59.9,
      image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Pizza de queijo fatiada",
    },
    {
      id: "portuguesa",
      name: "Portuguesa Premium",
      description: "Presunto, ovos, cebola, pimentão, azeitonas, mussarela e orégano.",
      price: 56.9,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Pizza com ingredientes variados",
    },
  ],
  bebidas: [
    {
      id: "coca",
      name: "Coca-Cola 2L",
      description: "Refrigerante gelado para acompanhar sua pizza.",
      price: 14.9,
      image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Refrigerante escuro com gelo",
    },
    {
      id: "guarana",
      name: "Guarana 2L",
      description: "Clássico brasileiro, servido bem gelado.",
      price: 12.9,
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Refrigerante gelado em copos",
    },
    {
      id: "suco",
      name: "Suco Natural",
      description: "Laranja, abacaxi ou acerola. Informe o sabor na observação.",
      price: 9.9,
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Suco natural de laranja",
    },
  ],
  sobremesas: [
    {
      id: "brotinho-chocolate",
      name: "Brotinho de Chocolate",
      description: "Massa fina, chocolate cremoso e granulado belga.",
      price: 27.9,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Sobremesa de chocolate cremosa",
    },
    {
      id: "banoffee",
      name: "Pizza Banoffee",
      description: "Banana, doce de leite, canela e finalização com creme leve.",
      price: 31.9,
      image: "https://images.unsplash.com/photo-1603052875302-d376b7c0638a?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Sobremesa com banana e doce de leite",
    },
    {
      id: "morango",
      name: "Morango Supremo",
      description: "Chocolate, morangos frescos e leite em pó.",
      price: 33.9,
      image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Sobremesa de morango com chocolate",
    },
  ],
};

const cart = new Map();
let activeCategory = "pizzas";

const menuGrid = document.querySelector("#menuGrid");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const tabs = document.querySelectorAll(".tab");

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function allProducts() {
  return Object.values(menu).flat();
}

function findProduct(id) {
  return allProducts().find((item) => item.id === id);
}

function renderMenu() {
  menuGrid.innerHTML = menu[activeCategory]
    .map(
      (item) => `
        <article class="menu-card">
          <div class="food-art">
            <img src="${item.image}" alt="${item.imageAlt}" loading="lazy" referrerpolicy="no-referrer" />
          </div>
          <div class="menu-card-body">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="menu-footer">
              <span class="price">${formatCurrency(item.price)}</span>
              <button class="add-button" type="button" data-add="${item.id}" aria-label="Adicionar ${item.name}">+</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCart() {
  const entries = Array.from(cart.entries());

  if (!entries.length) {
    cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio. Adicione itens do cardápio para montar a mensagem.</p>';
    cartTotal.textContent = formatCurrency(0);
    return;
  }

  cartItems.innerHTML = entries
    .map(([id, quantity]) => {
      const item = findProduct(id);
      return `
        <div class="cart-line">
          <div>
            <strong>${item.name}</strong>
            <span>${quantity} x ${formatCurrency(item.price)}</span>
          </div>
          <div class="qty-actions">
            <button type="button" data-decrease="${id}" aria-label="Diminuir ${item.name}">−</button>
            <b>${quantity}</b>
            <button type="button" data-increase="${id}" aria-label="Aumentar ${item.name}">+</button>
          </div>
        </div>
      `;
    })
    .join("");

  const total = entries.reduce((sum, [id, quantity]) => sum + findProduct(id).price * quantity, 0);
  cartTotal.textContent = formatCurrency(total);
}

function addToCart(id) {
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
}

function decreaseItem(id) {
  const quantity = cart.get(id) || 0;
  if (quantity <= 1) {
    cart.delete(id);
  } else {
    cart.set(id, quantity - 1);
  }
  renderCart();
}

function buildMessage() {
  const entries = Array.from(cart.entries());
  const name = document.querySelector("#customerName").value.trim() || "Cliente";
  const orderType = document.querySelector("#orderType").value;
  const note = document.querySelector("#orderNote").value.trim();
  const lines = entries.map(([id, quantity]) => {
    const item = findProduct(id);
    return `- ${quantity}x ${item.name} (${formatCurrency(item.price)} cada)`;
  });
  const total = entries.reduce((sum, [id, quantity]) => sum + findProduct(id).price * quantity, 0);

  return [
    "Olá, Forno Nobre! Quero fazer um pedido:",
    "",
    `Nome: ${name}`,
    `Tipo: ${orderType}`,
    "",
    "Itens:",
    ...lines,
    "",
    `Total aproximado: ${formatCurrency(total)}`,
    note ? `Observação: ${note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    activeCategory = tab.dataset.category;
    renderMenu();
    observeRevealItems(".menu-card");
  });
});

document.addEventListener("click", (event) => {
  const addId = event.target.dataset.add;
  const increaseId = event.target.dataset.increase;
  const decreaseId = event.target.dataset.decrease;

  if (addId) addToCart(addId);
  if (increaseId) addToCart(increaseId);
  if (decreaseId) decreaseItem(decreaseId);
});

document.querySelector("#clearCart").addEventListener("click", () => {
  cart.clear();
  renderCart();
});

document.querySelector("#sendWhatsApp").addEventListener("click", () => {
  if (!cart.size) {
    alert("Escolha pelo menos um item do cardápio antes de enviar.");
    return;
  }

  const message = encodeURIComponent(buildMessage());
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
});

renderMenu();
renderCart();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

function observeRevealItems(selector = ".reveal, .menu-card, .review-card, .contact-card") {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.remove("is-visible");
    element.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
    revealObserver.observe(element);
  });
}

observeRevealItems();
