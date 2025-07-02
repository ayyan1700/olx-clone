let store = [
    { img: "img/49bf1053b6d983ed5ee0b898559bfee4.jpg", name: "cars", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/4e9e3f5b1a28481d104a8df20145e18c.jpg", name: "cars", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/2d5cc7ea11dca3e2b010cbcff076afa5.jpg", name: "bike", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/a1e246c8dee618e5d9037a22359670eb.jpg", name: "cars", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/439aa665f2b656eec45ddabfd9892e98.jpg", name: "bike", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/b2a480c4458d6e85040236b2335642fe.jpg", name: "cars", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/c291cacb0553c07d98072c07d29ab1e3.jpg", name: "bike", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/40ffd9ec500aed30a14af82aac479750.jpg", name: "bike", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/f387fcd79d84a654b11ea542f224c617.jpg", name: "bike", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/4cfcd04cf48b543d5a2e5f3780a0de54.jpg", name: "house", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/acb6a5f657b103d2e1708f07d083954e.jpg", name: "house", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/180a63b8a1c8eb1b7340b12b103a6753.jpg", name: "house", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/1c174be32c39ffe4c72952308711d9c5.jpg", name: "Ac", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/8fd09ecb77c87ac74465dfd7e791be91.jpg", name: "Ac", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/4639ecce68a9514a3bbd2b08ce5af8c8.jpg", name: "Ac", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/ee47ed8147ad9a451a7eefe6939d7d0c.jpg", name: "sofa", price: "80.50lakhs", description: "This premium quality product offers elegant design." },
    { img: "img/ded9f2be9686942ec75e3a0e3015eed6.jpg", name: "sofa", price: "80.50lakhs", description: "This premium quality product offers elegant design." }
];


window.addEventListener("DOMContentLoaded", function () {
    const profile = document.getElementById("profile");
    const tooltip = document.getElementById("profileTooltip");
    const changeProfileInput = document.getElementById("changeProfilePic");

    const userData = JSON.parse(localStorage.getItem("currentUser"));

    if (userData && profile && tooltip) {
        profile.src = userData.profileImg || "img/user-profile-icon-vector-avatar-600nw-2247726673.webp";
        tooltip.innerHTML = `<strong>${userData.signname}</strong><br>${userData.signemail}<br><label for='changeProfilePic' style='color: var(--secondery);'>Change Picture</label>`;
    }


    if(profile){
        profile.addEventListener("mouseenter", () => tooltip.style.display = "block");
    }
    if( tooltip){
        tooltip.addEventListener("mouseenter", () => tooltip.style.display = "block");
        tooltip.addEventListener("mouseleave", () => tooltip.style.display = "none");
    }
    
 
   if(changeProfileInput){
    changeProfileInput.addEventListener("change", () => {
        if (!userData) {
            alert("Please login first to change your profile picture.");       
            return;
        }

        const file = changeProfileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function () {
            const updatedImg = reader.result;
            profile.src = updatedImg;

         
            let allUsers = JSON.parse(localStorage.getItem("data")) || [];
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const email = currentUser.signemail;
            const userIndex = allUsers.findIndex(u => u.signemail === email);

            if (userIndex !== -1) {
                allUsers[userIndex].profileImg = updatedImg;
                localStorage.setItem("data", JSON.stringify(allUsers));

                currentUser.profileImg = updatedImg;
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
            }
        };
        reader.readAsDataURL(file);
    });
}
});



function getLocationSelection() {
    const locationSelect = document.getElementById("location-select");
    return locationSelect ? locationSelect.value : "";
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleString();
}

function attachCartButtons() {
    const buttons = document.querySelectorAll(".signpage");
    buttons.forEach((button, index) => {
        button.addEventListener("click", function () {
            let currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if (!currentUser) {
                alert("Please login first.");
                return;
            }

            let cartKey = `cart_${currentUser.signemail}`;
            let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
            const product = store[index];

            if (!cart.some(item => item.img === product.img)) {
                const location = getLocationSelection();
                const time = getCurrentTime();
                cart.push({ ...product, location, time });
                localStorage.setItem(cartKey, JSON.stringify(cart));
                alert("Added to cart with location and time!");
            } else {
                alert("Already in cart");
            }
        });
    });
}


window.addEventListener("DOMContentLoaded", attachCartButtons);



let searchButton = document.getElementById("searchbutton");
let input = document.getElementById("text");
let productdiv = document.querySelector(".product");

let sell = document.getElementById("sell");
if (sell) {
    sell.addEventListener("click", function () {
        let currentUser = localStorage.getItem("currentUser");
        if (!currentUser) {
            alert("Please login first");
            return;
        }
        let cart = JSON.parse(localStorage.getItem(`cart_${currentUser}`)) || [];
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            window.location.href = "index2.html";
        }
    });
}

function displayproduct(productArray) {
    productdiv.innerHTML = "";
    productArray.forEach(product => {
        let cards = document.createElement("div");
        cards.classList.add("cards");
        cards.innerHTML = `
            <img src="${product.img}">
            <p>${product.name}</p>
            <span>${product.price}</span>
            <p>${product.description}</p>
            <button class="signpage">Add to Cart</button>
        `;

        let button = cards.querySelector(".signpage");
        button.addEventListener("click", function () {
            let currentUser = localStorage.getItem("currentUser");
            if (!currentUser) {
                alert("Please login first.");
                return;
            }

            let cartKey = `cart_${currentUser}`;
            let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

            if (!cart.some(item => item.img === product.img)) {
                cart.push(product);
                localStorage.setItem(cartKey, JSON.stringify(cart));
                alert("Added to cart!");
            } else {
                alert("Already in cart!");
                return;
            }

            window.location.href = "index2.html";
        });

        productdiv.appendChild(cards);
    });

    if (productArray.length === 0) {
        productdiv.innerHTML = "<p>No products found.</p>";
    }
}

