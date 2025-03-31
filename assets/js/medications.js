document.addEventListener('DOMContentLoaded', function() {
    // Add medication button
    const addMedBtn = document.getElementById('addMedicationBtn');
    if (addMedBtn) {
        addMedBtn.addEventListener('click', function() {
            // In a real app, this would open a modal
            alert('Add medication functionality will be implemented');
        });
    }
    
    // Medication taken buttons
    document.querySelectorAll('.btn-taken').forEach(btn => {
        btn.addEventListener('click', function() {
            const medName = this.closest('.medication-card').querySelector('h4').textContent;
            this.innerHTML = '<i class="fas fa-check"></i> Taken';
            this.style.background = 'var(--success-light)';
            this.style.color = 'var(--success)';
            
            // In a real app, this would update the backend
            console.log(`Marked ${medName} as taken`);
        });
    });
    
    // Snooze buttons
    document.querySelectorAll('.btn-snooze').forEach(btn => {
        btn.addEventListener('click', function() {
            const medName = this.closest('.medication-card').querySelector('h4').textContent;
            alert(`Reminder for ${medName} will be shown again in 30 minutes`);
        });
    });
    
    // Edit/Delete buttons
    document.querySelectorAll('.btn-icon').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('i').className.includes('edit') ? 'Edit' : 'Delete';
            const medName = this.closest('.list-item').querySelector('h4').textContent;
            
            if (action === 'Delete') {
                if (confirm(`Are you sure you want to delete ${medName}?`)) {
                    // In a real app, this would remove from backend
                    this.closest('.list-item').remove();
                }
            } else {
                // In a real app, this would open edit modal
                alert(`Edit ${medName} functionality will be implemented`);
            }
        });
    });
    
    // Load mock medication data
    loadMedications();
    
    function loadMedications() {
        // Mock data
        const medications = [
            {
                name: 'Lisinopril',
                purpose: 'For high blood pressure',
                dosage: '10mg',
                frequency: 'Once daily in the morning',
                nextDose: 'Today, 8:00 AM'
            },
            {
                name: 'Atorvastatin',
                purpose: 'For cholesterol',
                dosage: '20mg',
                frequency: 'Once daily at bedtime',
                nextDose: 'Today, 10:00 PM'
            }
            // More mock medications...
        ];
        
        // Today's medications
        const todayMeds = [
            {
                name: 'Lisinopril',
                dosage: '10mg Tablet',
                purpose: 'For high blood pressure',
                time: 'morning'
            }
            // More mock today's medications...
        ];
        
        // Render today's medications
        const reminderCards = document.querySelector('.reminder-cards');
        if (reminderCards) {
            todayMeds.forEach(med => {
                const timeSlot = document.querySelector(`.time-slot.${med.time}`);
                if (timeSlot) {
                    const card = document.createElement('div');
                    card.className = 'medication-card';
                    card.innerHTML = `
                        <div class="medication-info">
                            <h4>${med.name}</h4>
                            <p>${med.dosage}</p>
                            <p><i class="fas fa-info-circle"></i> ${med.purpose}</p>
                        </div>
                        <div class="medication-actions">
                            <button class="btn btn-taken">
                                <i class="fas fa-check"></i> Taken
                            </button>
                            <button class="btn btn-snooze">
                                <i class="fas fa-clock"></i> Remind Later
                            </button>
                        </div>
                    `;
                    timeSlot.appendChild(card);
                }
            });
        }
        
        // Render all medications list
        const listItems = document.querySelector('.list-items');
        if (listItems) {
            listItems.innerHTML = medications.map(med => `
                <div class="list-item">
                    <div class="medication-name">
                        <i class="fas fa-pills"></i>
                        <div>
                            <h4>${med.name}</h4>
                            <p>${med.purpose}</p>
                        </div>
                    </div>
                    <div class="medication-dosage">${med.dosage}</div>
                    <div class="medication-frequency">${med.frequency}</div>
                    <div class="medication-next">${med.nextDose}</div>
                    <div class="medication-actions">
                        <button class="btn-icon">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
});