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
import ItemBackPack1 from "./ItemBackPack1";

class BackPackTable1 extends Component {

    render() {
        let items = [];
        items.push(<span key={'header'}>
                    <ItemBackPack1 id={'header'}/><br/>
                    </span>);
        for (const key in this.props.game.items) {
            const item = this.props.game.items[key];
            if (item.current_location !== 'backpack') continue;
            if (item.item_type !== 'weapon' && item.item_type !== 'armour') continue;
            items.push(<span key={key}>
                        <ItemBackPack1 id={key}/><br/>
                        </span>);
        }
        return (
            <Paper elevation={5} className={'character_panel'}>
                {items}
            </Paper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackPackTable1)
