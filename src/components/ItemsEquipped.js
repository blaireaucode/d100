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
import {Paper} from "@material-ui/core"
import ItemEquipped from "./ItemEquipped";
import InputFieldItem from "./InputFieldItem";

class ItemsEquipped extends Component {

    render() {
        let items = [];
        items.push(<span key={'header'}>
                    <ItemEquipped id={'header'}/><br/>
                    </span>);
        for (const key in this.props.game.equipped_items) {
            const item = this.props.game.equipped_items[key];
            items.push(<span key={item.d10}>
                        <ItemEquipped id={item.d10}/><br/>
                        </span>);
        }
        const c = this.props.game.characteristics;
        return (
            <Paper elevation={5} className={'character_panel'}>
                {c.str_items} {c.dex_items} {c.int_items} {c.hp_items} {c.dmg_items}
                <br/>
                {items}
                <br/>
                <InputFieldItem field_name={'fake'} read_only={true} width={40}/>
            </Paper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsEquipped)
