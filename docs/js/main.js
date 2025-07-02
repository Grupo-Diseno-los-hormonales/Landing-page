// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const moonIcon = '🌙';
const sunIcon = '☀️'; // Or any other sun icon you prefer

// Function to apply dark mode
function enableDarkMode() {
  body.classList.add('dark-mode');
  if (darkModeToggle) {
    darkModeToggle.textContent = sunIcon;
  }
  localStorage.setItem('darkMode', 'enabled');
}

// Function to disable dark mode
function disableDarkMode() {
  body.classList.remove('dark-mode');
  if (darkModeToggle) {
    darkModeToggle.textContent = moonIcon;
  }
  localStorage.setItem('darkMode', 'disabled');
}

// Initialize dark mode based on preference or default
// This should run after the DOM is fully loaded to ensure darkModeToggle exists
document.addEventListener('DOMContentLoaded', () => {
  // Re-assign darkModeToggle here if it wasn't found initially (though it should be if script is at end of body)
  // const darkModeToggle = document.getElementById('darkModeToggle'); // Already declared globally

  if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
  } else if (localStorage.getItem('darkMode') === 'disabled') {
    disableDarkMode();
  } else {
    // Optional: Check for system preference if no local storage preference
    // const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // if (prefersDark) {
    //   enableDarkMode();
    // } else {
       disableDarkMode(); // Default to light if nothing is set
    // }
  }

  // Toggle dark mode on button click
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  }
});
