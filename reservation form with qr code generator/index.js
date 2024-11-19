document.addEventListener("DOMContentLoaded", function () {
    const paxPerDay = {
        "2025-02-01": 100,
        "2025-02-02": 80,
        "2025-02-03": 50,
        "2025-02-04": 70,
        "2025-02-05": 90,
    }; // Example PAX data for specific dates

    const paxCountElement = document.getElementById("pax-count");
    const guestList = document.getElementById("guest-list");
    const payNowButton = document.querySelector(".pay-now");

    // Function to fetch remaining PAX for a date
    function getRemainingPax(date) {
        return paxPerDay[date] || 100; // Default PAX is 100 if not explicitly set
    }

    // Initialize Flatpickr
    flatpickr("#preferred-schedule", {
        dateFormat: "Y-m-d",
        onChange: function (selectedDates, dateStr) {
            const paxRemaining = getRemainingPax(dateStr);
            paxCountElement.textContent = paxRemaining;
        },
        onDayCreate: function (dObj, dStr, fp, dayElement) {
            const date = dayElement.dateObj.toISOString().split("T")[0];
            const paxRemaining = getRemainingPax(date);

            // Ensure no duplicate PAX labels
            if (!dayElement.querySelector(".pax-label")) {
                const paxLabel = document.createElement("div");
                paxLabel.className = "pax-label";
                paxLabel.textContent = paxRemaining;
                dayElement.appendChild(paxLabel);
            }
        },
    });

// Function to validate the form
function isFormValid() {
    const schedule = document.getElementById("preferred-schedule").value.trim();
    const timeSlot = document.getElementById("time-slot").value.trim();
    const guestNames = document.querySelectorAll(".guest-fields .guest-name");
    const guestAges = document.querySelectorAll(".guest-fields .guest-number");

    // Calculate number of PAX based on the number of guest fields
    const numberOfPax = guestNames.length;

    if (!schedule || !timeSlot || numberOfPax <= 0) {
        return false; // Missing schedule, time slot, or no guests added
    }

    // Check if all guest fields are filled
    for (let i = 0; i < guestNames.length; i++) {
        if (!guestNames[i].value.trim() || !guestAges[i].value.trim()) {
            return false; // A guest field is incomplete
        }
    }

    return true; // All fields are valid
}

 // Handle Pay Now Button Click
 payNowButton.addEventListener("click", function () {
    if (isFormValid()) {
        const schedule = document.getElementById("preferred-schedule").value.trim();
        const timeSlot = document.getElementById("time-slot").value.trim();
        const guests = Array.from(document.querySelectorAll(".guest-fields")).map(guestField => ({
            name: guestField.querySelector(".guest-name").value.trim(),
            age: guestField.querySelector(".guest-number").value.trim(),
        }));

        const userData = encodeURIComponent(JSON.stringify({ schedule, timeSlot, guests }));
        window.location.href = `qr-page.html?data=${userData}`;
    } else {
        alert("Please fill out the form");
    }
});

    // Function to create new guest fields
    function createGuestFields() {
        const guestFields = document.createElement("div");
        guestFields.className = "guest-fields";

        guestFields.innerHTML = `
            <input type="text" class="guest-name input" placeholder="Name">
            <input type="text" class="guest-number input" placeholder="Age">
            <button type="button" class="remove-guest">-</button>
        `;

        // Attach event listener to the "-" button for removing guest fields
        const removeButton = guestFields.querySelector(".remove-guest");
        removeButton.addEventListener("click", () => {
            guestFields.remove();
        });

        return guestFields;
    }

    // Add event listener to the "+" button to add new guest fields
    guestList.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-guest")) {
            if (guestList.children.length < 100) { // Enforce a limit of 100 guests
                guestList.appendChild(createGuestFields());
            } else {
                alert("Maximum 100 guests allowed.");
            }
        }
    });
});

