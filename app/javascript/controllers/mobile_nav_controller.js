import { Controller } from "@hotwired/stimulus"

// Manages the mobile navigation toggle state and resets it as viewports change.
export default class extends Controller {
  static targets = ["toggle", "panel", "openIcon", "closeIcon"]

  connect() {
    this.collapseOnDesktop = this.collapseOnDesktop.bind(this)
    this.resetBeforeCache = this.resetBeforeCache.bind(this)

    this.close()
    this.setupMediaQuery()
    document.addEventListener("turbo:before-cache", this.resetBeforeCache)
  }

  disconnect() {
    this.teardownMediaQuery()
    document.removeEventListener("turbo:before-cache", this.resetBeforeCache)
  }

  toggle(event) {
    event.preventDefault()
    this.isOpen ? this.close() : this.open()
  }

  open() {
    if (this.isOpen) return

    this.panelTarget.classList.remove("hidden")
    this.panelTarget.classList.add("block")

    this.toggleTarget?.setAttribute("aria-expanded", "true")
    this.showCloseIcon()
  }

  close() {
    if (!this.hasPanelTarget) return

    this.panelTarget.classList.add("hidden")
    this.panelTarget.classList.remove("block")

    this.toggleTarget?.setAttribute("aria-expanded", "false")
    this.showOpenIcon()
  }

  collapseOnDesktop(event) {
    if (event.matches) {
      this.close()
    }
  }

  resetBeforeCache() {
    this.close()
  }

  setupMediaQuery() {
    if (typeof window === "undefined" || !window.matchMedia) return

    this.mediaQuery = window.matchMedia("(min-width: 1024px)")
    this.addMediaQueryListener(this.mediaQuery, this.collapseOnDesktop)
  }

  teardownMediaQuery() {
    if (!this.mediaQuery) return

    this.removeMediaQueryListener(this.mediaQuery, this.collapseOnDesktop)
    this.mediaQuery = null
  }

  addMediaQueryListener(mediaQuery, handler) {
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler)
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handler)
    }
  }

  removeMediaQueryListener(mediaQuery, handler) {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener("change", handler)
    } else if (mediaQuery.removeListener) {
      mediaQuery.removeListener(handler)
    }
  }

  showOpenIcon() {
    if (this.hasOpenIconTarget) {
      this.openIconTarget.classList.remove("hidden")
    }
    if (this.hasCloseIconTarget) {
      this.closeIconTarget.classList.add("hidden")
    }
  }

  showCloseIcon() {
    if (this.hasCloseIconTarget) {
      this.closeIconTarget.classList.remove("hidden")
    }
    if (this.hasOpenIconTarget) {
      this.openIconTarget.classList.add("hidden")
    }
  }

  get isOpen() {
    return this.hasPanelTarget && !this.panelTarget.classList.contains("hidden")
  }
}
