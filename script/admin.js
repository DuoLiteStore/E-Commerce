document.addEventListener('DOMContentLoaded', function() {
    renderProductList(); // Carrega a lista de produtos ao carregar a página

    // Adicionar produto
    document.getElementById('add-product-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('product-name').value;
        const category = document.getElementById('product-category').value;
        const image = document.getElementById('product-image').value;
        const link = document.getElementById('product-link').value;

        // Validação dos campos
        if (!name || !category || !image || !link) {
            alert("Todos os campos devem ser preenchidos.");
            return;
        }

        const newProduct = {
            id: Date.now(), // Usando timestamp como ID único
            name,
            category,
            image,
            link
        };

        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        renderProductList(); // Atualiza a lista de produtos
        event.target.reset(); // Limpa os campos do formulário

        alert("Produto adicionado com sucesso!");
    });

    // Remover produto
    document.getElementById('remove-product-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const productId = parseInt(document.getElementById('product-id').value);

        if (!confirm('Tem certeza de que deseja remover este produto?')) {
            return;
        }

        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(product => product.id !== productId);

        localStorage.setItem('products', JSON.stringify(products));

        renderProductList(); // Atualiza a lista de produtos
        event.target.reset(); // Limpa os campos do formulário

        alert("Produto removido com sucesso!");
    });
});


// Função para renderizar a lista de produtos
function renderProductList() {
    const productContainer = document.getElementById('produtos-container');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Limpa a lista atual
    productContainer.innerHTML = '';

    if (products.length === 0) {
        productContainer.innerHTML = '<p>Nenhum produto disponível.</p>';
    } else {
        // Exibe os produtos
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('produto');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
                <p><strong>ID:</strong> ${product.id}</p>
                <p><strong>Categoria:</strong> ${product.category}</p>
                <a href="${product.link}" target="_blank">Ver Produto</a>
            `;
            productContainer.appendChild(productCard);
        });
    }
}
