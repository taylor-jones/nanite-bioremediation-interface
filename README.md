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
Make sure you have [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/en/) installed. Then, after cloning the repo, run (from within the cloned directory):
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
cd app
gulp
```
At that point, the app can be accessed at [http://localhost:7000](http://localhost:7000)


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
Using this method, the app is at [http://localhost:5000](http://localhost:5000)

<br><hr><br>

## Serving
If you'd like to serve the app using _forever_, then you can run:
```
npm run forever
```
...and the app will start on [http://localhost:5000](http://localhost:5000)

<br><hr><br>

## Testing
The app uses [Jest](https://jestjs.io/) for testing. The tests are located in [app/test](https://github.com/taylor-jones/cs361-bioremediation/tree/master/app/test). 
First, make sure you have jest installed globally:
```
npm i -g jest
```
Then, anytime you want to run the tests:
```
npm run test
```
