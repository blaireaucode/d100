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
import InputFieldHeader from "./InputFieldHeader";

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
                <InputFieldItem {...p} field_name={'d100'} read_only={true} width={40} align={'right'}/>
                <InputFieldItem {...p} field_name={'item_type'} width={60} align={'center'}/>
                <InputFieldItem {...p} field_name={'type'} width={50} align={'center'}/>
                <InputFieldItem {...p} field_name={'slot'} width={60}  align={'center'}/>
                <InputFieldItem {...p} field_name={'hands'} read_only={true} width={'3rem'} align={'center'}/>
                <InputFieldItem {...p} field_name={'str'} width={'4rem'} type={'number'} align={'right'}/>
                <InputFieldItem {...p} field_name={'dex'} width={'4rem'} type={'number'} align={'right'}/>
                <InputFieldItem {...p} field_name={'int'} width={'4rem'} type={'number'} align={'right'}/>
                <InputFieldItem {...p} field_name={'hp'} width={'4rem'} type={'number'} align={'right'}/>
                <InputFieldItem {...p} field_name={'dmg'} width={'4rem'} type={'number'} align={'right'}/>
                <InputFieldItem {...p} field_name={'AS'} width={'4rem'} align={'center'}/>
                <InputFieldItem {...p} field_name={'gp'} width={'4rem'} type={'number'} align={'center'}/>
                <InputFieldItem {...p} field_name={'fix_cost'} width={'4rem'} type={'number'} align={'center'}/>
                <InputFieldItem {...p} field_name={'name'} width={200}/>
                &nbsp;
                <L onClick={this.equip_item}>➹</L> &nbsp;
                <Clear onClick={this.remove_item}/>
            < /span>
        );
    }

    render_header() {
        const p = {class_name: 'field_input_header'};
        return (
            <span>
                <InputFieldHeader {...p} value={'D100'} width={40}/>
                <InputFieldHeader {...p} value={'Item'} width={60} align={'center'}/>
                <InputFieldHeader {...p} value={'Type'} width={50} align={'center'}/>
                <InputFieldHeader {...p} value={'Slot'} width={60}  align={'center'}/>
                <InputFieldHeader {...p} value={'Hands'} width={'3rem'}  align={'center'}/>
                <InputFieldHeader {...p} value={'str'} width={'4rem'} align={'center'}/>
                <InputFieldHeader {...p} value={'dex'} width={'4rem'} align={'center'}/>
                <InputFieldHeader {...p} value={'int'} width={'4rem'} align={'center'}/>
                <InputFieldHeader {...p} value={'HP'} width={'4rem'} align={'center'}/>
                <InputFieldHeader {...p} value={'dmg'} width={'4rem'} align={'center'}/>
                <InputFieldHeader {...p} value={'A/S'} width={'4rem'} align={'center'}/>
                <InputFieldHeader {...p} value={'GP💰'} width={'4rem'} align={'center'}/>
                <InputFieldHeader {...p} value={'Fix💰'} width={'4rem'}  align={'center'}/>
                <InputFieldHeader {...p} value={'Name'} align={'left'}/>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemBackPack)
