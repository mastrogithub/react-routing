import React, { Component } from 'react';

import './FullPost.css';
import * as DAO from '../../CRUD/DAO'

class FullPost extends Component {
    state = {
        post: null
    }
 
    async componentDidUpdate(prevProps) {
        if (this.props.id && this.props.id !== prevProps.id) {
            const post = await DAO.get(`posts/${this.props.id}`)
            this.setState({ post })
        } 
    }

    deletePostHandler = async () => {
        DAO.delet(`posts/${this.props.id}`)
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.state.post) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }        
        return post;
    }
}

export default FullPost;