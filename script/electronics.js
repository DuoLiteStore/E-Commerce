document.addEventListener('DOMContentLoaded', function() {
    renderProductList(); // Carrega a lista de produtos ao carregar a página
});

// Função para renderizar a lista de produtos na página inicial
function renderProductList() {
    const productContainer = document.getElementById('produtos-container');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Limpa a lista atual
    productContainer.innerHTML = '';

    const filteredProducts = products.filter(product => product.category === 'Eletrônicos');

    if (filteredProducts.length === 0) {
        productContainer.innerHTML = '<p>Nenhum Eletrônico disponível.</p>';
    } else {
        // Exibe os produtos filtrados
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('produto');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
                <p><strong>Categoria:</strong> ${product.category}</p>
                <a href="${product.link}" target="_blank">Ver Produto</a>
            `;
            productContainer.appendChild(productCard);
        });
    }
}