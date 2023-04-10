const digitDisplay = document.getElementById('digit-display');
const ctaButton = document.getElementById('cta-display');
const secondaryButton = document.getElementById('secondary-display');

const startSound = new Audio('start-click.mp3');
const cancelSound = new Audio('cancel-click.mp3');

let timer = null;
let startTime = null;

ctaButton.addEventListener('click', () => {
  if (timer !== null) {
    return;
  }

  const parentElement = ctaButton.parentElement;
  parentElement.classList.add('cta-button-selected');

  setTimeout(() => {
    parentElement.classList.remove('cta-button-selected');
  }, 500);

  startTime = Date.now();
  timer = setInterval(updateTimer, 10);
  
  startSound.play();
});

secondaryButton.addEventListener('click', () => {
  if (timer === null) {
    return;
  }

  const parentElement = secondaryButton.parentElement;
  parentElement.classList.add('secondary-button-selected');

  const secondaryDisplay = parentElement.querySelector('.secondary-display');
  secondaryDisplay.classList.add('secondary-display-selected');

  setTimeout(() => {
    parentElement.classList.remove('secondary-button-selected');
    secondaryDisplay.classList.remove('secondary-display-selected');
  }, 500);

  clearInterval(timer);
  timer = null;
  digitDisplay.textContent = '00:00';
  
  cancelSound.play();
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    if (timer === null) {
      const parentElement = ctaButton.parentElement;
      parentElement.classList.add('cta-button-selected');
      setTimeout(() => {
        parentElement.classList.remove('cta-button-selected');
      }, 500);
      startTime = Date.now();
      timer = setInterval(updateTimer, 10);
      startSound.play();
    } else {
      const parentElement = secondaryButton.parentElement;
      parentElement.classList.add('secondary-button-selected');

      const secondaryDisplay = parentElement.querySelector('.secondary-display');
      secondaryDisplay.classList.add('secondary-display-selected');

      setTimeout(() => {
        parentElement.classList.remove('secondary-button-selected');
        secondaryDisplay.classList.remove('secondary-display-selected');
      }, 500);

      clearInterval(timer);
      timer = null;
      digitDisplay.textContent = '00:00';
      
      cancelSound.play();
    }
  }
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

function toggleDropdown(dropdownId) {
  const dropdownList = document.getElementById(dropdownId);
  const chevronIcon = document.getElementById("chevron-icon");
  dropdownList.style.display = dropdownList.style.display === "block" ? "none" : "block";
  chevronIcon.classList.toggle("rotate");
}

function toggleRotateClass(element, shouldAdd) {
  if (shouldAdd) {
    element.classList.add('rotate');
  } else {
    element.classList.remove('rotate');
  }
}
