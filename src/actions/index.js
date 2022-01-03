// import jsonPlaceholder from '../apis/jsonPlaceholder';
// //we can use the pre-configured Axios instance to make a request inside of the Action Creator itself
//Lodash is a JavaScript library which provides utility functions for common programming tasks using the functional programming paradigm. 
import _ from 'lodash';
import jsonPlaceholder from "../apis/jsonPlaceholder"
//1. Call Action Creator that returns inner function
//2. Innerfunction will show up inside Redux thunk and get invoke with dispatch
//3. To make sure we don't do anything else inside of the action creator before we run FETCH_POSTS, the await keyword is used in front of dispatch(fetchPosts() );
///*******Below is the Combo Action Creator Method to make sure only one call per user ***************/
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    console.log("About to fetch posts");
    //whenever whe dispatch a function, redux thunk is going to pick it up and automatically invoke it and pass in dispatch as the first argument
    //the await keyword ensure that the api is call is completed before we do anything else inside of the fetchPostAndUsers action creator
   await dispatch(fetchPosts() );
   //go through all the posts and pull of just the userId
   //in this instance we do not need to use the await keyword because we already have the data to work with. 
//   const userIds = _.uniq(_.map(getState().posts, 'userId'))
//   userIds.forEach(id => dispatch(fetchUser(id)));
//   console.log(userIds);
//using lodash _.chain to get the unique userId Values
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value() 
   //this will have all the posts that we loaded up and caught inside of the reducer
//    getState().posts
//    console.log(getState().posts)
//    console.log('fetch posts!');
   //this console.log statement will illustrate that 
  // We do not progress down to the next line of code until
   //1. We have successfully fetched a list of posts
   //2. dispatched an action
   //3. And updated our reducer with all the fetched posts
}



//defining a function that is going to return a function
export const fetchPosts = () => async  dispatch => {
    // return async function(dispatch) {
        //inner function is going to make a request over to the API
        const response = await jsonPlaceholder.get('/posts')
        //this is particular to to React thunk in in that we do not return an action creator object here but rather use the dispatch function VVVVVVV
        // dispatch({ type: "FETCH_POSTS", payload: response })
        // we only care about the data on the response and not the headers or other info
        //then the dispatch will start the process of updating the reducers
        dispatch({ type: "FETCH_POSTS", payload: response.data })
    }

//We need to define a function outside of our action creator that is going to make the request and then dispatch the action
//We are going to memoize it outside of the action creator
//this is so it will only be memoized one time
//and will not be re-memoized every time we call the action creator of fetchUser
//This below VVV is a function that returns a function that calls _fetchUser with the argments of id and dispatch
//export const fetchUser = (id) => dispatch => {
    //_fetchUser(id, dispatch);
    // const repsonse = await jsonPlaceholder.get('/users/' + id);
    // const response = await jsonPlaceholder.get(`/users/${id}`);

    // dispatch({ type: 'FETCH_USER', payload: response.data  })
//}
//*********MEMOIZED VERSION OF THE _fetchUser FUNCTION***********************//
//the _ denotes a private function
//However this is not necessarily the best solution
//If you ever want to re-fetch a user like if the JSON data changes and you want to refetch you could not do that with this Action Creator. You would have to create a new action creator with the same logic that is not memoized
// const _fetchUser = _.memoize(async(id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: 'FETCH_USER', payload: response.data  })
// });
export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data  })
};


// export const fetchUser = function(id) {
//     //every time we call fetchUser we call a new version of the interior function and memoize it
//     //
//    return _.memoize(async function (dispatch)  {
//     // const repsonse = await jsonPlaceholder.get('/users/' + id);
//         const response = await jsonPlaceholder.get(`/users/${id}`);
//         dispatch({ type: 'FETCH_USER', payload: response.data  })
//     });
// }

//     // return async function(dispatch, getState) {
//         return async dispatch => {
//         //we can pass actions into the dispatch function
//         //The actions will be passed to all of the different middlewares
//         //Eventually they will be forwarded off to the reducers
//         //getState can be called on the redux store and return all of the data (or all of the state) in the Redux store
//         //with dispatch we can change any data we want
//         //with getState we can read or access the data or state
//         const response = await jsonPlaceholder.get('/posts');
//         //the payload property has all the data from our requests
//         dispatch({ type: 'FETCH_POSTS', payload: response });
//         //imagine we are trying to make a request inside the Thunk function
//         //1. Redux Thunk will invoke the function with the two arguments
//         //2. Inside of the function Thunk will wait for the API request to finish
//         //3. Once we get a response, the dispatch function will be used to manually dispatch and Action (With Redux Thunk we can manually dispatch an action in the future.)
//         //4. Once we dispatch the action it will flow back into dispatch
//         //5. dispatch is going to throw it right back into Redux Thunk
//         //6. Redux Thunk is going to say are you a function or an object
//         //7. Since it is now an object, and not a function, Redux Thunk is going to forward the object on to the Reducers
//         //Synopsis: With Redux Thunk we can return a function. If we do, that function will be invoked with the dispatch and getState arguments. With those two functions, we have unlimited power over our Redux Store. We can change any data and we can read any data, so that any moment in the future like after our API request completes, we can manually dispatch an action and update the data inside of the store.
//     }
//     //BAD APPROACHES!!!
//     // const response = await jsonPlaceholder.get('/posts');
//     // const promise = jsonPlaceholder.get('/posts');
//     // const promise = jsonPlaceholder.get('/posts');
//     // dispatch({ type: 'FETCH_POSTS' });
// //ES 2015 syntax is what actually gets executed inside the browser
//     //return {
//         //When we use Redux Thunk, we are not going to return any Actions from the inner function anymore
//         // type: 'FETCH_POSTS',
//         // payload: promise
//         // payload: response
//         //With the promise, By the time our action gets to a reducer, we won't have fetched our data.
//         // payload: promise
//     //};
// };
// // totally fine
// //You can still make normal Action Creators that Return Action Objects
// //With Redux Thunk, you just have the option to return a function as well
// // export const selectPost = () => {
// //     return {
// //         type: 'SELECT_POST'
// //     }
// // }
//VVVV Below is the abbreviated form of this 
// import jsonPlaceholder from '../apis/jsonPlaceholder';

// export const fetchPosts = () => async dispatch => {
//   const response = await jsonPlaceholder.get('/posts');

//   dispatch({ type: 'FETCH_POSTS', payload: response });
// };
