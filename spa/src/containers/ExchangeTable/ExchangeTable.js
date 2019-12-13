import React, { useState } from 'react';

import { withStyles } from '@material-ui/core';
import { Table, TableBody, Grid, TableCell, TableHead, TableRow, Paper, Typography } from '@material-ui/core';

import ExchangeModal from '../../components/ExchangeModal'

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
    const { classes, WebSocketData, email, balance } = props;
    const { Items } = WebSocketData;


    const onSubmit = async (currencyBalance, type) => {
        const response = await fetch('/api/wallet/exchange', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                currencyBalance,
                type: type
            })
        });
        if (response.status !== 200) {
            throw new Error('Authentication Error')
        }
    }


    return (
        <Paper className={classes.root}>
            <Grid container>
                <Grid item xs>
                    <Paper >
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
                                            {(row.SellPrice).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <ExchangeModal {...props} name='Buy' Currency={row.Name} Price={row.SellPrice} Unit={row.Unit} onSubmit={onSubmit}></ExchangeModal>
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
                                            {row.PurchasePrice}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {balance[row.Name]}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {((row.PurchasePrice * balance[row.Name]) / row.Unit).toFixed(2)} 
                                        </TableCell>
                                        <TableCell>
                                            <ExchangeModal name='Sell' Currency={row.Name} Price={row.PurchasePrice} Unit={row.Unit} onSubmit={onSubmit}></ExchangeModal>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container>
                <Typography>TotalBalance: {(balance.balance + Items.map((row, index) => row.PurchasePrice * balance[row.Name] / row.Unit).reduce((a, b) => a + b, 0)).toFixed(2)}</Typography>
            </Grid>
        </Paper>
    );
}


export default withStyles(styles)(ExchangeTable);