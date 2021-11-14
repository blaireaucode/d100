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
import {update_g_equip_item_location, update_g_item} from "../helpers/equipment_helpers";

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
        //console.log('item_slot', this.props.id, item_slot);
        const slot_columns = this.render_slot_columns(item_slot);

        // other elements
        if (item_slot.item_id === 'none') return slot_columns;
        const item = this.props.game.items[item_slot.item_id];
        //console.log('item eq', this.props.id, item);

        const p = {items: this.props.game.items, id: item.id, class_name: 'field_input_small'};
        const w = 40;
        return (
            <span>
                {slot_columns}
                <InputFieldItem {...p} field_name={'name'} width={160}/>
                <InputFieldItem {...p} field_name={'str'} type={'number'} width={w}/>
                <InputFieldItem {...p} field_name={'dex'} type={'number'} width={w}/>
                <InputFieldItem {...p} field_name={'int'} type={'number'} width={w}/>
                <InputFieldItem {...p} field_name={'hp'} type={'number'} width={w}/>
                <InputFieldItem {...p} field_name={'dmg'} type={'number'} width={w}/>
                <InputFieldItem {...p} field_name={'def'} type={'number'} width={w}/>
                <InputFieldItem {...p} field_name={'AS'} width={w}/>
                <InputFieldItem {...p} field_name={'gp'} type={'number'} width={60}/>
                <InputFieldItem {...p} field_name={'fix_cost'} type={'number'} width={60}/>
                <InputFieldItem {...p} field_name={'damaged'}/>
                &nbsp;&nbsp;&nbsp;
                <Clear onClick={this.remove_item}/>
            < /span>
        );
    }

    render_slot_columns(item_slot) {
        const p = {items: this.props.game.equipped_items, id: this.props.id - 1, class_name: 'field_input_small'};
        return (
            <span>
                <InputFieldItem {...p} field_name={'d10'} read_only={true} width={40}/>
                <InputFieldItem {...p} field_name={'dmg_mod'} read_only={true} width={40}/>
                <InputFieldItem {...p} field_name={'location'} read_only={true}/>
            < /span>
        );
    }

    render_header() {
        const p = {class_name: 'field_input_header'};
        const w = 40;
        return (
            <span>
                <InputFieldItem {...p} field_name={'D10'} read_only={true} width={40}/>
                <InputFieldItem {...p} field_name={'Mod'} width={40}/>
                <InputFieldItem {...p} field_name={'Loc.'}/>
                <InputFieldItem {...p} field_name={'Name'} width={160}/>
                <InputFieldItem {...p} field_name={'str'} width={w}/>
                <InputFieldItem {...p} field_name={'dex'} width={w}/>
                <InputFieldItem {...p} field_name={'int'} width={w}/>
                <InputFieldItem {...p} field_name={'HP'} width={w}/>
                <InputFieldItem {...p} field_name={'dmg'} width={w}/>
                <InputFieldItem {...p} field_name={'def'} width={w}/>
                <InputFieldItem {...p} field_name={'AS'} width={w}/>
                <InputFieldItem {...p} field_name={'GP💰'} width={60}/>
                <InputFieldItem {...p} field_name={'Fix💰'} width={60}/>
                <InputFieldItem {...p} field_name={'damaged'}/>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEquipped)
