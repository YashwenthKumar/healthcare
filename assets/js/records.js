document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadModal = document.getElementById('uploadModal');
    const closeBtn = document.querySelector('.close-btn');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.querySelector('.btn-browse');
    
    // Open modal when upload button clicked
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            uploadModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            uploadModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    uploadModal.addEventListener('click', function(e) {
        if (e.target === uploadModal) {
            uploadModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle file selection via browse button
    if (browseBtn) {
        browseBtn.addEventListener('click', function() {
            fileInput.click();
        });
    }
    
    // Handle file selection
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });
    }
    
    // Drag and drop functionality
    if (dropZone) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });
        
        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });
        
        // Handle dropped files
        dropZone.addEventListener('drop', handleDrop, false);
    }
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        dropZone.classList.add('highlight');
    }
    
    function unhighlight() {
        dropZone.classList.remove('highlight');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    function handleFiles(files) {
        if (files.length > 0) {
            // In a real app, you would process the files here
            console.log('Files selected:', files);
            
            // Update UI to show files are ready for upload
            dropZone.innerHTML = `
                <i class="fas fa-check-circle" style="color: var(--success); font-size: 48px;"></i>
                <p>${files.length} file(s) ready for upload</p>
            `;
        }
    }
    
    // Filter functionality (mock implementation)
    const applyFilterBtn = document.querySelector('.btn-apply');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            // In a real app, this would filter the records
            alert('Filter functionality will be implemented with backend');
        });
    }
    
    // Mock data for demonstration
    function loadMedicalRecords() {
        // In a real app, this would fetch from backend
        const records = [
            {
                type: 'lab',
                title: 'Blood Test Results',
                date: 'Jun 15, 2023',
                doctor: 'Dr. Sarah Johnson',
                facility: 'City Medical Lab'
            },
            {
                type: 'prescription',
                title: 'Amoxicillin Prescription',
                date: 'Jun 10, 2023',
                doctor: 'Dr. Michael Chen',
                facility: 'Downtown Clinic'
            },
            // More mock records...
        ];
        
        // Render records
        const recordsGrid = document.querySelector('.records-grid');
        if (recordsGrid) {
            recordsGrid.innerHTML = records.map(record => `
                <div class="record-card ${record.type}-result">
                    <div class="card-header">
                        <div class="record-type">
                            <i class="fas fa-${record.type === 'lab' ? 'flask' : 'file-prescription'}"></i>
                            <span>${record.type === 'lab' ? 'Lab Result' : 'Prescription'}</span>
                        </div>
                        <div class="record-date">${record.date}</div>
                    </div>
                    <h3>${record.title}</h3>
                    <div class="record-meta">
                        <span><i class="fas fa-user-md"></i> ${record.doctor}</span>
                        <span><i class="fas fa-hospital"></i> ${record.facility}</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-view">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-download">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Load mock data on page load
    loadMedicalRecords();
});