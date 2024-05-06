import React from 'react';
import styles from './Header.module.scss'

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth.js";

const Header = () => {
    const {user} = useSelector(state => state.user);
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const onClickLogout = () => {
        if (window.confirm('Вы действительно хотите выйти из аккаунта?')){
            dispatch(logout())
            window.localStorage.removeItem('token');
        }
    };

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to="/">
                        <div>BLOG</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to={`/${user._id}`}>
                                    <img className={styles.avatar} src={user.avatarUrl ? `http://localhost:4444${user.avatarUrl}` : '/noavatar.png'} alt={user.fullName}/>
                                </Link>
                                <Link to="/add-post">
                                    <Button variant="contained">Написать статью</Button>
                                </Link>
                                <Button onClick={onClickLogout} variant="contained" color="error">
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Войти</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Создать аккаунт</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;