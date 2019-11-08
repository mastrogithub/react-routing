import React, { Component } from "react";


import "./Blog.css";
import Posts from './Posts/Posts'


const compose = (...fns) => x => fns.reduceRight((g, f) => f(g(x)));

class Blog extends Component {
    render() {
        return (
            <div className="Blog">
               <header>
                   <nav>
                       <ul>
                           <li><a href="/">Home</a></li>
                           <li><a href="/new-post">New Post</a></li>
                       </ul>
                   </nav>
               </header> 
               <Posts />
            </div>
        );
    }
}

export default Blog;
