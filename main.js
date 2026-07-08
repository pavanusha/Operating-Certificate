document.addEventListener('DOMContentLoaded', () => {

    // ─── Officer Data ─────────────────────────────────────────────────────────
    const officers = [

        { id: 1, name: "M Sravan Kumar", title: "Sr.DOM (I/C)" },
        { id: 2, name: "Sri. A. Avinash Sarma", title: "Sr.DOM (M)" },
        { id: 3, name: "Sri. V. Ravi Teja", title: "DOM(M)" },
        { id: 4, name: "Sri. P. Hemanth Kumar", title: "DOM(P)" },
        { id: 5, name: "Sri. Y. V. Ramana", title: "AOM (Chg./G)" },
        { id: 6, name: "Sri. M. Sai Kumar", title: "AOM (Control)" },
        { id: 7, name: "Sri. Harendra Prasad", title: "AOM(WAT)/WMY" },
        { id: 8, name: "Sri. Pranav Jetley", title: "AARM/VSPS" },
        { id: 9, name: "Sri. A. M. Ubhale", title: "SD/VSKP" },
        { id: 10, name: "Sri. P. Siva Naresh", title: "Principal/MDTC" },
        { id: 11, name: "Sri. V. Trinadh", title: "ADSO/VSKP" },

    ];

    // ─── DOM References ───────────────────────────────────────────────────────
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

    // ─── Set Default Date ────────────────────────────────────────────────────
    inputDate.value = new Date().toISOString().split('T')[0];

    // ─── Populate Officer Dropdown ────────────────────────────────────────────
    officers.forEach((officer, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${officer.name} - ${officer.title}`;
        selectOfficer.appendChild(option);
    });
    selectOfficer.value = 0;

    // ─── Date Formatter ───────────────────────────────────────────────────────
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const suffix = ['th', 'st', 'nd', 'rd'][((day % 100) - 20) % 10] ||
            ['th', 'st', 'nd', 'rd'][day % 100] || 'th';
        const monthYear = dateObj.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
        return `${day}${suffix} ${monthYear}`;
    };

    // ─── Live Preview Update ──────────────────────────────────────────────────
    const updatePreview = () => {
        displayName.textContent = inputName.value || ' ';
        displayDesignation.textContent = inputDesignation.value || ' ';
        displayTrain.textContent = inputTrain.value || ' ';
        displayDate.textContent = formatDate(inputDate.value) || ' ';
        const o = officers[selectOfficer.value];
        if (o) { displayOfficerName.textContent = o.name; displayOfficerTitle.textContent = o.title; }
    };

    inputName.addEventListener('input', updatePreview);
    inputDesignation.addEventListener('input', updatePreview);
    inputTrain.addEventListener('input', updatePreview);
    inputDate.addEventListener('input', updatePreview);
    selectOfficer.addEventListener('change', updatePreview);
    updatePreview();

    // ─── Border Frame Generator ───────────────────────────────────────────────
    const generateBorderFrame = () => {
        const host = document.getElementById('border-frame-host');
        if (!host) return;
        const W = host.offsetWidth;
        const H = host.offsetHeight;
        const T = 32;

        const hCount = Math.round(W / 48);
        const hSpacing = W / hCount;
        const vCount = Math.round(H / 48);
        const vSpacing = H / vCount;

        const xs = Array.from({ length: hCount + 1 }, (_, i) => +(i * hSpacing).toFixed(3));
        const ys = Array.from({ length: vCount + 1 }, (_, i) => +(i * vSpacing).toFixed(3));

        const blueR = [44, 36, 28, 20, 12];
        const blueC = ['#1a3a6b', '#1e4a85', '#2459a0', '#2b69bb', '#3378d4'];
        const goldR = [10, 6];
        const goldC = ['#b8880a', '#d4a020'];

        const arc = (cx, cy) => {
            let s = '';
            blueR.forEach((r, i) => { s += `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r}" fill="none" stroke="${blueC[i]}" stroke-width="0.85"/>`; });
            goldR.forEach((r, i) => { s += `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r}" fill="none" stroke="${goldC[i]}" stroke-width="0.5" opacity="0.75"/>`; });
            return s;
        };

        host.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="position:absolute;top:0;left:0;pointer-events:none;overflow:visible">
<defs>
  <clipPath id="cf-top">  <rect x="0"      y="0"      width="${W}"   height="${T}"/></clipPath>
  <clipPath id="cf-bot">  <rect x="0"      y="${H - T}" width="${W}"   height="${T}"/></clipPath>
  <clipPath id="cf-left"> <rect x="0"      y="0"      width="${T}"   height="${H}"/></clipPath>
  <clipPath id="cf-right"><rect x="${W - T}" y="0"      width="${T}"   height="${H}"/></clipPath>
</defs>
<g clip-path="url(#cf-top)"   opacity="0.95">${xs.map(x => arc(x, 0)).join('')}</g>
<g clip-path="url(#cf-bot)"   opacity="0.95">${xs.map(x => arc(x, H)).join('')}</g>
<g clip-path="url(#cf-left)"  opacity="0.95">${ys.map(y => arc(0, y)).join('')}</g>
<g clip-path="url(#cf-right)" opacity="0.95">${ys.map(y => arc(W, y)).join('')}</g>
</svg>`;
    };
    generateBorderFrame();

    // ─── iOS / Safari Detection ───────────────────────────────────────────────
    // Safari on iOS/iPadOS blocks: data: URL navigation, async window.open(),
    // and canvas.toDataURL() on externally-sourced images (SecurityError).
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    const useNewTab = isIOS || isSafari;  // also catches Safari on Mac

    // ─── Base64 Preload from assets.js ───────────────────────────────────────
    // assets.js (generated by Node script) exports `const ASSETS = { "filename.png": "data:..." }`
    // We swap every <img> src to the embedded data URL so html2canvas never sees
    // an external URL — completely eliminating the Safari "SecurityError: The operation is insecure".
    if (typeof ASSETS !== 'undefined') {
        document.querySelectorAll('img').forEach(img => {
            const filename = decodeURIComponent(img.src.split('/').pop().split('?')[0]);
            if (ASSETS[filename]) img.src = ASSETS[filename];
        });
    }

    // ─── Overlay + Toast UI ───────────────────────────────────────────────────
    const overlay = document.getElementById('download-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlaySubtitle = document.getElementById('overlay-subtitle');
    const iosHint = document.getElementById('ios-hint');
    const toast = document.getElementById('download-toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastMsg = document.getElementById('toast-msg');

    let toastTimer = null;

    function showOverlay(title, subtitle, showHint = false) {
        overlayTitle.textContent = title;
        overlaySubtitle.textContent = subtitle;
        if (iosHint) iosHint.style.display = showHint ? 'block' : 'none';
        overlay.classList.add('active');
    }

    function hideOverlay() {
        overlay.classList.remove('active');
    }

    function showToast(msg, icon = '✅', duration = 4000) {
        toastMsg.textContent = msg;
        toastIcon.textContent = icon;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
    }

    // ─── Rosette Renderer (canvas-only, no external src → no taint) ──────────
    const drawRosetteToDataURL = (pathStr, color, rotations) => {
        const c = document.createElement('canvas');
        const ctx = c.getContext('2d');
        c.width = 600; c.height = 600;
        ctx.translate(300, 300);
        ctx.scale(2.5, 2.5);
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.45;
        for (let r = 0; r < 360; r += rotations) {
            ctx.save();
            ctx.rotate((r * Math.PI) / 180);
            ctx.stroke(new Path2D(pathStr));
            ctx.restore();
        }
        return c.toDataURL('image/png');
    };

    // ─── html2canvas Config ───────────────────────────────────────────────────
    const exportNode = document.getElementById('certificate-node');

    // iOS Safari canvas limit ~16MB (≈4096×4096). Scale 3.125 = 300DPI.
    // On iOS we use 2.0 to be safe; fallback to 1.25 on error.
    const SCALE_HIGH = useNewTab ? 2.0 : 3.125;
    const SCALE_LOW = useNewTab ? 1.25 : 2.0;

    function buildConfig(scale) {
        return {
            scale,
            useCORS: true,
            allowTaint: false,  // false keeps canvas clean for toDataURL()
            backgroundColor: '#ffffff',
            logging: false,
            imageTimeout: 0,    // images are already data URLs — instant
            onclone: (clonedDoc) => {
                // Remove wavy SVG background (Safari treats it as tainted)
                const bg = clonedDoc.querySelector('.full-page-guilloche');
                if (bg) bg.style.backgroundImage = 'none';

                // Rasterise CSS rosettes into canvas images
                try {
                    const dataURL = drawRosetteToDataURL('M0 0 Q 50 -50 0 -100 T 0 0', '#b38728', 15);
                    const lr = clonedDoc.querySelector('.rosette-left');
                    if (lr) {
                        lr.style.backgroundImage = `url(${dataURL})`;
                        lr.style.opacity = '1';
                        lr.style.backgroundSize = 'contain';
                        lr.style.transform = 'translateY(-50%) scaleX(-1)';
                    }
                    const rr = clonedDoc.querySelector('.rosette-right');
                    if (rr) {
                        rr.style.backgroundImage = `url(${dataURL})`;
                        rr.style.opacity = '1';
                        rr.style.backgroundSize = 'contain';
                    }
                } catch (e) { console.warn('Rosette render skipped:', e); }
            }
        };
    }

    // ─── Capture Helper (with fallback) ──────────────────────────────────────
    async function captureCanvas() {
        const origTransform = exportNode.style.transform;
        exportNode.style.transform = 'none';

        const restore = () => { exportNode.style.transform = origTransform; };

        try {
            const canvas = await html2canvas(exportNode, buildConfig(SCALE_HIGH));
            restore();
            return canvas;
        } catch (err1) {
            console.warn(`html2canvas @ ${SCALE_HIGH} failed, retrying at ${SCALE_LOW}:`, err1);
            try {
                const canvas = await html2canvas(exportNode, buildConfig(SCALE_LOW));
                restore();
                return canvas;
            } catch (err2) {
                restore();
                throw err2;
            }
        }
    }

    // ─── Desktop Download Helper ──────────────────────────────────────────────
    function desktopDownload(dataURL, filename) {
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // ─── JPEG Button ──────────────────────────────────────────────────────────
    document.getElementById('btnJpeg').addEventListener('click', () => {
        const filename = `Certificate_${inputName.value.replace(/ /g, '_')}_300DPI.jpeg`;

        // ── Safari / iOS fix ──────────────────────────────────────────────────
        // window.open() is only allowed synchronously inside a user-gesture handler.
        // We open the tab IMMEDIATELY (before any async work) and populate it later.
        let iosTab = null;
        if (useNewTab) {
            iosTab = window.open('about:blank', '_blank');
            if (iosTab) {
                iosTab.document.write(`<!DOCTYPE html><html><head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                    <title>Generating Certificate…</title>
                    <style>
                        body { margin:0; background:#1a1a2e; display:flex; justify-content:center;
                               align-items:center; height:100vh; font-family:sans-serif; color:#e0c97f; }
                        .box { text-align:center; }
                        .spinner { width:48px; height:48px; border:4px solid rgba(224,201,127,.2);
                                   border-top-color:#e0c97f; border-radius:50%;
                                   animation:spin 0.8s linear infinite; margin:0 auto 16px; }
                        @keyframes spin { to { transform:rotate(360deg); } }
                        p { margin:8px 0; font-size:15px; opacity:.75; }
                    </style></head><body>
                    <div class="box">
                        <div class="spinner"></div>
                        <h2 style="margin:0 0 8px">Generating Certificate…</h2>
                        <p>Rendering at high resolution — please wait.</p>
                    </div></body></html>`);
                iosTab.document.close();
            }
        }

        showOverlay('Generating Certificate Image…', 'Rendering at high DPI — this takes a few seconds.', useNewTab);

        captureCanvas()
            .then(canvas => {
                const dataURL = canvas.toDataURL('image/jpeg', 1.0);
                hideOverlay();

                if (useNewTab && iosTab && !iosTab.closed) {
                    // Write the final image directly into the already-open tab
                    iosTab.document.open();
                    iosTab.document.write(`<!DOCTYPE html><html><head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width,initial-scale=1">
                        <title>Certificate Ready</title>
                        <style>
                            body { margin:0; background:#1a1a2e; font-family:sans-serif;
                                   padding:20px; box-sizing:border-box; }
                            .card { background:#fff; border-radius:12px; overflow:hidden;
                                    box-shadow:0 10px 40px rgba(0,0,0,.4); max-width:700px;
                                    margin:0 auto; padding:20px; text-align:center; }
                            h2 { color:#1a1a2e; margin:0 0 6px; }
                            p  { color:#555; margin:0 0 16px; font-size:15px; }
                            .tip { background:#fef3c7; border:1px solid #f59e0b; border-radius:8px;
                                   padding:12px 16px; margin-bottom:16px; color:#92400e;
                                   font-size:14px; text-align:left; }
                            img { max-width:100%; border-radius:8px; border:1px solid #e5e7eb; }
                        </style></head><body>
                        <div class="card">
                            <h2>✅ Certificate Ready!</h2>
                            <p>Your high-resolution certificate has been generated.</p>
                            <div class="tip">
                                📱 <strong>To save:</strong> Long-press the image below → tap
                                <strong>"Save to Photos"</strong> or <strong>"Share"</strong>.
                            </div>
                            <img src="${dataURL}" alt="Certificate">
                        </div></body></html>`);
                    iosTab.document.close();
                    showToast('Certificate opened in new tab!', '✅', 5000);
                } else {
                    desktopDownload(dataURL, filename);
                    showToast('Certificate downloaded as HD JPEG!', '✅', 4000);
                }
            })
            .catch(err => {
                hideOverlay();
                if (iosTab && !iosTab.closed) iosTab.close();
                console.error('JPEG export failed:', err);
                showToast(`Export failed: ${err.message || err}`, '❌', 7000);
            });
    });

    // ─── PDF Button ───────────────────────────────────────────────────────────
    document.getElementById('btnPdf').addEventListener('click', () => {
        const filename = `Certificate_${inputName.value.replace(/ /g, '_')}_300DPI_A4.pdf`;

        // Same synchronous-tab trick for iOS
        let iosTab = null;
        if (useNewTab) {
            iosTab = window.open('about:blank', '_blank');
            if (iosTab) {
                iosTab.document.write(`<!DOCTYPE html><html><head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                    <title>Generating PDF…</title>
                    <style>
                        body { margin:0; background:#1a1a2e; display:flex; justify-content:center;
                               align-items:center; height:100vh; font-family:sans-serif; color:#e0c97f; }
                        .box { text-align:center; }
                        .spinner { width:48px; height:48px; border:4px solid rgba(224,201,127,.2);
                                   border-top-color:#e0c97f; border-radius:50%;
                                   animation:spin 0.8s linear infinite; margin:0 auto 16px; }
                        @keyframes spin { to { transform:rotate(360deg); } }
                        p { margin:8px 0; font-size:15px; opacity:.75; }
                    </style></head><body>
                    <div class="box">
                        <div class="spinner"></div>
                        <h2 style="margin:0 0 8px">Building PDF…</h2>
                        <p>Compiling A4 landscape PDF — please wait.</p>
                    </div></body></html>`);
                iosTab.document.close();
            }
        }

        showOverlay('Generating Certificate PDF…', 'Building an A4 landscape PDF at high DPI.', false);

        captureCanvas()
            .then(canvas => {
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
                pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
                hideOverlay();

                if (useNewTab && iosTab && !iosTab.closed) {
                    const pdfBlob = pdf.output('blob');
                    const blobURL = URL.createObjectURL(pdfBlob);
                    // Navigate the already-open tab to the blob URL (Safari allows this)
                    iosTab.location.href = blobURL;
                    showToast('PDF opened — tap Share → Save to Files.', '📂', 7000);
                    setTimeout(() => URL.revokeObjectURL(blobURL), 90000);
                } else {
                    pdf.save(filename);
                    showToast('Certificate downloaded as HD PDF!', '✅', 4000);
                }
            })
            .catch(err => {
                hideOverlay();
                if (iosTab && !iosTab.closed) iosTab.close();
                console.error('PDF export failed:', err);
                showToast(`Export failed: ${err.message || err}`, '❌', 7000);
            });
    });

});