if (window.location.pathname.includes("index.html")) {
    displayproduct(store);
}

if (window.location.pathname.includes("index2.html")) {
    window.addEventListener("DOMContentLoaded", function () {
        let currentUser = localStorage.getItem("currentUser");
        if (!currentUser) {
            alert("Please login first");
            window.location.href = "index1.html";
            return;
        }

        let cartKey = `cart_${currentUser}`;
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        let finalCartKey = `finalCart_${currentUser}`;
        let finalCart = JSON.parse(localStorage.getItem(finalCartKey)) || [];

        let container = document.querySelector(".container");
        if (!container) return;

        cart.forEach(product => {
            let cardsimg = document.createElement("div");
            cardsimg.classList.add("cardsimg", "cart-item");

            let uniqueId = `quantity-${product.img.replace(/\W/g, '')}`;

            cardsimg.innerHTML = `
                <img src="${product.img}" alt="">
                <div class="inform">
                    <p>${product.name}</p>
                    <span>${product.price}</span>
                    <p>${product.description}</p>
                    <label for="${uniqueId}">Quantity:</label>
                    <input id="${uniqueId}" type="number" min="1" max="6">
                    <button class="lastcart">Add to Final Cart</button>
                    <i class="fas fa-trash-alt delete-btn"></i>
                </div>
            `;

            const lastcart = cardsimg.querySelector(".lastcart");
            const quantityInput = cardsimg.querySelector(`#${uniqueId}`);

            if (lastcart && quantityInput) {
                lastcart.addEventListener("click", () => {
                    const qty = parseInt(quantityInput.value);
                    if (!qty || qty <= 0) {
                        alert("Please enter a valid quantity");
                        return;
                    }

                    const itemWithQty = { ...product, quantity: qty };
                    const existingIndex = finalCart.findIndex(p => p.img === product.img);
                    if (existingIndex !== -1) {
                        finalCart[existingIndex].quantity = qty;
                    } else {
                        finalCart.push(itemWithQty);
                    }

                    localStorage.setItem(finalCartKey, JSON.stringify(finalCart));
                    alert(`${product.name} added to final cart with quantity ${qty}`);
                });
            }

            const deleteBtn = cardsimg.querySelector(".delete-btn");
            if (deleteBtn) {
                deleteBtn.addEventListener("click", () => {
                    let updatedCart = cart.filter(item => item.img !== product.img);
                    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
                    location.reload();
                });
            }

            container.appendChild(cardsimg);
        });
    });
}

function checkItem() {
    let searchTerm = input.value.trim().toLowerCase();
    let filtered = store.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayproduct(filtered);
}

if (searchButton) {
    searchButton.addEventListener("click", checkItem);
}
if (input) {
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            checkItem();
        }
    });
}

// LOGIN / SIGNUP
let data = JSON.parse(localStorage.getItem("data")) || [];
let signname = document.getElementById("signname");
let signemail = document.getElementById("signemail");
let signnumber = document.getElementById("signnumber");
let signpassword = document.getElementById("signpassword");

let submit = document.getElementById("submit");
if (submit) {

    submit.addEventListener("click", function (e) {
        e.preventDefault();
 
        if (!signname.value || !signemail.value || !signnumber.value || !signpassword.value ) {
            alert("Fill All Input fields");
            return;
        }
     
            let userData = {
                signname: signname.value,
                signemail: signemail.value,
                signnumber: signnumber.value,
                signpassword: signpassword.value,
            };
    
            data.push(userData);
            localStorage.setItem("data", JSON.stringify(data));
            alert("Account created successfully!");
            window.location.href = "index.html";
        
    });
}

let login = document.getElementById("login");
if (login) {
    login.addEventListener("click", function () {
        let foamDiv = document.createElement("div");
        let overlay = document.createElement("div");

        foamDiv.innerHTML = `
            <center><img src="img/41sJviCKjVL.png" alt=""></center><br>
            <label for="logemail">Email:</label><br>
            <input id="logemail" type="email"><br>
            <label for="logpassword">Password:</label><br>
            <input id="logpassword" type="password"><br><br>
            <button id="logged">Log In</button><br><br>
            <button id="signup">Sign Up</button>
        `;

        foamDiv.classList.add("foamDiv");
        overlay.classList.add("overlay");
        document.body.style.overflow = "hidden";
        document.body.appendChild(foamDiv);
        document.body.appendChild(overlay);

        document.getElementById("signup").addEventListener("click", function () {
            window.location.href = "index1.html";
        });

        document.getElementById("logged").addEventListener("click", function () {
            let email = document.getElementById("logemail").value;
            let password = document.getElementById("logpassword").value;

            if (!email || !password) {
                alert("Fill all fields");
                return;
            }

            let user = data.find(user => user.signemail === email && user.signpassword === password);
            if (user) {
                alert("Login successful!");
                localStorage.setItem("currentUser", JSON.stringify(user));
                foamDiv.remove();
                overlay.remove();
                document.body.style.overflow = "auto";
                window.location.href = "index.html";
            } else {
                alert("Account not found. Please sign up.");
            }
        });
    });
}

let backtomainpg = document.getElementById("backtomainpg");
if (backtomainpg) {
    backtomainpg.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}

let logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        alert("You have been logged out.");
        window.location.href = "index.html"; 
    });
}
