// ======================================================
// ADMINFLOW DASHBOARD
// script.js
// ======================================================

document.addEventListener("DOMContentLoaded", () => {


    // ==================================================
    // ELEMENTS
    // ==================================================

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    const themeToggle = document.getElementById("themeToggle");

    const dashboardSearch = document.getElementById("dashboardSearch");
    const dateFilter = document.getElementById("dateFilter");

    const logoutBtn = document.querySelector(".logout-btn");

    const notificationBtn =
        document.querySelector(".notification-btn");

    const chartBars =
        document.querySelectorAll(".chart-column");

    const tableRows =
        document.querySelectorAll("#recentOrders tr");
        

    // ==========================================
    // GLOBAL ADMIN PROFILE
    // ==========================================

    function loadGlobalAdminProfile() {

        let profile = {
            firstName: "Thabiso",
            lastName: "Shezi",
            role: "Administrator"
        };

        try {

            const savedProfile =
                JSON.parse(
                    localStorage.getItem("adminProfile")
                );

            if (savedProfile) {

                profile = {
                    ...profile,
                    ...savedProfile
                };
            }

        } catch (error) {

            console.warn(
                "Unable to load admin profile.",
                error
            );
        }


        const firstName =
            profile.firstName?.trim() || "Admin";

        const lastName =
            profile.lastName?.trim() || "";

        const fullName =
            `${firstName} ${lastName}`.trim();

        const initials =
            `${firstName[0] || ""}${lastName[0] || ""}`
                .toUpperCase();


        // Sidebar avatar

        document
            .querySelectorAll(".user-avatar")
            .forEach(avatar => {

                avatar.textContent =
                    initials || "AD";

            });


        // Header avatar

        document
            .querySelectorAll(".profile-avatar")
            .forEach(avatar => {

                avatar.textContent =
                    initials || "AD";

            });


        // Sidebar full name

        document
            .querySelectorAll(
                ".sidebar-user .user-info strong"
            )
            .forEach(element => {

                element.textContent =
                    fullName;

            });


        // Sidebar role

        document
            .querySelectorAll(
                ".sidebar-user .user-info span"
            )
            .forEach(element => {

                element.textContent =
                    profile.role ||
                    "Administrator";

            });


        // Header first name

        document
            .querySelectorAll(
                ".profile-details strong"
            )
            .forEach(element => {

                element.textContent =
                    firstName;

            });


        // Header role

        document
            .querySelectorAll(
                ".profile-details span"
            )
            .forEach(element => {

                element.textContent =
                    profile.role === "Administrator"
                        ? "Admin"
                        : profile.role;

            });
    }


    loadGlobalAdminProfile();


    // ==================================================
    // MOBILE SIDEBAR
    // ==================================================

    function openSidebar() {
        sidebar?.classList.add("show");
        sidebarOverlay?.classList.add("show");

        document.body.style.overflow = "hidden";
    }


    function closeSidebar() {
        sidebar?.classList.remove("show");
        sidebarOverlay?.classList.remove("show");

        document.body.style.overflow = "";
    }


    menuBtn?.addEventListener("click", openSidebar);

    sidebarClose?.addEventListener("click", closeSidebar);

    sidebarOverlay?.addEventListener("click", closeSidebar);


    // Close sidebar after clicking navigation link on mobile

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 900) {
                closeSidebar();
            }

        });

    });


    // ESC closes sidebar

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeSidebar();
        }

    });


    // ==================================================
    // DARK / LIGHT MODE
    // ==================================================

    const savedTheme = localStorage.getItem("adminTheme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (themeToggle) {
            themeToggle.textContent = "☀";
        }

    } else {

        if (themeToggle) {
            themeToggle.textContent = "☾";
        }

    }


    themeToggle?.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const darkMode =
            document.body.classList.contains("dark");


        themeToggle.textContent =
            darkMode ? "☀" : "☾";


        localStorage.setItem(
            "adminTheme",
            darkMode ? "dark" : "light"
        );

    });


    // ==================================================
    // DASHBOARD SEARCH
    // ==================================================

    dashboardSearch?.addEventListener("input", event => {

        const searchValue =
            event.target.value
                .toLowerCase()
                .trim();


        tableRows.forEach(row => {

            const rowText =
                row.textContent.toLowerCase();


            row.style.display =
                rowText.includes(searchValue)
                    ? ""
                    : "none";

        });

    });


    // ==================================================
    // DATE FILTER DATA
    // ==================================================

    const dashboardData = {

        7: {
            revenue: 28650,
            orders: 426,
            customers: 97,
            conversion: "5.2%"
        },

        30: {
            revenue: 84250,
            orders: 1248,
            customers: 3642,
            conversion: "4.8%"
        },

        90: {
            revenue: 238900,
            orders: 3745,
            customers: 6890,
            conversion: "5.6%"
        }

    };


    // ==================================================
    // NUMBER FORMATTER
    // ==================================================

    function formatCurrency(value) {

        return new Intl.NumberFormat(
            "en-ZA",
            {
                style: "currency",
                currency: "ZAR",
                maximumFractionDigits: 0
            }
        ).format(value);

    }


    function formatNumber(value) {

        return new Intl.NumberFormat(
            "en-ZA"
        ).format(value);

    }


    // ==================================================
    // ANIMATE NUMBER
    // ==================================================

    function animateNumber(
        element,
        endValue,
        formatter
    ) {

        if (!element) return;


        const duration = 700;

        const startTime =
            performance.now();


        function update(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            const value =
                Math.floor(
                    progress * endValue
                );


            element.textContent =
                formatter(value);


            if (progress < 1) {

                requestAnimationFrame(update);

            }

        }


        requestAnimationFrame(update);

    }


    // ==================================================
    // DATE FILTER
    // ==================================================

    dateFilter?.addEventListener("change", event => {

        const selectedPeriod =
            event.target.value;


        const data =
            dashboardData[selectedPeriod];


        if (!data) return;


        const revenue =
            document.getElementById("totalRevenue");

        const orders =
            document.getElementById("totalOrders");

        const customers =
            document.getElementById("totalCustomers");


        animateNumber(
            revenue,
            data.revenue,
            formatCurrency
        );


        animateNumber(
            orders,
            data.orders,
            formatNumber
        );


        animateNumber(
            customers,
            data.customers,
            formatNumber
        );


        showToast(
            `Dashboard updated for the last ${selectedPeriod} days`,
            "success"
        );

    });


    // ==================================================
    // CHART ANIMATION
    // ==================================================

    function animateChart() {

        chartBars.forEach((column, index) => {

            const bar =
                column.querySelector(".chart-bar");


            if (!bar) return;


            const finalHeight =
                bar.style.height;


            bar.style.height = "0";


            setTimeout(() => {

                bar.style.height =
                    finalHeight;

            }, 120 * index);

        });

    }


    // Run chart animation

    setTimeout(
        animateChart,
        250
    );


    // ==================================================
    // CHART TOOLTIP
    // ==================================================

    chartBars.forEach(column => {

        const bar =
            column.querySelector(".chart-bar");


        if (!bar) return;


        bar.addEventListener("mouseenter", event => {

            removeTooltip();


            const value =
                Number(
                    column.dataset.value
                );


            const tooltip =
                document.createElement("div");


            tooltip.className =
                "chart-tooltip";


            tooltip.textContent =
                `R${value},000`;


            document.body.appendChild(
                tooltip
            );


            const rect =
                event.target.getBoundingClientRect();


            tooltip.style.position =
                "fixed";

            tooltip.style.left =
                `${rect.left +
                rect.width / 2}px`;

            tooltip.style.top =
                `${rect.top - 10}px`;

            tooltip.style.transform =
                "translate(-50%, -100%)";

        });


        bar.addEventListener(
            "mouseleave",
            removeTooltip
        );

    });


    function removeTooltip() {

        document
            .querySelector(".chart-tooltip")
            ?.remove();

    }


    // ==================================================
    // NOTIFICATION
    // ==================================================

    notificationBtn?.addEventListener("click", () => {

        showToast(
            "You have 3 new notifications.",
            "info"
        );

    });


    // ==================================================
    // TABLE ACTION BUTTONS
    // ==================================================

    document
        .querySelectorAll(".table-action")
        .forEach(button => {

            button.addEventListener("click", event => {

                event.stopPropagation();


                const row =
                    button.closest("tr");


                const orderNumber =
                    row
                        ?.querySelector("td")
                        ?.textContent
                        .trim();


                showToast(
                    `Opening ${orderNumber}`,
                    "info"
                );

            });

        });


    // ==================================================
    // CARD MENU BUTTONS
    // ==================================================

    document
        .querySelectorAll(".card-menu")
        .forEach(button => {

            button.addEventListener("click", () => {

                showToast(
                    "More options coming soon.",
                    "info"
                );

            });

        });


    // ==================================================
    // LOGOUT
    // ==================================================

    logoutBtn?.addEventListener("click", () => {

        const confirmed =
            confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmed) return;


        // Demo only.
        // Later this can redirect to login.html.

        showToast(
            "You have been logged out.",
            "success"
        );


        setTimeout(() => {

            console.log(
                "Redirect user to login page here."
            );

            // Example:
            // window.location.href = "login.html";

        }, 1000);

    });


    // ==================================================
    // TOAST NOTIFICATION
    // ==================================================

    function showToast(
        message,
        type = "info"
    ) {

        const oldToast =
            document.querySelector(
                ".dashboard-toast"
            );


        if (oldToast) {
            oldToast.remove();
        }


        const toast =
            document.createElement("div");


        toast.className =
            `dashboard-toast ${type}`;


        // Icon

        const icon =
            document.createElement("span");


        icon.className =
            "toast-icon";


        if (type === "success") {

            icon.textContent = "✓";

        } else if (type === "error") {

            icon.textContent = "!";

        } else {

            icon.textContent = "i";

        }


        // Message

        const text =
            document.createElement("span");


        text.textContent =
            message;


        // Close

        const close =
            document.createElement("button");


        close.textContent = "×";

        close.setAttribute(
            "aria-label",
            "Close notification"
        );


        close.addEventListener(
            "click",
            () => toast.remove()
        );


        toast.append(
            icon,
            text,
            close
        );


        document.body.appendChild(
            toast
        );


        // Trigger animation

        requestAnimationFrame(() => {

            toast.classList.add("show");

        });


        // Automatically remove

        setTimeout(() => {

            toast.classList.remove("show");


            setTimeout(
                () => toast.remove(),
                300
            );

        }, 3500);

    }


    // ==================================================
    // ACTIVE NAVIGATION
    // ==================================================

    function setActiveNavigation() {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop() ||
            "index.html";


        document
            .querySelectorAll(".nav-link")
            .forEach(link => {

                const linkPage =
                    link
                        .getAttribute("href")
                        ?.split("/")
                        .pop();


                link.classList.remove(
                    "active"
                );


                if (
                    linkPage ===
                    currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

    }


    setActiveNavigation();


    // ==================================================
    // WINDOW RESIZE
    // ==================================================

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            closeSidebar();

        }

    });


    // ==================================================
    // DASHBOARD LOADED
    // ==================================================

    console.log(
        "AdminFlow Dashboard loaded successfully."
    );

    // ==================================================
// PRODUCTS PAGE - CRUD
// ==================================================

const productsTableBody =
    document.getElementById("productsTableBody");

const productModal =
    document.getElementById("productModal");

const addProductBtn =
    document.getElementById("addProductBtn");

const closeProductModal =
    document.getElementById("closeProductModal");

const cancelProductBtn =
    document.getElementById("cancelProductBtn");

const productForm =
    document.getElementById("productForm");

const productSearch =
    document.getElementById("productSearch");

const categoryFilter =
    document.getElementById("categoryFilter");

const stockFilter =
    document.getElementById("stockFilter");

const productsEmptyState =
    document.getElementById("productsEmptyState");


