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
import {update_g_equip_item_location, update_g_item} from "../helpers/equipment_helpers";
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
        // console.log('remote item', item);
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
        //console.log('item_slot', this.props.id, item_slot);
        const slot_columns = this.render_slot_columns(item_slot);

        // other elements
        if (item_slot.item_id === 'none') return slot_columns;
        const item = this.props.game.items[item_slot.item_id];
        //console.log('item eq', this.props.id, item);

        const p = {items: this.props.game.items, id: item.id, class_name: 'field_input_small', align: 'right'};
        const w = '3rem';
        return (
            <span>
                {slot_columns}
                <InputFieldItem {...p} field_name={'name'} width={'14rem'}/>
                <InputFieldItem {...p} field_name={'str'} type={'number'} width={w}/>
                <InputFieldItem {...p} field_name={'dex'} type={'number'} width={w}/>
                <InputFieldItem {...p} field_name={'int'} type={'number'} width={w}/>
                <InputFieldItem {...p} field_name={'hp'} type={'number'} width={w}/>
                <InputFieldItem {...p} field_name={'dmg'} type={'number'} width={w}/>
                <InputFieldItem {...p} field_name={'def'} type={'number'} width={w}/>
                <InputFieldItem {...p} field_name={'AS'} width={w} align={'center'}/>
                <InputFieldItem {...p} field_name={'gp'} type={'number'} width={'5rem'} align={'center'}/>
                <InputFieldItem {...p} field_name={'fix_cost'} type={'number'} width={'5rem'} align={'center'}/>
                <InputFieldItem {...p} field_name={'damaged'}/>
                &nbsp;
                <L onClick={this.remove_item}>➷</L>
            < /span>
        );
    }

    render_slot_columns(item_slot) {
        const p = {
            items: this.props.game.equipped_items,
            id: this.props.id - 1,
            class_name: 'field_input_small',
            align: 'center'
        };
        return (
            <span>
                <InputFieldItem {...p} field_name={'d10'} read_only={true} width={'3rem'}/>
                <InputFieldItem {...p} field_name={'dmg_mod'} read_only={true} width={'3rem'}/>
                <InputFieldItem {...p} field_name={'location'} read_only={true} width={'4rem'}/>
            < /span>
        );
    }

    render_header() {
        const w = '3rem';
        const pn = {width: w, align: 'center'};
        const p = {align: 'center'};
        return (
            <span>
                <InputFieldHeader {...p} value={'D10'} width={'3rem'} align={'left'}/>
                <InputFieldHeader {...p} value={'Mod'} width={'3rem'}/>
                <InputFieldHeader {...p} value={'Loc.'} width={'4rem'}/>
                <InputFieldHeader {...p} value={'Name'} width={'14rem'} align={'right'}/>
                <InputFieldHeader {...pn} value={'str'}/>
                <InputFieldHeader {...pn} value={'dex'}/>
                <InputFieldHeader {...pn} value={'int'}/>
                <InputFieldHeader {...pn} value={'HP'}/>
                <InputFieldHeader {...pn} value={'dmg'}/>
                <InputFieldHeader {...pn} value={'def'}/>
                <InputFieldHeader {...pn} value={'AS'} width={w}/>
                <InputFieldHeader {...p} value={'GP💰'} width={'5rem'} align={'center'}/>
                <InputFieldHeader {...p} value={'Fix💰'} width={'5rem'} align={'center'}/>
                <InputFieldHeader {...p} value={'damaged'}/>
            </span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEquipped)
