/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '../src/helpers/default_props';
import Clear from '../src/components/Clear';
import {character_rm_item} from "../src/helpers/character_helpers";
import {update_character, update_g_team} from "../src/helpers/update_helpers";
import Collapse from "@kunukn/react-collapse";
import L from "../src/helpers/L";
import ItemFieldInput from "./ItemInputField";

class Item extends Component {

    constructor() {
        super();
        this.remove_item = this.remove_item.bind(this);
        this.state = {open: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const v = !this.state.open;
        this.setState({open: v});
    }

    remove_item() {
        const c = character_rm_item(this.props.character, this.props.item);
        const t = update_character(this.props.game.team, c);
        const g = update_g_team(this.props.game, t);
        this.props.set_game(g);
    }

    render() {
        const i = this.props.item;
        return (
            <span className={'character'}>
                <Clear onClick={this.remove_item}/> <L className={'help'} onClick={this.toggle}>{i.name}</L>
                <Collapse isOpen={this.state.open}>
                    <span className={'character_traits collapse-css-transition'}>
                        <ItemFieldInput character_id={this.props.character.id} item={i} field_name={'name'}/><br/>
                        Type: <ItemFieldInput character_id={this.props.character.id} item={i} field_name={'type'}/><br/>
                        Cost: <ItemFieldInput character_id={this.props.character.id} item={i} field_name={'cost'}
                                              type={'number'}/><br/>
                        {i.description}
                    </span>
                </Collapse>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
