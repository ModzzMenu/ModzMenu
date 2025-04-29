document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".scroll-reveal")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          el.classList.add("revealed")
          observer.unobserve(el)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px",
    },
  )

  revealElements.forEach((el) => {
    const direction = el.getAttribute("data-direction") || "up"
    const delay = el.getAttribute("data-delay") || 0
    const distance = el.getAttribute("data-distance") || 50

    // Set initial styles
    el.style.opacity = "0"
    el.style.transition = `transform 800ms ease-out ${delay}ms, opacity 800ms ease-out ${delay}ms`

    switch (direction) {
      case "up":
        el.style.transform = `translateY(${distance}px)`
        break
      case "down":
        el.style.transform = `translateY(-${distance}px)`
        break
      case "left":
        el.style.transform = `translateX(${distance}px)`
        break
      case "right":
        el.style.transform = `translateX(-${distance}px)`
        break
    }

    // Add revealed class when element is in view
    observer.observe(el)

    // Add CSS for revealed state
    const style = document.createElement("style")
    style.innerHTML = `
      .scroll-reveal.revealed {
        opacity: 1 !important;
        transform: translate(0, 0) !important;
      }
    `
    document.head.appendChild(style)
  })
})
