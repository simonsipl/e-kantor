import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@material-ui/core/';



export default function ExchangeModal(props) {
    const [open, setOpen] = React.useState(false);
    const [currencyBalance, setBalance] = React.useState()

    const { name, Currency, Price, Unit, onSubmit } = props

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e) => {
        setBalance({
            amount: e.target.value,
            unit: Unit,
            name: e.target.name,
            price: Price
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(currencyBalance, name)

        setOpen(false);
    }


    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {name}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{name} your {Currency}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please enter how much you want to {name} and confirm
                        <br />
                        Current {name} Price: {Price} of {Currency} per {Unit} Unit
                    </DialogContentText>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id={Currency}
                        label={Currency}
                        name={Currency}
                        autoFocus
                        onChange={handleChange}
                    />
                    <DialogContentText>
                        Total {name} Price: {}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} name={name} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}