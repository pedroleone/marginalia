require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get home_url
    assert_redirected_to new_session_url
  end
end
