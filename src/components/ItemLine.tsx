import React, { FunctionComponent, useState } from 'react';
import { Item } from '../App';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ItemForm from './ItemForm';

type ItemLineProps = {
    id: string;
    currency: string;
    selected: boolean;
    className?: string;
    lineData: Item;
    onChange: (id:string, itemData: Item) => void;
    onEditClick: () => void;
    onItemSelect: (id: string | null) => void
};

const ItemLine: FunctionComponent<ItemLineProps> = (props) => {
    const [mode, setMode] = useState("display");
    let item = null;

    console.log(`In ItemLine`);
    console.log(props);

    switch (mode) {
        case "display":
            item = (
                <ListItem 
                    selected={props.selected} 
                    button 
                    className={props.className} 
                    key={props.id}
                    onClick={() => props.onItemSelect(props.selected ? null : props.id)}
                >
                    {/* <ListItemAvatar>
                    TODO: ADD SELECT POPUP TO SELECT ICON
                        <Avatar>
                        <FolderIcon />
                        </Avatar> 
                    </ListItemAvatar> */}
                    <ListItemText
                        primary={props.lineData.name}
                        secondary={`${props.currency}${props.lineData.startAmount}`}
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
            console.log(`In ItemLine with id ${props.id}`)
            item = (
                <ItemForm
                    edit
                    id={props.id}
                    currency={props.currency} 
                    defaultData={props.lineData} 
                    onChange={(id, data) => {
                        props.onChange(id, data);
                        setMode("display");
                    }} 
                />
            );
    }

    return item;
}

export default ItemLine;