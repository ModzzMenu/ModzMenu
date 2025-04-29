document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")

    if (question && answer) {
      // Add padding to answer content
      const answerContent = document.createElement("div")
      answerContent.innerHTML = answer.innerHTML
      answer.innerHTML = ""
      answer.appendChild(answerContent)

      question.addEventListener("click", () => {
        // Toggle active class
        item.classList.toggle("active")

        // Set max-height for animation
        if (item.classList.contains("active")) {
          answer.style.maxHeight = answer.scrollHeight + "px"
        } else {
          answer.style.maxHeight = "0"
        }

        // Toggle icon
        const icon = question.querySelector("i")
        if (icon) {
          icon.classList.toggle("fa-chevron-down")
          icon.classList.toggle("fa-chevron-up")
        }
      })
    }
  })
})
