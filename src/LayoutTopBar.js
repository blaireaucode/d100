/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
//import ArrowBack from '@material-ui/icons/ArrowBack'
//import ArrowForward from '@material-ui/icons/ArrowForward'
//import Delete from '@material-ui/icons/Delete'
//import Cached from '@material-ui/icons/Cached'
// import Button from '@material-ui/core/Button'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import {get_dice_ui} from "./helpers/dice_helpers";

const styles = theme => ({
    menuButton: {
        marginRight: 20,
        //maxWidth: '1200px',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        }
    }
});

class LayoutTopBar extends React.Component {

    clearPassage() {
    }

    render() {
        //console.log('LayoutTopBar title', this.props.book.current_passage);
        const {classes} = this.props;

        //<img width='15px' src={require('./images/lw5.png')}/>
        /*const icon_style = {
            verticalAlign: 'middle',
        };
        const icon_trash_style = {
            verticalAlign: 'middle',
            fontSize: '1.2em'
        };
        */

        /*
        const en = this.props.options.display_cheat_top;
        var hen = (
            <span>
                <L enabled={en} to={p_previous}><ArrowBack style={icon_style}/></L> {' '}
                <L enabled={en} to={p_next}><ArrowForward style={icon_style}/></L> {' '}
                <Button disabled={!en} onClick={this.clearPassage.bind(this)}>
                         <Cached style={icon_trash_style}/>
                </Button>
            </span>
        );
         */
        //if (!en) hen = '';

        const dice_ui = get_dice_ui(this.props.game);
        let left = '';
        if (dice_ui.open) {
            left = 'Dice: ' + dice_ui.total;
        }

        return (
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.props.handleDrawerToggle}
                    className={classes.menuButton}>
                    <MenuIcon/>
                </IconButton>
                <Grid container className='Book-topbar'>
                    <Grid item xs={6} className='Book-topbar-l'>
                        {left}
                    </Grid>
                    <Grid item xs={1} className='Book-topbar-c'>
                        {'center' /*title_passage*/}
                    </Grid>
                    <Grid item xs={5} className='Book-topbar-r'>
                        {'right' /*hen*/}
                    </Grid>
                </Grid>
            </Toolbar>
        );
    }
}

LayoutTopBar.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(LayoutTopBar));
