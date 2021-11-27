/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import {withStyles} from '@material-ui/core/styles'
import LayoutLeftBar from 'LayoutLeftBar'
import LayoutTopBar from 'LayoutTopBar'

const drawerWidth = 150;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        // backgroundColor: '#141517'
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // shift down left menu
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

class LayoutBothBar extends React.Component {
    state = {
        mobileOpen: false
    };

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    //  <nav className={classes.drawer}>

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <LayoutTopBar handleDrawerToggle={this.handleDrawerToggle}/>
                </AppBar>
                <nav className={classes.drawer}>
                    <LayoutLeftBar
                        mobileOpen={this.state.mobileOpen}
                        handleDrawerToggle={this.handleDrawerToggle.bind(this)}/>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

LayoutBothBar.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(LayoutBothBar);
