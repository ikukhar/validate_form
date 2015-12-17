class PageController < ApplicationController
  def index
    # code
  end

  def submit_form
    notif = [:success, :notice, :danger, :alert][rand(4)]
    flash[notif] = notif.to_s.capitalize +
                   ' for ' +
                   params[:first_name] +
                   ' ' +
                   params[:second_name]

    redirect_to root_path
  end
end
