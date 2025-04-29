document.addEventListener("DOMContentLoaded", () => {
  const featureComparisonContainer = document.getElementById("feature-comparison")
  if (!featureComparisonContainer) return

  // Feature comparison data
  const features = [
    {
      name: "VFX Engine",
      free: true,
      premium: true,
      description: "Zaawansowane efekty wizualne i modyfikacje graficzne",
      premiumExtra: "Wersja PRO z dodatkowymi efektami i opcjami konfiguracji",
    },
    {
      name: "Session Browser",
      free: true,
      premium: true,
      description: "Przeglądanie i dołączanie do sesji innych graczy",
      premiumExtra: "Zaawansowane filtrowanie i priorytetowe dołączanie",
    },
    {
      name: "Player Tracker",
      free: true,
      premium: true,
      description: "Śledzenie pozycji graczy na mapie",
      premiumExtra: "Rozszerzone informacje o graczach i historia aktywności",
    },
    {
      name: "Player Magnet",
      free: false,
      premium: true,
      description: "Przyciąganie innych graczy do swojej lokalizacji",
      premiumExtra: "Pełna kontrola nad przyciąganiem i odrzucaniem graczy",
    },
    {
      name: "Basic Protections",
      free: true,
      premium: true,
      description: "Podstawowa ochrona przed atakami innych graczy",
      premiumExtra: "Zaawansowane systemy ochrony i automatyczne blokowanie zagrożeń",
    },
    {
      name: "Advanced Protections",
      free: false,
      premium: true,
      description: "Zaawansowane systemy ochrony przed modderami",
      premiumExtra: "Pełna ochrona przed wszystkimi znanymi atakami i exploitami",
    },
    {
      name: "Teleport All",
      free: true,
      premium: true,
      description: "Teleportacja do wybranych lokacji",
      premiumExtra: "Niestandardowe lokacje i szybkie skróty teleportacji",
    },
    {
      name: "Antycheat Bypass",
      free: false,
      premium: true,
      description: "Omijanie systemów antycheat",
      premiumExtra: "Zaawansowany system omijania z automatycznymi aktualizacjami",
    },
    {
      name: "Custom Vehicles",
      free: false,
      premium: true,
      description: "Dostęp do niestandardowych pojazdów",
      premiumExtra: "Pełna biblioteka modyfikowanych pojazdów z unikalnymi właściwościami",
    },
    {
      name: "Priority Support",
      free: false,
      premium: true,
      description: "Priorytetowe wsparcie techniczne",
      premiumExtra: "Natychmiastowa pomoc i dedykowany kanał wsparcia",
    },
  ]

  // Create feature comparison UI
  let html = `
    <div class="feature-comparison-header">
      <h3 class="feature-comparison-title">Porównanie funkcji</h3>
      <div class="feature-comparison-tabs">
        <button class="feature-tab active" data-plan="premium">Premium</button>
        <button class="feature-tab" data-plan="free">Free</button>
      </div>
    </div>
    <div class="feature-comparison-content">
      <div class="feature-list">
  `

  // Add first 5 features
  features.slice(0, 5).forEach((feature) => {
    html += createFeatureItem(feature, "premium")
  })

  html += `
      </div>
      <button class="feature-toggle-button" id="feature-toggle">
        <span class="show-more">Pokaż wszystkie funkcje</span>
        <span class="show-less hidden">Pokaż mniej</span>
        <i class="fas fa-chevron-down show-more"></i>
        <i class="fas fa-chevron-up show-less hidden"></i>
      </button>
      <div class="feature-list-extended hidden">
  `

  // Add remaining features
  features.slice(5).forEach((feature) => {
    html += createFeatureItem(feature, "premium")
  })

  html += `
      </div>
      <div class="feature-comparison-cta">
        <button class="btn btn-primary animated-button">Kup Premium Teraz</button>
      </div>
    </div>
  `

  featureComparisonContainer.innerHTML = html

  // Toggle feature list
  const featureToggle = document.getElementById("feature-toggle")
  const featureListExtended = document.querySelector(".feature-list-extended")
  const showMoreElements = document.querySelectorAll(".show-more")
  const showLessElements = document.querySelectorAll(".show-less")

  if (featureToggle && featureListExtended) {
    featureToggle.addEventListener("click", () => {
      featureListExtended.classList.toggle("hidden")

      showMoreElements.forEach((el) => el.classList.toggle("hidden"))
      showLessElements.forEach((el) => el.classList.toggle("hidden"))
    })
  }

  // Switch between plans
  const featureTabs = document.querySelectorAll(".feature-tab")
  const featureItems = document.querySelectorAll(".feature-item")

  featureTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const plan = this.getAttribute("data-plan")

      // Update active tab
      featureTabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      // Update feature items
      updateFeatureItems(plan)
    })
  })

  function updateFeatureItems(plan) {
    const featureList = document.querySelector(".feature-list")
    const featureListExtended = document.querySelector(".feature-list-extended")

    featureList.innerHTML = ""
    featureListExtended.innerHTML = ""

    // Add first 5 features
    features.slice(0, 5).forEach((feature) => {
      featureList.innerHTML += createFeatureItem(feature, plan)
    })

    // Add remaining features
    features.slice(5).forEach((feature) => {
      featureListExtended.innerHTML += createFeatureItem(feature, plan)
    })
  }

  function createFeatureItem(feature, plan) {
    const isPremium = plan === "premium"
    const isAvailable = isPremium ? feature.premium : feature.free
    const itemClass = isAvailable
      ? isPremium
        ? "feature-item premium-feature"
        : "feature-item free-feature"
      : "feature-item disabled-feature"

    return `
      <div class="${itemClass}">
        <div class="feature-item-content">
          <div class="feature-item-header">
            <h4 class="feature-item-title">
              ${feature.name}
              ${isPremium && !feature.free ? '<span class="premium-badge">PREMIUM</span>' : ""}
            </h4>
          </div>
          <p class="feature-item-description">${feature.description}</p>
          ${isPremium && feature.premium ? `<p class="feature-item-extra">${feature.premiumExtra}</p>` : ""}
        </div>
        <div class="feature-item-status">
          ${
            isAvailable
              ? `<div class="feature-status-icon available"><i class="fas fa-check"></i></div>`
              : `<div class="feature-status-icon unavailable"><i class="fas fa-times"></i></div>`
          }
        </div>
      </div>
    `
  }
})
