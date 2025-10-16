require "erb"

class Book < Data.define(
  :id,
  :status,
  :title,
  :author,
  :cover_url,
  :tags,
  :category,
  :reading_method,
  :pace_phrase,
  :progress,
  :days_reading,
  :estimated_days_to_finish
)
  PLACEHOLDER_BASE_URL = "https://placehold.co/400x600?text="
  DEFAULT_PLACEHOLDER_TEXT = "Book-Cover"

  class << self
    def new(**attributes)
      super(**{ cover_url: nil }.merge(attributes))
    end
  end

  def tags
    Array(super).compact
  end

  def current_page
    progress.fetch(:current_page, 0)
  end

  def total_pages
    progress.fetch(:total_pages, 0)
  end

  def percent_complete
    return progress[:percent] if progress[:percent]

    total = total_pages.to_f
    return 0 if total <= 0

    ((current_page.to_f / total) * 100).round
  end

  def cover_url
    super.presence || placeholder_cover_url
  end

  private

  def placeholder_cover_url
    text = title.presence || DEFAULT_PLACEHOLDER_TEXT
    "#{PLACEHOLDER_BASE_URL}#{ERB::Util.url_encode(text)}"
  end
end
