require "test_helper"

class CaptureControllerTest < ActionDispatch::IntegrationTest
  test "redirects guests to sign in" do
    get capture_url
    assert_redirected_to new_session_url
  end

  test "renders capture page for authenticated users" do
    user = users(:one)

    post session_url, params: { email_address: user.email_address, password: "password" }
    get capture_url

    assert_response :success
  end
end
