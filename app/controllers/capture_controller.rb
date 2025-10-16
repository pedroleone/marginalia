class CaptureController < ApplicationController
  def index
    @books = books
  end

  private

  def books
    [
      Book.new(
        id: "kindred",
        status: "reading",
        title: "Kindred",
        author: "Octavia E. Butler",
        tags: [ "Science Fiction", "Time Travel", "Classic" ],
        category: "Fiction",
        reading_method: "book",
        pace_phrase: "You’re slightly ahead of pace—nice rhythm.",
        progress: {
          current_page: 180,
          total_pages: 300,
          percent: 60
        },
        days_reading: 12,
        estimated_days_to_finish: 5
      ),
      Book.new(
        id: "nonviolent_communication",
        status: "reading",
        title: "Nonviolent Communication",
        author: "Marshall B. Rosenberg",
        tags: [ "Communication", "Psychology", "Self-Help" ],
        category: "Nonfiction",
        reading_method: "ebook",
        pace_phrase: "Pace is a bit slow—try short daily sprints.",
        progress: {
          current_page: 72,
          total_pages: 264,
          percent: 27
        },
        days_reading: 20,
        estimated_days_to_finish: 12
      )
    ]
  end
end
