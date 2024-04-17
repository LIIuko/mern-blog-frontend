import React, {useCallback, useMemo, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth.js";
import {set} from "react-hook-form";
import axios from "../../axios.js";

export const AddPost = () => {
    const isAuth = useSelector(selectIsAuth);

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to={'/'}/>
    }

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tags, setTags] = useState([]);

    const inputFileRef = useRef();


    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            console.log(file);
            const {data} = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (e) {
            console.warn(e)
            alert('Ошибка при загрузке файла');
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('')
    };

    const onSubmit = async () => {
        try{
            setLoading(true);

            const fields = {
                title,
                text,
                tags,
                imageUrl,
            }

            const {data} = await axios.post('/posts', fields);

            navigate(`/posts/${data._id}`);
        } catch (e) {
            console.warn(e);
            alert('Ошибка при создании статьи');
        }
    }

    const onChange = useCallback((value) => {
        setText(value);
    }, []);

    const options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    return (
        <Paper style={{padding: 30}}>
            <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
                Загрузить превью
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
            {imageUrl && (
                <>
                    <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                        Удалить
                    </Button>
                    <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded"/>
                </>

            )}
            <br/>
            <br/>
            <TextField
                classes={{root: styles.title}}
                variant="standard"
                placeholder="Заголовок статьи..."
                fullWidth
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <TextField
                classes={{root: styles.tags}}
                variant="standard"
                placeholder="Тэги"
                fullWidth
                value={tags.join(' ')}
                onChange={e => setTags(e.target.value.split(' '))}
            />
            <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options}/>
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size="large" variant="contained">
                    Опубликовать
                </Button>
                <Link to="/">
                    <Button size="large">Отмена</Button>
                </Link>
            </div>
        </Paper>
    );
};
