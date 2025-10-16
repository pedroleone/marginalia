class PagesController < ApplicationController
  allow_unauthenticated_access only: :index

  def index
    if authenticated?
      redirect_to capture_path
    else
      render :index
    end
  end
end
