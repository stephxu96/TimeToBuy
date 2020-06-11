import React from 'react';
import { TextField, InputLabel, Select, MenuItem, FormControl, InputAdornment, IconButton } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import { Item } from '../App';

const formStyles =  {
    textStyle: {
        margin: '5px',
        maxWidth: '18ch',
    } as React.CSSProperties,
    selectStyle: {
        minWidth: '15ch',
        margin: '5px',
    } as React.CSSProperties,
    buttonStyle: {
        transform: 'scale(2)',
        margin: '5px',
    } as React.CSSProperties,
};

interface ItemFormProp {
    currency: string;
    onChange: (itemData: Item & { name: string }) => void;
};

interface ItemFormState {
    name: string;
    startDate: string;
    price: string;
    recurrence: string;
    increment: string;
    startAmount: string;
};

class ItemForm extends React.Component<ItemFormProp, ItemFormState> {

    constructor(props: any) {
        super(props);
        this.state = { name: "", price: "", startDate: "0", recurrence: "", increment: "1", startAmount: "0" }
    }
    
    setInput = (id: "name" | "startDate" | "price" | "increment" | "recurrence" | "startAmount", event: any) => {
        if (event.target.value) {
          let updatedState = {...this.state};
          updatedState[id] = event.target.value;
          this.setState(updatedState);
        }
        console.log(this.state);
    }

    getEndDate = () => {
        let days = parseInt(this.state.price) / parseInt(this.state.increment);
        var result = new Date(this.state.startDate);
        result.setDate(result.getDate() + days);
    
        if (isNaN(result.getDay())) {
            return "Please complete all fields to see result";
        }

        return result.toLocaleDateString("en-US");
    }

    onButtonClick = () => {
        let {name, startDate, increment, recurrence, startAmount} = this.state;
        this.props.onChange({
            name, 
            startDate, 
            increment: parseFloat(increment), 
            recurrence: recurrence, 
            startAmount: parseFloat(startAmount), 
            endDate: this.getEndDate() 
        });
    }

    render() {
        return (
            <>
            <form autoComplete="off">
                <div>
                    <TextField 
                        required 
                        label="Item name" 
                        variant="outlined"
                        onChange={(e: any) => this.setInput("name", e)}
                        style={formStyles.textStyle}
                    />
                    <TextField 
                        required 
                        label="Start date" 
                        variant="outlined"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e: any) => this.setInput("startDate", e)}
                        style={formStyles.textStyle}
                    />
                    <TextField 
                        required 
                        label={`Starting amount`}
                        variant="outlined"
                        onChange={(e: any) => this.setInput("startAmount", e)}
                        style={formStyles.textStyle}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">{this.props.currency}</InputAdornment>,
                        }}
                    />
                    <TextField 
                        required 
                        label={`Price`}
                        variant="outlined"
                        onChange={(e: any) => this.setInput("price", e)}
                        style={formStyles.textStyle}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">{this.props.currency}</InputAdornment>,
                        }}
                    />
                    <TextField
                        label="Recurring deposit" 
                        variant="outlined"
                        onChange={(e: any) => this.setInput("increment", e)}
                        style={formStyles.textStyle}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">{this.props.currency}</InputAdornment>,
                        }}
                    />
                    <FormControl variant="outlined" style={formStyles.selectStyle}>
                        <InputLabel>Recurrence</InputLabel>
                        <Select
                            label="Recurrence"
                            value={this.state.recurrence} 
                            onChange={(e: any) => this.setInput("recurrence", e)}
                            autoWidth
                        >
                            <MenuItem value={""}><em>None</em></MenuItem>
                            <MenuItem value={"daily"}>Daily</MenuItem>
                            <MenuItem value={"weekly"}>Weekly</MenuItem>
                            <MenuItem value={"monthly"}>Monthly</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton
                        aria-label="upload picture"
                        component="span"
                        color="primary"
                        onClick={() => this.onButtonClick()}
                    >
                        <AddCircle style={formStyles.buttonStyle} />
                    </IconButton>
                </div>
            </form>
            </>
        );
    }
}

export default ItemForm;