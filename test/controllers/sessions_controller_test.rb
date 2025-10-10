require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "renders the sign in form" do
    get new_session_url
    assert_response :success
  end

  test "successful sign in creates a persistent session" do
    assert_difference("Session.count", 1) do
      post session_url, params: { email_address: @user.email_address, password: "password" }
    end

    assert_redirected_to root_url
    assert_not_nil cookies["session_id"]
  end

  test "sign in with invalid credentials redirects back with alert" do
    assert_no_difference("Session.count") do
      post session_url, params: { email_address: @user.email_address, password: "wrong-password" }
    end

    assert_redirected_to new_session_path
    assert_equal "Try another email address or password.", flash[:alert]
    assert_nil response.cookies["session_id"]
  end

  test "successful sign in returns to stored location" do
    get home_url
    assert_redirected_to new_session_url
    assert_equal home_url, session[:return_to_after_authenticating]

    post session_url, params: { email_address: @user.email_address, password: "password" }

    assert_redirected_to home_url
    assert_nil session[:return_to_after_authenticating]
  end

  test "sign out destroys the current session" do
    post session_url, params: { email_address: @user.email_address, password: "password" }
    assert_not_nil cookies["session_id"]

    assert_difference("Session.count", -1) do
      delete session_url
    end

    assert_redirected_to root_path
    assert cookies["session_id"].blank?
  end
end
