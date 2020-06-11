import React, { FunctionComponent } from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const PaceSelector: FunctionComponent = () => {
    const [value, setValue] = React.useState('slow');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      };

    return (
        <FormControl component="fieldset">
        <FormLabel style={{ textAlign: "left", color: "grey" }} component="legend" >Growth Pace</FormLabel>
        <RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            <FormControlLabel value="slow" control={<Radio color="primary" />} label="Slow (APY: 1%)" />
            <FormControlLabel value="medium" control={<Radio color="primary" />} label="Medium (APY: 1.3%)" />
            <FormControlLabel value="fast" control={<Radio color="primary" />} label="Fast (APY: 2%)" />
        </RadioGroup>
        </FormControl>
    );
}

export default PaceSelector;