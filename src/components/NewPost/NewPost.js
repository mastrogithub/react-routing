import React, { Component } from 'react';

import './NewPost.css';
import * as DAO from '../../CRUD/DAO'

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max'
    }

    onChangeHandler = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    submitPostHandler = async (event) => {
        event.preventDefault()
        const res = await DAO.post('posts', this.state)
        console.log(res)
    }

    render () {
        return (
            <form className="NewPost" onSubmit={this.submitPostHandler}>
                <h1>Add a Post</h1>
                <label>Title</label>
                <input 
                    type="text" 
                    name="title"
                    value={this.state.title} 
                    onChange={this.onChangeHandler} 
                />
                <label>Content</label>
                <textarea 
                    rows="4" 
                    name="content"
                    value={this.state.content} 
                    onChange={this.onChangeHandler} 
                />
                <label>Author</label>
                <select 
                    name="author"
                    value={this.state.author} 
                    onChange={this.onChangeHandler}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button>Add Post</button>
            </form>
        );
    }
}

export default NewPost;