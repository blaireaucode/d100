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

class ItemEquipped extends Component {

    constructor(props) {
        super(props);
        this.remove_item = this.remove_item.bind(this);
        this.render_slot_columns = this.render_slot_columns.bind(this);
    }

    remove_item() {
        /*
        const g = update_g_remove_item(this.props.game, this.props.id);
        this.props.set_game(g);

         */
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

        const p = {items: this.props.game.items, id: item.id};
        return (
            <span>
                {slot_columns}
                <InputFieldItem {...p} field_name={'name'} width={120}/>
                <InputFieldItem {...p} field_name={'str'} type={'number'}/>
                <InputFieldItem {...p} field_name={'dex'} type={'number'}/>
                <InputFieldItem {...p} field_name={'int'} type={'number'}/>
                <InputFieldItem {...p} field_name={'hp'} type={'number'}/>
                <InputFieldItem {...p} field_name={'dmg'} type={'number'}/>
                <InputFieldItem {...p} field_name={'def'} type={'number'}/>
                <InputFieldItem {...p} field_name={'gp'} type={'number'}/>
                <InputFieldItem {...p} field_name={'fix_cost'} type={'number'}/>
                <InputFieldItem {...p} field_name={'AS'} />
                <InputFieldItem {...p} field_name={'damaged'} />
                <Clear onClick={this.remove_item}/>
            < /span>
        );
    }

    render_slot_columns(item_slot) {
        const p = {items: this.props.game.equipped_items, id: this.props.id - 1};
        return (
            <span>
                <InputFieldItem {...p} field_name={'d10'} read_only={true}/>
                <InputFieldItem {...p} field_name={'dmg_mod'} read_only={true}/>
                <InputFieldItem {...p} field_name={'location'} read_only={true}/>
            < /span>
        );
    }

    render_header() {
        return (
            <span>
                <InputFieldItem field_name={'D10'} read_only={true}/>
                <InputFieldItem field_name={'mod'}/>
                <InputFieldItem field_name={'location'}/>
                <InputFieldItem field_name={'name'} width={120}/>
                <InputFieldItem field_name={'str'}/>
                <InputFieldItem field_name={'dex'}/>
                <InputFieldItem field_name={'int'}/>
                <InputFieldItem field_name={'hp'}/>
                <InputFieldItem field_name={'dmg'}/>
                <InputFieldItem field_name={'def'}/>
                <InputFieldItem field_name={'gp'}/>
                <InputFieldItem field_name={'fix_cost'}/>
                <InputFieldItem field_name={'AS'}/>
                <InputFieldItem field_name={'damaged'}/>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEquipped)
