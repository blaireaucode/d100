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

class ItemBackPackWeapon extends Component {

    constructor(props) {
        super(props);
        this.remove_item = this.remove_item.bind(this);
    }

    remove_item() {

    }

    render() {
        if (this.props.id === 'header') return this.render_header();
        const item = this.props.game.items[this.props.id];
        return (
            <span>
                <InputFieldItem id={item.id} field_name={'d100'} read_only={true} width={60}/>
                <InputFieldItem id={item.id} field_name={'type'} width={40}/>
                <InputFieldItem id={item.id} field_name={'hands'} read_only={true}/>
                <InputFieldItem id={item.id} field_name={'dmg'} type={'number'}/>
                <InputFieldItem id={item.id} field_name={'gp'} type={'number'}/>
                <InputFieldItem id={item.id} field_name={'cost'} type={'number'}/>
                <InputFieldItem id={item.id} field_name={'name'} width={200}/>
            < /span>
        );
    }

    render_header() {
        return (
            <span>
                <InputFieldItem field_name={'d100'} width={60}/>
                <InputFieldItem field_name={'type'} width={40}/>
                <InputFieldItem field_name={'hands'}/>
                <InputFieldItem field_name={'dmg'}/>
                <InputFieldItem field_name={'gp'}/>
                <InputFieldItem field_name={'cost'}/>
                <InputFieldItem field_name={'name'}/>
            < /span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemBackPackWeapon)
