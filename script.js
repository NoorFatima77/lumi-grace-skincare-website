
/* =========================================
   LUMI GRACE — WISHLIST
========================================= */

const wishlistButton = document.getElementById("wishlist-button");
const wishlistMessage = document.getElementById("wishlist-message");

let isWishlisted = localStorage.getItem("lumiGraceWishlist") === "true";

function updateWishlistButton() {
    wishlistButton.textContent = isWishlisted
        ? "♥ Added to Wishlist"
        : "♡ Add to Wishlist";

    wishlistMessage.textContent = isWishlisted
        ? "Lumi Grace Vitamin C Serum is on your wishlist!"
        : "";
}

updateWishlistButton();

wishlistButton.addEventListener("click", function () {
    isWishlisted = !isWishlisted;

    localStorage.setItem("lumiGraceWishlist", isWishlisted);

    updateWishlistButton();
});


/* =========================================
   LUMI GRACE — CART
========================================= */

const productPrice = 999;
const whatsappNumber = "923127301953";

const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartMessage = document.getElementById("cart-message");

const addToCartButton = document.getElementById("add-to-cart");
const removeFromCartButton = document.getElementById("remove-from-cart");
const clearCartButton = document.getElementById("clear-cart");

const productQuantityInput = document.getElementById("product-quantity");
const selectedPriceDisplay = document.getElementById("selected-price");

let cartQuantity = Number(localStorage.getItem("lumiGraceCart")) || 0;

function updateCart() {
    cartCount.textContent = cartQuantity;

    cartTotal.textContent =
        (cartQuantity * productPrice).toLocaleString("en-PK");

    localStorage.setItem("lumiGraceCart", cartQuantity);

    updateCheckoutSummary();
}

function updateSelectedPrice() {
    const quantity = Number(productQuantityInput.value);

    selectedPriceDisplay.textContent =
        Number.isInteger(quantity) && quantity >= 1 && quantity <= 10
            ? (quantity * productPrice).toLocaleString("en-PK")
            : "0";
}

productQuantityInput.addEventListener("input", updateSelectedPrice);

addToCartButton.addEventListener("click", function () {
    const quantity = Number(productQuantityInput.value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
        cartMessage.textContent = "Please select a quantity from 1 to 10.";
        return;
    }

    cartQuantity += quantity;

    updateCart();

    cartMessage.textContent =
        quantity === 1
            ? "1 serum added to your cart."
            : quantity + " serums added to your cart.";
});

removeFromCartButton.addEventListener("click", function () {
    if (cartQuantity <= 0) {
        cartMessage.textContent = "Your cart is already empty.";
        return;
    }

    cartQuantity -= 1;

    updateCart();

    cartMessage.textContent = "One serum removed. Cart updated.";
});

clearCartButton.addEventListener("click", function () {
    cartQuantity = 0;

    updateCart();

    cartMessage.textContent = "Cart cleared.";
});


/* =========================================
   LUMI GRACE — CHECKOUT SUMMARY
========================================= */

const checkoutQuantity = document.getElementById("checkout-quantity");
const checkoutTotal = document.getElementById("checkout-total");

function updateCheckoutSummary() {
    checkoutQuantity.textContent = cartQuantity;

    checkoutTotal.textContent =
        (cartQuantity * productPrice).toLocaleString("en-PK");
}


/* =========================================
   LUMI GRACE — WHATSAPP CHECKOUT
========================================= */

const checkoutForm = document.getElementById("checkout-form");
const checkoutMessage = document.getElementById("checkout-message");

checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (cartQuantity < 1) {
        checkoutMessage.textContent =
            "Your cart is empty. Please add the serum to your cart first.";

        return;
    }

    const customerName =
        document.getElementById("customer-name").value.trim();

    const customerPhone =
        document.getElementById("customer-phone").value.trim();

    const customerCity =
        document.getElementById("customer-city").value.trim();

    const customerAddress =
        document.getElementById("customer-address").value.trim();

    const orderNotes =
        document.getElementById("order-notes").value.trim();

    if (
        !customerName ||
        !customerPhone ||
        !customerCity ||
        !customerAddress
    ) {
        checkoutMessage.textContent =
            "Please complete all required delivery details.";

        return;
    }

    const productSubtotal = cartQuantity * productPrice;

    const orderText =
        "Hello Lumi Grace! I would like to place an order.\n\n" +
        "CUSTOMER DETAILS\n" +
        "Name: " + customerName + "\n" +
        "Phone: " + customerPhone + "\n" +
        "City: " + customerCity + "\n" +
        "Delivery Address: " + customerAddress + "\n" +
        (orderNotes ? "Additional Instructions: " + orderNotes + "\n" : "") +
        "\nORDER DETAILS\n" +
        "Product: Lumi Grace Vitamin C Serum\n" +
        "Quantity: " + cartQuantity + "\n" +
        "Price per serum: Rs. " + productPrice + "\n" +
        "Product subtotal: Rs. " +
        productSubtotal.toLocaleString("en-PK") + "\n\n" +
        "Please confirm product availability, delivery charges, " +
        "and the final payable amount. I will confirm the order with you.";

    const whatsappURL =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(orderText);

    checkoutMessage.textContent =
        "Opening WhatsApp. Please review your order and press Send to submit it.";

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
});


/* =========================================
   INITIALIZE WEBSITE
========================================= */

updateSelectedPrice();
updateCart();
