// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Notification Badge
    const notificationBtn = document.querySelector('.notification-btn');
    notificationBtn.addEventListener('click', function() {
        alert('3 notifications:\n1. New customer registered\n2. Project deadline approaching\n3. System backup completed');
        this.querySelector('.badge').style.display = 'none';
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            alert(`Searching for: "${this.value}"`);
            this.value = '';
        }
    });

    // Initialize Charts
    initRevenueChart();
    initCustomerChart();
});

function initRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue (Juta Rupiah)',
                data: [85, 92, 105, 120, 135, 148, 165, 182, 195, 210, 230, 248],
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function initCustomerChart() {
    const ctx = document.getElementById('customerChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Enterprise', 'Startup', 'SME', 'Individual'],
            datasets: [{
                data: [40, 30, 20, 10],
                backgroundColor: [
                    '#4361ee',
                    '#3a0ca3',
                    '#f72585',
                    '#4cc9f0'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Invoice Generator
function generateInvoice() {
    const clientName = document.getElementById('clientName').value;
    const amount = document.getElementById('invoiceAmount').value;
    const type = document.getElementById('invoiceType').value;
    
    if (!clientName || !amount) {
        alert('Harap isi semua field!');
        return;
    }
    
    const invoiceNumber = 'INV-' + Date.now().toString().slice(-6);
    const invoiceDate = new Date().toLocaleDateString('id-ID');
    
    const invoiceHTML = `
        <div class="invoice-document">
            <div class="invoice-header">
                <h4>INVOICE ${invoiceNumber}</h4>
                <p>Tanggal: ${invoiceDate}</p>
            </div>
            <div class="invoice-body">
                <p><strong>Klien:</strong> ${clientName}</p>
                <p><strong>Layanan:</strong> ${document.getElementById('invoiceType').options[document.getElementById('invoiceType').selectedIndex].text}</p>
                <p><strong>Jumlah:</strong> Rp ${parseInt(amount).toLocaleString('id-ID')}</p>
                <p><strong>Status:</strong> <span class="status pending">Pending Payment</span></p>
            </div>
            <div class="invoice-actions">
                <button class="btn-primary" onclick="downloadInvoice()">
                    <i class="fas fa-download"></i> Download PDF
                </button>
                <button class="btn-secondary" onclick="sendInvoice()">
                    <i class="fas fa-paper-plane"></i> Kirim ke Email
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('invoicePreview').innerHTML = invoiceHTML;
    document.getElementById('clientName').value = '';
    document.getElementById('invoiceAmount').value = '';
}

function downloadInvoice() {
    alert('Invoice berhasil didownload (simulasi)');
}

function sendInvoice() {
    alert('Invoice berhasil dikirim ke email klien (simulasi)');
}
