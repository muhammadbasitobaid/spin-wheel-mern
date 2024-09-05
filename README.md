# :rocket: Wheelspinner(prod/dev).

# :whale: Docker

Boilerplate now is fully usable with docker, it integrate the MongoDB database, the React/Redux frontend and NodeJS/Express backend.

If you do not have docker: <https://docs.docker.com/get-docker/>

Docker allows to deloy the app in docker containers in one line in the CLI.

## Environment variables

You have to set the following environment variables in `server.dev.env` file (rename server.example.env to server.dev.env):

- SENDGRID_API_KEY, the backend uses Send Grid to send emails, you can register and get a free key on their website: <https://sendgrid.com/>. :warning: You cannot use the app without a key. Validation links are sent in http not https, you can modified that in server/routes/auth.js if you want to go https in deployment.

- SESSION_KEY, it is the secret key that is used to compute the hash of sessions. It is important to use a strong key: <https://cloud.google.com/network-connectivity/docs/vpn/how-to/generating-pre-shared-key>.

- SENDING_EMAIL, the email address you want to use to send confirmation email to the user.

- GOOGLE_CLIENT_ID

- GOOGLE_CLIENT_SECRET

- MONGO_URI

- PORT

## Development

in the root directory:

`docker compose up --build`

It supports hot reloading for both the frontend and backend.

## Production

Set `server.prod.env` and `client.prod.env` files.

Note: `server.prod.env` is used at runtime and can be defined in docker-compose directly, `client.prod.env` is used at docker image build time, to do so we define env for the docker-compose parser through `--env-file` then pass the envs to docker build through arguments.

in the root directory:

`docker compose -f docker-compose.prod.yml --env-file client.prod.env up --build`

Frontend app uses an Nginx server to deliver static files.

You may want to use the flag `--remove-orphans`

To deploy on Heroku refer to their documentation:
<https://devcenter.heroku.com/categories/deploying-with-docker>

## :computer: Boilerplate

MERN Stack with advanced authentication :

- Email verification (Token Based) with resend/reset option, Login with forgot password feature.

- Server side sessions.

- Docker for development and production with hot reloading.

- Mongodb.

- Express.

- React/Redux based on Create React App.

- React Hooks.

- Nodejs.

- Typescript.

- Passport-js local.

- Sendgrid API for emails.
