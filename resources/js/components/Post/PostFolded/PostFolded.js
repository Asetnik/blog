import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostFolded extends Component {

    render() {
        return (
            <div className="post post-folded">
                <div className="head-wrapper">
                    <div className="author-wrapper">
                        <a href="#"><img src="https://pp.userapi.com/c834303/v834303529/1a2f00/LYdM358ybhA.jpg?ava=1" alt=""/></a>
                        <div className="author-info">
                            <a href="#" className="text-link author-name">Павел Асетник</a>
                            <p>15 минут назад</p>
                        </div>
                    </div>
                    <div className="category-wrapper">
                        <span className="badge badge-primary float-right">Категория</span>
                    </div>
                </div>
                <div className="post-info">
                    <h3 className="post-title">Типо название поста</h3>
                    <p className="post-description">Описание Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad commodi dignissimos distinctio
                        dolore enim expedita harum incidunt natus numquam quidem?</p>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt=""/>
                </div>
                <div className="post-footer">
                    <div className="tags-wrapper">
                        <span className="badge badge-secondary tag"><i className="fa fa-tag" aria-hidden="true"></i> Тэг 1</span>
                        <span className="badge badge-secondary tag"><i className="fa fa-tag" aria-hidden="true"></i> Тэг 2</span>
                        <span className="badge badge-secondary tag"><i className="fa fa-tag" aria-hidden="true"></i> Тэг 3</span>
                    </div>
                    <div className="icons-wrapper">
                        <p><i className="fa fa-comment-o" aria-hidden="true"></i> 25</p>
                    </div>
                </div>
                <div className="read-more-wrapper">
                    <Link to='/post/1'>
                        <button className="btn">Читать полностью</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default PostFolded;
