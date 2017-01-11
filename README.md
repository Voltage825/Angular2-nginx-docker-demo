# Angular 2 in Nginx in Docker Demo :whale:

The purpose for this Demo Repo is to have a basic angular 2 app running in nginx and then building a Docker container around all that. This is a POC and a quick guide on how to get it going.

#### The Technologies Used
* Angular 2 - [Official Site](https://angular.io/)
* Angular CLI - [Official Site](https://cli.angular.io/)
* Docker - [Official Site](https://www.docker.com/)
* Nginx - [Official Site](https://www.nginx.com/)

## Get the Prerequisites

### Node

Node.js and npm are essential to Angular development. Node is a JavaScript development platform and NPM is it's Package manager. 
    
<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
Get it now</a> if it's not already installed on your machine.
 
**Verify that you are running at least node `v4.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

We recommend [nvm](https://github.com/creationix/nvm) for managing multiple versions of node and npm.

### Angular CLI

Angular CLI is a project aimed at simplifying the process of developing in Angular. It provides you with a command line interface for most common You can read about the Angular CLI from [Official Site](https://cli.angular.io/) and the Repo is [here](https://github.com/angular/angular-cli).

You can install the CLI using 
```bash
npm install -g angular-cli
```

### Docker

Docker is a containerization platform that you can install from the [Official Site](https://www.docker.com/). Make sure you have taken at least a tutorial on how to use Docker before continuing.

## Creating Project

Open your terminal and navigate to the directory you want to work in. Remember that we will be using the CLI, therefore when we crate the project the project's name will be placed in this folder.
e.g. navigate to `Workspace/`, create the project and you will get `Workspace/your-project-name`.

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.24.

### Step 1:
We need to create the project using the angular CLI.

In your terminal use the syntax `ng new <<project-name>> ` to create your project. For me it was `ng new Angular2-nginx-docker-demo`. Then change into the newly created directory.

### (optional) Commit to git or Remove git files
Remove: If you like to remove the git repo, you may by using `rm -rf .git` on GNU or `rd .git /s /q` on windows.

Commit: follow your guide for your flavor of git. For GitHub it will look something like this:
```bash
git remote add origin git@github.com:<<Your_user_name>>/<<Your_repo>>.git
git push -u origin master
```

### Step 2:
Serve your app locally to see that everything is running correctly. Use `ng serve` to start the dev webserver locally on port `:4200`. Navigate there using your browser [http://localhost:4200/](http://localhost:4200/).
**The app will automatically reload if you change any of the source files.**

### Step 3:
Develop your application.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.
This will give you a very good basic scaffolding for your component. Edit it to your needs.
There a many angular 2 tutorials available on the net mainly [the official Docs](https://angular.io/docs/ts/latest/), but for convenience you can use the CLI to generate code for you.
Take a look at the [reference](https://cli.angular.io/reference.pdf) to see what blueprints you can generate. 

### Step 4:

Testing also comes out the box with the CLI. You will need notice when developing your components with the CLI, the CLI will generate a *.spec.ts file, these are the unit tests. By default they are [jasmine](https://jasmine.github.io/2.4/introduction.html).
You will find a tutorial on the official Docs](https://angular.io/docs/ts/latest/) on how to use these tests.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Step 5:

Build the project using the CLI.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Step 6:

Add Docker and nginx to the mix. We begin by adding a "Dockerfile" file and a "nginx.conf" file to our project directory.

The Dockerfile will create an image from the default nginx container and place our **built** resources into the container. The Dockerfile should look like:
```Dockerfile
FROM nginx

RUN mkdir /etc/nginx/logs && touch /etc/nginx/logs/static.log

ADD ./nginx.conf /etc/nginx/conf.d/default.conf
ADD /dist /www
```

We will be using the setting from [here](https://github.com/h5bp/server-configs-nginx/blob/master/h5bp/location/expires.conf). You can customize it however you want but for this example the configuration file should look like:

```
server {
    root /www;

    location / {
      autoindex on;
    }

    # Log
    location ~* \.(?:manifest|appcache|html?|xml|json)$ {
      expires -1;
      access_log logs/static.log;
    }

    # Feed
    location ~* \.(?:rss|atom)$ {
      expires 1h;
      add_header Cache-Control "public";
    }

    # Media: images, icons, video, audio, HTC
    location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
      expires 1M;
      access_log off;
      add_header Cache-Control "public";
    }

    # CSS and Javascript
    location ~* \.(?:css|js)$ {
      expires 1y;
      access_log off;
      add_header Cache-Control "public";
    }
}
```

### Step 7:

Build site for production environment and build Docker image.
- First build your project using the CLI using the `ng build -prod` command.
- Then if you have a Docker account you can build your image using `docker build -t <<your_user_name>>/<<your_project_name>> .`, if you don't have an account you can use `wnameless` as a username.
- Now run the Docker image `docker run -d -p 8080:80 --name <container_name>> <<your_user_name>>/<<your_project_name>>`.
- You can now access your app at [http://localhost:8080/](http://localhost:8080/)

## Notes
- You should always do all isolation tests and e2e tests before compiling. 
- You should not be testing your app in the Docker environment. 
- And all development should be done in the default local serve and not the Docker environment.
