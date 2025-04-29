document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button")
  const searchModal = document.getElementById("search-modal")
  const searchClose = document.getElementById("search-close")
  const searchInput = document.getElementById("search-input")
  const searchResults = document.getElementById("search-results")

  // Search data
  const searchData = [
    {
      title: "VFX Engine",
      description: "Zaawansowane efekty wizualne i modyfikacje graficzne",
      url: "#features",
      category: "Funkcje",
    },
    {
      title: "Player Magnet",
      description: "Przyciąganie innych graczy do swojej lokalizacji",
      url: "#features",
      category: "Funkcje",
    },
    {
      title: "Antycheat Bypass",
      description: "Omijanie systemów antycheat",
      url: "#features",
      category: "Funkcje",
    },
    {
      title: "Cennik",
      description: "Informacje o cenach i dostępnych pakietach",
      url: "#pricing",
      category: "Informacje",
    },
    {
      title: "Discord",
      description: "Dołącz do naszej społeczności na Discordzie",
      url: "#discord-integration",
      category: "Społeczność",
    },
    {
      title: "Showcase",
      description: "Zobacz ModzzMenu w akcji",
      url: "#showcase",
      category: "Media",
    },
    {
      title: "FAQ",
      description: "Często zadawane pytania",
      url: "#faq",
      category: "Pomoc",
    },
    {
      title: "Jak zainstalować ModzzMenu?",
      description: "Instrukcja instalacji menu",
      url: "#faq",
      category: "FAQ",
    },
    {
      title: "Czy ModzzMenu jest bezpieczne?",
      description: "Informacje o bezpieczeństwie menu",
      url: "#faq",
      category: "FAQ",
    },
  ]

  // Open search modal
  if (searchButton && searchModal) {
    searchButton.addEventListener("click", () => {
      searchModal.classList.add("active")
      if (searchInput) {
        searchInput.focus()
      }
    })
  }

  // Close search modal
  if (searchClose && searchModal) {
    searchClose.addEventListener("click", () => {
      searchModal.classList.remove("active")
    })

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchModal.classList.contains("active")) {
        searchModal.classList.remove("active")
      }
    })

    // Close on outside click
    searchModal.addEventListener("click", (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove("active")
      }
    })
  }

  // Keyboard shortcut (Ctrl+K)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      if (searchModal) {
        searchModal.classList.add("active")
        if (searchInput) {
          searchInput.focus()
        }
      }
    }
  })

  // Search functionality
  if (searchInput && searchResults) {
    searchInput.addEventListener("input", function () {
      const query = this.value.trim().toLowerCase()

      if (query === "") {
        // Show popular searches
        searchResults.innerHTML = `
          <div class="search-popular">
            <p class="search-popular-title">Popularne wyszukiwania:</p>
            <div class="search-popular-tags">
              ${["VFX Engine", "Cennik", "Instalacja", "Discord", "Bezpieczeństwo"]
                .map(
                  (term) => `
                <button class="search-popular-tag" data-term="${term}">${term}</button>
              `,
                )
                .join("")}
            </div>
          </div>
        `

        // Add event listeners to popular search tags
        const popularTags = document.querySelectorAll(".search-popular-tag")
        popularTags.forEach((tag) => {
          tag.addEventListener("click", function () {
            const term = this.getAttribute("data-term")
            searchInput.value = term
            searchInput.dispatchEvent(new Event("input"))
          })
        })
      } else {
        // Filter results
        const filtered = searchData.filter(
          (item) => item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
        )

        if (filtered.length > 0) {
          searchResults.innerHTML = filtered
            .map(
              (result) => `
            <div class="search-result-item" data-url="${result.url}">
              <div class="search-result-content">
                <div class="search-result-title">
                  <h4>${result.title}</h4>
                  <span class="search-result-badge">${result.category}</span>
                </div>
                <p class="search-result-description">${result.description}</p>
              </div>
              <div class="search-result-arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          `,
            )
            .join("")

          // Add event listeners to results
          const resultItems = document.querySelectorAll(".search-result-item")
          resultItems.forEach((item) => {
            item.addEventListener("click", function () {
              const url = this.getAttribute("data-url")
              window.location.href = url
              searchModal.classList.remove("active")
            })
          })
        } else {
          searchResults.innerHTML = `
            <div class="search-no-results">
              <p>Brak wyników dla "${query}"</p>
            </div>
          `
        }
      }
    })

    // Trigger input event to show popular searches
    searchInput.dispatchEvent(new Event("input"))
  }
})
