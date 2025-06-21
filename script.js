
// Global variables
let currentStep = 1;
const totalSteps = 4;
let formData = {};

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId + '-page').classList.add('active');
}

// Assessment functions
function startAssessment() {
    showPage('assessment');
    updateProgressBar();
}

function updateProgressBar() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Step ${currentStep} of ${totalSteps}`;
}

function nextStep() {
    // Validate current step
    if (!validateCurrentStep()) {
        alert('Please answer the question before proceeding.');
        return;
    }
    
    // Store current step data
    storeCurrentStepData();
    
    if (currentStep < totalSteps) {
        // Hide current step
        document.getElementById(`step${currentStep}`).classList.remove('active');
        
        // Move to next step
        currentStep++;
        
        // Show next step
        document.getElementById(`step${currentStep}`).classList.add('active');
        
        // Update progress bar
        updateProgressBar();
    }
}

function prevStep() {
    if (currentStep > 1) {
        // Hide current step
        document.getElementById(`step${currentStep}`).classList.remove('active');
        
        // Move to previous step
        currentStep--;
        
        // Show previous step
        document.getElementById(`step${currentStep}`).classList.add('active');
        
        // Update progress bar
        updateProgressBar();
    }
}

function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step${currentStep}`);
    
    if (currentStep === 1) {
        const age = document.getElementById('age').value;
        return age !== '';
    } else {
        const radioButtons = currentStepElement.querySelectorAll('input[type="radio"]');
        return Array.from(radioButtons).some(radio => radio.checked);
    }
}

function storeCurrentStepData() {
    const currentStepElement = document.getElementById(`step${currentStep}`);
    
    if (currentStep === 1) {
        formData.age = document.getElementById('age').value;
    } else {
        const radioButtons = currentStepElement.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            if (radio.checked) {
                formData[radio.name] = radio.value;
            }
        });
    }
}

function calculateRisk() {
    // Store final step data
    storeCurrentStepData();
    
    // Calculate risk score
    let riskScore = 0;
    
    // Age factor
    const ageValue = formData.age;
    if (ageValue === '31-40' || ageValue === '41-50') {
        riskScore += 2;
    } else if (ageValue === '51-60' || ageValue === '60+') {
        riskScore += 3;
    } else {
        riskScore += 1;
    }
    
    // Sexual partners factor
    const partnersValue = formData.partners;
    if (partnersValue === '7+') {
        riskScore += 3;
    } else if (partnersValue === '4-6') {
        riskScore += 2;
    } else {
        riskScore += 1;
    }
    
    // HPV history factor
    const hpvValue = formData.hpv;
    if (hpvValue === 'positive') {
        riskScore += 4;
    } else if (hpvValue === 'unknown' || hpvValue === 'never') {
        riskScore += 2;
    }
    
    // Pap history factor
    const papValue = formData.pap;
    if (papValue === 'abnormal') {
        riskScore += 3;
    } else if (papValue === 'never' || papValue === 'overdue') {
        riskScore += 2;
    }
    
    // Determine risk level and display results
    displayResults(riskScore);
    
    // Send data to backend (placeholder for API integration)
    sendDataToBackend(formData, riskScore);
}

function displayResults(riskScore) {
    let riskLevel, riskIcon, riskPercentage, riskDescription, recommendations, riskClass;
    
    if (riskScore <= 6) {
        riskLevel = 'Low Risk';
        riskIcon = '🌿';
        riskPercentage = '15% estimated risk';
        riskDescription = 'Great news! Your risk factors suggest a low probability of cervical cancer.';
        riskClass = 'low-risk';
        recommendations = [
            'Continue regular Pap tests every 3 years',
            'Maintain healthy lifestyle habits',
            'Consider HPV vaccination if eligible',
            'Next screening: 3 years from last normal test'
        ];
    } else if (riskScore <= 10) {
        riskLevel = 'Moderate Risk';
        riskIcon = '⚠️';
        riskPercentage = '35% estimated risk';
        riskDescription = 'Your assessment indicates some risk factors that require attention.';
        riskClass = 'moderate-risk';
        recommendations = [
            'Annual Pap tests recommended',
            'Discuss HPV testing with your doctor',
            'Follow up on any abnormal results promptly',
            'Next screening: 1 year'
        ];
    } else {
        riskLevel = 'High Risk';
        riskIcon = '❗';
        riskPercentage = '60% estimated risk';
        riskDescription = 'Your risk factors suggest the need for immediate medical attention.';
        riskClass = 'high-risk';
        recommendations = [
            'Immediate consultation with gynecologist required',
            'Consider colposcopy if recommended by doctor',
            'Follow all screening appointments strictly',
            'Next screening: 6 months or as directed'
        ];
    }
    
    // Update results display
    document.getElementById('riskIcon').textContent = riskIcon;
    document.getElementById('riskLevel').textContent = riskLevel;
    document.getElementById('riskPercentage').textContent = riskPercentage;
    document.getElementById('riskDescription').textContent = riskDescription;
    document.getElementById('riskCard').className = `risk-card ${riskClass}`;
    
    // Display recommendations
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    recommendations.forEach(rec => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        item.innerHTML = `<i class="fas fa-check-circle"></i><span>${rec}</span>`;
        recommendationsList.appendChild(item);
    });
    
    // Show results page
    showPage('results');
}

