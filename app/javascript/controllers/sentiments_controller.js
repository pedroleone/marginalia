import { Controller } from "@hotwired/stimulus"

// Manages custom sentiment creation within the quick capture form.
export default class extends Controller {
  static targets = ["list", "addButton", "modal", "input", "error"]
  static values = { name: String }

  connect() {
    this.handleKeydown = this.handleKeydown.bind(this)
  }

  disconnect() {
    document.removeEventListener("keydown", this.handleKeydown)
  }

  openModal(event) {
    event.preventDefault()
    this.showModal()
  }

  closeModal(event) {
    event?.preventDefault()
    this.hideModal()
  }

  background(event) {
    if (event.target === this.modalTarget) {
      this.hideModal()
    }
  }

  stop(event) {
    event.stopPropagation()
  }

  confirm(event) {
    event?.preventDefault()
    event?.stopPropagation()
    const label = this.inputTarget.value.trim()

    if (!label) {
      this.showError("Please enter a sentiment.")
      return
    }

    const slug = this.uniqueSlugFor(label)
    const existingInput = this.findInputByValue(slug)

    if (existingInput) {
      existingInput.checked = true
      existingInput.dispatchEvent(new Event("change", { bubbles: true }))
      this.hideModal()
      return
    }

    this.addSentimentOption(label, slug)
    this.hideModal()
  }

  showModal() {
    this.clearError()
    this.inputTarget.value = ""

    this.modalTarget.classList.remove("hidden")
    this.modalTarget.classList.add("flex")

    document.addEventListener("keydown", this.handleKeydown)

    setTimeout(() => {
      this.inputTarget.focus()
    }, 50)
  }

  hideModal() {
    this.clearError()
    if (this.hasInputTarget) {
      this.inputTarget.value = ""
    }

    this.modalTarget.classList.add("hidden")
    this.modalTarget.classList.remove("flex")

    document.removeEventListener("keydown", this.handleKeydown)
  }

  handleKeydown(event) {
    if (event.key === "Escape") {
      this.hideModal()
    }
  }

  addSentimentOption(label, value) {
    const option = document.createElement("label")
    option.className = "cursor-pointer"

    const input = document.createElement("input")
    input.type = "radio"
    input.name = this.nameValue
    input.value = value
    input.checked = true
    input.className = "peer sr-only"
    input.dataset.action = "change->sentiments#selectRadio"

    const wrapper = document.createElement("div")
    wrapper.className = "flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-600 shadow-sm transition peer-checked:border-sky-300 peer-checked:bg-sky-50 peer-checked:text-slate-700 hover:border-sky-200 hover:bg-sky-50"

    const text = document.createElement("span")
    text.textContent = label

    const badge = document.createElement("span")
    badge.className = "hidden items-center rounded-full bg-sky-500 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white peer-checked:inline-flex"
    badge.textContent = "Selected"

    wrapper.appendChild(text)
    wrapper.appendChild(badge)
    option.appendChild(input)
    option.appendChild(wrapper)

    const addButtonElement = this.addButtonTarget
    this.listTarget.insertBefore(option, addButtonElement)

    input.dispatchEvent(new Event("change", { bubbles: true }))
  }

  selectRadio(event) {
    const selectedInput = event.target
    if (!selectedInput.checked) return

    this.listTarget
      .querySelectorAll("input[type='radio']")
      .forEach((input) => {
        if (input !== selectedInput) {
          input.checked = false
        }
      })
  }

  uniqueSlugFor(label) {
    const base = this.slugify(label)
    let candidate = base || "custom-sentiment"
    let index = 2

    while (this.findInputByValue(candidate)) {
      candidate = `${base || "custom-sentiment"}-${index}`
      index += 1
    }

    return candidate
  }

  slugify(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  findInputByValue(value) {
    return Array.from(this.listTarget.querySelectorAll("input[type='radio']")).find(
      (input) => input.value === value
    )
  }

  showError(message) {
    if (!this.hasErrorTarget) return
    this.errorTarget.textContent = message
    this.errorTarget.classList.remove("hidden")
  }

  clearError() {
    if (!this.hasErrorTarget) return
    this.errorTarget.textContent = ""
    this.errorTarget.classList.add("hidden")
  }
}
