import { Controller } from "@hotwired/stimulus"

// Handles simple modal dialogs: opening, closing, and background dismissal.
export default class extends Controller {
  static targets = ["overlay"]

  connect() {
    this.handleKeydown = this.handleKeydown.bind(this)
  }

  disconnect() {
    document.removeEventListener("keydown", this.handleKeydown)
    document.body.classList.remove("overflow-hidden")
  }

  open(event) {
    event.preventDefault()
    const name = event.params.name
    if (!name) return
    this.show(name)
  }

  close(event) {
    event?.preventDefault()
    const name = event?.params?.name || event?.target?.dataset.modalName
    if (!name) return
    this.hide(name)
  }

  background(event) {
    if (event.target !== event.currentTarget) return
    const name = event.currentTarget.dataset.modalName
    if (!name) return
    this.hide(name)
  }

  stop(event) {
    event.stopPropagation()
  }

  show(name) {
    const overlay = this.findOverlay(name)
    if (!overlay) return

    const wasClosed = !this.anyOpen()

    overlay.classList.remove("hidden")
    overlay.classList.add("flex")

    if (wasClosed) {
      document.body.classList.add("overflow-hidden")
      document.addEventListener("keydown", this.handleKeydown)
    }
  }

  hide(name) {
    const overlay = this.findOverlay(name)
    if (!overlay) return

    overlay.classList.add("hidden")
    overlay.classList.remove("flex")

    if (!this.anyOpen()) {
      document.body.classList.remove("overflow-hidden")
      document.removeEventListener("keydown", this.handleKeydown)
    }
  }

  handleKeydown(event) {
    if (event.key !== "Escape") return

    const openOverlay = this.overlayTargets.find(
      (overlay) => !overlay.classList.contains("hidden")
    )

    if (openOverlay) {
      this.hide(openOverlay.dataset.modalName)
    }
  }

  anyOpen() {
    return this.overlayTargets.some(
      (overlay) => !overlay.classList.contains("hidden")
    )
  }

  findOverlay(name) {
    return this.overlayTargets.find(
      (overlay) => overlay.dataset.modalName === name
    )
  }
}
