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
import InputFieldHeader from "./InputFieldHeader";
import InputFieldCharacter from "./InputFieldCharacter";

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
        const p = {align: 'center', value: ''};
        const w = '3rem';
        const pn = {width: w, align: 'center'};
        return (
            <Paper elevation={5} className={'character_panel'}>
                {/*{c.str_items} {c.dex_items} {c.int_items} {c.hp_items} {c.dmg_items}*/}
                {items}
                <InputFieldHeader {...p} width={'3rem'}/>
                <InputFieldHeader {...p} width={'3rem'}/>
                <InputFieldHeader {...p} width={'4rem'}/>
                <InputFieldHeader {...p} value={'Total'} width={'10rem'} align={'right'}/>
                <InputFieldCharacter {...pn} field_name={'str_items'} align={'center'}/>
                <InputFieldCharacter {...pn} field_name={'dex_items'}/>
                <InputFieldCharacter {...pn} field_name={'int_items'}/>
                <InputFieldCharacter {...pn} field_name={'hp_items'}/>
                <InputFieldCharacter {...pn} field_name={'dmg_items'}/>
                <InputFieldCharacter {...pn} field_name={'def_items'}/>
                <InputFieldHeader {...pn} width={w}/>
                <InputFieldHeader {...p} width={'5rem'} align={'center'}/>
                <InputFieldHeader {...p} width={'5rem'} align={'center'}/>
                <InputFieldHeader {...p} />
                <br/>
                <InputFieldHeader {...p} width={'3rem'}/>
                <InputFieldHeader {...p} width={'3rem'}/>
                <InputFieldHeader {...p} width={'4rem'}/>
                <InputFieldHeader {...p} width={'10rem'} align={'right'}/>
                <InputFieldHeader {...pn} value={'str'} align={'center'}/>
                <InputFieldHeader {...pn} value={'dex'}/>
                <InputFieldHeader {...pn} value={'int'}/>
                <InputFieldHeader {...pn} value={'HP'}/>
                <InputFieldHeader {...pn} value={'dmg'}/>
                <InputFieldHeader {...pn} value={'def'}/>
                <InputFieldHeader {...pn} width={w}/>
                <InputFieldHeader {...p} width={'5rem'} align={'center'}/>
                <InputFieldHeader {...p} width={'5rem'} align={'center'}/>
                <InputFieldHeader {...p} />
            </Paper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsEquipped)
