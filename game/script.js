// JavaScript for Eco-Friendly Products Webpage

// Add functionality to "Add to Cart" buttons
document.querySelectorAll('.product .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.closest('.product').querySelector('h3').textContent;
        alert(`${productName} has been added to your cart!`);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});
