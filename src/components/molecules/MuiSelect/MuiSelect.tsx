import {Controller} from 'react-hook-form';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from '@mui/material';

type IList = {
    label: string;
    value: string | number;
}

type Props = {
    control: any;
    name: string;
    label: string;
    variant?: 'standard' | 'outlined' | 'filled';
    items: IList[];
};

const MuiSelect = ({control, name, label, items, variant = 'outlined'}: Props) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({field: {onChange, value}, fieldState: {error}}) => {
                return (
                    <FormControl fullWidth error={Boolean(error?.message)}>
                        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label="Age"
                            onChange={onChange}
                        >
                            {items.map((item: IList, index: number) => <MenuItem key={index}
                                                                                 value={item.value}>{item.label}</MenuItem>)}
                        </Select>
                        {Boolean(error?.message) && <FormHelperText>{error?.message}</FormHelperText>}
                    </FormControl>
                );
            }}
        />
    );
};

export default MuiSelect;
