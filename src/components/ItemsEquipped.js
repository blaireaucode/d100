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
        return (
            <Paper elevation={5} className={'character'}>
                - Equipped -
                <p/>
                {items}
            </Paper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsEquipped)
