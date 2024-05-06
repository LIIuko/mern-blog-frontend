import React, {useState} from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import axios from "../../axios.js";
import {useParams} from "react-router-dom";

export const Index = ({ addComment }) => {

    const {user} = useSelector(state => state.user);
    const {id} = useParams();
    const [text, setText] = useState("");

    const onSubmit = async () => {
        try {
            const response = await axios.post(`/posts/${id}/comments`, {text});
            addComment({
                text,
                user: {
                    fullName: user.fullName,
                    avatarUrl: user.avatarUrl
                },
                _id: response.data._id // Предполагаем, что сервер возвращает ID нового комментария
            });
            setText("");
        } catch (e) {
            console.warn(e);
            alert('Ошибка при добавлении комментария');
        }
    }


    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{ root: styles.avatar }}
                    src={user.avatarUrl ? user.avatarUrl : '/noavatar.png'}
                />
                <div className={styles.form}>
                    <TextField
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    <Button onClick={onSubmit} variant="contained">Отправить</Button>
                </div>
            </div>
        </>
    );
};
