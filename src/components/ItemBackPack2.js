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
import InputFieldItem from "./InputFieldItem";
import Clear from "./Clear";
import {update_g_remove_item} from "../helpers/helpers_equipment";
import InputFieldHeader from "./InputFieldHeader";
import C from "../helpers/C";

class ItemBackPack2 extends Component {

    constructor(props) {
        super(props);
        this.remove_item = this.remove_item.bind(this);
    }

    remove_item() {
        const g = update_g_remove_item(this.props.game, this.props.id);
        this.props.set_game(g);
    }

    render() {
        if (this.props.id === 'header') return this.render_header();
        const item = this.props.game.items[this.props.id];
        const p = {class_name: 'input field_input_small', id: item.id};
        return (
            <span className={'item_row'}>
                <C width={'2ch'}><Clear onClick={this.remove_item}/></C>
                <InputFieldItem {...p} field_name={'d100'} read_only={true} width={'5ch'} align={'right'}/>
                <InputFieldItem {...p} field_name={'item_type'} width={'11ch'} align={'center'}/>
                <InputFieldItem {...p} field_name={'gp'} width={'7ch'} type={'number'} align={'right'}/>
                <InputFieldItem {...p} field_name={'number'} width={'7ch'} type={'number'} align={'right'}/>
                <InputFieldItem {...p} field_name={'detail'} width={'70ch'}/>
                <InputFieldItem {...p} field_name={'name'} width={'30ch'}/>
            < /span>
        );
    }

    render_header() {
        const p = {class_name: 'field_input_small_header'};
        return (
            <span>
                <C width={'2ch'}/>
                <InputFieldHeader {...p} value={'D100'} width={'5ch'} align={'right'}/>
                <InputFieldHeader {...p} value={'Type'} width={'11ch'} align={'center'}/>
                <InputFieldHeader {...p} value={'💰 GP'} width={'7ch'} align={'left'}/>
                <InputFieldHeader {...p} value={'#'} width={'7ch'} align={'center'}/>
                <InputFieldHeader {...p} value={'Detail'} width={'70ch'} align={'left'}/>
                <InputFieldHeader {...p} value={'Name'} width={'20ch'} align={'left'}/>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemBackPack2)
