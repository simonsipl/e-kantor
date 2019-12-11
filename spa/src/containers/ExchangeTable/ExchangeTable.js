import React from 'react';

import { withStyles } from '@material-ui/core';
import { Table, TableBody, Grid, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';


const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    tableTitle: {
        backgroundColor: theme.palette.common.blue,
        color: theme.palette.common.white,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
})


const ExchangeTable = (props) => {
    const { classes, WebSocketData } = props;

    const { Items } = WebSocketData

    console.log(Items)

    return (
        <Grid container spacing={3}>
            <Grid item xs>
                <Paper className={classes.root}>
                    <Table className={classes.tableTitle} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell key='currency'>Currency</TableCell>
                                <TableCell key='unit'>Unit</TableCell>
                                <TableCell key='value'>Value</TableCell>
                                <TableCell key='actions'>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Items.map((row, index) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.Name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.Unit}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.SellPrice}
                                    </TableCell>
                                    <TableCell>
                                        <button
                                            onClick={(e) => {
                                                console.log(index)
                                            }}>
                                            Buy
                                    </button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            <Grid item xs>
                <Paper className={classes.root}>
                    <Table className={classes.table} aria-label="simple table">

                        <TableHead>
                            <TableRow>
                                <TableCell key='currency'>Currency</TableCell>
                                <TableCell key='unit'>Unit Price</TableCell>
                                <TableCell key='amount'>Amount</TableCell>
                                <TableCell key='value'>Value</TableCell>
                                <TableCell key='actions'>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Items.map((row, index) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.Name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.Unit}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.PurchasePrice}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.PurchasePrice * row.Unit}
                                    </TableCell>
                                    <TableCell>
                                        <button
                                            onClick={(e) => {
                                                console.log(index)
                                            }}>
                                            Sell
                                    </button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
    );
}


export default withStyles(styles)(ExchangeTable);