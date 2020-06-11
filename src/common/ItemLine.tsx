import React, {FunctionComponent} from 'react';
import { Item } from '../App';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const ItemLine: FunctionComponent<Item> = (props) => {
    console.log(props);
    return (
      <ListItem>
        <ListItemAvatar>
        {/* TODO: ADD SELECT POPUP TO SELECT ICON
          <Avatar>
            <FolderIcon />
          </Avatar> 
        */}
        </ListItemAvatar>
        <ListItemText
          primary="Single-line item"
          secondary={'Secondary text'}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
}

export default ItemLine;