// Only run product code on products.html
if (productsTableBody) {

    // ==============================================
    // DEFAULT PRODUCTS
    // ==============================================

    const defaultProducts = [
        {
            id: 1,
            name: "Wireless Headphones",
            sku: "WH-001",
            category: "Electronics",
            price: 1299,
            stock: 42,
            sales: 246,
            emoji: "🎧",
            description: "Premium wireless headphones."
        },

        {
            id: 2,
            name: "Smart Watch",
            sku: "SW-002",
            category: "Electronics",
            price: 2499,
            stock: 28,
            sales: 198,
            emoji: "⌚",
            description: "Modern smart watch."
        },

        {
            id: 3,
            name: "Running Shoes",
            sku: "RS-003",
            category: "Fashion",
            price: 1899,
            stock: 35,
            sales: 174,
            emoji: "👟",
            description: "Comfortable running shoes."
        },

        {
            id: 4,
            name: "Classic Backpack",
            sku: "CB-004",
            category: "Accessories",
            price: 899,
            stock: 4,
            sales: 132,
            emoji: "🎒",
            description: "Classic everyday backpack."
        },

        {
            id: 5,
            name: "Premium T-Shirt",
            sku: "PT-005",
            category: "Fashion",
            price: 499,
            stock: 67,
            sales: 121,
            emoji: "👕",
            description: "Premium cotton T-shirt."
        },

        {
            id: 6,
            name: "Desk Lamp",
            sku: "DL-006",
            category: "Home",
            price: 699,
            stock: 21,
            sales: 86,
            emoji: "💡",
            description: "Modern LED desk lamp."
        }
    ];


    // ==============================================
    // LOAD PRODUCTS
    // ==============================================

    let products = JSON.parse(
        localStorage.getItem("adminProducts")
    );


    if (!Array.isArray(products)) {

        products = defaultProducts;

        saveProducts();
    }


    // ==============================================
    // SAVE PRODUCTS
    // ==============================================

    function saveProducts() {

        localStorage.setItem(
            "adminProducts",
            JSON.stringify(products)
        );
    }


    // ==============================================
    // CURRENCY
    // ==============================================

    function productCurrency(value) {

        return new Intl.NumberFormat(
            "en-ZA",
            {
                style: "currency",
                currency: "ZAR",
                maximumFractionDigits: 0
            }
        ).format(value);
    }


    // ==============================================
    // STOCK STATUS
    // ==============================================

    function getStockStatus(stock) {

        if (stock === 0) {

            return {
                text: "Out of Stock",
                className: "cancelled"
            };
        }


        if (stock <= 5) {

            return {
                text: "Low Stock",
                className: "pending"
            };
        }


        return {
            text: "In Stock",
            className: "completed"
        };
    }


    // ==============================================
    // SAFE HTML
    // ==============================================

    function escapeHTML(value = "") {

        const div =
            document.createElement("div");

        div.textContent = value;

        return div.innerHTML;
    }


    // ==============================================
    // RENDER PRODUCTS
    // ==============================================

    function renderProducts() {

        const searchValue =
            productSearch?.value
                .toLowerCase()
                .trim() || "";


        const selectedCategory =
            categoryFilter?.value || "all";


        const selectedStock =
            stockFilter?.value || "all";


        const filteredProducts =
            products.filter(product => {

                const matchesSearch =
                    product.name
                        .toLowerCase()
                        .includes(searchValue) ||

                    product.sku
                        .toLowerCase()
                        .includes(searchValue) ||

                    product.category
                        .toLowerCase()
                        .includes(searchValue);


                const matchesCategory =
                    selectedCategory === "all" ||
                    product.category ===
                    selectedCategory;


                let matchesStock = true;


                if (selectedStock === "stock") {

                    matchesStock =
                        product.stock > 5;
                }


                if (selectedStock === "low") {

                    matchesStock =
                        product.stock > 0 &&
                        product.stock <= 5;
                }


                if (selectedStock === "out") {

                    matchesStock =
                        product.stock === 0;
                }


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesStock
                );
            });


        productsTableBody.innerHTML = "";


        filteredProducts.forEach(product => {

            const status =
                getStockStatus(product.stock);


            const row =
                document.createElement("tr");


            row.dataset.id =
                product.id;


            row.innerHTML = `
                <td>

                    <div class="product-table-info">

                        <div class="table-product-image">
                            ${escapeHTML(
                                product.emoji || "📦"
                            )}
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(product.name)}
                            </strong>

                            <span>
                                ${escapeHTML(product.sku)}
                            </span>

                        </div>

                    </div>

                </td>


                <td>
                    ${escapeHTML(product.category)}
                </td>


                <td>

                    <strong>
                        ${productCurrency(product.price)}
                    </strong>

                </td>


                <td>
                    ${product.stock}
                </td>


                <td>

                    <span class="status ${status.className}">
                        ${status.text}
                    </span>

                </td>


                <td>
                    ${product.sales}
                </td>


                <td>

                    <div class="product-actions">

                        <button
                            class="edit-product-btn"
                            data-id="${product.id}"
                            aria-label="Edit ${escapeHTML(product.name)}"
                        >
                            ✎
                        </button>


                        <button
                            class="delete-product-btn"
                            data-id="${product.id}"
                            aria-label="Delete ${escapeHTML(product.name)}"
                        >
                            🗑
                        </button>

                    </div>

                </td>
            `;


            productsTableBody.appendChild(row);
        });


        if (productsEmptyState) {

            productsEmptyState.hidden =
                filteredProducts.length !== 0;
        }


        updateProductStats();
    }


    // ==============================================
    // PRODUCT STATISTICS
    // ==============================================

    function updateProductStats() {

        const productCount =
            document.getElementById(
                "productCount"
            );

        const inStockCount =
            document.getElementById(
                "inStockCount"
            );

        const lowStockCount =
            document.getElementById(
                "lowStockCount"
            );

        const inventoryValue =
            document.getElementById(
                "inventoryValue"
            );


        const inStock =
            products.filter(
                product =>
                    product.stock > 5
            ).length;


        const lowStock =
            products.filter(
                product =>
                    product.stock > 0 &&
                    product.stock <= 5
            ).length;


        const totalValue =
            products.reduce(
                (total, product) => {

                    return total +
                        (
                            product.price *
                            product.stock
                        );

                },
                0
            );


        if (productCount) {

            productCount.textContent =
                products.length;
        }


        if (inStockCount) {

            inStockCount.textContent =
                inStock;
        }


        if (lowStockCount) {

            lowStockCount.textContent =
                lowStock;
        }


        if (inventoryValue) {

            inventoryValue.textContent =
                productCurrency(totalValue);
        }
    }


    // ==============================================
    // OPEN ADD PRODUCT MODAL
    // ==============================================

    function openAddProductModal() {

        productForm.reset();


        document.getElementById(
            "productId"
        ).value = "";


        document.getElementById(
            "productModalTitle"
        ).textContent =
            "Add Product";


        document.querySelector(
            ".save-product-btn"
        ).textContent =
            "Save Product";


        productModal.classList.add(
            "show"
        );


        productModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";


        setTimeout(() => {

            document.getElementById(
                "productName"
            )?.focus();

        }, 200);
    }


    // ==============================================
    // CLOSE MODAL
    // ==============================================

    function closeModal() {

        productModal.classList.remove(
            "show"
        );


        productModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";
    }


    addProductBtn?.addEventListener(
        "click",
        openAddProductModal
    );


    closeProductModal?.addEventListener(
        "click",
        closeModal
    );


    cancelProductBtn?.addEventListener(
        "click",
        closeModal
    );


    // Click outside modal

    productModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                productModal
            ) {

                closeModal();
            }
        }
    );


    // ESC closes modal

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                productModal.classList.contains(
                    "show"
                )
            ) {

                closeModal();
            }
        }
    );


    // ==============================================
    // ADD / UPDATE PRODUCT
    // ==============================================

    productForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const id =
                document.getElementById(
                    "productId"
                ).value;


            const name =
                document.getElementById(
                    "productName"
                ).value.trim();


            const sku =
                document.getElementById(
                    "productSku"
                ).value.trim();


            const category =
                document.getElementById(
                    "productCategory"
                ).value;


            const price =
                Number(
                    document.getElementById(
                        "productPrice"
                    ).value
                );


            const stock =
                Number(
                    document.getElementById(
                        "productStock"
                    ).value
                );


            const emoji =
                document.getElementById(
                    "productEmoji"
                ).value.trim() ||
                "📦";


            const description =
                document.getElementById(
                    "productDescription"
                ).value.trim();


            // ======================================
            // VALIDATION
            // ======================================

            if (
                !name ||
                !sku ||
                !category
            ) {

                showToast(
                    "Please complete all required fields.",
                    "error"
                );

                return;
            }


            if (
                !Number.isFinite(price) ||
                price < 0
            ) {

                showToast(
                    "Please enter a valid price.",
                    "error"
                );

                return;
            }


            if (
                !Number.isInteger(stock) ||
                stock < 0
            ) {

                showToast(
                    "Please enter valid stock.",
                    "error"
                );

                return;
            }


            // Check duplicate SKU

            const duplicateSKU =
                products.find(product => {

                    return (
                        product.sku
                            .toLowerCase() ===
                        sku.toLowerCase() &&

                        String(product.id) !==
                        String(id)
                    );
                });


            if (duplicateSKU) {

                showToast(
                    "A product with this SKU already exists.",
                    "error"
                );

                return;
            }


            // ======================================
            // EDIT PRODUCT
            // ======================================

            if (id) {

                const productIndex =
                    products.findIndex(
                        product =>
                            String(product.id) ===
                            String(id)
                    );


                if (productIndex !== -1) {

                    products[productIndex] = {

                        ...products[
                            productIndex
                        ],

                        name,
                        sku,
                        category,
                        price,
                        stock,
                        emoji,
                        description
                    };


                    showToast(
                        "Product updated successfully.",
                        "success"
                    );
                }

            }

            // ======================================
            // ADD PRODUCT
            // ======================================

            else {

                const newProduct = {

                    id: Date.now(),

                    name,
                    sku,
                    category,
                    price,
                    stock,

                    sales: 0,

                    emoji,

                    description
                };


                products.unshift(
                    newProduct
                );


                showToast(
                    "Product added successfully.",
                    "success"
                );
            }


            saveProducts();

            renderProducts();

            closeModal();
        }
    );


    // ==============================================
    // EDIT / DELETE EVENT DELEGATION
    // ==============================================

    productsTableBody.addEventListener(
        "click",
        event => {

            const editButton =
                event.target.closest(
                    ".edit-product-btn"
                );


            const deleteButton =
                event.target.closest(
                    ".delete-product-btn"
                );


            if (editButton) {

                editProduct(
                    editButton.dataset.id
                );
            }


            if (deleteButton) {

                deleteProduct(
                    deleteButton.dataset.id
                );
            }
        }
    );


    // ==============================================
    // EDIT PRODUCT
    // ==============================================

    function editProduct(id) {

        const product =
            products.find(
                product =>
                    String(product.id) ===
                    String(id)
            );


        if (!product) return;


        document.getElementById(
            "productId"
        ).value =
            product.id;


        document.getElementById(
            "productName"
        ).value =
            product.name;


        document.getElementById(
            "productSku"
        ).value =
            product.sku;


        document.getElementById(
            "productCategory"
        ).value =
            product.category;


        document.getElementById(
            "productPrice"
        ).value =
            product.price;


        document.getElementById(
            "productStock"
        ).value =
            product.stock;


        document.getElementById(
            "productEmoji"
        ).value =
            product.emoji || "";


        document.getElementById(
            "productDescription"
        ).value =
            product.description || "";


        document.getElementById(
            "productModalTitle"
        ).textContent =
            "Edit Product";


        document.querySelector(
            ".save-product-btn"
        ).textContent =
            "Update Product";


        productModal.classList.add(
            "show"
        );


        productModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";
    }


    // ==============================================
    // DELETE PRODUCT
    // ==============================================

    function deleteProduct(id) {

        const product =
            products.find(
                product =>
                    String(product.id) ===
                    String(id)
            );


        if (!product) return;


        const confirmed =
            confirm(
                `Delete "${product.name}"?`
            );


        if (!confirmed) return;


        products =
            products.filter(
                product =>
                    String(product.id) !==
                    String(id)
            );


        saveProducts();

        renderProducts();


        showToast(
            "Product deleted successfully.",
            "success"
        );
    }


    // ==============================================
    // SEARCH
    // ==============================================

    productSearch?.addEventListener(
        "input",
        renderProducts
    );


    // ==============================================
    // CATEGORY FILTER
    // ==============================================

    categoryFilter?.addEventListener(
        "change",
        renderProducts
    );


    // ==============================================
    // STOCK FILTER
    // ==============================================

    stockFilter?.addEventListener(
        "change",
        renderProducts
    );


    // ==============================================
    // INITIAL RENDER
    // ==============================================

    renderProducts();
}

// ==================================================
// ORDERS PAGE
// ==================================================

const ordersTableBody =
    document.getElementById("ordersTableBody");

const orderSearch =
    document.getElementById("orderSearch");

const orderStatusFilter =
    document.getElementById("orderStatusFilter");

const orderSort =
    document.getElementById("orderSort");

const ordersEmptyState =
    document.getElementById("ordersEmptyState");

const orderModal =
    document.getElementById("orderModal");

const closeOrderModal =
    document.getElementById("closeOrderModal");

const cancelOrderModal =
    document.getElementById("cancelOrderModal");

const updateOrderStatusBtn =
    document.getElementById("updateOrderStatusBtn");

const modalOrderStatus =
    document.getElementById("modalOrderStatus");

const exportOrdersBtn =
    document.getElementById("exportOrdersBtn");


