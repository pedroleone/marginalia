require "test_helper"

class LibraryControllerTest < ActionDispatch::IntegrationTest
  test "redirects guests to sign in" do
    get library_url
    assert_redirected_to new_session_url
  end

  test "renders library page for authenticated users" do
    user = users(:one)

    post session_url, params: { email_address: user.email_address, password: "password" }
    get library_url

    assert_response :success
  end
end
