document.getElementById("reportForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Collecting form data
    const fields = {
        dateOfReport: document.getElementById("dateOfReport").value,
        applicantName: document.getElementById("applicantName").value,
        contactPerson: document.getElementById("contactPerson").value,
        propertyOwner: document.getElementById("propertyOwner").value,
        documentProvided: document.getElementById("documentProvided").options[document.getElementById("documentProvided").selectedIndex].text, // Get the selected text directly
        propertyAddress: document.getElementById("propertyAddress").value,
        remarks: document.getElementById("remarks").value,
        studiedRoad: document.getElementById("studiedRoad").value,
        premisesNo: document.getElementById("premisesNo").value,
        plotNo: document.getElementById("plotNo").value,
        khatianNo: document.getElementById("khatianNo").value,
        jlNo: document.getElementById("jlNo").value,
        mouzaNo: document.getElementById("mouzaNo").value,
        villageWordNo: document.getElementById("villageWordNo").value,
        postOffice: document.getElementById("postOffice").value,
        policeStation: document.getElementById("policeStation").value,
        district: document.getElementById("district").value,
        pinNo: document.getElementById("pinNo").value,
        state: document.getElementById("state").value,
        addressMatching: document.getElementById("addressMatching").value,
        holdingType: document.getElementById("holdingType").value,
        marketability: document.getElementById("marketability").value,
        propertyType: document.getElementById("propertyType").value,
        occupancyStatus: document.getElementById("occupancyStatus").value,
        localityName: document.getElementById("localityName").value,
        nearbyLandmark: document.getElementById("nearbyLandmark").value,
        eastBoundary: document.getElementById("eastBoundary").value,
        westBoundary: document.getElementById("westBoundary").value,
        northBoundary: document.getElementById("northBoundary").value,
        southBoundary: document.getElementById("southBoundary").value,
        latLong: document.getElementById("latLong").value,
        finalRemarks: document.getElementById("finalRemarks").value
    };

    // Initial Y position for text
    let yPosition = 10; 

    // Add data to the PDF
    for (const [key, value] of Object.entries(fields)) {
        doc.text(`${formatLabel(key)}: ${value}`, 10, yPosition);
        yPosition += 10; // Increment Y position for the next line

        // Check if we need to create a new page
        if (yPosition > 270) { // Prevent overflow
            doc.addPage();
            yPosition = 10; // Reset Y position for the new page
        }
    }

    // Handle image upload
    const imageInput = document.getElementById("imageUpload");
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgData = e.target.result;
            doc.addImage(imgData, 'JPEG', 10, yPosition, 100, 100); // Adjust dimensions as needed
            yPosition += 110; // Increment Y position for the next line after image

            // Save the PDF after adding the image
            doc.save("Property_Report.pdf");
        };
        reader.readAsDataURL(file);
    } else {
        // If no image is uploaded, save the PDF without the image
        doc.save("Property_Report.pdf");
    }
});

// Function to format label text
function formatLabel(label) {
    return label
        .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter
        .replace(/_/g, ' '); // Replace underscores with spaces
}
