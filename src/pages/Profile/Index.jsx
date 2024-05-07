import React, {useEffect, useMemo, useState} from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import {Post} from "../../components/index.js";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import styles from './Profile.module.scss';
import axios from "../../axios.js";

const Profile = () => {
    const {posts} = useSelector(state => state.posts);
    const {id} = useParams();
    const {user} = useSelector(state => state.user);
    const [findUser, setFindUser] = useState({});

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`/auth/user/${id}`);
                if (data) {
                    setFindUser(data);  // Предполагаем, что ответ содержит нужные данные о пользователе
                } else {
                    console.log("Пользователь не найден.");
                }
            } catch (error) {
                console.error('There was an error!', error);
            }
        };
        fetchUser();
    }, [id]);

    const getSortedPosts = useMemo(() => {
        if (posts.loading) {
            return [...Array(5).fill({ isLoading: true })];
        } else {
            let sortedPosts = [...posts.items];
            if (value === 0) {
                sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } else if (value === 1) {
                sortedPosts.sort((a, b) => b.viewsCount - a.viewsCount);
            }
            return sortedPosts.filter(post => post.user._id === id);
        }
    }, [posts, value, id]);


    return (
        <>
            <div className={styles.root}>
                <img className={styles.avatar} src={findUser.avatarUrl ? findUser.avatarUrl : '/noavatar.png'} alt={findUser.fullName}/>
                <h2 className={styles.userName}>{findUser.fullName}</h2>
            </div>
            <Tabs style={{marginBottom: 15}} value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Новые"/>
                <Tab label="Популярные"/>
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={12} item>
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
            </Grid>
        </>
    );
};

export default Profile;