// Only run on orders.html
if (ordersTableBody) {

    // ==============================================
    // DEFAULT ORDERS
    // ==============================================

    const defaultOrders = [

        {
            id: "ORD-1028",

            customer: {
                name: "Lerato Mokoena",
                email: "lerato@example.com"
            },

            date: "2026-09-15",

            products: [
                {
                    name: "Wireless Headphones",
                    quantity: 1,
                    price: 1299,
                    emoji: "🎧"
                },

                {
                    name: "Premium T-Shirt",
                    quantity: 2,
                    price: 499,
                    emoji: "👕"
                }
            ],

            payment: "Paid",
            status: "Processing"
        },


        {
            id: "ORD-1027",

            customer: {
                name: "Sipho Dlamini",
                email: "sipho@example.com"
            },

            date: "2026-09-14",

            products: [
                {
                    name: "Smart Watch",
                    quantity: 1,
                    price: 2499,
                    emoji: "⌚"
                }
            ],

            payment: "Paid",
            status: "Completed"
        },


        {
            id: "ORD-1026",

            customer: {
                name: "Ayanda Khumalo",
                email: "ayanda@example.com"
            },

            date: "2026-09-14",

            products: [
                {
                    name: "Running Shoes",
                    quantity: 1,
                    price: 1899,
                    emoji: "👟"
                }
            ],

            payment: "Paid",
            status: "Pending"
        },


        {
            id: "ORD-1025",

            customer: {
                name: "Thando Zulu",
                email: "thando@example.com"
            },

            date: "2026-09-13",

            products: [
                {
                    name: "Classic Backpack",
                    quantity: 2,
                    price: 899,
                    emoji: "🎒"
                }
            ],

            payment: "Paid",
            status: "Processing"
        },


        {
            id: "ORD-1024",

            customer: {
                name: "Nomsa Cele",
                email: "nomsa@example.com"
            },

            date: "2026-09-12",

            products: [
                {
                    name: "Desk Lamp",
                    quantity: 1,
                    price: 699,
                    emoji: "💡"
                },

                {
                    name: "Premium T-Shirt",
                    quantity: 1,
                    price: 499,
                    emoji: "👕"
                }
            ],

            payment: "Pending",
            status: "Pending"
        },


        {
            id: "ORD-1023",

            customer: {
                name: "Sibusiso Ndlovu",
                email: "sibusiso@example.com"
            },

            date: "2026-09-11",

            products: [
                {
                    name: "Wireless Headphones",
                    quantity: 2,
                    price: 1299,
                    emoji: "🎧"
                }
            ],

            payment: "Paid",
            status: "Completed"
        },


        {
            id: "ORD-1022",

            customer: {
                name: "Zanele Mthembu",
                email: "zanele@example.com"
            },

            date: "2026-09-10",

            products: [
                {
                    name: "Running Shoes",
                    quantity: 1,
                    price: 1899,
                    emoji: "👟"
                },

                {
                    name: "Classic Backpack",
                    quantity: 1,
                    price: 899,
                    emoji: "🎒"
                }
            ],

            payment: "Paid",
            status: "Processing"
        },


        {
            id: "ORD-1021",

            customer: {
                name: "Bongani Ngcobo",
                email: "bongani@example.com"
            },

            date: "2026-09-09",

            products: [
                {
                    name: "Smart Watch",
                    quantity: 1,
                    price: 2499,
                    emoji: "⌚"
                }
            ],

            payment: "Refunded",
            status: "Cancelled"
        },


        {
            id: "ORD-1020",

            customer: {
                name: "Nokuthula Mbatha",
                email: "nokuthula@example.com"
            },

            date: "2026-09-08",

            products: [
                {
                    name: "Premium T-Shirt",
                    quantity: 3,
                    price: 499,
                    emoji: "👕"
                }
            ],

            payment: "Paid",
            status: "Completed"
        },


        {
            id: "ORD-1019",

            customer: {
                name: "Mandla Gumede",
                email: "mandla@example.com"
            },

            date: "2026-09-07",

            products: [
                {
                    name: "Desk Lamp",
                    quantity: 2,
                    price: 699,
                    emoji: "💡"
                }
            ],

            payment: "Pending",
            status: "Pending"
        },


        {
            id: "ORD-1018",

            customer: {
                name: "Precious Sithole",
                email: "precious@example.com"
            },

            date: "2026-09-06",

            products: [
                {
                    name: "Wireless Headphones",
                    quantity: 1,
                    price: 1299,
                    emoji: "🎧"
                }
            ],

            payment: "Paid",
            status: "Completed"
        },


        {
            id: "ORD-1017",

            customer: {
                name: "Andile Mkhize",
                email: "andile@example.com"
            },

            date: "2026-09-05",

            products: [
                {
                    name: "Classic Backpack",
                    quantity: 1,
                    price: 899,
                    emoji: "🎒"
                },

                {
                    name: "Premium T-Shirt",
                    quantity: 1,
                    price: 499,
                    emoji: "👕"
                }
            ],

            payment: "Refunded",
            status: "Cancelled"
        }

    ];


    // ==============================================
    // LOAD ORDERS
    // ==============================================

    let orders = JSON.parse(
        localStorage.getItem("adminOrders")
    );


    if (!Array.isArray(orders)) {

        orders = defaultOrders;

        saveOrders();
    }


    let selectedOrderId = null;


    // ==============================================
    // SAVE
    // ==============================================

    function saveOrders() {

        localStorage.setItem(
            "adminOrders",
            JSON.stringify(orders)
        );
    }


    // ==============================================
    // CURRENCY
    // ==============================================

    function orderCurrency(value) {

        return new Intl.NumberFormat(
            "en-ZA",
            {
                style: "currency",
                currency: "ZAR",
                maximumFractionDigits: 0
            }
        ).format(value);
    }


    // ==============================================
    // CALCULATE ORDER TOTAL
    // ==============================================

    function calculateOrderTotal(order) {

        return order.products.reduce(
            (total, product) => {

                return total +
                    (
                        product.price *
                        product.quantity
                    );
            },
            0
        );
    }


    // ==============================================
    // TOTAL ITEMS
    // ==============================================

    function calculateItems(order) {

        return order.products.reduce(
            (total, product) => {

                return total +
                    product.quantity;
            },
            0
        );
    }


    // ==============================================
    // CUSTOMER INITIALS
    // ==============================================

    function getInitials(name) {

        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }


    // ==============================================
    // FORMAT DATE
    // ==============================================

    function formatOrderDate(date) {

        return new Intl.DateTimeFormat(
            "en-ZA",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ).format(
            new Date(`${date}T00:00:00`)
        );
    }


    // ==============================================
    // SAFE HTML
    // ==============================================

    function escapeOrderHTML(value = "") {

        const element =
            document.createElement("div");

        element.textContent =
            String(value);

        return element.innerHTML;
    }


    // ==============================================
    // STATUS CLASS
    // ==============================================

    function getOrderStatusClass(status) {

        switch (status) {

            case "Pending":
                return "pending";

            case "Processing":
                return "processing";

            case "Completed":
                return "completed";

            case "Cancelled":
                return "cancelled";

            default:
                return "pending";
        }
    }


    // ==============================================
    // PAYMENT CLASS
    // ==============================================

    function getPaymentClass(payment) {

        switch (payment) {

            case "Paid":
                return "paid";

            case "Pending":
                return "payment-pending";

            case "Refunded":
                return "refunded";

            default:
                return "payment-pending";
        }
    }


    // ==============================================
    // FILTER AND SORT
    // ==============================================

    function getFilteredOrders() {

        const searchValue =
            orderSearch?.value
                .toLowerCase()
                .trim() || "";


        const statusValue =
            orderStatusFilter?.value ||
            "all";


        const sortValue =
            orderSort?.value ||
            "newest";


        let filteredOrders =
            orders.filter(order => {

                const searchText = `
                    ${order.id}
                    ${order.customer.name}
                    ${order.customer.email}
                    ${order.status}
                    ${order.payment}
                `.toLowerCase();


                const matchesSearch =
                    searchText.includes(
                        searchValue
                    );


                const matchesStatus =
                    statusValue === "all" ||
                    order.status ===
                    statusValue;


                return (
                    matchesSearch &&
                    matchesStatus
                );
            });


        filteredOrders =
            [...filteredOrders];


        // Newest

        if (sortValue === "newest") {

            filteredOrders.sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );
        }


        // Oldest

        if (sortValue === "oldest") {

            filteredOrders.sort(
                (a, b) =>
                    new Date(a.date) -
                    new Date(b.date)
            );
        }


        // Highest

        if (sortValue === "highest") {

            filteredOrders.sort(
                (a, b) =>
                    calculateOrderTotal(b) -
                    calculateOrderTotal(a)
            );
        }


        // Lowest

        if (sortValue === "lowest") {

            filteredOrders.sort(
                (a, b) =>
                    calculateOrderTotal(a) -
                    calculateOrderTotal(b)
            );
        }


        return filteredOrders;
    }


    // ==============================================
    // RENDER ORDERS
    // ==============================================

    function renderOrders() {

        const filteredOrders =
            getFilteredOrders();


        ordersTableBody.innerHTML = "";


        filteredOrders.forEach(order => {

            const row =
                document.createElement("tr");


            const total =
                calculateOrderTotal(order);


            const items =
                calculateItems(order);


            const initials =
                getInitials(
                    order.customer.name
                );


            row.innerHTML = `

                <td>

                    <span class="order-id">
                        #${escapeOrderHTML(order.id)}
                    </span>

                </td>


                <td>

                    <div class="order-customer">

                        <div class="customer-avatar">
                            ${initials}
                        </div>


                        <div class="order-customer-info">

                            <strong>
                                ${escapeOrderHTML(
                                    order.customer.name
                                )}
                            </strong>

                            <span>
                                ${escapeOrderHTML(
                                    order.customer.email
                                )}
                            </span>

                        </div>

                    </div>

                </td>


                <td>

                    ${formatOrderDate(
                        order.date
                    )}

                </td>


                <td>

                    ${items}
                    ${items === 1 ? "item" : "items"}

                </td>


                <td>

                    <strong>
                        ${orderCurrency(total)}
                    </strong>

                </td>


                <td>

                    <span
                        class="
                            payment-status
                            ${getPaymentClass(
                                order.payment
                            )}
                        "
                    >
                        ${escapeOrderHTML(
                            order.payment
                        )}
                    </span>

                </td>


                <td>

                    <span
                        class="
                            status
                            ${getOrderStatusClass(
                                order.status
                            )}
                        "
                    >
                        ${escapeOrderHTML(
                            order.status
                        )}
                    </span>

                </td>


                <td>

                    <button
                        class="view-order-btn"
                        data-id="${escapeOrderHTML(
                            order.id
                        )}"
                    >
                        View
                    </button>

                </td>
            `;


            ordersTableBody.appendChild(
                row
            );
        });


        if (ordersEmptyState) {

            ordersEmptyState.hidden =
                filteredOrders.length !== 0;
        }


        updateOrderStats();
    }


    // ==============================================
    // UPDATE STATISTICS
    // ==============================================

    function updateOrderStats() {

        const totalOrderCount =
            document.getElementById(
                "totalOrderCount"
            );


        const pendingOrderCount =
            document.getElementById(
                "pendingOrderCount"
            );


        const processingOrderCount =
            document.getElementById(
                "processingOrderCount"
            );


        const orderRevenue =
            document.getElementById(
                "orderRevenue"
            );


        const ordersBadge =
            document.getElementById(
                "ordersBadge"
            );


        const pending =
            orders.filter(
                order =>
                    order.status ===
                    "Pending"
            ).length;


        const processing =
            orders.filter(
                order =>
                    order.status ===
                    "Processing"
            ).length;


        // Revenue excludes cancelled/refunded orders

        const revenue =
            orders
                .filter(
                    order =>
                        order.status !==
                            "Cancelled" &&
                        order.payment !==
                            "Refunded"
                )
                .reduce(
                    (total, order) => {

                        return total +
                            calculateOrderTotal(
                                order
                            );
                    },
                    0
                );


        if (totalOrderCount) {

            totalOrderCount.textContent =
                orders.length;
        }


        if (pendingOrderCount) {

            pendingOrderCount.textContent =
                pending;
        }


        if (processingOrderCount) {

            processingOrderCount.textContent =
                processing;
        }


        if (orderRevenue) {

            orderRevenue.textContent =
                orderCurrency(revenue);
        }


        if (ordersBadge) {

            const activeOrders =
                pending + processing;


            ordersBadge.textContent =
                activeOrders;


            ordersBadge.style.display =
                activeOrders > 0
                    ? ""
                    : "none";
        }
    }


    // ==============================================
    // OPEN ORDER
    // ==============================================

    ordersTableBody.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".view-order-btn"
                );


            if (!button) return;


            openOrderModal(
                button.dataset.id
            );
        }
    );


    // ==============================================
    // ORDER MODAL
    // ==============================================

    function openOrderModal(id) {

        const order =
            orders.find(
                order =>
                    order.id === id
            );


        if (!order) return;


        selectedOrderId =
            order.id;


        const total =
            calculateOrderTotal(order);


        // Modal information

        document.getElementById(
            "orderModalTitle"
        ).textContent =
            `Order #${order.id}`;


        document.getElementById(
            "orderModalSubtitle"
        ).textContent =
            `${calculateItems(order)} items in this order`;


        document.getElementById(
            "modalCustomerAvatar"
        ).textContent =
            getInitials(
                order.customer.name
            );


        document.getElementById(
            "modalCustomerName"
        ).textContent =
            order.customer.name;


        document.getElementById(
            "modalCustomerEmail"
        ).textContent =
            order.customer.email;


        document.getElementById(
            "modalOrderId"
        ).textContent =
            `#${order.id}`;


        document.getElementById(
            "modalOrderDate"
        ).textContent =
            formatOrderDate(
                order.date
            );


        document.getElementById(
            "modalPayment"
        ).textContent =
            order.payment;


        document.getElementById(
            "modalOrderTotal"
        ).textContent =
            orderCurrency(total);


        modalOrderStatus.value =
            order.status;


        // Products

        const productContainer =
            document.getElementById(
                "modalOrderProducts"
            );


        productContainer.innerHTML = "";


        order.products.forEach(product => {

            const productElement =
                document.createElement(
                    "div"
                );


            productElement.className =
                "modal-order-product";


            productElement.innerHTML = `

                <div
                    class="modal-order-product-icon"
                >
                    ${escapeOrderHTML(
                        product.emoji || "📦"
                    )}
                </div>


                <div
                    class="modal-order-product-info"
                >

                    <strong>
                        ${escapeOrderHTML(
                            product.name
                        )}
                    </strong>

                    <span>
                        Quantity:
                        ${product.quantity}
                    </span>

                </div>


                <div
                    class="modal-order-product-price"
                >

                    <strong>
                        ${orderCurrency(
                            product.price *
                            product.quantity
                        )}
                    </strong>

                    <span>
                        ${orderCurrency(
                            product.price
                        )} each
                    </span>

                </div>
            `;


            productContainer.appendChild(
                productElement
            );
        });


        orderModal.classList.add(
            "show"
        );


        orderModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";
    }


    // ==============================================
    // CLOSE ORDER MODAL
    // ==============================================

    function closeOrdersModal() {

        orderModal.classList.remove(
            "show"
        );


        orderModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";


        selectedOrderId = null;
    }


    closeOrderModal?.addEventListener(
        "click",
        closeOrdersModal
    );


    cancelOrderModal?.addEventListener(
        "click",
        closeOrdersModal
    );


    // Outside click

    orderModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                orderModal
            ) {

                closeOrdersModal();
            }
        }
    );


    // ESC

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                orderModal.classList.contains(
                    "show"
                )
            ) {

                closeOrdersModal();
            }
        }
    );


    // ==============================================
    // UPDATE ORDER STATUS
    // ==============================================

    updateOrderStatusBtn?.addEventListener(
        "click",
        () => {

            if (!selectedOrderId) return;


            const order =
                orders.find(
                    order =>
                        order.id ===
                        selectedOrderId
                );


            if (!order) return;


            const oldStatus =
                order.status;


            const newStatus =
                modalOrderStatus.value;


            order.status =
                newStatus;


            // Automatically update payment when
            // cancelling a paid order.

            if (
                newStatus === "Cancelled" &&
                order.payment === "Paid"
            ) {

                order.payment =
                    "Refunded";
            }


            saveOrders();

            renderOrders();

            closeOrdersModal();


            showToast(
                oldStatus === newStatus
                    ? "Order saved."
                    : `Order changed from ${oldStatus} to ${newStatus}.`,
                "success"
            );
        }
    );


    // ==============================================
    // SEARCH
    // ==============================================

    orderSearch?.addEventListener(
        "input",
        renderOrders
    );


    // ==============================================
    // STATUS FILTER
    // ==============================================

    orderStatusFilter?.addEventListener(
        "change",
        renderOrders
    );


    // ==============================================
    // SORT
    // ==============================================

    orderSort?.addEventListener(
        "change",
        renderOrders
    );


    // ==============================================
    // EXPORT ORDERS TO CSV
    // ==============================================

    exportOrdersBtn?.addEventListener(
        "click",
        () => {

            if (orders.length === 0) {

                showToast(
                    "There are no orders to export.",
                    "error"
                );

                return;
            }


            const csvRows = [

                [
                    "Order ID",
                    "Customer",
                    "Email",
                    "Date",
                    "Items",
                    "Amount",
                    "Payment",
                    "Status"
                ]

            ];


            orders.forEach(order => {

                csvRows.push([

                    order.id,

                    order.customer.name,

                    order.customer.email,

                    order.date,

                    calculateItems(order),

                    calculateOrderTotal(order),

                    order.payment,

                    order.status

                ]);
            });


            // Escape CSV values

            const csvContent =
                csvRows
                    .map(row => {

                        return row
                            .map(value => {

                                const text =
                                    String(value)
                                        .replace(
                                            /"/g,
                                            '""'
                                        );


                                return `"${text}"`;
                            })
                            .join(",");

                    })
                    .join("\n");


            const blob =
                new Blob(
                    [csvContent],
                    {
                        type:
                            "text/csv;charset=utf-8;"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                "adminflow-orders.csv";


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            URL.revokeObjectURL(
                url
            );


            showToast(
                "Orders exported successfully.",
                "success"
            );
        }
    );


    // ==============================================
    // INITIAL RENDER
    // ==============================================

    renderOrders();

}

// ==================================================
// CUSTOMERS PAGE
// ==================================================

const customersTableBody =
    document.getElementById("customersTableBody");

const customerSearch =
    document.getElementById("customerSearch");

const customerStatusFilter =
    document.getElementById("customerStatusFilter");

const customerSort =
    document.getElementById("customerSort");

const customersEmptyState =
    document.getElementById("customersEmptyState");

const customerModal =
    document.getElementById("customerModal");

const closeCustomerModal =
    document.getElementById("closeCustomerModal");

const cancelCustomerModal =
    document.getElementById("cancelCustomerModal");

const updateCustomerBtn =
    document.getElementById("updateCustomerBtn");

const customerAccountStatus =
    document.getElementById("customerAccountStatus");

const exportCustomersBtn =
    document.getElementById("exportCustomersBtn");


// Only run on customers.html
if (customersTableBody) {

    // ==============================================
    // DEFAULT CUSTOMERS
    // ==============================================

    const defaultCustomers = [

        {
            id: 1,
            name: "Lerato Mokoena",
            email: "lerato@example.com",
            phone: "071 234 5678",
            location: "Durban, KZN",
            joined: "2026-06-12",
            status: "Active"
        },

        {
            id: 2,
            name: "Sipho Dlamini",
            email: "sipho@example.com",
            phone: "072 345 6789",
            location: "Johannesburg, Gauteng",
            joined: "2026-05-18",
            status: "Active"
        },

        {
            id: 3,
            name: "Ayanda Khumalo",
            email: "ayanda@example.com",
            phone: "073 456 7890",
            location: "Durban, KZN",
            joined: "2026-07-04",
            status: "Active"
        },

        {
            id: 4,
            name: "Thando Zulu",
            email: "thando@example.com",
            phone: "074 567 8901",
            location: "Pietermaritzburg, KZN",
            joined: "2026-04-22",
            status: "Active"
        },

        {
            id: 5,
            name: "Nomsa Cele",
            email: "nomsa@example.com",
            phone: "076 678 9012",
            location: "Umhlanga, KZN",
            joined: "2026-08-01",
            status: "Active"
        },

        {
            id: 6,
            name: "Sibusiso Ndlovu",
            email: "sibusiso@example.com",
            phone: "078 789 0123",
            location: "Cape Town, Western Cape",
            joined: "2026-03-15",
            status: "Active"
        },

        {
            id: 7,
            name: "Zanele Mthembu",
            email: "zanele@example.com",
            phone: "079 890 1234",
            location: "Durban, KZN",
            joined: "2026-06-28",
            status: "Active"
        },

        {
            id: 8,
            name: "Bongani Ngcobo",
            email: "bongani@example.com",
            phone: "081 901 2345",
            location: "Richards Bay, KZN",
            joined: "2026-02-11",
            status: "Inactive"
        },

        {
            id: 9,
            name: "Nokuthula Mbatha",
            email: "nokuthula@example.com",
            phone: "082 012 3456",
            location: "Pretoria, Gauteng",
            joined: "2026-07-19",
            status: "Active"
        },

        {
            id: 10,
            name: "Mandla Gumede",
            email: "mandla@example.com",
            phone: "083 123 4567",
            location: "Durban, KZN",
            joined: "2026-08-14",
            status: "Active"
        },

        {
            id: 11,
            name: "Precious Sithole",
            email: "precious@example.com",
            phone: "084 234 5678",
            location: "Johannesburg, Gauteng",
            joined: "2026-01-25",
            status: "Active"
        },

        {
            id: 12,
            name: "Andile Mkhize",
            email: "andile@example.com",
            phone: "067 345 6789",
            location: "Durban, KZN",
            joined: "2026-05-09",
            status: "Inactive"
        }

    ];


    // ==============================================
    // LOAD CUSTOMERS
    // ==============================================

    let customers = JSON.parse(
        localStorage.getItem("adminCustomers")
    );


    if (!Array.isArray(customers)) {

        customers = defaultCustomers;

        saveCustomers();
    }


    let selectedCustomerId = null;


    // ==============================================
    // LOAD ORDERS
    // ==============================================

    function getStoredOrders() {

        const storedOrders =
            JSON.parse(
                localStorage.getItem("adminOrders")
            );

        return Array.isArray(storedOrders)
            ? storedOrders
            : [];
    }


    // ==============================================
    // SAVE CUSTOMERS
    // ==============================================

    function saveCustomers() {

        localStorage.setItem(
            "adminCustomers",
            JSON.stringify(customers)
        );
    }


    // ==============================================
    // CURRENCY
    // ==============================================

    function customerCurrency(value) {

        return new Intl.NumberFormat(
            "en-ZA",
            {
                style: "currency",
                currency: "ZAR",
                maximumFractionDigits: 0
            }
        ).format(value);
    }


    // ==============================================
    // FORMAT DATE
    // ==============================================

    function formatCustomerDate(date) {

        return new Intl.DateTimeFormat(
            "en-ZA",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ).format(
            new Date(`${date}T00:00:00`)
        );
    }


    // ==============================================
    // INITIALS
    // ==============================================

    function customerInitials(name) {

        return name
            .split(" ")
            .filter(Boolean)
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }


    // ==============================================
    // ORDER TOTAL
    // ==============================================

    function getCustomerOrderTotal(order) {

        return order.products.reduce(
            (total, product) => {

                return total +
                    (
                        Number(product.price) *
                        Number(product.quantity)
                    );
            },
            0
        );
    }


    // ==============================================
    // GET CUSTOMER ORDERS
    // ==============================================

    function getCustomerOrders(customer) {

        const orders =
            getStoredOrders();


        return orders.filter(order => {

            return (
                order.customer.email
                    .toLowerCase() ===
                customer.email
                    .toLowerCase()
            );
        });
    }


    // ==============================================
    // CUSTOMER SPENDING
    // ==============================================

    function getCustomerSpending(customer) {

        const orders =
            getCustomerOrders(customer);


        return orders
            .filter(order => {

                return (
                    order.status !== "Cancelled" &&
                    order.payment !== "Refunded"
                );
            })
            .reduce(
                (total, order) => {

                    return total +
                        getCustomerOrderTotal(order);
                },
                0
            );
    }


    // ==============================================
    // SAFE HTML
    // ==============================================

    function escapeCustomerHTML(value = "") {

        const element =
            document.createElement("div");

        element.textContent =
            String(value);

        return element.innerHTML;
    }


    // ==============================================
    // FILTER CUSTOMERS
    // ==============================================

    function getFilteredCustomers() {

        const searchValue =
            customerSearch?.value
                .toLowerCase()
                .trim() || "";


        const status =
            customerStatusFilter?.value ||
            "all";


        const sort =
            customerSort?.value ||
            "newest";


        let filtered =
            customers.filter(customer => {

                const searchable = `
                    ${customer.name}
                    ${customer.email}
                    ${customer.phone}
                    ${customer.location}
                    ${customer.status}
                `.toLowerCase();


                const matchesSearch =
                    searchable.includes(
                        searchValue
                    );


                const matchesStatus =
                    status === "all" ||
                    customer.status === status;


                return (
                    matchesSearch &&
                    matchesStatus
                );
            });


        filtered =
            [...filtered];


        // Newest

        if (sort === "newest") {

            filtered.sort(
                (a, b) =>
                    new Date(b.joined) -
                    new Date(a.joined)
            );
        }


        // Oldest

        if (sort === "oldest") {

            filtered.sort(
                (a, b) =>
                    new Date(a.joined) -
                    new Date(b.joined)
            );
        }


        // Highest spending

        if (sort === "highest") {

            filtered.sort(
                (a, b) =>
                    getCustomerSpending(b) -
                    getCustomerSpending(a)
            );
        }


        // Lowest spending

        if (sort === "lowest") {

            filtered.sort(
                (a, b) =>
                    getCustomerSpending(a) -
                    getCustomerSpending(b)
            );
        }


        // Most orders

        if (sort === "orders") {

            filtered.sort(
                (a, b) =>
                    getCustomerOrders(b).length -
                    getCustomerOrders(a).length
            );
        }


        return filtered;
    }


    // ==============================================
    // RENDER CUSTOMERS
    // ==============================================

    function renderCustomers() {

        const filteredCustomers =
            getFilteredCustomers();


        customersTableBody.innerHTML = "";


        filteredCustomers.forEach(customer => {

            const orders =
                getCustomerOrders(customer);


            const spending =
                getCustomerSpending(customer);


            const initials =
                customerInitials(
                    customer.name
                );


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>

                    <div class="customer-table-profile">

                        <div class="customer-avatar">

                            ${initials}

                        </div>


                        <div class="customer-table-info">

                            <strong>
                                ${escapeCustomerHTML(
                                    customer.name
                                )}
                            </strong>

                            <span>
                                ${escapeCustomerHTML(
                                    customer.email
                                )}
                            </span>

                        </div>

                    </div>

                </td>


                <td>

                    <div class="customer-location">

                        <span class="customer-location-icon">
                            ◉
                        </span>

                        ${escapeCustomerHTML(
                            customer.location
                        )}

                    </div>

                </td>


                <td>

                    ${formatCustomerDate(
                        customer.joined
                    )}

                </td>


                <td>

                    <strong>
                        ${orders.length}
                    </strong>

                </td>


                <td>

                    <strong>
                        ${customerCurrency(
                            spending
                        )}
                    </strong>

                </td>


                <td>

                    <span
                        class="status ${
                            customer.status === "Active"
                                ? "completed"
                                : "inactive"
                        }"
                    >

                        ${escapeCustomerHTML(
                            customer.status
                        )}

                    </span>

                </td>


                <td>

                    <button
                        class="view-customer-btn"
                        data-id="${customer.id}"
                    >
                        View
                    </button>

                </td>
            `;


            customersTableBody.appendChild(
                row
            );
        });


        if (customersEmptyState) {

            customersEmptyState.hidden =
                filteredCustomers.length !== 0;
        }


        updateCustomerStatistics();
    }


    // ==============================================
    // CUSTOMER STATISTICS
    // ==============================================

    function updateCustomerStatistics() {

        const customerCount =
            document.getElementById(
                "customerCount"
            );


        const activeCustomerCount =
            document.getElementById(
                "activeCustomerCount"
            );


        const customerSpending =
            document.getElementById(
                "customerSpending"
            );


        const averageCustomerSpend =
            document.getElementById(
                "averageCustomerSpend"
            );


        const activeCustomers =
            customers.filter(
                customer =>
                    customer.status ===
                    "Active"
            ).length;


        const totalSpending =
            customers.reduce(
                (total, customer) => {

                    return total +
                        getCustomerSpending(
                            customer
                        );
                },
                0
            );


        const averageSpending =
            customers.length > 0
                ? totalSpending /
                    customers.length
                : 0;


        if (customerCount) {

            customerCount.textContent =
                customers.length;
        }


        if (activeCustomerCount) {

            activeCustomerCount.textContent =
                activeCustomers;
        }


        if (customerSpending) {

            customerSpending.textContent =
                customerCurrency(
                    totalSpending
                );
        }


        if (averageCustomerSpend) {

            averageCustomerSpend.textContent =
                customerCurrency(
                    averageSpending
                );
        }
    }


    // ==============================================
    // TABLE CLICK
    // ==============================================

    customersTableBody.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".view-customer-btn"
                );


            if (!button) return;


            openCustomerModal(
                Number(button.dataset.id)
            );
        }
    );


    // ==============================================
    // OPEN CUSTOMER MODAL
    // ==============================================

    function openCustomerModal(id) {

        const customer =
            customers.find(
                customer =>
                    customer.id === id
            );


        if (!customer) return;


        selectedCustomerId =
            customer.id;


        const orders =
            getCustomerOrders(customer);


        const spending =
            getCustomerSpending(customer);


        const average =
            orders.length > 0
                ? spending / orders.length
                : 0;


        // Profile

        document.getElementById(
            "customerModalTitle"
        ).textContent =
            customer.name;


        document.getElementById(
            "modalCustomerProfileAvatar"
        ).textContent =
            customerInitials(
                customer.name
            );


        document.getElementById(
            "modalCustomerProfileName"
        ).textContent =
            customer.name;


        document.getElementById(
            "modalCustomerProfileEmail"
        ).textContent =
            customer.email;


        // Status

        const statusElement =
            document.getElementById(
                "modalCustomerStatus"
            );


        statusElement.textContent =
            customer.status;


        statusElement.className =
            customer.status === "Active"
                ? "status completed"
                : "status inactive";


        // Statistics

        document.getElementById(
            "modalCustomerOrders"
        ).textContent =
            orders.length;


        document.getElementById(
            "modalCustomerSpent"
        ).textContent =
            customerCurrency(
                spending
            );


        document.getElementById(
            "modalCustomerAverage"
        ).textContent =
            customerCurrency(
                average
            );


        // Contact

        document.getElementById(
            "modalCustomerEmail"
        ).textContent =
            customer.email;


        document.getElementById(
            "modalCustomerPhone"
        ).textContent =
            customer.phone;


        document.getElementById(
            "modalCustomerLocation"
        ).textContent =
            customer.location;


        document.getElementById(
            "modalCustomerJoined"
        ).textContent =
            formatCustomerDate(
                customer.joined
            );


        customerAccountStatus.value =
            customer.status;


        renderCustomerOrderHistory(
            orders
        );


        customerModal.classList.add(
            "show"
        );


        customerModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";
    }


    // ==============================================
    // CUSTOMER ORDER HISTORY
    // ==============================================

    function renderCustomerOrderHistory(orders) {

        const container =
            document.getElementById(
                "customerOrderHistory"
            );


        container.innerHTML = "";


        if (orders.length === 0) {

            container.innerHTML = `

                <div class="no-customer-orders">

                    This customer has no orders yet.

                </div>
            `;

            return;
        }


        const sortedOrders =
            [...orders].sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );


        sortedOrders.forEach(order => {

            const item =
                document.createElement("div");


            item.className =
                "customer-history-item";


            item.innerHTML = `

                <div class="customer-history-left">

                    <strong>
                        #${escapeCustomerHTML(
                            order.id
                        )}
                    </strong>

                    <span>
                        ${formatCustomerDate(
                            order.date
                        )}
                    </span>

                </div>


                <div class="customer-history-right">

                    <strong>
                        ${customerCurrency(
                            getCustomerOrderTotal(
                                order
                            )
                        )}
                    </strong>

                    <span
                        class="status ${
                            order.status
                                .toLowerCase()
                        }"
                    >

                        ${escapeCustomerHTML(
                            order.status
                        )}

                    </span>

                </div>
            `;


            container.appendChild(
                item
            );
        });
    }


    // ==============================================
    // CLOSE CUSTOMER MODAL
    // ==============================================

    function closeCustomersModal() {

        customerModal.classList.remove(
            "show"
        );


        customerModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";


        selectedCustomerId = null;
    }


    closeCustomerModal?.addEventListener(
        "click",
        closeCustomersModal
    );


    cancelCustomerModal?.addEventListener(
        "click",
        closeCustomersModal
    );


    // Click outside

    customerModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                customerModal
            ) {

                closeCustomersModal();
            }
        }
    );


    // ESC

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                customerModal.classList.contains(
                    "show"
                )
            ) {

                closeCustomersModal();
            }
        }
    );


    // ==============================================
    // UPDATE CUSTOMER
    // ==============================================

    updateCustomerBtn?.addEventListener(
        "click",
        () => {

            if (
                selectedCustomerId === null
            ) {

                return;
            }


            const customer =
                customers.find(
                    customer =>
                        customer.id ===
                        selectedCustomerId
                );


            if (!customer) return;


            customer.status =
                customerAccountStatus.value;


            saveCustomers();

            renderCustomers();

            closeCustomersModal();


            showToast(
                "Customer updated successfully.",
                "success"
            );
        }
    );


    // ==============================================
    // SEARCH
    // ==============================================

    customerSearch?.addEventListener(
        "input",
        renderCustomers
    );


    // ==============================================
    // STATUS FILTER
    // ==============================================

    customerStatusFilter?.addEventListener(
        "change",
        renderCustomers
    );


    // ==============================================
    // SORT
    // ==============================================

    customerSort?.addEventListener(
        "change",
        renderCustomers
    );


    // ==============================================
    // EXPORT CUSTOMERS
    // ==============================================

    exportCustomersBtn?.addEventListener(
        "click",
        () => {

            if (customers.length === 0) {

                showToast(
                    "There are no customers to export.",
                    "error"
                );

                return;
            }


            const csvRows = [

                [
                    "Customer",
                    "Email",
                    "Phone",
                    "Location",
                    "Joined",
                    "Orders",
                    "Total Spent",
                    "Status"
                ]

            ];


            customers.forEach(customer => {

                csvRows.push([

                    customer.name,

                    customer.email,

                    customer.phone,

                    customer.location,

                    customer.joined,

                    getCustomerOrders(
                        customer
                    ).length,

                    getCustomerSpending(
                        customer
                    ),

                    customer.status

                ]);
            });


            const csvContent =
                csvRows
                    .map(row => {

                        return row
                            .map(value => {

                                const text =
                                    String(value)
                                        .replace(
                                            /"/g,
                                            '""'
                                        );


                                return `"${text}"`;
                            })
                            .join(",");

                    })
                    .join("\n");


            const blob =
                new Blob(
                    [csvContent],
                    {
                        type:
                            "text/csv;charset=utf-8;"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                "adminflow-customers.csv";


            document.body.appendChild(
                link
            );


            link.click();

            link.remove();


            URL.revokeObjectURL(
                url
            );


            showToast(
                "Customers exported successfully.",
                "success"
            );
        }
    );


    // ==============================================
    // INITIAL RENDER
    // ==============================================

    renderCustomers();
}

// ==================================================
// ANALYTICS PAGE
// ==================================================

const analyticsPeriod =
    document.getElementById("analyticsPeriod");

const analyticsRevenueChart =
    document.getElementById("analyticsRevenueChart");

const analyticsChartLabels =
    document.getElementById("analyticsChartLabels");

const analyticsCategoryList =
    document.getElementById("analyticsCategoryList");

const analyticsTopProducts =
    document.getElementById("analyticsTopProducts");

const analyticsRecentSales =
    document.getElementById("analyticsRecentSales");

const analyticsEmptyState =
    document.getElementById("analyticsEmptyState");


// Only run on analytics.html
if (analyticsRevenueChart) {

    // ==============================================
    // SAFE LOCAL STORAGE
    // ==============================================

    function getAnalyticsStorage(key) {

        try {

            const data =
                JSON.parse(
                    localStorage.getItem(key)
                );

            return Array.isArray(data)
                ? data
                : [];

        } catch (error) {

            console.error(
                `Could not load ${key}:`,
                error
            );

            return [];
        }
    }


    // ==============================================
    // CURRENCY
    // ==============================================

    function analyticsCurrency(value) {

        return new Intl.NumberFormat(
            "en-ZA",
            {
                style: "currency",
                currency: "ZAR",
                maximumFractionDigits: 0
            }
        ).format(value || 0);
    }


    // ==============================================
    // DATE
    // ==============================================

    function analyticsDate(date) {

        return new Intl.DateTimeFormat(
            "en-ZA",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ).format(
            new Date(`${date}T00:00:00`)
        );
    }


    // ==============================================
    // SAFE HTML
    // ==============================================

    function escapeAnalyticsHTML(value = "") {

        const div =
            document.createElement("div");

        div.textContent =
            String(value);

        return div.innerHTML;
    }


    // ==============================================
    // ORDER TOTAL
    // ==============================================

    function analyticsOrderTotal(order) {

        if (!Array.isArray(order.products)) {
            return 0;
        }


        return order.products.reduce(
            (total, product) => {

                return total +
                    (
                        Number(product.price || 0) *
                        Number(product.quantity || 0)
                    );
            },
            0
        );
    }


    // ==============================================
    // ORDER ITEM COUNT
    // ==============================================

    function analyticsItemCount(order) {

        if (!Array.isArray(order.products)) {
            return 0;
        }


        return order.products.reduce(
            (total, product) => {

                return total +
                    Number(product.quantity || 0);
            },
            0
        );
    }


    // ==============================================
    // VALID REVENUE ORDER
    // ==============================================

    function isRevenueOrder(order) {

        return (
            order.status !== "Cancelled" &&
            order.payment !== "Refunded"
        );
    }


    // ==============================================
    // PERIOD FILTER
    // ==============================================

    function filterOrdersByPeriod(
        orders,
        period,
        referenceDate = new Date()
    ) {

        if (period === "all") {

            return [...orders];
        }


        const days =
            Number(period);


        if (!Number.isFinite(days)) {

            return [...orders];
        }


        const endDate =
            new Date(referenceDate);


        endDate.setHours(
            23,
            59,
            59,
            999
        );


        const startDate =
            new Date(endDate);


        startDate.setDate(
            startDate.getDate() -
            (days - 1)
        );


        startDate.setHours(
            0,
            0,
            0,
            0
        );


        return orders.filter(order => {

            const orderDate =
                new Date(
                    `${order.date}T00:00:00`
                );


            return (
                orderDate >= startDate &&
                orderDate <= endDate
            );
        });
    }


    // ==============================================
    // PREVIOUS PERIOD
    // ==============================================

    function getPreviousPeriodOrders(
        orders,
        period
    ) {

        if (period === "all") {

            return [];
        }


        const days =
            Number(period);


        const currentEnd =
            new Date();


        currentEnd.setHours(
            23,
            59,
            59,
            999
        );


        const currentStart =
            new Date(currentEnd);


        currentStart.setDate(
            currentStart.getDate() -
            (days - 1)
        );


        currentStart.setHours(
            0,
            0,
            0,
            0
        );


        const previousEnd =
            new Date(currentStart);


        previousEnd.setMilliseconds(-1);


        const previousStart =
            new Date(previousEnd);


        previousStart.setDate(
            previousStart.getDate() -
            (days - 1)
        );


        previousStart.setHours(
            0,
            0,
            0,
            0
        );


        return orders.filter(order => {

            const date =
                new Date(
                    `${order.date}T00:00:00`
                );


            return (
                date >= previousStart &&
                date <= previousEnd
            );
        });
    }


    // ==============================================
    // PERCENTAGE CHANGE
    // ==============================================

    function percentageChange(
        current,
        previous
    ) {

        if (previous === 0) {

            return current > 0
                ? 100
                : 0;
        }


        return (
            (
                current - previous
            ) /
            previous
        ) * 100;
    }


    // ==============================================
    // SET CHANGE BADGE
    // ==============================================

    function setAnalyticsChange(
        id,
        change
    ) {

        const element =
            document.getElementById(id);


        if (!element) return;


        const rounded =
            Math.round(change);


        element.textContent =
            `${rounded >= 0 ? "+" : ""}${rounded}%`;


        element.classList.remove(
            "positive",
            "negative"
        );


        element.classList.add(
            rounded >= 0
                ? "positive"
                : "negative"
        );
    }


    // ==============================================
    // RENDER ANALYTICS
    // ==============================================

    function renderAnalytics() {

        const allOrders =
            getAnalyticsStorage(
                "adminOrders"
            );


        const products =
            getAnalyticsStorage(
                "adminProducts"
            );


        const customers =
            getAnalyticsStorage(
                "adminCustomers"
            );


        const period =
            analyticsPeriod?.value ||
            "30";


        const orders =
            filterOrdersByPeriod(
                allOrders,
                period
            );


        const previousOrders =
            getPreviousPeriodOrders(
                allOrders,
                period
            );


        // ==========================================
        // MAIN METRICS
        // ==========================================

        const revenueOrders =
            orders.filter(
                isRevenueOrder
            );


        const revenue =
            revenueOrders.reduce(
                (total, order) => {

                    return total +
                        analyticsOrderTotal(
                            order
                        );
                },
                0
            );


        const previousRevenue =
            previousOrders
                .filter(isRevenueOrder)
                .reduce(
                    (total, order) => {

                        return total +
                            analyticsOrderTotal(
                                order
                            );
                    },
                    0
                );


        const uniqueCustomers =
            new Set(
                orders.map(order =>
                    order.customer?.email
                        ?.toLowerCase()
                ).filter(Boolean)
            );


        const previousCustomers =
            new Set(
                previousOrders.map(order =>
                    order.customer?.email
                        ?.toLowerCase()
                ).filter(Boolean)
            );


        const averageOrder =
            revenueOrders.length > 0
                ? revenue /
                    revenueOrders.length
                : 0;


        setText(
            "analyticsRevenue",
            analyticsCurrency(revenue)
        );


        setText(
            "analyticsOrders",
            orders.length
        );


        setText(
            "analyticsCustomers",
            uniqueCustomers.size
        );


        setText(
            "averageOrderValue",
            analyticsCurrency(
                averageOrder
            )
        );


        setText(
            "chartRevenueTotal",
            analyticsCurrency(revenue)
        );


        // ==========================================
        // CHANGE METRICS
        // ==========================================

        if (period === "all") {

            setAnalyticsChange(
                "revenueChange",
                0
            );


            setAnalyticsChange(
                "ordersChange",
                0
            );


            setAnalyticsChange(
                "customersChange",
                0
            );

        } else {

            setAnalyticsChange(
                "revenueChange",
                percentageChange(
                    revenue,
                    previousRevenue
                )
            );


            setAnalyticsChange(
                "ordersChange",
                percentageChange(
                    orders.length,
                    previousOrders.length
                )
            );


            setAnalyticsChange(
                "customersChange",
                percentageChange(
                    uniqueCustomers.size,
                    previousCustomers.size
                )
            );
        }


        // ==========================================
        // ORDER STATUS
        // ==========================================

        renderOrderStatusAnalytics(
            orders
        );


        // ==========================================
        // CHART
        // ==========================================

        renderRevenueChart(
            revenueOrders,
            period
        );


        // ==========================================
        // CATEGORY SALES
        // ==========================================

        renderCategoryAnalytics(
            revenueOrders,
            products
        );


        // ==========================================
        // TOP PRODUCTS
        // ==========================================

        renderTopProducts(
            revenueOrders,
            products
        );


        // ==========================================
        // INSIGHTS
        // ==========================================

        renderBusinessInsights(
            orders,
            revenueOrders,
            revenue,
            uniqueCustomers
        );


        // ==========================================
        // RECENT SALES
        // ==========================================

        renderRecentAnalyticsSales(
            revenueOrders
        );


        // ==========================================
        // EMPTY STATE
        // ==========================================

        if (analyticsEmptyState) {

            analyticsEmptyState.hidden =
                orders.length !== 0;
        }


        console.log(
            "Analytics updated:",
            {
                period,
                orders: orders.length,
                revenue,
                products:
                    products.length,
                customers:
                    customers.length
            }
        );
    }


    // ==============================================
    // SET TEXT
    // ==============================================

    function setText(id, value) {

        const element =
            document.getElementById(id);


        if (element) {

            element.textContent =
                value;
        }
    }


    // ==============================================
    // ORDER STATUS ANALYTICS
    // ==============================================

    function renderOrderStatusAnalytics(
        orders
    ) {

        const statuses = {

            Pending: 0,

            Processing: 0,

            Completed: 0,

            Cancelled: 0
        };


        orders.forEach(order => {

            if (
                Object.prototype
                    .hasOwnProperty.call(
                        statuses,
                        order.status
                    )
            ) {

                statuses[
                    order.status
                ]++;
            }
        });


        setText(
            "analyticsPending",
            statuses.Pending
        );


        setText(
            "analyticsProcessing",
            statuses.Processing
        );


        setText(
            "analyticsCompleted",
            statuses.Completed
        );


        setText(
            "analyticsCancelled",
            statuses.Cancelled
        );


        const total =
            orders.length;


        setProgress(
            "pendingProgress",
            statuses.Pending,
            total
        );


        setProgress(
            "processingProgress",
            statuses.Processing,
            total
        );


        setProgress(
            "completedProgress",
            statuses.Completed,
            total
        );


        setProgress(
            "cancelledProgress",
            statuses.Cancelled,
            total
        );
    }


    // ==============================================
    // PROGRESS WIDTH
    // ==============================================

    function setProgress(
        id,
        value,
        total
    ) {

        const element =
            document.getElementById(id);


        if (!element) return;


        const percentage =
            total > 0
                ? (
                    value /
                    total
                ) * 100
                : 0;


        requestAnimationFrame(() => {

            element.style.width =
                `${percentage}%`;
        });
    }


    // ==============================================
    // REVENUE CHART
    // ==============================================

    function renderRevenueChart(
        orders,
        period
    ) {

        analyticsRevenueChart.innerHTML =
            "";


        analyticsChartLabels.innerHTML =
            "";


        let groups;


        if (
            period === "7"
        ) {

            groups =
                createDailyGroups(
                    7
                );

        } else if (
            period === "30"
        ) {

            groups =
                createWeeklyGroups(
                    4
                );

        } else if (
            period === "90"
        ) {

            groups =
                createMonthlyGroups(
                    3
                );

        } else {

            groups =
                createAllTimeGroups(
                    orders
                );
        }


        // Add revenue

        orders.forEach(order => {

            const date =
                new Date(
                    `${order.date}T00:00:00`
                );


            const group =
                groups.find(group => {

                    return (
                        date >=
                            group.start &&
                        date <=
                            group.end
                    );
                });


            if (group) {

                group.revenue +=
                    analyticsOrderTotal(
                        order
                    );
            }
        });


        const maxRevenue =
            Math.max(
                ...groups.map(
                    group =>
                        group.revenue
                ),
                1
            );


        groups.forEach(
            (group, index) => {

                const column =
                    document.createElement(
                        "div"
                    );


                column.className =
                    "analytics-bar-column";


                const tooltip =
                    document.createElement(
                        "div"
                    );


                tooltip.className =
                    "analytics-bar-tooltip";


                tooltip.textContent =
                    analyticsCurrency(
                        group.revenue
                    );


                const bar =
                    document.createElement(
                        "div"
                    );


                bar.className =
                    "analytics-bar";


                const height =
                    group.revenue > 0
                        ? Math.max(
                            (
                                group.revenue /
                                maxRevenue
                            ) * 100,
                            5
                        )
                        : 0;


                column.append(
                    tooltip,
                    bar
                );


                analyticsRevenueChart
                    .appendChild(
                        column
                    );


                const label =
                    document.createElement(
                        "div"
                    );


                label.className =
                    "analytics-chart-label";


                label.textContent =
                    group.label;


                analyticsChartLabels
                    .appendChild(
                        label
                    );


                // Animation

                setTimeout(() => {

                    bar.style.height =
                        `${height}%`;

                }, 100 * index);
            }
        );
    }


    // ==============================================
    // DAILY GROUPS
    // ==============================================

    function createDailyGroups(days) {

        const groups = [];

        const today =
            new Date();


        today.setHours(
            23,
            59,
            59,
            999
        );


        for (
            let i = days - 1;
            i >= 0;
            i--
        ) {

            const start =
                new Date(today);


            start.setDate(
                today.getDate() - i
            );


            start.setHours(
                0,
                0,
                0,
                0
            );


            const end =
                new Date(start);


            end.setHours(
                23,
                59,
                59,
                999
            );


            groups.push({

                start,

                end,

                revenue: 0,

                label:
                    start.toLocaleDateString(
                        "en-ZA",
                        {
                            weekday: "short"
                        }
                    )
            });
        }


        return groups;
    }


    // ==============================================
    // WEEKLY GROUPS
    // ==============================================

    function createWeeklyGroups(
        numberOfWeeks
    ) {

        const groups = [];

        const today =
            new Date();


        today.setHours(
            23,
            59,
            59,
            999
        );


        for (
            let i =
                numberOfWeeks - 1;
            i >= 0;
            i--
        ) {

            const end =
                new Date(today);


            end.setDate(
                today.getDate() -
                (i * 7)
            );


            const start =
                new Date(end);


            start.setDate(
                end.getDate() - 6
            );


            start.setHours(
                0,
                0,
                0,
                0
            );


            groups.push({

                start,

                end,

                revenue: 0,

                label:
                    `W${numberOfWeeks - i}`
            });
        }


        return groups;
    }


    // ==============================================
    // MONTHLY GROUPS
    // ==============================================

    function createMonthlyGroups(
        numberOfMonths
    ) {

        const groups = [];

        const today =
            new Date();


        for (
            let i =
                numberOfMonths - 1;
            i >= 0;
            i--
        ) {

            const date =
                new Date(
                    today.getFullYear(),
                    today.getMonth() - i,
                    1
                );


            const start =
                new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    1
                );


            const end =
                new Date(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    0,
                    23,
                    59,
                    59,
                    999
                );


            groups.push({

                start,

                end,

                revenue: 0,

                label:
                    date.toLocaleDateString(
                        "en-ZA",
                        {
                            month: "short"
                        }
                    )
            });
        }


        return groups;
    }


    // ==============================================
    // ALL-TIME GROUPS
    // ==============================================

    function createAllTimeGroups(
        orders
    ) {

        if (orders.length === 0) {

            return createMonthlyGroups(
                6
            );
        }


        const dates =
            orders.map(order =>
                new Date(
                    `${order.date}T00:00:00`
                )
            );


        const earliest =
            new Date(
                Math.min(...dates)
            );


        const latest =
            new Date(
                Math.max(...dates)
            );


        const groups = [];


        const current =
            new Date(
                earliest.getFullYear(),
                earliest.getMonth(),
                1
            );


        const last =
            new Date(
                latest.getFullYear(),
                latest.getMonth(),
                1
            );


        while (
            current <= last
        ) {

            const start =
                new Date(
                    current.getFullYear(),
                    current.getMonth(),
                    1
                );


            const end =
                new Date(
                    current.getFullYear(),
                    current.getMonth() + 1,
                    0,
                    23,
                    59,
                    59,
                    999
                );


            groups.push({

                start,

                end,

                revenue: 0,

                label:
                    current.toLocaleDateString(
                        "en-ZA",
                        {
                            month: "short"
                        }
                    )
            });


            current.setMonth(
                current.getMonth() + 1
            );
        }


        return groups;
    }


    // ==============================================
    // CATEGORY ANALYTICS
    // ==============================================

    function renderCategoryAnalytics(
        orders,
        products
    ) {

        analyticsCategoryList.innerHTML =
            "";


        const categories = {};


        orders.forEach(order => {

            order.products?.forEach(
                orderProduct => {

                    const storedProduct =
                        products.find(
                            product =>
                                product.name ===
                                orderProduct.name
                        );


                    const category =
                        storedProduct?.category ||
                        "Other";


                    const revenue =
                        Number(
                            orderProduct.price
                        ) *
                        Number(
                            orderProduct.quantity
                        );


                    if (!categories[category]) {

                        categories[category] = {

                            revenue: 0,

                            units: 0
                        };
                    }


                    categories[
                        category
                    ].revenue +=
                        revenue;


                    categories[
                        category
                    ].units +=
                        Number(
                            orderProduct.quantity
                        );
                }
            );
        });


        const categoryArray =
            Object.entries(
                categories
            )
                .map(
                    ([name, data]) => ({
                        name,
                        ...data
                    })
                )
                .sort(
                    (a, b) =>
                        b.revenue -
                        a.revenue
                );


        if (
            categoryArray.length === 0
        ) {

            analyticsCategoryList
                .innerHTML = `

                    <div class="analytics-no-data">
                        No category sales data available.
                    </div>
                `;

            return;
        }


        const totalRevenue =
            categoryArray.reduce(
                (total, category) =>
                    total +
                    category.revenue,
                0
            );


        const categoryIcons = {

            Electronics: "⌚",

            Fashion: "👕",

            Home: "⌂",

            Accessories: "🎒",

            Other: "□"
        };


        categoryArray.forEach(
            category => {

                const percentage =
                    totalRevenue > 0
                        ? (
                            category.revenue /
                            totalRevenue
                        ) * 100
                        : 0;


                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "analytics-category-item";


                item.innerHTML = `

                    <div class="analytics-category-top">

                        <div class="analytics-category-name">

                            <div class="analytics-category-icon">

                                ${
                                    categoryIcons[
                                        category.name
                                    ] || "□"
                                }

                            </div>

                            <div>

                                <strong>
                                    ${escapeAnalyticsHTML(
                                        category.name
                                    )}
                                </strong>

                                <span>
                                    ${category.units}
                                    units sold
                                </span>

                            </div>

                        </div>


                        <div class="analytics-category-value">

                            <strong>
                                ${analyticsCurrency(
                                    category.revenue
                                )}
                            </strong>

                            <span>
                                ${Math.round(
                                    percentage
                                )}%
                            </span>

                        </div>

                    </div>


                    <div class="analytics-category-progress">

                        <div
                            style="width: ${percentage}%"
                        ></div>

                    </div>
                `;


                analyticsCategoryList
                    .appendChild(
                        item
                    );
            }
        );
    }


    // ==============================================
    // TOP PRODUCTS
    // ==============================================

    function renderTopProducts(
        orders,
        products
    ) {

        analyticsTopProducts.innerHTML =
            "";


        const productSales = {};


        orders.forEach(order => {

            order.products?.forEach(
                orderProduct => {

                    const name =
                        orderProduct.name;


                    if (!productSales[name]) {

                        const storedProduct =
                            products.find(
                                product =>
                                    product.name ===
                                    name
                            );


                        productSales[name] = {

                            name,

                            emoji:
                                storedProduct?.emoji ||
                                orderProduct.emoji ||
                                "📦",

                            units: 0,

                            revenue: 0
                        };
                    }


                    productSales[
                        name
                    ].units +=
                        Number(
                            orderProduct.quantity
                        );


                    productSales[
                        name
                    ].revenue +=
                        Number(
                            orderProduct.price
                        ) *
                        Number(
                            orderProduct.quantity
                        );
                }
            );
        });


        const topProducts =
            Object.values(
                productSales
            )
                .sort(
                    (a, b) =>
                        b.revenue -
                        a.revenue
                )
                .slice(
                    0,
                    5
                );


        if (
            topProducts.length === 0
        ) {

            analyticsTopProducts
                .innerHTML = `

                    <div class="analytics-no-data">
                        No product sales available.
                    </div>
                `;

            return;
        }


        topProducts.forEach(
            (product, index) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "analytics-product-item";


                item.innerHTML = `

                    <div class="analytics-product-rank">
                        #${index + 1}
                    </div>


                    <div class="analytics-product-image">
                        ${escapeAnalyticsHTML(
                            product.emoji
                        )}
                    </div>


                    <div class="analytics-product-info">

                        <strong>
                            ${escapeAnalyticsHTML(
                                product.name
                            )}
                        </strong>

                        <span>
                            ${product.units}
                            units sold
                        </span>

                    </div>


                    <div class="analytics-product-sales">

                        <strong>
                            ${analyticsCurrency(
                                product.revenue
                            )}
                        </strong>

                        <span>
                            revenue
                        </span>

                    </div>
                `;


                analyticsTopProducts
                    .appendChild(
                        item
                    );
            }
        );
    }


    // ==============================================
    // BUSINESS INSIGHTS
    // ==============================================

    function renderBusinessInsights(
        orders,
        revenueOrders,
        revenue,
        uniqueCustomers
    ) {

        const completed =
            orders.filter(
                order =>
                    order.status ===
                    "Completed"
            ).length;


        const refunded =
            orders.filter(
                order =>
                    order.status ===
                        "Cancelled" ||
                    order.payment ===
                        "Refunded"
            ).length;


        const completion =
            orders.length > 0
                ? (
                    completed /
                    orders.length
                ) * 100
                : 0;


        const refundPercentage =
            orders.length > 0
                ? (
                    refunded /
                    orders.length
                ) * 100
                : 0;


        const customerValue =
            uniqueCustomers.size > 0
                ? revenue /
                    uniqueCustomers.size
                : 0;


        const units =
            revenueOrders.reduce(
                (total, order) => {

                    return total +
                        analyticsItemCount(
                            order
                        );
                },
                0
            );


        setText(
            "completionRate",
            `${completion.toFixed(1)}%`
        );


        setText(
            "revenuePerCustomer",
            analyticsCurrency(
                customerValue
            )
        );


        setText(
            "productsSold",
            units
        );


        setText(
            "refundRate",
            `${refundPercentage.toFixed(1)}%`
        );
    }


    // ==============================================
    // RECENT SALES
    // ==============================================

    function renderRecentAnalyticsSales(
        orders
    ) {

        analyticsRecentSales.innerHTML =
            "";


        const recentOrders =
            [...orders]
                .sort(
                    (a, b) =>
                        new Date(b.date) -
                        new Date(a.date)
                )
                .slice(
                    0,
                    6
                );


        if (
            recentOrders.length === 0
        ) {

            return;
        }


        recentOrders.forEach(order => {

            const row =
                document.createElement(
                    "tr"
                );


            const statusClass =
                String(
                    order.status
                ).toLowerCase();


            row.innerHTML = `

                <td>

                    <span class="order-id">
                        #${escapeAnalyticsHTML(
                            order.id
                        )}
                    </span>

                </td>


                <td>

                    <div class="order-customer-info">

                        <strong>
                            ${escapeAnalyticsHTML(
                                order.customer?.name ||
                                "Unknown"
                            )}
                        </strong>

                        <span>
                            ${escapeAnalyticsHTML(
                                order.customer?.email ||
                                ""
                            )}
                        </span>

                    </div>

                </td>


                <td>

                    ${analyticsDate(
                        order.date
                    )}

                </td>


                <td>

                    ${analyticsItemCount(
                        order
                    )}

                </td>


                <td>

                    <strong>
                        ${analyticsCurrency(
                            analyticsOrderTotal(
                                order
                            )
                        )}
                    </strong>

                </td>


                <td>

                    <span
                        class="status ${statusClass}"
                    >
                        ${escapeAnalyticsHTML(
                            order.status
                        )}
                    </span>

                </td>
            `;


            analyticsRecentSales
                .appendChild(
                    row
                );
        });
    }


    // ==============================================
    // PERIOD CHANGE
    // ==============================================

    analyticsPeriod?.addEventListener(
        "change",
        () => {

            renderAnalytics();


            showToast(
                analyticsPeriod.value ===
                    "all"
                    ? "Showing all-time analytics."
                    : `Analytics updated for the last ${analyticsPeriod.value} days.`,
                "success"
            );
        }
    );


    // ==============================================
    // INITIAL RENDER
    // ==============================================

    renderAnalytics();
}


// ==================================================
// SETTINGS PAGE
// ==================================================

const settingsNavButtons =
    document.querySelectorAll(".settings-nav-btn");

const settingsPanels =
    document.querySelectorAll(".settings-panel");

const profileSettingsForm =
    document.getElementById("profileSettingsForm");

const businessSettingsForm =
    document.getElementById("businessSettingsForm");

const securitySettingsForm =
    document.getElementById("securitySettingsForm");

const saveNotificationSettings =
    document.getElementById("saveNotificationSettings");

const exportDashboardData =
    document.getElementById("exportDashboardData");

const resetDashboardData =
    document.getElementById("resetDashboardData");

const appearanceCards =
    document.querySelectorAll(".appearance-card");


// Only run settings code on settings.html
if (document.getElementById("profileSettings")) {

    // ==============================================
    // SAFE LOCAL STORAGE
    // ==============================================

    function getSettingsStorage(key, fallback = {}) {

        try {

            const stored =
                localStorage.getItem(key);

            if (!stored) {
                return fallback;
            }

            const parsed =
                JSON.parse(stored);

            return parsed ?? fallback;

        } catch (error) {

            console.error(
                `Unable to read ${key}:`,
                error
            );

            return fallback;
        }
    }


    function saveSettingsStorage(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error(
                `Unable to save ${key}:`,
                error
            );

            showToast(
                "Unable to save settings.",
                "error"
            );

            return false;
        }
    }


    // ==============================================
    // SETTINGS NAVIGATION
    // ==============================================

    settingsNavButtons.forEach(button => {

        button.addEventListener("click", () => {

            const target =
                button.dataset.settingsTarget;


            settingsNavButtons.forEach(item => {

                item.classList.remove("active");

            });


            settingsPanels.forEach(panel => {

                panel.classList.remove("active");

            });


            button.classList.add("active");


            const targetPanel =
                document.getElementById(target);


            targetPanel?.classList.add("active");
        });
    });


    // ==============================================
    // DEFAULT SETTINGS
    // ==============================================

    const defaultProfile = {

        firstName: "Thabiso",

        lastName: "Shezi",

        email: "",

        phone: "",

        role: "Administrator"
    };


    const defaultBusiness = {

        name: "AdminFlow Store",

        currency: "ZAR",

        timezone: "Africa/Johannesburg",

        location: "Durban, KwaZulu-Natal",

        description:
            "Modern e-commerce management dashboard."
    };


    const defaultNotifications = {

        orders: true,

        stock: true,

        customers: false,

        analytics: true
    };


    let profileSettings =
        getSettingsStorage(
            "adminProfile",
            defaultProfile
        );


    let businessSettings =
        getSettingsStorage(
            "adminBusiness",
            defaultBusiness
        );


    let notificationSettings =
        getSettingsStorage(
            "adminNotifications",
            defaultNotifications
        );


    // ==============================================
    // MERGE DEFAULTS
    // ==============================================

    profileSettings = {

        ...defaultProfile,

        ...profileSettings
    };


    businessSettings = {

        ...defaultBusiness,

        ...businessSettings
    };


    notificationSettings = {

        ...defaultNotifications,

        ...notificationSettings
    };


    // ==============================================
    // LOAD PROFILE
    // ==============================================

    function loadProfileSettings() {

        const firstName =
            document.getElementById(
                "settingsFirstName"
            );

        const lastName =
            document.getElementById(
                "settingsLastName"
            );

        const email =
            document.getElementById(
                "settingsEmail"
            );

        const phone =
            document.getElementById(
                "settingsPhone"
            );

        const role =
            document.getElementById(
                "settingsRole"
            );


        if (firstName) {

            firstName.value =
                profileSettings.firstName;
        }


        if (lastName) {

            lastName.value =
                profileSettings.lastName;
        }


        if (email) {

            email.value =
                profileSettings.email;
        }


        if (phone) {

            phone.value =
                profileSettings.phone;
        }


        if (role) {

            role.value =
                profileSettings.role;
        }


        updateAdminProfileUI();
    }


    // ==============================================
    // PROFILE INITIALS
    // ==============================================

    function getSettingsInitials(
        firstName,
        lastName
    ) {

        const first =
            firstName?.trim()?.[0] || "";

        const last =
            lastName?.trim()?.[0] || "";


        return (
            first + last
        ).toUpperCase() || "AD";
    }


    // ==============================================
    // UPDATE ADMIN UI
    // ==============================================

    function updateAdminProfileUI() {

        const initials =
            getSettingsInitials(
                profileSettings.firstName,
                profileSettings.lastName
            );


        const fullName =
            `${profileSettings.firstName} ${profileSettings.lastName}`
                .trim();


        const settingsAvatar =
            document.getElementById(
                "settingsAvatar"
            );


        if (settingsAvatar) {

            settingsAvatar.textContent =
                initials;
        }


        // Sidebar avatars

        document
            .querySelectorAll(".user-avatar")
            .forEach(avatar => {

                avatar.textContent =
                    initials;
            });


        // Header profile avatars

        document
            .querySelectorAll(".profile-avatar")
            .forEach(avatar => {

                avatar.textContent =
                    initials;
            });


        // Sidebar name

        document
            .querySelectorAll(
                ".sidebar-user .user-info strong"
            )
            .forEach(name => {

                name.textContent =
                    fullName || "Administrator";
            });


        // Sidebar role

        document
            .querySelectorAll(
                ".sidebar-user .user-info span"
            )
            .forEach(role => {

                role.textContent =
                    profileSettings.role;
            });


        // Header first name

        document
            .querySelectorAll(
                ".profile-details strong"
            )
            .forEach(name => {

                name.textContent =
                    profileSettings.firstName ||
                    "Admin";
            });
    }


    // ==============================================
    // SAVE PROFILE
    // ==============================================

    profileSettingsForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const firstName =
                document
                    .getElementById(
                        "settingsFirstName"
                    )
                    .value
                    .trim();


            const lastName =
                document
                    .getElementById(
                        "settingsLastName"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "settingsEmail"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "settingsPhone"
                    )
                    .value
                    .trim();


            if (
                !firstName ||
                !lastName
            ) {

                showToast(
                    "First name and last name are required.",
                    "error"
                );

                return;
            }


            profileSettings = {

                firstName,

                lastName,

                email,

                phone,

                role: "Administrator"
            };


            const saved =
                saveSettingsStorage(
                    "adminProfile",
                    profileSettings
                );


            if (!saved) return;


            updateAdminProfileUI();


            showToast(
                "Profile saved successfully.",
                "success"
            );
        }
    );


    // ==============================================
    // LOAD BUSINESS SETTINGS
    // ==============================================

    function loadBusinessSettings() {

        const businessName =
            document.getElementById(
                "businessName"
            );

        const businessCurrency =
            document.getElementById(
                "businessCurrency"
            );

        const businessTimezone =
            document.getElementById(
                "businessTimezone"
            );

        const businessLocation =
            document.getElementById(
                "businessLocation"
            );

        const businessDescription =
            document.getElementById(
                "businessDescription"
            );


        if (businessName) {

            businessName.value =
                businessSettings.name;
        }


        if (businessCurrency) {

            businessCurrency.value =
                businessSettings.currency;
        }


        if (businessTimezone) {

            businessTimezone.value =
                businessSettings.timezone;
        }


        if (businessLocation) {

            businessLocation.value =
                businessSettings.location;
        }


        if (businessDescription) {

            businessDescription.value =
                businessSettings.description;
        }
    }


    // ==============================================
    // SAVE BUSINESS
    // ==============================================

    businessSettingsForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "businessName"
                    )
                    .value
                    .trim();


            const currency =
                document
                    .getElementById(
                        "businessCurrency"
                    )
                    .value;


            const timezone =
                document
                    .getElementById(
                        "businessTimezone"
                    )
                    .value;


            const location =
                document
                    .getElementById(
                        "businessLocation"
                    )
                    .value
                    .trim();


            const description =
                document
                    .getElementById(
                        "businessDescription"
                    )
                    .value
                    .trim();


            if (!name) {

                showToast(
                    "Business name is required.",
                    "error"
                );

                return;
            }


            businessSettings = {

                name,

                currency,

                timezone,

                location,

                description
            };


            const saved =
                saveSettingsStorage(
                    "adminBusiness",
                    businessSettings
                );


            if (!saved) return;


            showToast(
                "Business settings saved.",
                "success"
            );
        }
    );


    // ==============================================
    // LOAD NOTIFICATIONS
    // ==============================================

    function loadNotificationSettings() {

        const notifyOrders =
            document.getElementById(
                "notifyOrders"
            );

        const notifyStock =
            document.getElementById(
                "notifyStock"
            );

        const notifyCustomers =
            document.getElementById(
                "notifyCustomers"
            );

        const notifyAnalytics =
            document.getElementById(
                "notifyAnalytics"
            );


        if (notifyOrders) {

            notifyOrders.checked =
                notificationSettings.orders;
        }


        if (notifyStock) {

            notifyStock.checked =
                notificationSettings.stock;
        }


        if (notifyCustomers) {

            notifyCustomers.checked =
                notificationSettings.customers;
        }


        if (notifyAnalytics) {

            notifyAnalytics.checked =
                notificationSettings.analytics;
        }
    }


    // ==============================================
    // SAVE NOTIFICATIONS
    // ==============================================

    saveNotificationSettings
        ?.addEventListener(
            "click",
            () => {

                notificationSettings = {

                    orders:
                        document.getElementById(
                            "notifyOrders"
                        )?.checked || false,

                    stock:
                        document.getElementById(
                            "notifyStock"
                        )?.checked || false,

                    customers:
                        document.getElementById(
                            "notifyCustomers"
                        )?.checked || false,

                    analytics:
                        document.getElementById(
                            "notifyAnalytics"
                        )?.checked || false
                };


                const saved =
                    saveSettingsStorage(
                        "adminNotifications",
                        notificationSettings
                    );


                if (!saved) return;


                showToast(
                    "Notification preferences saved.",
                    "success"
                );
            }
        );


    // ==============================================
    // APPEARANCE
    // ==============================================

    function updateAppearanceCards() {

        const darkMode =
            document.body.classList.contains(
                "dark"
            );


        appearanceCards.forEach(card => {

            const theme =
                card.dataset.themeSetting;


            card.classList.toggle(
                "active",
                (
                    darkMode &&
                    theme === "dark"
                ) ||
                (
                    !darkMode &&
                    theme === "light"
                )
            );
        });
    }


    appearanceCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const theme =
                    card.dataset.themeSetting;


                const darkMode =
                    theme === "dark";


                document.body.classList.toggle(
                    "dark",
                    darkMode
                );


                localStorage.setItem(
                    "adminTheme",
                    darkMode
                        ? "dark"
                        : "light"
                );


                if (themeToggle) {

                    themeToggle.textContent =
                        darkMode
                            ? "☀"
                            : "☾";
                }


                updateAppearanceCards();


                showToast(
                    `${darkMode ? "Dark" : "Light"} mode enabled.`,
                    "success"
                );
            }
        );
    });


    // ==============================================
    // SECURITY
    // ==============================================

    securitySettingsForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const currentPassword =
                document.getElementById(
                    "currentPassword"
                ).value;


            const newPassword =
                document.getElementById(
                    "newPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            if (
                !currentPassword ||
                !newPassword ||
                !confirmPassword
            ) {

                showToast(
                    "Please complete all password fields.",
                    "error"
                );

                return;
            }


            if (
                newPassword.length < 8
            ) {

                showToast(
                    "New password must contain at least 8 characters.",
                    "error"
                );

                return;
            }


            if (
                newPassword !==
                confirmPassword
            ) {

                showToast(
                    "New passwords do not match.",
                    "error"
                );

                return;
            }


            /*
             * Portfolio demo only.
             *
             * Never store real passwords in
             * localStorage.
             *
             * A real application would send
             * the password securely to a
             * backend authentication API.
             */


            securitySettingsForm.reset();


            showToast(
                "Password validation successful. Backend integration would update it here.",
                "success"
            );
        }
    );


    // ==============================================
    // EXPORT DASHBOARD DATA
    // ==============================================

    exportDashboardData?.addEventListener(
        "click",
        () => {

            const backup = {

                application:
                    "AdminFlow",

                exportedAt:
                    new Date()
                        .toISOString(),

                version:
                    "1.0",

                profile:
                    getSettingsStorage(
                        "adminProfile",
                        {}
                    ),

                business:
                    getSettingsStorage(
                        "adminBusiness",
                        {}
                    ),

                notifications:
                    getSettingsStorage(
                        "adminNotifications",
                        {}
                    ),

                theme:
                    localStorage.getItem(
                        "adminTheme"
                    ) || "light",

                products:
                    getSettingsStorage(
                        "adminProducts",
                        []
                    ),

                orders:
                    getSettingsStorage(
                        "adminOrders",
                        []
                    ),

                customers:
                    getSettingsStorage(
                        "adminCustomers",
                        []
                    )
            };


            const json =
                JSON.stringify(
                    backup,
                    null,
                    2
                );


            const blob =
                new Blob(
                    [json],
                    {
                        type:
                            "application/json"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                "adminflow-backup.json";


            document.body.appendChild(
                link
            );


            link.click();

            link.remove();


            URL.revokeObjectURL(
                url
            );


            showToast(
                "Dashboard backup exported.",
                "success"
            );
        }
    );


    // ==============================================
    // RESET DASHBOARD DATA
    // ==============================================

    resetDashboardData?.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Reset all AdminFlow demo data?\n\nProducts, orders and customers stored in this browser will be removed."
                );


            if (!confirmed) {

                return;
            }


            /*
             * Remove business demo data.
             *
             * Profile and theme are kept.
             */

            localStorage.removeItem(
                "adminProducts"
            );

            localStorage.removeItem(
                "adminOrders"
            );

            localStorage.removeItem(
                "adminCustomers"
            );


            showToast(
                "Demo data has been reset.",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 1200);
        }
    );


    // ==============================================
    // INITIAL LOAD
    // ==============================================

    loadProfileSettings();

    loadBusinessSettings();

    loadNotificationSettings();

    updateAppearanceCards();


    console.log(
        "AdminFlow settings loaded."
    );
}

// ==================================================
// HELP CENTER PAGE
// ==================================================

const helpSearch =
    document.getElementById("helpSearch");

const faqItems =
    document.querySelectorAll(".faq-item");

const helpNoResults =
    document.getElementById("helpNoResults");

const helpTopicCards =
    document.querySelectorAll(".help-topic-card");

const contactSupportBtn =
    document.getElementById("contactSupportBtn");

const supportModal =
    document.getElementById("supportModal");

const closeSupportModal =
    document.getElementById("closeSupportModal");

const cancelSupportModal =
    document.getElementById("cancelSupportModal");

const supportForm =
    document.getElementById("supportForm");


// Only run on help.html
if (helpSearch) {

    // ==============================================
    // FAQ ACCORDION
    // ==============================================

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        question?.addEventListener("click", () => {

            const isOpen =
                item.classList.contains("open");


            // Close all FAQs

            faqItems.forEach(faq => {

                faq.classList.remove("open");

                const faqButton =
                    faq.querySelector(".faq-question");

                faqButton?.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });


            // Open selected FAQ

            if (!isOpen) {

                item.classList.add("open");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );
            }

        });

    });


    // ==============================================
    // HELP SEARCH
    // ==============================================

    function filterHelpArticles(searchTerm = "") {

        const search =
            searchTerm
                .toLowerCase()
                .trim();

        let matches = 0;


        faqItems.forEach(item => {

            const question =
                item
                    .querySelector(".faq-question")
                    ?.textContent
                    .toLowerCase() || "";


            const answer =
                item
                    .querySelector(".faq-answer")
                    ?.textContent
                    .toLowerCase() || "";


            const category =
                item.dataset.helpCategory
                    ?.toLowerCase() || "";


            const searchableText =
                `${question} ${answer} ${category}`;


            const match =
                !search ||
                searchableText.includes(search);


            item.style.display =
                match ? "" : "none";


            item.classList.toggle(
                "help-match",
                Boolean(search && match)
            );


            if (match) {
                matches++;
            }

        });


        if (helpNoResults) {

            helpNoResults.hidden =
                matches !== 0;
        }

    }


    helpSearch.addEventListener(
        "input",
        event => {

            filterHelpArticles(
                event.target.value
            );

        }
    );


    // ==============================================
    // "/" KEYBOARD SHORTCUT
    // ==============================================

    document.addEventListener(
        "keydown",
        event => {

            const activeElement =
                document.activeElement;


            const typing =
                activeElement?.tagName === "INPUT" ||
                activeElement?.tagName === "TEXTAREA" ||
                activeElement?.tagName === "SELECT";


            if (
                event.key === "/" &&
                !typing
            ) {

                event.preventDefault();

                helpSearch.focus();

            }

        }
    );


    // ==============================================
    // ESCAPE SEARCH
    // ==============================================

    helpSearch.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                helpSearch.value = "";

                filterHelpArticles("");

                helpSearch.blur();

            }

        }
    );


    // ==============================================
    // HELP TOPIC CARDS
    // ==============================================

    helpTopicCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const topic =
                    card.dataset.helpTopic || "";


                helpSearch.value =
                    topic;


                filterHelpArticles(
                    topic
                );


                document
                    .getElementById("faqSection")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                setTimeout(() => {

                    helpSearch.focus();

                }, 500);

            }
        );

    });


    // ==============================================
    // OPEN SUPPORT MODAL
    // ==============================================

    function openHelpSupportModal() {

        if (!supportModal) return;


        supportModal.classList.add(
            "show"
        );


        supportModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";


        // Load saved profile information

        try {

            const profile =
                JSON.parse(
                    localStorage.getItem(
                        "adminProfile"
                    )
                ) || {};


            const supportName =
                document.getElementById(
                    "supportName"
                );


            const supportEmail =
                document.getElementById(
                    "supportEmail"
                );


            if (
                supportName &&
                (
                    profile.firstName ||
                    profile.lastName
                )
            ) {

                supportName.value =
                    `${profile.firstName || ""} ${profile.lastName || ""}`
                        .trim();

            }


            if (
                supportEmail &&
                profile.email
            ) {

                supportEmail.value =
                    profile.email;

            }

        } catch (error) {

            console.warn(
                "Unable to load profile for support form.",
                error
            );

        }


        setTimeout(() => {

            document
                .getElementById("supportTopic")
                ?.focus();

        }, 100);

    }


    // ==============================================
    // CLOSE SUPPORT MODAL
    // ==============================================

    function closeHelpSupportModal() {

        if (!supportModal) return;


        supportModal.classList.remove(
            "show"
        );


        supportModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    contactSupportBtn?.addEventListener(
        "click",
        openHelpSupportModal
    );


    closeSupportModal?.addEventListener(
        "click",
        closeHelpSupportModal
    );


    cancelSupportModal?.addEventListener(
        "click",
        closeHelpSupportModal
    );


    // Close by clicking outside modal

    supportModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                supportModal
            ) {

                closeHelpSupportModal();

            }

        }
    );


    // ==============================================
    // SUPPORT FORM
    // ==============================================

    supportForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "supportName"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "supportEmail"
                    )
                    .value
                    .trim();


            const topic =
                document
                    .getElementById(
                        "supportTopic"
                    )
                    .value;


            const message =
                document
                    .getElementById(
                        "supportMessage"
                    )
                    .value
                    .trim();


            if (
                !name ||
                !email ||
                !topic ||
                !message
            ) {

                showToast(
                    "Please complete all support fields.",
                    "error"
                );

                return;

            }


            // Basic email validation

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                showToast(
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            /*
             * Front-end portfolio demo.
             *
             * A real application would send
             * this information to an API,
             * database or support platform.
             */


            console.log(
                "Support request:",
                {
                    name,
                    email,
                    topic,
                    message
                }
            );


            supportForm.reset();


            closeHelpSupportModal();


            showToast(
                "Support message submitted successfully.",
                "success"
            );

        }
    );


    // ==============================================
    // ESCAPE CLOSE MODAL
    // ==============================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                supportModal?.classList.contains(
                    "show"
                )
            ) {

                closeHelpSupportModal();

            }

        }
    );


    // ==============================================
    // INITIAL STATE
    // ==============================================

    filterHelpArticles("");


    console.log(
        "AdminFlow Help Center loaded."
    );

}

});