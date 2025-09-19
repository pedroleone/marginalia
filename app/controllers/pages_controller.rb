class PagesController < ApplicationController
    allow_unauthenticated_access only: :index

    def index
      if authenticated?
        redirect_to home_path
      else
        render :index
      end
    end
    def home
    @library = {
      books: [
        {
          id: "kindred",
          status: "reading",                       # reading | finished | dropped | on_hold
          title: "Kindred",
          author: "Octavia E. Butler",
          cover_url: "https://placehold.co/400x600?text=Kindred",
          tags: [ "Science Fiction", "Time Travel", "Classic" ],
          category: "Fiction",                     # use :category, avoid STI 'type'
          reading_method: "book",                  # book | ebook | audiobook
          pace_phrase: "You’re slightly ahead of pace—nice rhythm.",
          progress: {
            current_page: 180,
            total_pages: 300,
            percent: 60
          },
          days_reading: 12,
          estimated_days_to_finish: 5
        },
        {
          id: "nonviolent_communication",
          status: "reading",
          title: "Nonviolent Communication",
          author: "Marshall B. Rosenberg",
          cover_url: "https://placehold.co/400x600?text=Nonviolent+Communication",
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
        }
      ]
    }
  end
end
