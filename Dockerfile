FROM ruby:2.7.1-alpine

RUN apk add --update --no-cache bash curl git

WORKDIR /app

COPY Gemfile Gemfile.lock /app/
RUN bundle install

COPY . /app/

EXPOSE 3000

CMD ["bundle", "exec", "rackup", "-o", "0.0.0.0", "-p", "3000"]
