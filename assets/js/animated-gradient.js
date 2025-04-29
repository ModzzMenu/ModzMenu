document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("animated-gradient")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  let width = window.innerWidth
  let height = window.innerHeight

  // Resize canvas
  function resizeCanvas() {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
  }

  // Gradient colors
  const colors = [
    { r: 236, g: 72, b: 153 }, // pink-500
    { r: 124, g: 58, b: 237 }, // purple-600
    { r: 59, g: 130, b: 246 }, // blue-500
    { r: 236, g: 72, b: 153 }, // back to pink-500
  ]

  let step = 0
  const gradientSpeed = 0.002

  // Update gradient
  function updateGradient() {
    // Calculate color indices
    const colorIndices = [0, 1, 2, 3].map((i) => Math.floor((step + i) % colors.length))

    // Calculate color ratios
    const c0 = colors[colorIndices[0]]
    const c1 = colors[colorIndices[1]]
    const c2 = colors[colorIndices[2]]
    const c3 = colors[colorIndices[3]]

    const stepPos = step % 1
    const stepPos1 = 1 - stepPos

    // Interpolate colors
    const r1 = Math.round(stepPos1 * c0.r + stepPos * c1.r)
    const g1 = Math.round(stepPos1 * c0.g + stepPos * c1.g)
    const b1 = Math.round(stepPos1 * c0.b + stepPos * c1.b)

    const r2 = Math.round(stepPos1 * c2.r + stepPos * c3.r)
    const g2 = Math.round(stepPos1 * c2.g + stepPos * c3.g)
    const b2 = Math.round(stepPos1 * c2.b + stepPos * c3.b)

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, 0.5)`)
    gradient.addColorStop(1, `rgba(${r2}, ${g2}, ${b2}, 0.5)`)

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    step += gradientSpeed

    requestAnimationFrame(updateGradient)
  }

  // Initialize
  window.addEventListener("resize", resizeCanvas)
  resizeCanvas()
  updateGradient()
})
