/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {withStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import L from 'helpers/L'
import {close_dice_ui, create_D100_rolling_dices, getRandomInt, open_dice_ui} from 'helpers/dice_helpers'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import {get_img} from "./helpers/room_helpers";

const drawerWidth = 150

const styles = theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
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
        // marginLeft: 'calc(vw-1000px)',
    }
});

class LayoutLeftBar extends React.Component {

    constructor(props) {
        super(props);
        this.roll = this.roll.bind(this);
    }

    roll() {
        const dui = this.props.game.options.dice_ui;
        if (dui.open) {
            const g = close_dice_ui(this.props.game);
            this.props.set_game(g);
        } else {
            let total = getRandomInt(1, 100);
            const dices = create_D100_rolling_dices(total);
            const g = open_dice_ui(this.props.game, total, dices);
            this.props.set_game(g);
        }
    }

    handleDrawerToggle = () => {
        this.props.handleDrawerToggle();
    };

    scaleUp() {
        /*
        const s = this.props.book.globalScale + 0.05;
        const newb = update(this.props.book, {globalScale: {$set: s}});
        this.props.set('book', newb);
        */
    }

    scaleReset() {
        /*
        const newb = update(this.props.book, {globalScale: {$set: 1.0}});
        this.props.set('book', newb);
         */
    }

    scaleDown() {
        /*
        const s = this.props.book.globalScale - 0.05;
        const newb = update(this.props.book, {globalScale: {$set: s}});
        this.props.set('book', newb);
         */
    }


    render() {
        const {classes, theme} = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar}/>
                <Divider/>
                <List>

                    <ListItem>
                        <L onClick={this.roll}>🎲 D100</L> {/*&#127922;*/}
                    </ListItem>

                    <ListItem button component={Link} to='/character'>
                        <ListItemText primary={'Character'}/>
                    </ListItem>

                    <ListItem button component={Link} to='/quest'>
                        <ListItemText primary={'Quest'}/>
                    </ListItem>

                    <ListItem button component={Link} to='/room'>
                        <ListItemText>
                            <img className={'map-img'}
                                 src={get_img()}
                                 alt={'aaa'}
                                 width={20}
                                 align={'top'}
                            />
                        </ListItemText>
                    </ListItem>

                    <ListItem button component={Link} to='/fight'>
                        <ListItemText>⚔️</ListItemText>
                    </ListItem>

                    {/*<ListItem button component={Link} to='/map'>
                        <ListItemText primary={'Map'}/> // 🌏
                    </ListItem>

                    */}

                    <ListItem button component={Link} to='/town'>
                        <ListItemText primary={'Market'}/>
                    </ListItem>

                    <ListItem button component={Link} to='/system'>
                        <ListItemText>⚙️</ListItemText>
                    </ListItem>

                    {/*<ListItem button component={Link} to='/debug'>
                        <ListItemText primary={'Debug'}/>
                    </ListItem>*/}

                </List>
                <Divider/>
                <List>
                    <ListItem button component={Link} to='/about'>
                        <ListItemText primary={'About'}/>
                    </ListItem>
                </List>
                {/*<Divider/>
                <div>
                    <IconButton onClick={this.scaleUp.bind(this)}>
                        <ZoomIn/>
                    </IconButton>
                    <IconButton onClick={this.scaleReset.bind(this)}>
                        <ZoomReset/>
                    </IconButton>
                    <IconButton onClick={this.scaleDown.bind(this)}>
                        <ZoomOut/>
                    </IconButton>
                </div>
                */}
            </div>
        );

        // var w = window.innerWidth; // not updated
        // console.log('w', w);
        // console.log('w', classes.drawerPaper);
        return (
            <div>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={this.props.container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.props.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{paper: classes.drawerPaper}}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{paper: classes.drawerPaper}}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

LayoutLeftBar.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(LayoutLeftBar));
//export default withStyles(styles, { withTheme: true })(LayoutLeftBar);
