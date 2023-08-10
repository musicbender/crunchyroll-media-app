# Solution

## Media Data Store

This is the mobx store where we interact with the media service (a mock API), use RxJs to handle these mock async calls using observables, and maintain state around these actions.

I decided to use makeAutoObservable to keep the store clean and I didn't need any special overrides.

For the read/get action of getting media data, I decided to persist a subscription by converting a mobx observable into an RxJs observable stream. I store this subscription to mobx state so I can trigger it again later. I made sure to clean up this if the store becomes unobserved.

For all write/post actions, I created reuseable subscription logic. Once finished, it calls an action to update mobx state which can be used by the consuming react components.

## Mock API

I decided to mock a REST API using the MediaService and persisting with Local Storage. This seemed like the simpliest way to mock API data responses, but also persist the data so we had a working application. Should local storage normally be used as a database like this? Absolutely not. For the sake of this project it fit my needs.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
