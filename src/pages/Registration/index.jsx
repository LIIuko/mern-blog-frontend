import React, {useRef, useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Registration.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {fetchRegister, selectIsAuth} from "../../redux/slices/auth.js";
import {Navigate} from "react-router-dom";
import axios from "../../axios.js";

export const Registration = () => {

    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch();
    const inputFileRef = useRef();
    const [imageUrl, setImageUrl] = useState('');

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        },
        mode: 'onChange'
    });

    const onSubmit = async (values) => {
        const completeValues = {
            ...values,
            avatarUrl: imageUrl  // Убедитесь, что сервер обрабатывает этот параметр корректно
        };
        const data = await dispatch(fetchRegister(completeValues))
        if (!data.payload) {
            return alert('Не удалось зарегистрироваться')
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    const handleChangeFile = async (event) => {
        try {
            const file = event.target.files[0];
            if (!file) {
                alert('Файл не выбран!');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUrl(e.target.result);  // Установка превью изображения
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('image', file);
            const {data} = await axios.post('/upload', formData);
            setImageUrl(data.id);
        } catch (e) {
            console.warn(e)
            alert('Ошибка при загрузке файла');
        }
    };

    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    console.log(`http:localhost:4444/uploads/${imageUrl}`)


    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создание аккаунта
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    ref={inputFileRef}
                    type="file"
                    onChange={handleChangeFile}
                    hidden
                />
                <div onClick={() => inputFileRef.current.click()} className={styles.avatar}>
                    {
                        imageUrl ?
                            <img className={styles.img} src={`http://localhost:4444/uploads/${imageUrl}`}/>
                            :
                            <Avatar sx={{width: 100, height: 100}}/>
                    }
                </div>
                <TextField
                    className={styles.field}
                    label="Полное имя"
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    fullWidth
                    {...register('fullName', {required: 'Укажите ваше имя'})}
                />
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    fullWidth
                    type="email"
                    {...register('email', {required: 'Укажите почту'})}
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    fullWidth
                    type="password"
                    {...register('password', {required: 'Укажите пароль'})}
                />
                <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>

        </Paper>
    );
};