function restartAssessment() {
    // Reset variables
    currentStep = 1;
    formData = {};
    
    // Reset form
    document.getElementById('age').value = '';
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Reset steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step1').classList.add('active');
    
    // Start assessment
    startAssessment();
}

// Data science tool functions
function uploadData() {
    const fileInput = document.getElementById('dataUpload');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }
    
    // Placeholder for file upload functionality
    console.log('Uploading file:', file.name);
    alert(`File "${file.name}" uploaded successfully! (This is a demo)`);
    
    // Here you would typically send the file to your backend
    // Example API call:
    // uploadFileToBackend(file);
}

function trainModel() {
    const modelType = document.querySelector('.tool-card select').value;
    console.log('Starting model training with:', modelType);
    alert(`Starting ${modelType} model training... (This is a demo)`);
    
    // Placeholder for model training
    // Example API call:
    // startModelTraining(modelType);
}

function viewDashboard() {
    console.log('Opening analytics dashboard');
    alert('Opening analytics dashboard... (This is a demo)');
    
    // Here you would typically redirect to a dashboard or open a modal
    // Example:
    // window.open('/analytics-dashboard', '_blank');
}

function testAPI() {
    console.log('Testing API connection');
    alert('API connection test successful! (This is a demo)');
    
    // Example API test
    // testAPIConnection();
}

function determineRiskLevel(score) {
    if (score <= 6) return 'Low';
    else if (score <= 10) return 'Medium';
    else return 'High';
}


// Backend integration functions (placeholders for actual implementation)
function sendDataToBackend(data, riskScore) {
    fetch('http://localhost:5000/assessment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            age: data.age,
            partners: data.partners,
            hpv: data.hpv,
            pap: data.pap,
            riskScore: riskScore,
            riskLevel: determineRiskLevel(riskScore),  
        }),
    })
    .then(response => response.json())
    .then(result => {
        console.log('Data sent to backend:', result);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
}

function uploadFileToBackend(file) {
    // Placeholder for file upload to backend
    const formData = new FormData();
    formData.append('file', file);
    
    console.log('Would upload file to backend:', file.name);
    
    // Example implementation:
    /*
    fetch('/api/upload-dataset', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        console.log('File upload result:', result);
    })
    .catch(error => {
        console.error('Error uploading file:', error);
    });
    */
}

function startModelTraining(modelType) {
    // Placeholder for model training API call
    console.log('Starting model training:', modelType);
    
    // Example implementation:
    /*
    fetch('/api/train-model', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            modelType: modelType,
            parameters: {
                // training parameters
            }
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log('Training started:', result);
    })
    .catch(error => {
        console.error('Error starting training:', error);
    });
    */
}

function testAPIConnection() {
    fetch('http://localhost:5000/health')
        .then(response => response.json())
        .then(result => {
            console.log('API health check:', result);
            alert('Backend is connected!');
        })
        .catch(error => {
            console.error('API connection failed:', error);
            alert('Cannot reach backend. Please make sure your server is running.');
        });
}


// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('HerHealth AI application loaded');
    
    // Show home page by default
    showPage('home');
    
    // Initialize progress bar
    updateProgressBar();
});

// Hamburger menu toggle for mobile view
document.getElementById("hamburger").addEventListener("click", function () {
    const navMenu = document.querySelector(".nav-menu");
    navMenu.classList.toggle("active");
});

// Close nav menu when a link is clicked (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});
