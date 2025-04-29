document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particles-background")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const particles = []
  const mouse = { x: 0, y: 0, radius: 150 }

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles()
  }

  // Initialize particles
  function initParticles() {
    particles.length = 0
    const numberOfParticles = Math.min(window.innerWidth, window.innerHeight) * 0.1

    for (let i = 0; i < numberOfParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: getRandomColor(),
        opacity: Math.random() * 0.5 + 0.1,
      })
    }
  }

  // Get random color
  function getRandomColor() {
    const colors = ["#ec4899", "#8b5cf6", "#3b82f6", "#f97316"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Bounce off edges
      if (particle.x > canvas.width || particle.x < 0) {
        particle.speedX = -particle.speedX
      }
      if (particle.y > canvas.height || particle.y < 0) {
        particle.speedY = -particle.speedY
      }

      // Mouse interaction
      const dx = particle.x - mouse.x
      const dy = particle.y - mouse.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mouse.radius) {
        const angle = Math.atan2(dy, dx)
        const force = (mouse.radius - distance) / mouse.radius

        particle.x += Math.cos(angle) * force
        particle.y += Math.sin(angle) * force
      }

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle =
        particle.color +
        Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")
      ctx.fill()

      // Connect particles
      connectParticles(particle, index)
    })

    requestAnimationFrame(animate)
  }

  // Connect particles with lines
  function connectParticles(particle, index) {
    for (let i = index + 1; i < particles.length; i++) {
      const otherParticle = particles[i]
      const dx = particle.x - otherParticle.x
      const dy = particle.y - otherParticle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        ctx.beginPath()
        ctx.strokeStyle =
          particle.color +
          Math.floor((1 - distance / 100) * 50)
            .toString(16)
            .padStart(2, "0")
        ctx.lineWidth = 0.5
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(otherParticle.x, otherParticle.y)
        ctx.stroke()
      }
    }
  }

  // Handle mouse movement
  function handleMouseMove(e) {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  // Initialize
  window.addEventListener("resize", resizeCanvas)
  window.addEventListener("mousemove", handleMouseMove)

  resizeCanvas()
  animate()
})
