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
import {update_g_equip_item_location, update_g_item} from "../helpers/helpers_equipment";
import InputFieldHeader from "./InputFieldHeader";
import L from "../helpers/L";

class ItemEquipped extends Component {

    constructor(props) {
        super(props);
        this.remove_item = this.remove_item.bind(this);
        this.render_slot_columns = this.render_slot_columns.bind(this);
    }

    remove_item() {
        const item_slot = this.props.game.equipped_items[this.props.id - 1];
        const item = this.props.game.items[item_slot.item_id];
        let g = update_g_item(this.props.game, item.id, 'current_location', 'backpack');
        g = update_g_equip_item_location(g, this.props.id - 1, 'none')
        if (item.hands === 2) {
            g = update_g_equip_item_location(g, 5, 'none')
            g = update_g_equip_item_location(g, 6, 'none')
        }
        this.props.set_game(g);
    }

    render() {
        // header ?
        if (this.props.id === 'header') return this.render_header();

        // first columns
        const item_slot = this.props.game.equipped_items[this.props.id - 1];
        const slot_columns = this.render_slot_columns(item_slot);
        //console.log('item, ', item_slot.item_id)
        const p = {
            items: this.props.game.items,
            id: item_slot.item_id,
            read_only: (item_slot.item_id === 'none'),
            class_name: 'field_input_small',
            align: 'right',
            width: '3rem'
        };
        let remove = <L onClick={this.remove_item}>➷</L>;
        if (item_slot.item_id === 'none') remove = '';
        return (
            <span className={'item_row'}>
                {slot_columns}
                <InputFieldItem {...p} field_name={'name'} width={'20ch'} align={'right'}/>
                <InputFieldItem {...p} field_name={'str'} type={'number'}/>
                <InputFieldItem {...p} field_name={'dex'} type={'number'}/>
                <InputFieldItem {...p} field_name={'int'} type={'number'}/>
                <InputFieldItem {...p} field_name={'hp'} type={'number'}/>
                <InputFieldItem {...p} field_name={'dmg'} type={'number'}/>
                <InputFieldItem {...p} field_name={'def'} type={'number'}/>
                <InputFieldItem {...p} field_name={'AS'} align={'center'}/>
                <InputFieldItem {...p} field_name={'gp'} type={'number'} width={'5rem'} align={'center'}/>
                <InputFieldItem {...p} field_name={'fix_cost'} type={'number'} width={'5rem'} align={'center'}/>
                <InputFieldItem {...p} field_name={'damaged'} width={'5rem'} type={'number'} align={'center'}/>
                &nbsp;
                {remove}
            < /span>
        );
    }

    render_slot_columns(item_slot) {
        const p = {
            items: this.props.game.equipped_items,
            id: this.props.id - 1,
            class_name: 'field_input_small_header',
            align: 'center'
        };
        return (
            <span>
                <InputFieldItem {...p} field_name={'d10'} read_only={true} width={'2rem'}/>
                <InputFieldItem {...p} field_name={'dmg_mod'} read_only={true} width={'3rem'}/>
                <InputFieldItem {...p} field_name={'location'} read_only={true} width={'4rem'}/>
            < /span>
        );
    }

    render_header() {
        const pn = {width: '3rem', align: 'center', class_name: 'field_input_small_header'};
        const p = {align: 'center', class_name: 'field_input_small_header'};
        return (
            <span>
                <InputFieldHeader {...p} value={'D10'} width={'2rem'} align={'left'}/>
                <InputFieldHeader {...p} value={'Mod'} width={'3rem'}/>
                <InputFieldHeader {...p} value={'Loc.'} width={'4rem'}/>
                <InputFieldHeader {...p} value={'Name'} width={'20ch'} align={'right'}/>
                <InputFieldHeader {...pn} value={'str'}/>
                <InputFieldHeader {...pn} value={'dex'}/>
                <InputFieldHeader {...pn} value={'int'}/>
                <InputFieldHeader {...pn} value={'HP'}/>
                <InputFieldHeader {...pn} value={'dmg'}/>
                <InputFieldHeader {...pn} value={'def'}/>
                <InputFieldHeader {...pn} value={'AS'}/>
                <InputFieldHeader {...p} value={'💰GP'} width={'5rem'} align={'center'}/>
                <InputFieldHeader {...p} value={'💰Fix'} width={'5rem'} align={'center'}/>
                <InputFieldHeader {...p} value={'🛠'} width={'5rem'}/>
            </span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEquipped)
