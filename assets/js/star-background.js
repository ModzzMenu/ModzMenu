document.addEventListener("DOMContentLoaded", () => {
  const bg = document.getElementById("star-background")
  if (!bg) return

  const createStars = () => {
    // Clear existing stars
    bg.innerHTML = ""

    const starsCount = 100

    for (let i = 0; i < starsCount; i++) {
      const star = document.createElement("div")
      star.classList.add("star")

      // Random positions and sizes
      const size = Math.random() * 3
      const x = Math.random() * 100
      const y = Math.random() * 100
      const duration = 5 + Math.random() * 10 + "s"
      const delay = Math.random() * 5 + "s"
      const opacity = 0.2 + Math.random() * 0.8

      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.left = `${x}%`
      star.style.top = `${y}%`
      star.style.animationDuration = duration
      star.style.animationDelay = delay
      star.style.setProperty("--duration", duration)
      star.style.setProperty("--opacity", opacity)

      bg.appendChild(star)
    }
  }

  createStars()

  // Recreate stars on window resize
  window.addEventListener("resize", createStars)
})
