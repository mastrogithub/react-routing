import React from 'react'
import Post from '../../../components/Post/Post'
import * as DAO from "../../../CRUD/DAO";
import './Posts.css'

class Posts extends React.Component {
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
                posts = this.addAuthorToPost(posts.slice(0, 25), users)
                this.setState({ posts });
            })
            .catch(e => console.log(e))
    }

    postSelectedHandler = (selectedPostId) => {
        this.setState({ selectedPostId })
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => (
                <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
            ));
        }

        return (
            <div
                className="Posts">
                {posts}
            </div>
        )
    }
}

export default Posts