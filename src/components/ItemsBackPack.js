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
import ItemBackPack from "./ItemBackPack";

class ItemsBackPack extends Component {

    render() {
        let items = [];
        items.push(<span key={'header'}>
                    <ItemBackPack id={'header'}/><br/>
                    </span>);
        for (const key in this.props.game.items) {
            const item = this.props.game.items[key];
            if (item.current_location !== 'backpack') continue;
            items.push(<span key={key}>
                        <ItemBackPack id={key}/><br/>
                        </span>);
        }
        return (
            <Paper elevation={5} className={'character_panel'}>
                Backpack
                <br/>
                {items}
            </Paper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsBackPack)
