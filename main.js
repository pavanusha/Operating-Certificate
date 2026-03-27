document.addEventListener('DOMContentLoaded', () => {

    // Configurations for the Officer Dropdown
    const officers = [
        { name: "Sri. Tanmay Mukhopadhyay", title: "Sr.DOM/WAT" },
        { name: "Sri. A Avinash", title: "Sr.DOM (Movt)/WAT" },
        { name: "Sri. Sumit Verma", title: "DOM (G)/WAT" },
        { name: "Sri. P Hemanth Kumar", title: "DOM (Planning)/WAT" },
        { name: "Sri Ankit Shankar Mishra", title: "DOM (Chg)/WAT" },
        { name: "Sri Pranav Jetley", title: "ARM / VSP" },
        { name: "Sri. A M Ubhale", title: "Station Director / VSKP" },
        { name: "Sri Narendra Kumar Bhitria", title: "ARM/ WMY" },
        { name: "Sri. Harendra Prasad", title: "ARM / KRDL" }
    ];

    // DOM Elements
    const inputName = document.getElementById('staffName');
    const inputDesignation = document.getElementById('staffDesignation');
    const inputTrain = document.getElementById('trainNo');
    const inputDate = document.getElementById('certDate');
    const selectOfficer = document.getElementById('officerName');

    const displayName = document.getElementById('display-name');
    const displayDesignation = document.getElementById('display-designation');
    const displayTrain = document.getElementById('display-train');
    const displayDate = document.getElementById('display-date');
    const displayOfficerName = document.getElementById('display-officer');
    const displayOfficerTitle = document.getElementById('display-officer-title');

    // Populate Dropdown
    officers.forEach((officer, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${officer.name} - ${officer.title}`;
        selectOfficer.appendChild(option);
    });

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const suffix = ["th", "st", "nd", "rd"][((day % 100) - 20) % 10] || ["th", "st", "nd", "rd"][day % 100] || "th";
        const monthYear = dateObj.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
        return `${day}${suffix} ${monthYear}`;
    };

    const updatePreview = () => {
        displayName.textContent = inputName.value || ' ';
        displayDesignation.textContent = inputDesignation.value || ' ';
        displayTrain.textContent = inputTrain.value || ' ';
        displayDate.textContent = formatDate(inputDate.value) || ' ';

        const selectedOfficer = officers[selectOfficer.value];
        if (selectedOfficer) {
            displayOfficerName.textContent = selectedOfficer.name;
            displayOfficerTitle.textContent = selectedOfficer.title;
        }
    };

    inputName.addEventListener('input', updatePreview);
    inputDesignation.addEventListener('input', updatePreview);
    inputTrain.addEventListener('input', updatePreview);
    inputDate.addEventListener('input', updatePreview);
    selectOfficer.addEventListener('change', updatePreview);

    updatePreview();


    // ==========================================
    // GUILLOCHE & SPIROGRAPH GENERATION (Authentic Security Patterns)
    // ==========================================
    function drawGuillocheBackground() {
        let paths = "";

        // Colors typical in CMYK security printing (cyan, magenta, yellow, light green blends)
        const colors = ['#00a8e8', '#e8006b', '#bf953f', '#2db84b'];

        // Creates a horizontal wave that spans width, offset vertically
        for (let i = 0; i < 40; i++) {
            let d = `M 0,${i * 20} `;
            for (let x = 0; x <= 1200; x += 10) {
                // complex sine math for guilloche (amplitude modulation)
                let y = (i * 20) + Math.sin(x / 50) * 30 * Math.cos(x / 200 + i) + Math.sin(x / 10 + i) * 5;
                d += `L ${x},${y} `;
            }
            let color = colors[i % colors.length];
            paths += `<path d="${d}" fill="none" stroke="${color}" stroke-width="0.8" opacity="0.6"/>`;
        }

        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="1123" height="794" viewBox="0 0 1123 794">${paths}</svg>`;
        const encodedData = window.btoa(unescape(encodeURIComponent(svgString)));
        document.getElementById('guilloche-img').src = `data:image/svg+xml;base64,${encodedData}`;
    }

    drawGuillocheBackground();


    // ==========================================
    // HIGH RES EXPORT LOGIC (300 DPI A4 Landscape)
    // ==========================================
    const exportNode = document.getElementById('certificate-node');

    // scale: 3.125 is exactly 300 DPI for standard web 96 DPI baseline
    const captureConfig = {
        scale: 4, // Using 4 (384 DPI) to ensure it's "at least" 300 DPI for pro printing
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
    };

    document.getElementById('btnJpeg').addEventListener('click', () => {
        const originalTransform = exportNode.style.transform;
        exportNode.style.transform = 'none';

        html2canvas(exportNode, captureConfig).then(canvas => {
            const link = document.createElement('a');
            link.download = `Certificate_${inputName.value.replace(/ /g, '_')}_300DPI.jpeg`;
            link.href = canvas.toDataURL('image/jpeg', 1.0);
            link.click();
            exportNode.style.transform = originalTransform;
        });
    });

    document.getElementById('btnPdf').addEventListener('click', () => {
        const originalTransform = exportNode.style.transform;
        exportNode.style.transform = 'none';

        html2canvas(exportNode, captureConfig).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new window.jspdf.jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4',
                compress: true // Enables compression for better print handling
            });

            // Standard A4: 297 x 210mm
            pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210, undefined, 'SLOW');
            pdf.save(`Certificate_${inputName.value.replace(/ /g, '_')}_300DPI_A4.pdf`);

            exportNode.style.transform = originalTransform;
        });
    });
});
