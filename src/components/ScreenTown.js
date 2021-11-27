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
import L from "../helpers/L"
import ItemsTableWeapon from "./ItemsTableWeapon";
import ItemsTableArmour from "./ItemsTableArmour";
import CollapsibleHelp from "./CollapsibleHelp";
import C from "../helpers/C";
import ItemsTableNeeded from "./ItemsTableNeeded";
import HelpStartingItems from "./HelpStartingItems";

class ScreenTown extends Component {

    constructor(props) {
        super(props);
        this.state = {table: 'none'};
        this.toggle = this.toggle.bind(this);
    }

    toggle(table) {
        this.setState({table: table});
    }

    render() {
        let table = '';
        if (this.state.table === 'weapons') table = <ItemsTableWeapon/>
        if (this.state.table === 'armours') table = <ItemsTableArmour/>
        if (this.state.table === 'needed') table = <ItemsTableNeeded/>
        return (
            <span>
                <L onClick={() => this.toggle('none')} className={'clear'}> ✗ </L>
                &nbsp;&nbsp;&nbsp;
                <L onClick={() => this.toggle('weapons')}>Weapon table</L>
                &nbsp;&nbsp;&nbsp;
                <L onClick={() => this.toggle('armours')}>Armour table</L>
                &nbsp;&nbsp;&nbsp;
                <L onClick={() => this.toggle('needed')}>Needed table</L>
                <C width={'10ch'}/>
                <CollapsibleHelp text={'(?)'}>
                    <HelpStartingItems/>
                </CollapsibleHelp>
                <p/>
                {table}
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenTown)