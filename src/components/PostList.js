import React from 'react';
import { connect } from 'react-redux';
// import { fetchPosts, fetchPostsAndUsers } from '../actions/';
import { fetchPostsAndUsers } from '../actions/';
import UserHeader from './UserHeader';

//1. Create the fetchPosts action creator and hook it up to the PostList component
//2. Make sure to call a connect() method at the end of the code in the export. 
//in it you will pass the mapStateToProps() method and also the ActionCreators, 
//you will then invoke the function with an argument of the component, in this case that will be PostList

class PostList extends React.Component {

    componentDidMount() {
        // this.props.fetchPosts();
        this.props.fetchPostsAndUsers();
    }
//this renders the list which will get called in the render() method
    renderList() {
        return this.props.posts.map(post => {
            return (
                <div className="item" key={post.id}>
                    <i className="large middle aligned icon user" />
                    <div className="content">
                        <div className="description">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                        <UserHeader userId={post.userId} />
                    </div>
                    {/* <UserHeader userId={} /> */}
                </div>
            );
        })
    }

    render () {
        // console.log(this.props.posts)
        return (
            <div className="ui relax divided list">{this.renderList()}</div>
        )}
    }
//underneath the component
const mapStateToProps = (state) => {
    //State object is going to have a property called posts and that property is going to hold all of the data that our reducer has returned
    //Everytime that our reducer is run, mapStateToProps is going to be run again
     return { posts: state.posts }       
}


// export default connect(mapStateToProps) (PostList);
// export default connect(null, { fetchPosts : fetchPosts })(PostList);
//fetchPosts is the ActionCreator
export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);