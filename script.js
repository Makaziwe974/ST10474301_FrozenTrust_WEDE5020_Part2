 

/* ===================================== 

   FROZEN TRUST WEBSITE 

   Main JavaScript File 

   ===================================== */ 

 

 

/* 1. RUN CODE AFTER THE PAGE LOADS */ 

 

Document.addEventListener(“DOMContentLoaded”, function () { 

 

    /* 2. MOBILE NAVIGATION MENU */ 

 

    Const menuToggle = document.getElementById(“menuToggle”); 

    Const mainNavigation = document.getElementById(“mainNavigation”); 

 

    If (menuToggle && mainNavigation) { 

 

        menuToggle.addEventListener(“click”, function () { 

 

            const isOpen = mainNavigation.classList.toggle(“show”); 

 

            menuToggle.setAttribute(“aria-expanded”, isOpen); 

 

        }); 

 

    } 

 

 

    /* 3. AUTOMATICALLY DISPLAY THE CURRENT YEAR */ 

 

    Const yearElements = document.querySelectorAll(“.current-year”); 

 

    yearElements.forEach(function (element) { 

 

        element.textContent = new Date().getFullYear(); 

 

    }); 

 

 

    /* 4. READ PRODUCT OR SERVICE FROM THE URL */ 

 

    Const urlParameters = new URLSearchParams(window.location.search); 

 

    Const selectedProduct = urlParameters.get(“product”); 

    Const selectedService = urlParameters.get(“service”); 

 

    Const enquiryType = document.getElementById(“enquiryType”); 

 

    If (enquiryType) { 

 

        If (selectedProduct === “2kg”) { 

            enquiryType.value = “2kg”; 

        } 

 

        If (selectedProduct === “3kg”) { 

            enquiryType.value = “3kg”; 

        } 

 

        If (selectedService === “freezer”) { 

            enquiryType.value = “freezer”; 

        } 

 

        If (selectedService === “delivery”) { 

            enquiryType.value = “delivery”; 

        } 

 

    } 

 

 

    /* 5. HANDLE THE ENQUIRY FORM */ 

 

    Const enquiryForm = document.getElementById(“enquiryForm”); 

 

    If (enquiryForm) { 

 

        enquiryForm.addEventListener(“submit”, function (event) { 

 

            event.preventDefault(); 

 

            const customerName = 

                document.getElementById(“customerName”).value.trim(); 

 

            const customerEmail = 

                document.getElementById(“customerEmail”).value.trim(); 

 

            const customerPhone = 

                document.getElementById(“customerPhone”).value.trim(); 

 

            const selectedEnquiry = 

                document.getElementById(“enquiryType”).value; 

 

            const quantity = 

                document.getElementById(“quantity”).value; 

 

            const customerMessage = 

                document.getElementById(“customerMessage”).value.trim(); 

 

            const formMessage = 

                document.getElementById(“formMessage”); 

 

 

            /* 6. CHECK REQUIRED INFORMATION */ 

 

            If ( 

                !customerName || 

                !customerEmail || 

                !selectedEnquiry || 

                !customerMessage 

            ) { 

 

                formMessage.textContent = 

                    “Please complete all required fields.”; 

 

                Return; 

 

            } 

 

 

            /* 7. VALIDATE THE EMAIL ADDRESS */ 

 

            Const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

 

            If (!emailPattern.test(customerEmail)) { 

 

                formMessage.textContent = 

                    “Please enter a valid email address.”; 

 

                Return; 

 

            } 

 

 

            /* 8. PREPARE THE WHATSAPP MESSAGE */ 

 

            Const enquiryLabels = { 

                “2kg”: “2 kg Ice Bags”, 

                “3kg”: “3 kg Ice Bags”, 

                “freezer”: “Freezer Hire”, 

                “delivery”: “Delivery”, 

                “other”: “Other Enquiry” 

            }; 

 

            Const enquiryLabel = 

                enquiryLabels[selectedEnquiry] || selectedEnquiry; 

 

            const message = [ 

                “Hello Frozen Trust!”, 

                “”, 

                “I would like to make an enquiry.”, 

                “”, 

                “Name: “ + customerName, 

                “Email: “ + customerEmail, 

                “Phone: “ + (customerPhone || “Not provided”), 

                “Enquiry Type: “ + enquiryLabel, 

                “Quantity: “ + (quantity || “Not specified”), 

                “”, 

                “Message: “ + customerMessage 

            ].join(“\n”); 

 

 

            /* 9. OPEN WHATSAPP */ 

 

            Const whatsappNumber = “27815552338”; 

 

            Const whatsappURL = 

                https://wa.me/ + 

                whatsappNumber + 

                “?text=” + 

                encodeURIComponent(message); 

 

            formMessage.textContent = 

                “Your enquiry is ready. WhatsApp will open so you can review and send it.”; 

 

            Window.open(whatsappURL,“_blank”, “noopener,noreferrer”); 

 

        }); 

 

    } 

 

}); 
