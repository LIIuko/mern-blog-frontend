import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import {Link} from "react-router-dom";

export const TagsBlock = ({ items, isLoading = true }) => {
    return (
        <SideBlock title="Тэги">
            <List>
                <Link
                    key={name}
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/`}
                >
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TagIcon />
                            </ListItemIcon>
                            {isLoading ? (
                                <Skeleton width={10} />
                            ) : (
                                <ListItemText primary={"Все"} />
                            )}
                        </ListItemButton>
                    </ListItem>
                </Link>
                {(isLoading ? [...Array(5)] : items).map((name) => (
                    <Link
                        key={name}
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/tags/${name}`}
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TagIcon />
                                </ListItemIcon>
                                {isLoading ? (
                                    <Skeleton width={10} />
                                ) : (
                                    <ListItemText primary={name} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </SideBlock>
    );
};
