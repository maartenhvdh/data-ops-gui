# Kontent.ai data-ops interface

> [!IMPORTANT]  
> This tool is currently under development. Some data-ops features can result in irreversible changes to your Kontent.ai environment, make sure you familiarize yourself with [data-ops CLI documentation](https://github.com/kontent-ai/data-ops) and use the tool at your own risk.
> 
> Currently available features:
> * syncModel > run (only between environments)

## About

A React GUI layer on top of the [data-ops CLI](https://github.com/kontent-ai/data-ops). Aims to provide the same level of functionality through a user-friendly interface. All features are documented in the CLI repository.

## Running and deployment

You can run the tool either locally or deploy it to Netlify, using a quick deployment option described below.

### Running locally

Clone the repository and install all dependencies, then start the local development server.

```
npm i
npm run dev:functions
```


### Quick Deploy on Netlify

Clicking on the below button will guide you through the deployment process and also create a copy of the repository in your account.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kontent-ai/data-ops-gui#NODE_VERSION=20&AWS_LAMBDA_JS_RUNTIME=nodejs20.x)

The tool makes use of Netlify functions to invoke `data-ops` methods. Deployment on other platforms requires adjustment to the API layer.