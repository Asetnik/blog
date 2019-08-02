import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Comment from "../../Comment/Comment";

class PostFull extends Component {

    constructor(props) {
        super(props);
        this.state = {
           commentsIsDisplayed: false,
        };
        this.commentDisplayToggle = this.commentDisplayToggle.bind(this);
    }

    commentDisplayToggle() {
        this.setState({
            commentsIsDisplayed: !this.state.commentsIsDisplayed,
        });
    }

    render() {
        return (
            <div className="post post-full">
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
                <div className="post-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium dolor eos esse in incidunt
                        quis repellat tenetur. Error harum in nemo. Accusantium dolorem et laborum nam, odit quo
                        temporibus vel vitae. Ab accusamus amet beatae debitis deleniti, eos iure laborum molestias nam
                        officiis, repudiandae ullam ut veniam, veritatis vitae. A accusamus assumenda, distinctio dolore
                        dolorum maiores porro quisquam unde! Accusantium amet eaque, impedit iure quia sit totam! Ab
                        accusamus adipisci animi autem beatae delectus dolorem eligendi enim est, excepturi hic nulla,
                        odio praesentium provident rerum sit vitae. A adipisci architecto asperiores error excepturi
                        fugit harum illum, maxime, minus nam omnis perferendis provident quasi qui veritatis. Beatae
                        cupiditate, fugiat harum perferendis reprehenderit vel? Deserunt eaque fugiat ipsa, nostrum quia
                        repellendus tenetur. A aliquam aliquid aspernatur dolorem dolorum, facere labore molestias odio
                        officia quae quidem quos tempora, totam ut veritatis. Amet ex, harum nam necessitatibus nesciunt
                        rem totam voluptatum! Ea quia reprehenderit voluptate? Adipisci consequatur dolores doloribus
                        enim excepturi id in itaque laboriosam, magnam minus omnis placeat quia quo reiciendis
                        repudiandae sint ullam unde vitae! Asperiores atque deserunt dolorem est, ex explicabo in,
                        itaque laudantium modi neque, nobis perferendis placeat quas qui quibusdam sapiente soluta totam
                        voluptate voluptatem voluptates. Consectetur delectus dolorem et illo in incidunt minima omnis
                        perferendis quas voluptas! Accusantium ad aspernatur assumenda consequuntur corporis deleniti
                        dolore fugit id laudantium natus necessitatibus nemo nisi odit quo rerum sed tempora tempore, ut
                        veniam voluptates! Cumque ducimus fugit natus quos reiciendis? Autem, distinctio dolor, eum in
                        laborum molestias neque odit, quaerat rem sit soluta voluptas voluptatem! Amet aspernatur atque
                        facilis nobis odit reiciendis! Assumenda cum facilis maxime molestias nihil placeat, porro
                        repudiandae sed similique sit. Aliquam architecto beatae corporis nostrum quibusdam. Aperiam
                        explicabo facilis hic vel? Aliquam amet aut cum deserunt dolorem doloremque enim expedita fugiat
                        id illo, illum impedit inventore molestiae molestias odio odit optio possimus quas quia quod
                        recusandae saepe sit soluta tempore ullam vel velit voluptatum. Iure, quod tempore? Deleniti
                        doloremque fugit impedit nam omnis provident unde vero. Cum, cupiditate deserunt dolores, eaque
                        facilis illum in, libero obcaecati omnis quia reiciendis sunt? Blanditiis commodi delectus
                        dolorem exercitationem incidunt laudantium, maiores nesciunt ullam veritatis vitae. Adipisci
                        autem eos inventore nam reiciendis sapiente vero voluptates. Adipisci aspernatur consequuntur
                        dolor est hic laboriosam laudantium nobis quae quidem rerum? Culpa excepturi fugit illo odio
                        tenetur! Aliquid consequatur culpa earum fugit ipsam mollitia nobis sapiente sequi ullam vel? Ad
                        aliquid animi blanditiis delectus eligendi eum eveniet facere, fugiat hic id inventore ipsam
                        iusto laboriosam modi, neque odio officiis omnis optio, porro possimus quae quam quibusdam quod
                        rem repellat sed sequi sint vero vitae voluptatem. Accusamus ad aliquid aperiam asperiores
                        deleniti eveniet fuga fugiat, fugit illo necessitatibus nemo quas sapiente sit suscipit tenetur
                        voluptatem voluptatibus. Cupiditate deleniti, dicta eaque fuga illum labore magni nam
                        necessitatibus nemo odio, quam quo veritatis voluptatibus. Architecto blanditiis nostrum
                        obcaecati omnis possimus reiciendis rem repudiandae, sapiente soluta velit. Aliquid commodi eius
                        eos excepturi exercitationem hic illum in incidunt, labore mollitia nostrum possimus provident
                        reprehenderit similique soluta sunt voluptatem. Corporis, ullam!</p>
                </div>
                <div className="post-footer">
                    <div className="tags-wrapper">
                        <span className="badge badge-secondary tag"><i className="fa fa-tag" aria-hidden="true"></i> Тэг 1</span>
                        <span className="badge badge-secondary tag"><i className="fa fa-tag" aria-hidden="true"></i> Тэг 2</span>
                        <span className="badge badge-secondary tag"><i className="fa fa-tag" aria-hidden="true"></i> Тэг 3</span>
                    </div>
                    <div className="icons-wrapper">
                        <p className="text-link" onClick={this.commentDisplayToggle}><i className="fa fa-comment-o" aria-hidden="true"></i> 25</p>
                        <p><i className="fa fa-eye" aria-hidden="true"></i> 1000</p>
                    </div>
                </div>
                { (this.state.commentsIsDisplayed) &&
                    <div className="comments">
                        <h4>Коментарии</h4>
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                    </div>
                }
            </div>
        );
    }
}

export default PostFull;
