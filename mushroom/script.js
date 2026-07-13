// --- Account Page Logic (Sign In / Register) ---
let isLogin = true;

function toggleAuth() {
    isLogin = !isLogin;
    const authTitle = document.getElementById('authTitle');
    const authBtn = document.getElementById('authBtn');
    const registerFields = document.getElementById('registerFields');
    const toggleLink = document.getElementById('toggleAuthLink');

    if (authTitle) authTitle.innerText = isLogin ? 'Sign In' : 'Register';
    if (authBtn) authBtn.innerText = isLogin ? 'Login' : 'Register';
    if (registerFields) registerFields.style.display = isLogin ? 'none' : 'block';
    if (toggleLink) toggleLink.innerText = isLogin ? 'New here? Register instead.' : 'Already have an account? Sign In.';
}

function handleAuth() {
    const phoneInput = document.getElementById('userPhone');
    const passInput = document.getElementById('userPass');
    const emailInput = document.getElementById('regEmail');

    if (!phoneInput || !passInput) {
        alert("System Error: Missing input fields.");
        return;
    }

    const phone = phoneInput.value;
    const pass = passInput.value;
    const email = emailInput ? emailInput.value : '';

    if (!phone || !pass) {
        alert("Please fill in all required fields.");
        return;
    }

    if (!isLogin && !email) {
        alert("Please provide an email address for registration.");
        return;
    }

    // Load existing users (if any)
    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (isLogin) {
        // Login Logic
        if (users[phone] && users[phone].pass === pass) {
            alert("Logged in successfully!");
            localStorage.setItem('currentUser', JSON.stringify({ phone: phone, email: users[phone].email })); // Store current user
            window.location.href = 'index.html'; // Redirect to home or dashboard
        } else {
            alert("Invalid phone number or password.");
        }
    } else {
        // Register Logic
        if (users[phone]) {
            alert("An account with this phone number already exists.");
        } else {
            users[phone] = { pass: pass, email: email };
            localStorage.setItem('users', JSON.stringify(users));
            alert("Account created successfully! Please sign in.");
            toggleAuth(); // Switch to login view
        }
    }
}

// --- Shop Page Logic (Booking) ---
function handleBooking() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert("Please sign in or register to place a booking.");
        window.location.href = 'account.html';
        return;
    }

    const qtyInput = document.getElementById('qty');
    if (!qtyInput) {
        alert("System Error: Missing quantity input.");
        return;
    }

    const qty = qtyInput.value;
    if (!qty || qty <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    // Save booking locally (for now)
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push({
        userPhone: currentUser.phone,
        mushroom: "Premium Oyster Mushrooms", // Hardcoded as only one type
        quantity: qty,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    alert(`Booking successful for ${qty}kg of Premium Oyster Mushrooms! We will contact you at ${currentUser.phone}.`);
    qtyInput.value = ''; // Clear the input
}


// --- Reviews Page Logic ---
function loadReviews() {
    const reviewListDiv = document.getElementById('reviewList');
    if (reviewListDiv) {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviewListDiv.innerHTML = ''; // Clear existing reviews
        if (reviews.length === 0) {
            reviewListDiv.innerHTML = '<p style="text-align:center;">No reviews yet. Be the first!</p>';
        } else {
            reviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.className = 'review-item';
                reviewDiv.innerHTML = `<strong>"${review.text}"</strong> - ${review.name} <br><small>${review.date}</small>`;
                reviewListDiv.appendChild(reviewDiv);
            });
        }
    }
}

function postReview() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert("Please sign in or register to post a review.");
        window.location.href = 'account.html';
        return;
    }

    const reviewTextInput = document.getElementById('reviewText');
    if (!reviewTextInput) {
        alert("System Error: Missing review text input.");
        return;
    }

    const reviewText = reviewTextInput.value;
    if (!reviewText.trim()) {
        alert("Please write something in your review.");
        return;
    }

    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push({
        name: currentUser.phone, // Using phone as display name for simplicity, or could add a 'username' field
        text: reviewText.trim(),
        date: new Date().toLocaleString()
    });
    localStorage.setItem('reviews', JSON.stringify(reviews));
    alert("Review posted successfully!");
    reviewTextInput.value = ''; // Clear the input
    loadReviews(); // Refresh the list
}


// Universal Initialization based on page
document.addEventListener('DOMContentLoaded', () => {
    // Inject common navigation and footer (optional, or manually add to each HTML)
    const commonNav = `
        <nav>
            <div class="logo">🍄 FungiForest</div>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="shop.html">Shop</a></li>
                <li><a href="reviews.html">Reviews</a></li>
                <li><a href="account.html">Account</a></li>
            </ul>
        </nav>
    `;
    const commonFooter = `
        <footer>
            <p>&copy; 2026 FungiForest Local Seller. All rights reserved.</p>
        </footer>
    `;

    // A simpler approach for this example: ensure each page's specific JS runs
    // For account page
    if (document.getElementById('authBox')) {
        // Initial state for account page is login
        toggleAuth(); // Ensures register fields are hidden and button says 'Login' initially
    }
    // For reviews page
    if (document.getElementById('reviewList')) {
        loadReviews();
    }
});