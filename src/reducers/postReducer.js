export default (state = [], action) => {
    //bad!
    //return document.querySelector('input');
    //return axios.get('/posts');
    //good 
    //return state + action
    //the idea is to keep the reducer pure!
    // return 123;
    //post reducer return a list that we have maintained from the JSON API
    //The first time it gets called it will return an empty array
    // if (action.type === "FETCH_POSTS") {
    //     return action.payload;
    // }
        //If we ever see an action that does not have the type of FETCH_POSTS the function will not do anything except return the existing state. 
//     return state;
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload;
        default: 
            return state;
    }
};
