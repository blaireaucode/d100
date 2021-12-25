/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props';
import {buy_g_item, buy_state_item} from "../helpers/equipment_helpers";
import L from "../helpers/L";
import C from "../helpers/C";

class ItemGet extends Component {

    static defaultProps = {
        class_name: '',
        item_type: 'armour',
        buy: true
    }

    constructor(props) {
        super(props);
        this.buy_item = this.buy_item.bind(this);
        this.state = {buy: ''};
    }

    buy_item() {
        const g = buy_g_item(this.props.game, this.props.item_type, this.props.id, this.props.buy);
        this.props.set_game(g);
        buy_state_item(this, this.props.buy);
    }

    render() {
        const get = this.props.buy ? 'Buy' : 'Get it';
        return (
            <span className={this.props.class_name}>
                <L onClick={this.buy_item}>{get}</L>
                <C width={'5ch'}/>
                <C className={'field_input'}>{this.state.buy}</C>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemGet)
