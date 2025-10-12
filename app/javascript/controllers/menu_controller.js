import { Controller } from "@hotwired/stimulus"

// Controls the overflow menu used for secondary actions.
export default class extends Controller {
  static targets = ["panel", "trigger"]

  connect() {
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.handleEscape = this.handleEscape.bind(this)
  }

  toggle(event) {
    event.preventDefault()
    this.isOpen ? this.close() : this.open()
  }

  open() {
    if (this.isOpen) return

    this.panelTarget.classList.remove("hidden")
    this.panelTarget.classList.add("block")

    document.addEventListener("click", this.handleOutsideClick)
    document.addEventListener("keydown", this.handleEscape)

    this.triggerTarget?.setAttribute("aria-expanded", "true")
  }

  close() {
    if (!this.isOpen) return

    this.panelTarget.classList.add("hidden")
    this.panelTarget.classList.remove("block")

    document.removeEventListener("click", this.handleOutsideClick)
    document.removeEventListener("keydown", this.handleEscape)

    this.triggerTarget?.setAttribute("aria-expanded", "false")
  }

  handleOutsideClick(event) {
    if (!this.element.contains(event.target)) {
      this.close()
    }
  }

  handleEscape(event) {
    if (event.key === "Escape") {
      this.close()
    }
  }

  disconnect() {
    this.close()
  }

  get isOpen() {
    return !this.panelTarget.classList.contains("hidden")
  }
}
