
let cart = [];

function addToCart(name, price) {
    cart.push({ name: name, price: price });

    document.getElementById("cart-count").textContent =
        cart.length;

    showToast(name + " added to cart!");
}

function showCart() {
    if (cart.length === 0) {
        showToast("Your cart is empty. Add food first!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price, 0
    );

    const items = cart.map(
        item => item.name + " - ₹" + item.price
    ).join("\n");

    const confirmOrder = confirm(
        "Your Cart:\n" + items +
        "\n\nTotal: ₹" + total +
        "\n\nPlace this demo order?"
    );

    if (confirmOrder) {
        alert(
            "Thank you for ordering!\n" +
            "Your total is ₹" + total +
            "\nThis is a demo. No payment was taken."
        );

        cart = [];

        document.getElementById("cart-count").textContent = "0";
    }
}

let toastTimer;

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
}
