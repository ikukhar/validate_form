Rails.application.routes.draw do

  root 'page#index'
  post 'submit_form' => 'page#submit_form'
end
