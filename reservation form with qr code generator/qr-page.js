document.addEventListener("DOMContentLoaded", function () {
    const qrCodeContainer = document.getElementById('qr-code');
    const loadingSpinner = document.querySelector('.loading');

    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const address = params.get('address');
    const email = params.get('email');
    const phone = params.get('phone');
    const schedule = params.get('schedule');

    if (!name || !address || !email || !phone || !schedule) {
        qrCodeContainer.innerHTML = '<p>Error: Missing information.</p>';
        loadingSpinner.style.display = 'none'; // Hide spinner if there's an error
        return;
    }

    // Simulate loading before showing the QR code
    setTimeout(() => {
        // Hide spinner and display QR code
        loadingSpinner.style.display = 'none';
        qrCodeContainer.style.display = 'block';

        // Generate QR code
        const qrData = `Name: ${name}, Address: ${address}, Email: ${email}, Phone: ${phone}, Schedule: ${schedule}`;
        new QRCode(qrCodeContainer, {
            text: qrData,
            width: 150,
            height: 150,
        });
    }, 2000); // Simulate 2 seconds of loading
});
