# CS 361 - Bioremediation

This repository stores the project files for the CS 361 Bioremediation group project at Oregon State University.


## What's in it?
Hopefully, we're finding a common ground without too much of a learning curve for anyone. Here's what's involved so far:
- Node
- Express
- EJS
- Bootstrap
- jQuery (because of bootstrap)


<br>

**NOTE:** [There's a task list here](https://github.com/taylor-jones/cs361-bioremediation/projects/1) that we can use to keep track of our progress, if you all would like.


<br><hr><br>

## Setup
Make sure you have npm or yarn installed. Then, after cloning the repo, run:
```
cd app
npm install
```
or
```
cd app
yarn install
```

<br><hr><br>

## Developing
### Live Reloading

If you'd like, you can make use of live-reloading. In order to use this, you just need to make sure to have gulp-cli installed globally.
```
npm i -g gulp-cli
```

You can then just use the following command to run the application with live-reloading:
```
gulp
```
At that point, the app can be accessed at 
```
localhost:7000
```


<br>

### Without Live Reloading
If you don't want to install gulp-cli, you can use one of the following commands to run the appllication without live-reloading:

```
npm start
```
or
```
yarn start
```
Using this method, the app is at
```
localhost:5000
```

<br><hr><br>

## Serving
If you'd like to serve the app using _forever_, then you can run:
```
npm run forever
```
...and the app will start on localhost:5000.