// 1. Smooth Scroll Function
function scrollToMemories() {
    document.getElementById('video').scrollIntoView({ behavior: 'smooth' });
}

// 2. Reveal Sections on Scroll (The fade-in effect)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// 3. Floating Hearts Background Effect
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('particle');
    
    // Randomize emoji (Hearts, sparkles, etc.)
    const designs = ['❤️', '💖', '✨', '🦋', '🌸'];
    heart.innerText = designs[Math.floor(Math.random() * designs.length)];
    
    // Random horizontal position
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Random animation duration (fall speed)
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    
    // Random size
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    
    document.getElementById('particles-container').appendChild(heart);
    
    // Remove heart after animation ends to keep DOM clean
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Generate hearts every 300ms
setInterval(createHeart, 300);

// --- SHOPPING CART LOGIC ---
// --- UPDATED SHOPPING CART LOGIC WITH 4-DIGIT CODES ---
let cart = [];

// Assign a unique 4-digit code to each product name
const itemCodes = {
    "Teddy Bear": "1001",
    "Watch": "2024",
    "Sweater": "5566",
    "Sneakers": "0707"
};

function addToCart(item) {
    cart.push(item);
    document.getElementById('cart-count').innerText = cart.length;
    alert(item + " added to your bag! 💝");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Pick a gift first, silly! 🙄");
        return;
    }

    // 1. Create the Readable List for the message
    let itemList = cart.join(", ");

    // 2. Generate the Numerical Unique Code
    // This joins the 4-digit codes of all selected items (e.g., 10012024)
    let generatedCode = cart.map(item => itemCodes[item] || "0000").join("");

    // 3. Create the WhatsApp message
    let message = `Based on your selection, a code has been generated. Please send this to confirm your order. 
    
Order Code: #${generatedCode}

`;
    
    let encodedMessage = encodeURIComponent(message);
    
    // Using your phone number
    let whatsappUrl = `https://wa.me/8421124595?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    alert("Order Placed Successfully! Your delivery boy (Me) is on the way! 🚚💨");
}
// --- NEW: Handle Image Selection ---
function selectOption(category, value, element) {
    // 1. Update the hidden input field with the value (e.g., "Street Food")
    document.getElementById(`selected-${category}`).value = value;

    // 2. Visual Feedback: Remove 'selected' class from all siblings
    // This looks inside the specific container (e.g., food-options)
    const container = document.getElementById(`${category}-options`);
    const options = container.getElementsByClassName('option-card');
    
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove('selected');
    }

    // 3. Add 'selected' class to the clicked element
    element.classList.add('selected');
}

function sendDatePlan() {
    // 1. Get values from the HIDDEN inputs
    const food = document.getElementById("selected-food").value || "Not Chosen";
    const vibe = document.getElementById("selected-vibe").value || "Not Chosen";
    const travel = document.getElementById("selected-travel").value || "Not Chosen";
    const notes = document.getElementById("extra-notes").value || "No notes";

    // 2. Validation
    if (food === "Not Chosen" && vibe === "Not Chosen") {
        alert("Please select at least one option! 🥺");
        return;
    }

    // 3. Create the cute WhatsApp message
    let message = `Send this generated code to confirm the date 
    
Unique Code : ${food}${vibe}${travel}

My Notes: ${notes}
`;

    // 4. Convert to URL format
    let encodedMessage = encodeURIComponent(message);
    
    // Using the same number from your checkout logic
    let whatsappUrl = `https://wa.me/8421124595?text=${encodedMessage}`;
    
    // 5. Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // 6. Visual feedback on the button
    const btn = document.querySelector(".book-btn");
    btn.innerText = "Opening WhatsApp... 💬";
    
    setTimeout(() => {
        btn.innerText = "Date Sent! ✅";
    }, 2000);
}