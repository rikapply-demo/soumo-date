const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const screen3 = document.getElementById('screen3');
const screen4 = document.getElementById('screen4');

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const okBtn = document.getElementById('okBtn');
const dateForm = document.getElementById('dateForm');
const chosenTimeSpan = document.getElementById('chosenTime');

// --- FIXED EVADING NO BUTTON LOGIC ---
function moveNoButton() {
    const card = document.querySelector('.card');
    
    const padding = 30;
    const maxX = card.clientWidth - noBtn.clientWidth - padding;
    const maxY = card.clientHeight - noBtn.clientHeight - padding;

    const randomX = Math.floor(Math.random() * (maxX - padding)) + padding;
    const randomY = Math.floor(Math.random() * (maxY - padding)) + padding;

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// --- SCREEN TRANSITIONS ---
yesBtn.addEventListener('click', () => {
    screen1.classList.remove('active');
    screen2.classList.add('active');
});

okBtn.addEventListener('click', () => {
    screen2.classList.remove('active');
    screen3.classList.add('active');
});

// Form submission handler
dateForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const rawTime = document.getElementById('timePicker').value;
    
    let formattedTime = rawTime;
    if (rawTime) {
        const [hours, minutes] = rawTime.split(':');
        const hourInt = parseInt(hours);
        const ampm = hourInt >= 12 ? 'PM' : 'AM';
        const formattedHour = hourInt % 12 || 12;
        formattedTime = `${formattedHour}:${minutes} ${ampm}`;
    }

    chosenTimeSpan.textContent = formattedTime;

    const formData = new FormData(dateForm);
    
    screen3.classList.remove('active');
    screen4.classList.add('active');

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Details securely forwarded.", data);
    })
    .catch(error => {
        console.error("Transmission error:", error);
    });
});