import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import * as DAO from "../../CRUD/DAO";

const compose = (...fns) => x => fns.reduceRight((g, f) => f(g(x)));

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    addAuthorToPost(posts, users) {
        return posts.map(p => {
            const author = users.find(user => user.id === p.userId)
            return {
                ...p,
                author
            };
        });
    }

    async componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        // .then(res => res.json())
        // .then(posts => this.setState({posts}))
        // .catch(console.err)

        //Utilizando async / await
        // const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        // let posts = await res.json()

        // const usersRes = await fetch('https://jsonplaceholder.typicode.com/users')
        // const users = await usersRes.json()

        let $posts = DAO.get('posts')
        let $users = DAO.get("users")

        Promise.all([$posts, $users])
            .then(([posts, users]) => {
                posts = this.addAuthorToPost(posts.slice(0, 4), users)
                this.setState({ posts });
            })
            .catch(e => this.setState({error: true}))
    }

    postSelectedHandler = (selectedPostId) => {
        this.setState({ selectedPostId })
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if(!this.state.error) {
            posts = this.state.posts.map(post => (
                <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
            ));
        }
        

        return (
            <div>
                <section className="Posts">{posts}</section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
