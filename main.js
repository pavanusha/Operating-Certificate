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

    // Set Default Today's Date
    const today = new Date().toISOString().split('T')[0];
    inputDate.value = today;

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
    selectOfficer.value = 4;
    updatePreview();

    // ==========================================
    // MATHEMATICALLY PERFECT BORDER GENERATOR
    // ==========================================
    // Arc spacing is calculated so an exact integer number of arcs fit the ribbon,
    // with arcs landing at BOTH ends (= all 4 certificate corners). This guarantees:
    //   • All 4 corners look identical (connected, symmetric)
    //   • Top/Bottom are vertical mirror images
    //   • Left/Right are horizontal mirror images
    const generateBorderFrame = () => {
        const host = document.getElementById('border-frame-host');
        if (!host) return;

        const W = host.offsetWidth;
        const H = host.offsetHeight;
        const T = 32; // ribbon thickness in pixels

        // Snap arc count so spacing fits evenly → arc at 0 AND at W (or H)
        const hCount = Math.round(W / 48);
        const hSpacing = W / hCount;

        const vCount = Math.round(H / 48);
        const vSpacing = H / vCount;

        // Arc node x-positions (horizontal ribbons: top & bottom)
        const xs = Array.from({ length: hCount + 1 }, (_, i) => +(i * hSpacing).toFixed(3));
        // Arc node y-positions (vertical ribbons: left & right)
        const ys = Array.from({ length: vCount + 1 }, (_, i) => +(i * vSpacing).toFixed(3));

        const blueR  = [44, 36, 28, 20, 12];
        const blueC  = ['#1a3a6b','#1e4a85','#2459a0','#2b69bb','#3378d4'];
        const goldR  = [10, 6];
        const goldC  = ['#b8880a','#d4a020'];

        const arc = (cx, cy) => {
            let s = '';
            blueR.forEach((r,i) => { s += `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r}" fill="none" stroke="${blueC[i]}" stroke-width="0.85"/>`; });
            goldR.forEach((r,i) => { s += `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r}" fill="none" stroke="${goldC[i]}" stroke-width="0.5" opacity="0.75"/>`; });
            return s;
        };

        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="100%" style="position:absolute;top:0;left:0;pointer-events:none;overflow:visible">
<defs>
  <clipPath id="cf-top">  <rect x="0"      y="0"      width="${W}"   height="${T}"/></clipPath>
  <clipPath id="cf-bot">  <rect x="0"      y="${H-T}" width="${W}"   height="${T}"/></clipPath>
  <clipPath id="cf-left"> <rect x="0"      y="0"      width="${T}"   height="${H}"/></clipPath>
  <clipPath id="cf-right"><rect x="${W-T}" y="0"      width="${T}"   height="${H}"/></clipPath>
</defs>
<!-- TOP: arcs on top edge (y=0). Visible down into ribbon. -->
<g clip-path="url(#cf-top)" opacity="0.95">${xs.map(x=>arc(x,0)).join('')}</g>
<!-- BOTTOM: mirror of top — arcs on bottom edge (y=H). Visible up into ribbon. -->
<g clip-path="url(#cf-bot)" opacity="0.95">${xs.map(x=>arc(x,H)).join('')}</g>
<!-- LEFT: arcs on left edge (x=0). Visible rightward into ribbon. -->
<g clip-path="url(#cf-left)" opacity="0.95">${ys.map(y=>arc(0,y)).join('')}</g>
<!-- RIGHT: mirror of left — arcs on right edge (x=W). Visible leftward into ribbon. -->
<g clip-path="url(#cf-right)" opacity="0.95">${ys.map(y=>arc(W,y)).join('')}</g>
</svg>`;

        host.innerHTML = svg;
    };

    generateBorderFrame();

    // ==========================================
    const exportNode = document.getElementById('certificate-node');

    // scale: 3.125 is exactly 300 DPI for standard web 96 DPI baseline
    const captureConfig = {
        scale: 3.125,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
            // --- SURGICAL ROSETTE RENDERER (Chrome/Edge Export Fix) ---
            // This force-renders the complex SVG rosettes into static images 
            // ONLY during the capture phase to ensure they are populated in the file.

            const drawRosetteToDataURL = (pathStr, color, rotations) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 600; canvas.height = 600; // High-res buffer
                ctx.translate(300, 300);
                ctx.scale(2.5, 2.5);
                ctx.strokeStyle = color;
                ctx.lineWidth = 0.5;
                ctx.globalAlpha = 0.45; // Match the new darker CSS opacity
                for (let r = 0; r < 360; r += rotations) {
                    ctx.save();
                    ctx.rotate((r * Math.PI) / 180);
                    ctx.stroke(new Path2D(pathStr));
                    ctx.restore();
                }
                return canvas.toDataURL('image/png');
            };

            const leftRosette = clonedDoc.querySelector('.rosette-left');
            if (leftRosette) {
                leftRosette.style.backgroundImage = `url(${drawRosetteToDataURL('M0 0 Q 10 -40 0 -80 T 0 0', '#4a69bd', 10)})`;
                leftRosette.style.opacity = '1'; // Already baked with alpha
                leftRosette.style.backgroundSize = 'contain';
            }

            const rightRosette = clonedDoc.querySelector('.rosette-right');
            if (rightRosette) {
                rightRosette.style.backgroundImage = `url(${drawRosetteToDataURL('M0 0 Q 50 -50 0 -100 T 0 0', '#b38728', 15)})`;
                rightRosette.style.opacity = '1'; // Already baked with alpha
                rightRosette.style.backgroundSize = 'contain';
            }

            // --- BORDER REFLOW (Chrome Seam Fix) ---
            const meshElements = clonedDoc.querySelectorAll('.mesh');
            meshElements.forEach(el => {
                el.style.display = 'block';
                el.getBoundingClientRect(); // Force Chromium render engine refresh
            });
        }
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
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            // Standard A4: 297 x 210mm
            pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
            pdf.save(`Certificate_${inputName.value.replace(/ /g, '_')}_300DPI_A4.pdf`);

            exportNode.style.transform = originalTransform;
        });
    });
});
