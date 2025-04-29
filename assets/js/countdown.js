document.addEventListener("DOMContentLoaded", () => {
  const countdownTimer = document.getElementById("countdown-timer")
  if (!countdownTimer) return

  const daysElement = document.getElementById("countdown-days")
  const hoursElement = document.getElementById("countdown-hours")
  const minutesElement = document.getElementById("countdown-minutes")
  const secondsElement = document.getElementById("countdown-seconds")

  // Set target date (30 days from now)
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 30)

  function updateCountdown() {
    const currentTime = new Date()
    const difference = targetDate - currentTime

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      if (daysElement) daysElement.textContent = days.toString().padStart(2, "0")
      if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, "0")
      if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, "0")
      if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, "0")
    } else {
      if (daysElement) daysElement.textContent = "00"
      if (hoursElement) hoursElement.textContent = "00"
      if (minutesElement) minutesElement.textContent = "00"
      if (secondsElement) secondsElement.textContent = "00"
    }
  }

  // Update countdown every second
  updateCountdown()
  setInterval(updateCountdown, 1000)
})
