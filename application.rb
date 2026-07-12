require 'sinatra'
require 'png_to_pixil'

get '/healthcheck' do
  'OK'
end

get '/' do
  erb :index
end

post '/upload' do
  unless params[:file] &&
      (input_file = params[:file][:tempfile]) &&
      (input_file_name = params[:file][:filename])
    redirect '/'
    return
  end

  output_file_name = input_file_name.sub(/\.[^.]+$/, '.pixil')
  content_type 'application/octet-stream'
  response['Content-Disposition'] = 'attachment; filename="%s"' % output_file_name
  PngToPixil::Converter.new(File.open(input_file)).to_pixil.to_json
end
