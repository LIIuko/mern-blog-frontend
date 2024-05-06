import React from 'react';
import styles from './UserInfo.module.scss';
import {Link} from "react-router-dom";

export const UserInfo = ({avatarUrl, fullName, additionalText, _id}) => {
    return (
        <Link className={styles.root} to={`/${_id}`}>
            <img className={styles.avatar} src={avatarUrl} alt={fullName}/>
            <div className={styles.userDetails}>
                <span className={styles.userName}>{fullName}</span>
                <span className={styles.additional}>{additionalText}</span>
            </div>
        </Link>
    );
};
