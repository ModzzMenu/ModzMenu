document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Progress bar
  function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollProgress = (scrollTop / scrollHeight) * 100

    const progressBar = document.querySelector(".progress-bar")
    if (progressBar) {
      progressBar.style.width = `${scrollProgress}%`
    }
  }

  window.addEventListener("scroll", updateProgressBar)
  updateProgressBar()

  // Scroll to top button
  const scrollToTopButton = document.getElementById("scroll-to-top")

  function toggleScrollToTopButton() {
    if (document.documentElement.scrollTop > 500) {
      scrollToTopButton.style.display = "flex"
    } else {
      scrollToTopButton.style.display = "none"
    }
  }

  if (scrollToTopButton) {
    window.addEventListener("scroll", toggleScrollToTopButton)
    toggleScrollToTopButton()

    scrollToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Notification banner
  const notificationBanner = document.getElementById("notification-banner")
  const notificationClose = document.getElementById("notification-close")
  const notificationLater = document.getElementById("notification-later")
  const notificationDownload = document.getElementById("notification-download")

  if (notificationBanner && notificationClose) {
    const bannerClosed = localStorage.getItem("notification_banner_closed")

    if (!bannerClosed) {
      setTimeout(() => {
        notificationBanner.classList.remove("hidden")
      }, 2000)
    }

    notificationClose.addEventListener("click", () => {
      notificationBanner.classList.add("hidden")
      localStorage.setItem("notification_banner_closed", "true")
    })

    if (notificationLater) {
      notificationLater.addEventListener("click", () => {
        notificationBanner.classList.add("hidden")
        localStorage.setItem("notification_banner_closed", "true")
      })
    }

    if (notificationDownload) {
      notificationDownload.addEventListener("click", () => {
        window.location.href = "#"
        notificationBanner.classList.add("hidden")
        localStorage.setItem("notification_banner_closed", "true")
      })
    }
  }

  // Download counter animation
  const downloadCounter = document.getElementById("download-counter")
  let count = 12847

  if (downloadCounter) {
    const countElement = downloadCounter.querySelector(".download-counter-value")

    downloadCounter.addEventListener("click", () => {
      downloadCounter.classList.add("pulse-anim")
      setTimeout(() => {
        downloadCounter.classList.remove("pulse-anim")
      }, 1000)
    })

    // Simulate random increase in downloads
    setInterval(() => {
      count += Math.floor(Math.random() * 3) + 1
      if (countElement) {
        countElement.textContent = formatNumber(count)
      }
    }, 30000)
  }

  // Format number with dots as thousand separators
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  // Copy Discord invite
  const copyDiscordButton = document.getElementById("copy-discord")

  if (copyDiscordButton) {
    copyDiscordButton.addEventListener("click", () => {
      const discordInvite = "discord.gg/modzzmarket"
      navigator.clipboard.writeText(discordInvite)

      // Show copied message
      const originalText = copyDiscordButton.innerHTML
      copyDiscordButton.innerHTML = '<i class="fas fa-check"></i> <span>Skopiowano!</span>'
      copyDiscordButton.classList.add("copied")

      setTimeout(() => {
        copyDiscordButton.innerHTML = originalText
        copyDiscordButton.classList.remove("copied")
      }, 2000)
    })
  }

  // Video thumbnails
  const videoThumbnails = document.querySelectorAll(".video-thumbnail")

  videoThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const videoId = this.getAttribute("data-video-id")
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
    })
  })

  // Initialize scroll reveal
  initScrollReveal()
})

// Scroll reveal functionality
function initScrollReveal() {
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
}
