import React, {useEffect, useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import {Post} from '../components/Post';
import {TagsBlock} from '../components/TagsBlock';
import {CommentsBlock} from '../components/CommentsBlock';
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, fetchTags} from "../redux/slices/posts.js";
import {useParams} from "react-router-dom";

export const Home = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const {posts, tags} = useSelector(state => state.posts);
    const {tag} = useParams();

    console.log(tag)

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, []);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getSortedPosts = () => {
        if (posts.loading) {
            return [...Array(5)];
        } else {
            let sortedPosts = [...posts.items];
            if (value === 0) {
                return sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).filter(value => !tag || value.tags.includes(tag));
            } else if (value === 1) {
                return sortedPosts.sort((a, b) => b.viewsCount - a.viewsCount).filter(value => !tag || value.tags.includes(tag));
            }
            return sortedPosts;
        }
    };

    return (
        <>
            <Tabs style={{marginBottom: 15}} value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Новые"/>
                <Tab label="Популярные"/>
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {getSortedPosts().map((obj, index) =>
                        posts.loading ?
                            (
                                <Post key={index} isLoading={true}/>
                            )
                            :
                            (
                                <Post
                                    key={index}
                                    id={obj._id}
                                    title={obj.title}
                                    imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                                    user={obj.user}
                                    createdAt={obj.createdAt}
                                    viewsCount={obj.viewsCount}
                                    commentsCount={obj.comments.length}
                                    tags={obj.tags}
                                    isEditable={user?._id === obj.user._id}
                                />
                            ))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tags.items} isLoading={tags.loading}/>
                    {/*<CommentsBlock*/}
                    {/*    items={[*/}
                    {/*        {*/}
                    {/*            user: {*/}
                    {/*                fullName: 'Вася Пупкин',*/}
                    {/*                avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',*/}
                    {/*            },*/}
                    {/*            text: 'Это тестовый комментарий',*/}
                    {/*        },*/}
                    {/*        {*/}
                    {/*            user: {*/}
                    {/*                fullName: 'Иван Иванов',*/}
                    {/*                avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',*/}
                    {/*            },*/}
                    {/*            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*    isLoading={false}*/}
                    {/*/>*/}
                </Grid>
            </Grid>
        </>
    );
};
