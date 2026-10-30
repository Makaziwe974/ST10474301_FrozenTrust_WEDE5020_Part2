
 


/* FROZEN TRUST WEBSITE - PART 3
   JavaScript functionality */

document.addEventListener("DOMContentLoaded", function () {


    //  AUTOMATIC FOOTER YEAR //

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    //  PRODUCT SEARCH //

    const productSearch = document.getElementById("productSearch");

    if (productSearch) {
        productSearch.addEventListener("input", function () {

            const searchText = productSearch.value.toLowerCase().trim();

            const productCards = document.querySelectorAll(".card");

            productCards.forEach(function (card) {

                const productText = card.textContent.toLowerCase();

                if (productText.includes(searchText)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });
    }


    //  ENQUIRY FORM VALIDATION //

    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            const nameField = document.getElementById("name");
            const emailField = document.getElementById("email");
            const phoneField = document.getElementById("phone");
            const productField = document.getElementById("product");
            const messageField = document.getElementById("message");
            const formStatus = document.getElementById("formStatus");

            const name = nameField ? nameField.value.trim() : "";
            const email = emailField ? emailField.value.trim() : "";
            const phone = phoneField ? phoneField.value.trim() : "";
            const product = productField ? productField.value.trim() : "";
            const message = messageField ? messageField.value.trim() : "";

            let errorMessage = "";

            // Check required fields
            if (!name || !email || !message) {
                errorMessage =
                    "Please complete your name, email address and message.";
            }

            // Check email format
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!errorMessage && !emailPattern.test(email)) {
                errorMessage =
                    "Please enter a valid email address.";
            }

            // Check phone number if provided
            if (!errorMessage && phone) {

                const phoneDigits = phone.replace(/\D/g, "");

                if (phoneDigits.length < 9 || phoneDigits.length > 15) {
                    errorMessage =
                        "Please enter a valid phone number.";
                }
            }

            // Check product selection if a product field exists
            if (!errorMessage && productField && !product) {
                errorMessage =
                    "Please select a product or service.";
            }

            // Display validation result
            if (errorMessage) {

                event.preventDefault();

                if (formStatus) {
                    formStatus.textContent = errorMessage;
                    formStatus.style.color = "#c62828";
                } else {
                    alert(errorMessage);
                }

                return;
            }

            if (formStatus) {
                formStatus.textContent =
                    "Your details look correct. Preparing your enquiry...";
                formStatus.style.color = "#237a3b";
            }

           

        });

    }



    // ICE BAG PRICE ESTIMATOR //

    const productSelect = document.getElementById("product");
    const quantityInput = document.getElementById("quantity");
    const priceEstimate = document.getElementById("priceEstimate");

    function calculatePrice() {

        if (!productSelect || !quantityInput || !priceEstimate) {
            return;
        }

        const selectedProduct = productSelect.value.toLowerCase();
        const quantity = Number(quantityInput.value);

        let pricePerBag = 0;

        // Price per bag based on the existing
        // Frozen Trust pricing information.

        if (selectedProduct.includes("2kg")) {
            pricePerBag = 10;
        } else if (selectedProduct.includes("3kg")) {
            pricePerBag = 15;
        }

        if (
            !Number.isFinite(quantity) ||
            quantity <= 0 ||
            !Number.isInteger(quantity)
        ) {
            priceEstimate.textContent =
                "Enter a whole number of bags to estimate the price.";
            return;
        }

        if (pricePerBag === 0) {
            priceEstimate.textContent =
                "Select 2 kg or 3 kg ice to calculate an estimate.";
            return;
        }

        const totalPrice = pricePerBag * quantity;

        priceEstimate.textContent =
            "Estimated total: R" + totalPrice.toFixed(2);

    }

    if (productSelect) {
        productSelect.addEventListener("change", calculatePrice);
    }

    if (quantityInput) {
        quantityInput.addEventListener("input", calculatePrice);
    }



    //  IMAGE ENLARGEMENT //

    const images = document.querySelectorAll(
        ".product-image, .card img, .gallery img"
    );

    images.forEach(function (image) {

        image.style.cursor = "zoom-in";

        image.addEventListener("click", function () {

            // Create the image overlay
            const overlay = document.createElement("div");

            overlay.style.position = "fixed";
            overlay.style.inset = "0";
            overlay.style.background = "rgba(0, 0, 0, 0.85)";
            overlay.style.display = "flex";
            overlay.style.justifyContent = "center";
            overlay.style.alignItems = "center";
            overlay.style.padding = "20px";
            overlay.style.zIndex = "9999";
            overlay.style.cursor = "zoom-out";

            // Create enlarged image
            const enlargedImage = document.createElement("img");

            enlargedImage.src = image.src;
            enlargedImage.alt = image.alt || "Enlarged Frozen Trust image";

            enlargedImage.style.maxWidth = "95%";
            enlargedImage.style.maxHeight = "90vh";
            enlargedImage.style.objectFit = "contain";
            enlargedImage.style.borderRadius = "10px";

            // Add image to overlay
            overlay.appendChild(enlargedImage);
            document.body.appendChild(overlay);

            // Close when the overlay is clicked
            overlay.addEventListener("click", function () {
                overlay.remove();
            });

            // Close when Escape is pressed
            function closeOnEscape(event) {

                if (event.key === "Escape") {
                    overlay.remove();
                    document.removeEventListener(
                        "keydown",
                        closeOnEscape
                    );
                }

            }

            document.addEventListener("keydown", closeOnEscape);

        });

    });


    //  CONTACT FORM VALIDATION //

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            const nameField = contactForm.querySelector(
                '[name="name"]'
            );

            const emailField = contactForm.querySelector(
                '[name="email"]'
            );

            const messageField = contactForm.querySelector(
                '[name="message"]'
            );

            const status = document.getElementById("contactStatus");

            const name = nameField ? nameField.value.trim() : "";
            const email = emailField ? emailField.value.trim() : "";
            const message = messageField
                ? messageField.value.trim()
                : "";

            let errorMessage = "";

            if (!name || !email || !message) {
                errorMessage =
                    "Please complete your name, email and message.";
            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!errorMessage && !emailPattern.test(email)) {
                errorMessage =
                    "Please enter a valid email address.";
            }

            if (errorMessage) {

                event.preventDefault();

                if (status) {
                    status.textContent = errorMessage;
                    status.style.color = "#c62828";
                } else {
                    alert(errorMessage);
                }

                return;
            }

            if (status) {
                status.textContent =
                    "Your details look correct. Preparing your message...";
                status.style.color = "#237a3b";
            }

        });

    }


    
    // ACCESSIBLE IMAGE AND FORM SUPPORT //

    document.querySelectorAll("img").forEach(function (image) {

        // Report missing images in the browser console
        image.addEventListener("error", function () {
            console.error(
                "Image failed to load: " + image.src
            );
        });

    });

});
