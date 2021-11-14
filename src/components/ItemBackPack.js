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
import InputFieldItem from "./InputFieldItem";
import Clear from "./Clear";
import {update_g_equip_item, update_g_remove_item} from "../helpers/equipment_helpers";
import L from 'helpers/L';

class ItemBackPack extends Component {

    constructor(props) {
        super(props);
        this.remove_item = this.remove_item.bind(this);
        this.equip_item = this.equip_item.bind(this);
    }

    remove_item() {
        const g = update_g_remove_item(this.props.game, this.props.id);
        this.props.set_game(g);
    }

    equip_item() {
        /*
            - weapon : hands, hand Off, hand main
            - armour : head back torso arms waist legs feet
            - other : neck ring belt ?
         */
        const g = update_g_equip_item(this.props.game, this.props.id);
        this.props.set_game(g);
    }

    render() {
        if (this.props.id === 'header') return this.render_header();
        const item = this.props.game.items[this.props.id];
        const p = {class_name: 'field_input_small', id:item.id};
        return (
            <span>
                <InputFieldItem {...p} field_name={'d100'} read_only={true} width={60}/>
                <InputFieldItem {...p} field_name={'item_type'} width={80}/>
                <InputFieldItem {...p} field_name={'type'} width={60}/>
                <InputFieldItem {...p} field_name={'slot'} width={60}/>
                <InputFieldItem {...p} field_name={'hands'} read_only={true}/>
                <InputFieldItem {...p} field_name={'dmg'} type={'number'}/>
                <InputFieldItem {...p} field_name={'AS'}/>
                <InputFieldItem {...p} field_name={'gp'} type={'number'}/>
                <InputFieldItem {...p} field_name={'fix_cost'} type={'number'}/>
                <InputFieldItem {...p} field_name={'name'} width={200}/>
                <L onClick={this.equip_item}>Equip</L> &nbsp; &nbsp; &nbsp;
                <Clear onClick={this.remove_item}/>
            < /span>
        );
    }

    render_header() {
        const p = {class_name: 'field_input_header'};
        return (
            <span>
                <InputFieldItem {...p} field_name={'D100'} width={60}/>
                <InputFieldItem {...p} field_name={'Item'} width={80}/>
                <InputFieldItem {...p} field_name={'Type'} width={60}/>
                <InputFieldItem {...p} field_name={'Slot'} width={60}/>
                <InputFieldItem {...p} field_name={'Hands'}/>
                <InputFieldItem {...p} field_name={'Dmg'}/>
                <InputFieldItem {...p} field_name={'A/S'}/>
                <InputFieldItem {...p} field_name={'GP💰'}/>
                <InputFieldItem {...p} field_name={'Fix💰'}/>
                <InputFieldItem {...p} field_name={'Name'}/>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemBackPack)
