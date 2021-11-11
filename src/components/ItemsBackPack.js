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
import ItemBackPackWeapon from "./ItemBackPackWeapon";

class ItemsBackPack extends Component {

    render() {
        let items = [];
        items.push(<span key={'header'} >
                    <ItemBackPackWeapon id={'header'}/><br/>
                    </span>);
        for (const key in this.props.game.items) {
            items.push(<span key={key}>
                        <ItemBackPackWeapon id={key}/><br/>
                        </span>);
        }
        return (
            <Paper elevation={5} className={'character'}>
                {items}
            </Paper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsBackPack)
