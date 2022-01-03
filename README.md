# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Simple blog App overview:
1. Inside root.js file import redux-thunk
2. thunk was passed to the Redux store through the use of applyMiddleware(thunk)
3. call applyMiddleware from the Redux library
4. pass the result of that to the createStore() call
5. When the middleware of Redux thunk is applied, any time we dipatch an action
the action will be sent to Redux thunk, as the Middleware
6. After it is sent to Redux thunk, it is sent to all of the different reducers
7. With thunk as middleware, action creators are not restricted to returning objects but can also return a function
8. If a function is returned, like say for an API call, it would be called with the dispatch and getState arguments, which gives total control over changing or getting information from the Redux store
9. The action creator will look something like:
    export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch ({ type: 'FETCH_POSTS', payload: response.data });
    };
    the ideas is for a function to return a function:
    function() {
        return function() {

        }
    }
10. You can also use an action creator that calls other action creators:
    here is an example using the lodash library
        export const fetchPostsAndUsers = () => async (dispatch, getState) => {
            await dispatch(fetchPosts());

            _.chain(getState().posts)
                .map('UserId')
                .uniq()
                .forEach(id => dispatch(fetchUser(id)))
                .value();
        }
11. Reducers that keep track of state:
        export default (state = [], action) => {
            switch (action.type) {
                case 'FETCH_USER':
                    return [ ...state, action.payload];
                default: 
                    return state;
            }
        };
12. For reducers, the first argument is referred to as state, which is whatever is returned from the reducer last time it ran
13. A switch statement is commonly used for reducers
14. Anytime new data is returned, we need to return a new array, object, or string, number so that Redux will realize we made a change to the data inside the application
15. As seen in the default part of the switch statement, if the same object or array is returned, Redux will not update the state and the application will not re-render
