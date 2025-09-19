class RegistrationsController < ApplicationController
  allow_unauthenticated_access

  def new
    @user = User.new
  end

  def create
    @user = User.new(params.expect(user: %i[email_address password password_confirmation]))
    if @user.save
      start_new_session_for(@user)
      redirect_to root_path, notice: "Signed up successfully"
    else
      flash[:alert] = @user.errors.full_messages.to_sentence
      render :new, status: :unprocessable_entity
    end
  end
end
