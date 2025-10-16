require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "renders landing page for guests" do
    get root_url
    assert_response :success
  end

  test "redirects authenticated users to capture" do
    user = users(:one)

    post session_url, params: { email_address: user.email_address, password: "password" }
    get root_url

    assert_redirected_to capture_url
  end
end
