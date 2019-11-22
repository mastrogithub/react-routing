import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'


import "./Blog.css";
import Posts from './Posts/Posts'
import asyncComponent from '../../hoc/AsyncComponent'
//import NewPost from './NewPost/NewPost'
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost')
}) 

const compose = (...fns) => x => fns.reduceRight((g, f) => f(g(x)));

class Blog extends Component {
    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/new-post" component={AsyncNewPost} />
                    <Route path="/posts"  component={Posts}/>
                    <Redirect from="/" to="/posts"/>
                </Switch>
            </div>
        );
    }
}

export default Blog;
