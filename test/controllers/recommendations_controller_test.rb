require "test_helper"

class RecommendationsControllerTest < ActionDispatch::IntegrationTest
  test "redirects guests to sign in" do
    get recommendations_url
    assert_redirected_to new_session_url
  end

  test "renders recommendations page for authenticated users" do
    user = users(:one)

    post session_url, params: { email_address: user.email_address, password: "password" }
    get recommendations_url

    assert_response :success
  end
end
