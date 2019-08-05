import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TagTile from "../../TagTile/TagTile";

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
                        <TagTile tagId={1} tagName={'Тэг 1'}/>
                        <TagTile tagId={2} tagName={'Тэг 2'}/>
                        <TagTile tagId={3} tagName={'Тэг 3'}/>
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
