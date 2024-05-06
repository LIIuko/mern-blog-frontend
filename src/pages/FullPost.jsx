import React, {useEffect, useState} from "react";

import {Post} from "../components/Post";
import {Index} from "../components/AddComment";
import {CommentsBlock} from "../components/CommentsBlock";
import {useParams} from "react-router-dom";
import axios from "../axios.js";
import Markdown from "react-markdown";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../redux/slices/auth.js";

export const FullPost = () => {

    const isAuth = useSelector(selectIsAuth);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        axios.get(`posts/${id}`).then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(err => {
            console.warn(err)
            alert('Ошибка при получении статьи')
        })
    }, [id])

    const addComment = (newComment) => {
        setData({
            ...data,
            comments: [...data.comments, newComment]
        });
    }

    if (loading) {
        return <Post isLoading={loading} isFullPost/>
    }

    return (
        <>
            <Post
                {...data}
                imageUrl={data.imageUrl ? data.imageUrl : ''}
                isFullPost
            >
                <Markdown>{data.text}</Markdown>
            </Post>
            <CommentsBlock items={data.comments}
                           isLoading={false}
            >
                {isAuth ?
                    <Index addComment={addComment}/>
                    :
                    <></>
                }

            </CommentsBlock>
        </>
    );
};
