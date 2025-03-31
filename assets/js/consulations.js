        document.addEventListener('DOMContentLoaded', function() {
            // Tab Switching
            const tabs = document.querySelectorAll('.tab');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs and contents
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked tab and corresponding content
                    tab.classList.add('active');
                    const tabId = tab.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                    
                    // Load data when switching tabs
                    if (tabId === 'upcoming') {
                        loadUpcomingAppointments();
                    } else if (tabId === 'past') {
                        loadPastAppointments();
                    } else if (tabId === 'book') {
                        loadDoctors();
                    }
                });
            });
            
            // Modal Elements
            const bookingModal = document.getElementById('booking-modal');
            const confirmationModal = document.getElementById('confirmation-modal');
            const closeModalButtons = document.querySelectorAll('.close-modal, #close-confirmation');
            
            // Close modals when clicking close button or outside
            closeModalButtons.forEach(button => {
                button.addEventListener('click', () => {
                    bookingModal.style.display = 'none';
                    confirmationModal.style.display = 'none';
                });
            });
            
            window.addEventListener('click', (e) => {
                if (e.target === bookingModal) {
                    bookingModal.style.display = 'none';
                }
                if (e.target === confirmationModal) {
                    confirmationModal.style.display = 'none';
                }
            });
            
            // Load user data from session/local storage
            const userName = localStorage.getItem('userName') || 'John Doe';
            document.getElementById('user-name').textContent = userName;
            
            // Sample data - in a real app, this would come from an API
            const userAppointments = {
                upcoming: [
                    {
                        id: 1,
                        doctor: {
                            name: "Dr. Thanuja",
                            specialty: "Cardiologist",
                            image: "https://via.placeholder.com/80",
                            rating: 4.7,
                            reviews: 128
                        },
                        date: "2023-06-20",
                        time: "10:00 AM - 10:30 AM",
                        type: "video",
                        status: "confirmed"
                    },
                    {
                        id: 2,
                        doctor: {
                            name: "Dr.Ramu",
                            specialty: "General Physician",
                            image: "https://via.placeholder.com/80",
                            rating: 5.0,
                            reviews: 89
                        },
                        date: "2023-06-25",
                        time: "2:00 PM - 2:30 PM",
                        type: "clinic",
                        status: "confirmed"
                    }
                ],
                past: [
                    {
                        id: 3,
                        doctor: {
                            name: "Dr. Emily Williams",
                            specialty: "Dermatologist",
                            image: "https://via.placeholder.com/80",
                            rating: 4.5,
                            reviews: 76
                        },
                        date: "2023-05-15",
                        time: "11:00 AM - 11:30 AM",
                        type: "video",
                        status: "completed"
                    }
                ]
            };
            
            const doctorsList = [
                {
                    id: 101,
                    name: "Dr. Srinivas",
                    specialty: "Cardiologist",
                    image: "https://via.placeholder.com/300",
                    rating: 4.7,
                    reviews: 128,
                    available: true,
                    availableToday: true
                },
                {
                    id: 102,
                    name: "Dr.Yamini",
                    specialty: "General Physician",
                    image: "https://via.placeholder.com/300",
                    rating: 5.0,
                    reviews: 89,
                    available: true,
                    availableToday: true
                },
                {
                    id: 103,
                    name: "Dr.Sankar",
                    specialty: "Dermatologist",
                    image: "https://via.placeholder.com/300",
                    rating: 4.5,
                    reviews: 76,
                    available: false,
                    availableToday: false
                },
                {
                    id: 104,
                    name: "Dr.Dinesh",
                    specialty: "Neurologist",
                    image: "https://via.placeholder.com/300",
                    rating: 4.8,
                    reviews: 112,
                    available: true,
                    availableToday: false
                }
            ];
            
            // Load upcoming appointments
            function loadUpcomingAppointments() {
                const container = document.getElementById('upcoming-appointments');
                container.innerHTML = '';
                
                if (userAppointments.upcoming.length === 0) {
                    container.innerHTML = '<p class="no-appointments">No upcoming appointments scheduled.</p>';
                    return;
                }
                
                userAppointments.upcoming.forEach(appointment => {
                    const appointmentCard = createAppointmentCard(appointment);
                    container.appendChild(appointmentCard);
                });
            }
            
            // Load past appointments
            function loadPastAppointments() {
                const container = document.getElementById('past-appointments');
                container.innerHTML = '';
                
                if (userAppointments.past.length === 0) {
                    container.innerHTML = '<p class="no-appointments">No past appointments found.</p>';
                    return;
                }
                
                userAppointments.past.forEach(appointment => {
                    const appointmentCard = createAppointmentCard(appointment, true);
                    container.appendChild(appointmentCard);
                });
            }
            
            // Create appointment card HTML
            function createAppointmentCard(appointment, isPast = false) {
                const card = document.createElement('div');
                card.className = `appointment-card ${isPast ? 'past' : 'upcoming'}`;
                
                const stars = [];
                const fullStars = Math.floor(appointment.doctor.rating);
                const hasHalfStar = appointment.doctor.rating % 1 >= 0.5;
                
                for (let i = 0; i < fullStars; i++) {
                    stars.push('<i class="fas fa-star"></i>');
                }
                if (hasHalfStar) {
                    stars.push('<i class="fas fa-star-half-alt"></i>');
                }
                
                card.innerHTML = `
                    <div class="card-main">
                        <div class="doctor-info">
                            <img src="${appointment.doctor.image}" alt="${appointment.doctor.name}">
                            <div>
                                <h3>${appointment.doctor.name}</h3>
                                <p>${appointment.doctor.specialty}</p>
                                <div class="rating">
                                    ${stars.join('')}
                                    <span>${appointment.doctor.rating} (${appointment.doctor.reviews} reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div class="appointment-details">
                            <div class="detail">
                                <i class="fas fa-calendar-alt"></i>
                                <span>${formatDate(appointment.date)}</span>
                            </div>
                            <div class="detail">
                                <i class="fas fa-clock"></i>
                                <span>${appointment.time}</span>
                            </div>
                            <div class="detail">
                                <i class="fas ${appointment.type === 'video' ? 'fa-video' : 'fa-clinic-medical'}"></i>
                                <span>${appointment.type === 'video' ? 'Video Consultation' : 'In-Clinic Visit'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-actions">
                        ${isPast ? 
                            `<button class="btn btn-outline" onclick="viewAppointmentDetails(${appointment.id})">
                                <i class="fas fa-file-medical"></i> View Details
                            </button>` : 
                            `<button class="btn btn-primary" onclick="${appointment.type === 'video' ? 'joinConsultation(' + appointment.id + ')' : 'viewClinicDirections(' + appointment.id + ')'}">
                                <i class="fas ${appointment.type === 'video' ? 'fa-video' : 'fa-map-marker-alt'}"></i> ${appointment.type === 'video' ? 'Join Consultation' : 'Get Directions'}
                            </button>
                            <button class="btn btn-outline" onclick="rescheduleAppointment(${appointment.id})">
                                <i class="fas fa-calendar-alt"></i> Reschedule
                            </button>
                            <button class="btn btn-outline" onclick="cancelAppointment(${appointment.id})">
                                <i class="fas fa-times"></i> Cancel
                            </button>`
                        }
                    </div>
                `;
                
                return card;
            }
            
            // Load doctors list
            function loadDoctors(filter = '', specialty = '', availability = '') {
                const container = document.getElementById('doctors-list');
                container.innerHTML = '';
                
                let filteredDoctors = [...doctorsList];
                
                // Apply filters
                if (filter) {
                    const searchTerm = filter.toLowerCase();
                    filteredDoctors = filteredDoctors.filter(doctor => 
                        doctor.name.toLowerCase().includes(searchTerm) || 
                        doctor.specialty.toLowerCase().includes(searchTerm)
                    );
                }
                
                if (specialty) {
                    filteredDoctors = filteredDoctors.filter(doctor => 
                        doctor.specialty === specialty
                    );
                }
                
                if (availability === 'today') {
                    filteredDoctors = filteredDoctors.filter(doctor => 
                        doctor.availableToday
                    );
                } else if (availability === 'tomorrow' || availability === 'this-week') {
                    filteredDoctors = filteredDoctors.filter(doctor => 
                        doctor.available
                    );
                }
                
                if (filteredDoctors.length === 0) {
                    container.innerHTML = '<p class="no-doctors">No doctors found matching your criteria.</p>';
                    return;
                }
                
                filteredDoctors.forEach(doctor => {
                    const doctorCard = createDoctorCard(doctor);
                    container.appendChild(doctorCard);
                });
            }
            
            // Create doctor card HTML
            function createDoctorCard(doctor) {
                const card = document.createElement('div');
                card.className = 'doctor-card';
                
                const stars = [];
                for (let i = 0; i < 5; i++) {
                    if (i < Math.floor(doctor.rating)) {
                        stars.push('<i class="fas fa-star"></i>');
                    } else if (i === Math.floor(doctor.rating) && doctor.rating % 1 >= 0.5) {
                        stars.push('<i class="fas fa-star-half-alt"></i>');
                    } else {
                        stars.push('<i class="far fa-star"></i>');
                    }
                }
                
                card.innerHTML = `
                    <img src="${doctor.image}" alt="${doctor.name}">
                    <div class="doctor-details">
                        <h3>${doctor.name}</h3>
                        <p class="specialty">${doctor.specialty}</p>
                        <div class="rating">
                            ${stars.join('')}
                            <span>${doctor.rating} (${doctor.reviews} reviews)</span>
                        </div>
                        <p class="availability">
                            <i class="fas fa-circle ${doctor.available ? 'available' : 'unavailable'}"></i> 
                            ${doctor.available ? (doctor.availableToday ? 'Available today' : 'Available this week') : 'Not available'}
                        </p>
                        <button class="btn btn-primary btn-book" onclick="openBookingModal(${doctor.id})" ${!doctor.available ? 'disabled' : ''}>
                            Book Appointment
                        </button>
                    </div>
                `;
                
                return card;
            }
            
            // Open booking modal
            window.openBookingModal = function(doctorId) {
                const doctor = doctorsList.find(d => d.id === doctorId);
                if (!doctor) return;
                
                document.getElementById('doctor-id').value = doctorId;
                
                // Set minimum date to today
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('appointment-date').min = today;
                
                // Clear and populate time slots
                const timeSelect = document.getElementById('appointment-time');
                timeSelect.innerHTML = '<option value="">Select Time Slot</option>';
                
                // Sample time slots - in a real app, this would come from the doctor's availability
                const timeSlots = [
                    '09:00 AM - 09:30 AM',
                    '10:00 AM - 10:30 AM',
                    '11:00 AM - 11:30 AM',
                    '02:00 PM - 02:30 PM',
                    '03:00 PM - 03:30 PM',
                    '04:00 PM - 04:30 PM'
                ];
                
                timeSlots.forEach(slot => {
                    const option = document.createElement('option');
                    option.value = slot;
                    option.textContent = slot;
                    timeSelect.appendChild(option);
                });
                
                bookingModal.style.display = 'flex';
            }
            
            // Format date for display
            function formatDate(dateString) {
                const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
                return new Date(dateString).toLocaleDateString('en-US', options);
            }
            
            // Search doctors
            document.getElementById('search-btn').addEventListener('click', () => {
                const searchTerm = document.getElementById('doctor-search').value;
                const specialty = document.getElementById('specialty-filter').value;
                const availability = document.getElementById('availability-filter').value;
                loadDoctors(searchTerm, specialty, availability);
            });
            
            // Booking form submission
            document.getElementById('booking-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const doctorId = parseInt(document.getElementById('doctor-id').value);
                const date = document.getElementById('appointment-date').value;
                const time = document.getElementById('appointment-time').value;
                const type = document.getElementById('consultation-type').value;
                const symptoms = document.getElementById('symptoms').value;
                
                const doctor = doctorsList.find(d => d.id === doctorId);
                if (!doctor) return;
                
                // In a real app, you would send this data to your backend
                console.log('Booking appointment:', { doctorId, date, time, type, symptoms });
                
                // Create a new appointment (simulated)
                const newAppointment = {
                    id: Date.now(),
                    doctor: {
                        name: doctor.name,
                        specialty: doctor.specialty,
                        image: doctor.image,
                        rating: doctor.rating,
                        reviews: doctor.reviews
                    },
                    date: date,
                    time: time,
                    type: type,
                    status: "confirmed",
                    symptoms: symptoms
                };
                
                userAppointments.upcoming.push(newAppointment);
                
                // Show confirmation
                document.getElementById('confirmation-message').innerHTML = `
                    Your appointment with <strong>${doctor.name}</strong> has been booked for<br>
                    <strong>${formatDate(date)} at ${time}</strong>.<br><br>
                    ${type === 'video' ? 
                        'A video consultation link will be sent to your email.' : 
                        'Please arrive 15 minutes before your scheduled time.'}
                `;
                
                bookingModal.style.display = 'none';
                confirmationModal.style.display = 'flex';
                
                // Reset form
                this.reset();
            });
            
            // Initialize the page
            loadUpcomingAppointments();
        });

        // Sample functions for appointment actions
        window.joinConsultation = function(appointmentId) {
            alert(`Joining consultation for appointment ${appointmentId}`);
        };
        
        window.viewClinicDirections = function(appointmentId) {
            alert(`Showing directions for appointment ${appointmentId}`);
        };
        
        window.rescheduleAppointment = function(appointmentId) {
            alert(`Rescheduling appointment ${appointmentId}`);
        };
        
        window.cancelAppointment = function(appointmentId) {
            if (confirm('Are you sure you want to cancel this appointment?')) {
                // In a real app, you would update the backend
                alert('Appointment canceled successfully.');
            }
        };
        
        window.viewAppointmentDetails = function(appointmentId) {
            alert(`Showing details for appointment ${appointmentId}`);
        };
