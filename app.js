const scanResult = document.getElementById('scan-result');
const resultArea = document.getElementById('result-area');
const scanArea = document.getElementById('scan-area');
const scanAgainBtn = document.getElementById('scan-again');
const scanIconBtn = document.getElementById('scan-icon');

let qrCodeScanner;
let isScanning = false;

// Start scan barcode langsung saat aplikasi dibuka
window.onload = startScanner;

function startScanner() {
  resultArea.classList.add('hidden');
  scanArea.style.display = 'block';
  isScanning = true;
  if (!qrCodeScanner) {
    qrCodeScanner = new Html5Qrcode("reader");
  }
  qrCodeScanner.start(
    { facingMode: "environment" },
    {
      fps: 15,
      qrbox: 260,
      aspectRatio: 1
    },
    onScanSuccess
  ).catch(err => {
    scanResult.textContent = "Gagal scan: " + err;
    resultArea.classList.remove('hidden');
    scanArea.style.display = 'none';
  });
}

function onScanSuccess(decodedText, decodedResult) {
  if (!isScanning) return;
  isScanning = false;
  qrCodeScanner.stop();
  scanResult.textContent = decodedText;
  resultArea.classList.remove('hidden');
  scanArea.style.display = 'none';
  // Jika hasil adalah URL, langsung eksekusi
  if (/^https?:\/\/.+/.test(decodedText)) {
    window.open(decodedText, '_blank');
  }
}

// Scan lagi tombol
scanAgainBtn.onclick = function() {
  startScanner();
};

// Tombol scan di nav hanya animasi glow, tidak perlu scan ulang (karena scan sudah otomatis)
scanIconBtn.onclick = function() {
  startScanner();
};