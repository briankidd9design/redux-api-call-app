import React from 'react';
import { connect } from 'react-redux';
// import { fetchUser } from '../actions/';
//1. Create the fetchUser action creator and hook it up to the PostList component
//2. Make sure to call a connect() method at the end of the code in the export. 
//in it you will pass the mapStateToProps() method and also the ActionCreators, 
//you will then invoke the function with an argument of the component, in this case that will be UserHeader
//The idea of the UserHeader component is to show one user on the screen
class UserHeader extends React.Component {
//when using the combined action creator fetchPostsAndUsers, we do not need UserHeader to fetch its own data
    // componentDidMount() {
    //     this.props.fetchUser(this.props.userId);
    // }

    render () {
        //Let's destructure the user off
    //   const user = this.props.user
    const { user } = this.props;
        // console.log(this.props.posts)
        //find is a built-in-method on JavaScript arrays
        //We can call it with a function
        // const user = this.props.users.find(user => user.id === this.props.userId)

        if (!user) {
            return null;
        }

        return (
            <div className="header">{user.name}</div>
        )}
    }
//underneath the component
//Data is gotten from the Redux store
//ownProps object is a reference to the props that are going to be sent to the UserHeader component
const mapStateToProps = (state, ownProps) => {
    return { user: state.users.find(user => user.id === ownProps.userId) }
}


// export default connect(mapStateToProps) (PostList);
// export default connect(null, { fetchPosts : fetchPosts })(PostList);
//fetchPosts is the ActionCreator
// export default connect(mapStateToProps, { fetchUser })(UserHeader);
export default connect(mapStateToProps)(UserHeader);
// export default UserHeader;