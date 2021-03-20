import React, { useEffect, useState } from "react";
import "./style.css";
import NavBarMember from "../NavBarMember";
import API from "../../utils/profileAPI";
import ProfileInfo from "../ProfileInfo";
import PostCreateBox from "../PostCreateBox";
import PostCard from "../PostCard";
import LikeButton from "../ButtonLike";
import DislikeButton from "../ButtonDislike";
import EditButton from "../ButtonEdit";
import DeleteButton from "../ButtonDelete";
import CreateCommentBox from "../CommentBox";

function Profile() {
    // Setting initial state of confession posts
    const [posts, setPosts] = useState([]);

    // Load all confessions and store them with setConfessions
    useEffect(() => {
        loadPosts();
    }, []);

    // Load all confession posts and set them to confessions
    function loadPosts() {
        API.getConfessions()
            .then(res =>
                setPosts(res.data)
            )
            .catch(err => console.log(err));
    };

    // Delete a confession post from database with a given id, and reload confession posts from db
    function deleteOneConfession(id) {
        API.deleteConfession(id)
            .then(res => loadPosts())
            .catch(err => console.log(err));
    };

    return (
        <div>
            <NavBarMember />
            <div className="profile-container">
                <h1>This page is private to you</h1>
                <section>
                    <ProfileInfo />
                </section>
                <section>
                    <PostCreateBox />
                </section>
                <section>
                    {posts.length ? (
                        <div>
                            {posts.map(post => (
                                <PostCard key={post._id}>
                                    <p><strong>Username:  </strong></p>
                                    <p>{post.content}</p>
                                    <LikeButton
                                        className="like"
                                        id={post._id}
                                        value={post.likes}
                                        loadConfessions={loadPosts}
                                    />
                                    <DislikeButton
                                        className="dislike"
                                        id={post._id}
                                        value={post.dislikes}
                                        loadConfessions={loadPosts}
                                    />
                                    <EditButton />
                                    <DeleteButton onClick={() => deleteOneConfession(post._id)} />
                                    <CreateCommentBox onClick={() => CreateCommentBox()}></CreateCommentBox>
                                </PostCard>
                            ))}
                        </div>
                    ) : (
                        <h3>You have no post yet!</h3>
                    )}
                </section>
            </div>
        </div>
    );

};

export default Profile;
