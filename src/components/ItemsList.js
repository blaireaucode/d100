/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import {Paper} from "@material-ui/core"
import L from 'helpers/L'
import {update_character, update_g_team} from 'helpers/update_helpers'
import {character_add_item} from 'helpers/character_helpers'
import Item from 'components/Item'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { v4 as uuidv4 } from 'uuid';

class ItemsList extends Component {

    constructor() {
        super();
        this.add_item = this.add_item.bind(this);
    }

    add_item() {
        const item = {
            id: uuidv4(),
            name: 'name',
            text: 'description',
            help: 'help'
        }
        const c = character_add_item(this.props.character, item);
        const t = update_character(this.props.game.team, c);
        const g = update_g_team(this.props.game, t);
        this.props.set_game(g);
    }

    render() {
        const items = [];
        for (let i in this.props.character.items) {
            items.push(
                <ListItemText key={i} className={'item'}>
                    <Item character={this.props.character} item={this.props.character.items[i]}/>
                </ListItemText>)
        }
        return (
            <Paper elevation={5} className={'character'}>
                <L onClick={this.add_item}>+</L><br/>
                <List>
                    {items}
                </List>
            </Paper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
