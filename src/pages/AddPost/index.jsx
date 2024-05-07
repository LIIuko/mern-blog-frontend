import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth.js";
import {set} from "react-hook-form";
import axios from "../../axios.js";

export const AddPost = () => {
    const isAuth = useSelector(selectIsAuth);

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to={'/'}/>
    }

    const {id} = useParams();
    const isEditing = Boolean(id);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tags, setTags] = useState([]);

    const inputFileRef = useRef();

    useEffect(() => {
        if (id) {
            axios.get(`posts/${id}`).then(({data}) => {
                    setTitle(data.title);
                    setText(data.text);
                    setImageUrl(data.imageUrl);
                    setTags(data.tags);
                }
            )
            ;
        }
    }, [])


    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const {data} = await axios.post('/upload', formData);
            setImageUrl(`https://traaaaaaader-blog-api.onrender.com/${data.id}`);
        } catch (e) {
            console.warn(e)
            alert('Ошибка при загрузке файла');
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('')
    };

    const onSubmit = async () => {
        try {
            setLoading(true);

            const fields = {
                title,
                text,
                tags,
                imageUrl,
            }

            const {data} = isEditing
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields);

            setLoading(false);
            navigate(`/posts/${isEditing ? id : data._id}`);
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
                    <img className={styles.image} src={imageUrl} alt="Uploaded"/>
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
                    {isEditing ? 'Сохранить' : 'Опубликовать'}
                < /Button>
                <Link to="/">
                    <Button size="large">Отмена</Button>
                </Link>
            </div>
        </Paper>
    );
};
