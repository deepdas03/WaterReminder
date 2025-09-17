// ===============================
// Water Reminder - script.js
// ===============================

// Timer reference & interval value
let timer;
let intervalMinutes = 30;

/**
 * Start the water reminder
 */
function startReminder() {
  intervalMinutes = parseInt(document.getElementById("interval").value);

  if (isNaN(intervalMinutes) || intervalMinutes < 1) {
    alert("Enter a valid number of minutes!");
    return;
  }

  // Reset previous timer if any
  clearInterval(timer);

  document.getElementById("status").innerText =
    `Reminding every ${intervalMinutes} min`;
  fillGlass(0);

  // Ask notification permission if needed
  if (Notification.permission !== "granted" && Notification.permission !== "denied") {
    Notification.requestPermission();
  }

  // Start interval
  timer = setInterval(() => {
    notifyUser();
  }, intervalMinutes * 60 * 1000);
}

/**
 * Stop the water reminder
 */
function stopReminder() {
  clearInterval(timer); // cancel interval
  fillGlass(0); // empty the glass
  document.getElementById("status").innerText = "Reminder stopped ❌";
}

/**
 * Show notification + animate glass
 */
function notifyUser() {
  fillGlass(100);
  document.getElementById("status").innerText = "Time to drink water! 💧";

  // Send desktop/mobile notification if allowed
  if (Notification.permission === "granted") {
    new Notification("💧 Time to drink water!");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(perm => {
      if (perm === "granted") new Notification("💧 Time to drink water!");
    });
  }

  // Reset glass after a short delay
  setTimeout(() => fillGlass(0), 4000);
}

/**
 * Fill or empty the water glass
 * @param {number} percent - 0 to 100
 */
function fillGlass(percent) {
  document.getElementById("fill").style.height = percent + "%";
}

/**
 * Register the Service Worker for PWA features
 */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch(err => console.log("Service Worker registration failed:", err));
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js")
    .then(() => console.log("Service Worker registered"));
}
