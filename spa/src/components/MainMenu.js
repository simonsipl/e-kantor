import React, { Component } from "react";
import { withStyles, AppBar, Typography, Toolbar, IconButton, MenuItem, Menu, Link, Button } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    user: {
        marginRight: theme.spacing(2),
    },
    bar: {
        position: 'static'
    }
})

class MainMenu extends Component {
    state = {
        anchorEl: null,
        
    }

    render() {
        const { classes, auth, user } = this.props;
        const open = Boolean(this.state.anchorEl);

        const handleMenu = event => {
            this.setState({
                anchorEl: event.currentTarget
            })
        };

        const handleClose = () => {
            this.setState({
                anchorEl: false
            })

        };
        return (
            <div className={classes.root}>
                <AppBar className={classes.bar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Exchange
                    </Typography>
                        {auth ? (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <Typography variant="h6" className={classes.user}>
                                        {user}
                                    </Typography>
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.props.anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Link href="/profile" underline="none">Profile</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} >
                                        <Link href="/logout" underline="none" onClick={()=> localStorage.clear()}>Logout</Link>
                                    </MenuItem>
                                </Menu>
                            </div>
                        ) : (
                                <div>
                                    <Button href="/login">Login</Button>
                                    <Button href="/register">Register</Button>
                                </div>
                            )}
                    </Toolbar >
                </AppBar>
            </div>
        )
    }
}


export default withStyles(styles)(MainMenu)