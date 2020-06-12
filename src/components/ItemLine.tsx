import React, { FunctionComponent, useState } from 'react';
import { Item } from '../App';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ItemForm from './ItemForm';

type ItemLineProps = {
    currency: string;
    selected: boolean;
    name: string;
    className?: string;
    metadata: Item;
    onChange: (itemData: Item & { name: string }) => void;
    onEditClick: () => void;
    onItemSelect: (name: string | null) => void
};

const ItemLine: FunctionComponent<ItemLineProps> = (props) => {
    const [mode, setMode] = useState("display");
    let item = null;

    switch (mode) {
        case "display":
            item = (
                <ListItem 
                    selected={props.selected} 
                    button 
                    className={props.className} 
                    key={props.name}
                    onClick={() => props.onItemSelect(props.selected ? null : props.name)}
                >
                    {/* <ListItemAvatar>
                    TODO: ADD SELECT POPUP TO SELECT ICON
                        <Avatar>
                        <FolderIcon />
                        </Avatar> 
                    </ListItemAvatar> */}
                    <ListItemText
                        primary={props.name}
                        secondary={`${props.currency}${props.metadata.startAmount}`}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end" 
                            aria-label="delete" 
                            onClick={(event) => { 
                                event.preventDefault();
                                setMode("edit")
                                props.onEditClick();
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
            break;
        case "edit":
            item = (
                <ItemForm
                    edit
                    currency={props.currency} 
                    defaultData={{...props.metadata, name: props.name}} 
                    onChange={(data) => {
                        props.onChange(data);
                        setMode("display");
                    }} 
                />
            );
    }

    return item;
}

export default ItemLine;