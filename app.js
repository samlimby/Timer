const digitDisplay = document.getElementById('digit-display');
const ctaButton = document.getElementById('cta-display');
const secondaryButton = document.getElementById('secondary-display');

let timer = null;
let startTime = null;

ctaButton.addEventListener('click', () => {
  if (timer !== null) {
    return;
  }
  startTime = Date.now();
  timer = setInterval(updateTimer, 10);
});

secondaryButton.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  digitDisplay.textContent = '00:00';
});

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  digitDisplay.textContent = `${padTime(minutes)}:${padTime(seconds)}`;
}

function padTime(time) {
  return time.toString().padStart(2, '0');
}

function toggleDropdown(elementId) {
  const referenceElement = document.getElementById(elementId);
  const dropdownList = document.getElementById('dropdown-list');
  const chevronIcon = referenceElement.querySelector('.chevron-icon');
  
  if (dropdownList.style.display === 'none') {
    const rect = referenceElement.getBoundingClientRect();
  
    const top = rect.bottom + 8;
    const left = 48;
  
    dropdownList.style.display = 'flex';
    chevronIcon.style.transform = 'rotate(180deg)';
  } else {
    dropdownList.style.display = 'none';
    chevronIcon.style.transform = 'rotate(0deg)';
  }
}
