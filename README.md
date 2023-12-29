# Shopify Sync Inventory

## Getting started

### Requirements

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).

### Installing the template

This template can be installed using your preferred package manager:

Using yarn:

```shell
yarn create @shopify/app --template=node
```

Using npm:

```shell
npm init @shopify/app@latest -- --template=node
```

Using pnpm:

```shell
pnpm create @shopify/app@latest --template=node
```

This will clone the template and install the required dependencies.

#### Local Development

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects to an app in your Partners dashboard. It provides environment variables, runs commands in parallel, and updates application URLs for easier development.

You can develop locally using your preferred package manager. Run one of the following commands from the root of your app.

Using yarn:

```shell
yarn dev
```

Using npm:

```shell
npm run dev
```

Using pnpm:

```shell
pnpm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development.

## Deployment

You can follow the deployment procedure from the shopify for [Fly.io](https://shopify.dev/docs/apps/deployment/web).

### Fly.toml

Change the ```fly.toml``` file according to your needs. You can change the ```HOST, PORT, SCOPES, SHOPIFY_API_KEY``` according the the url given by fly.io and app you have created on the shopify. One thing to note is that ```PORT``` and ```internal_port```  should always be same.

### Configuration

If you need to change the configuration of the server. You can use this command. Before that make sure you have installed fly.io and logged in.

```shell
flyctl launch
```

Step 2 would be pushing your env variables to fly.io. Make sure to change the values.

```shell
flyctl secrets set SHOPIFY_API_SECRET=<SHOPIFY_APP_SECRET> AWS_ACCESS_KEY=<AWS_ACCESS_KEY> AWS_SECRET_KEY=<AWS_SECRET_KEY> REGION=<AWS_REGION> SQS_QUEUE=<AWS_SQS_QUEUE> DB_NAME=<MONGO_COLLECTION_NAME> DB_CONN_STRING=<MONGO_CONNECTION_STRING>
```

And lastly, you need to deploy your applications and for that use this:

```shell
flyctl deploy --build-arg SHOPIFY_API_KEY=<SHOPIFY_API_KEY> --remote-only
```

### Build

The frontend is a single page app. It requires the `SHOPIFY_API_KEY`, which you can find on the page for your app in your partners dashboard. Paste your app’s key in the command for the package manager of your choice:

Using yarn:

```shell
cd web/frontend/ && SHOPIFY_API_KEY=REPLACE_ME yarn build
```

Using npm:

```shell
cd web/frontend/ && SHOPIFY_API_KEY=REPLACE_ME npm run build
```

Using pnpm:

```shell
cd web/frontend/ && SHOPIFY_API_KEY=REPLACE_ME pnpm run build
```

You do not need to build the backend.

## Hosting

When you're ready to set up your app in production, you can follow [our deployment documentation](https://shopify.dev/docs/apps/deployment/web) to host your app on a cloud provider like [Heroku](https://www.heroku.com/) or [Fly.io](https://fly.io/).

When you reach the step for [setting up environment variables](https://shopify.dev/docs/apps/deployment/web#set-env-vars), you also need to set the variable `NODE_ENV=production`.
