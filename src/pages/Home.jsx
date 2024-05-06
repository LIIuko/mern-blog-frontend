import React, {useEffect, useMemo, useState} from 'react';
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

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, []);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getSortedPosts = useMemo(() => {
        if (posts.loading) {
            return [...Array(5)];
        } else {
            let sortedPosts = [...posts.items];
            if (value === 0) {
                sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } else if (value === 1) {
                sortedPosts.sort((a, b) => b.viewsCount - a.viewsCount);
            }
            return sortedPosts.filter(value => !tag || value.tags.includes(tag));
        }
    },[posts, value, tag]);

    return (
        <>
            <Tabs style={{marginBottom: 15}} value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Новые"/>
                <Tab label="Популярные"/>
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {posts.loading ? (
                        Array.from({ length: 5 }, (_, index) => <Post key={index} isLoading={true} />)
                    ) : (
                        getSortedPosts.map((obj) => (
                            <Post
                                key={obj._id}
                                {...obj}
                                imageUrl={obj.imageUrl ? obj.imageUrl : ''}
                                isEditable={user?._id === obj.user._id}
                            />
                        ))
                    )}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tags.items} isLoading={tags.loading}/>
                </Grid>
            </Grid>
        </>
    );
};
