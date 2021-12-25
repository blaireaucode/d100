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
import TableWeapon from "./TableWeapon";
import TableArmour from "./TableArmour";
import CollapsibleHelp from "./CollapsibleHelp";
import C from "../helpers/C";
import TableNeeded from "./TableNeeded";
import HelpStartingItems from "./HelpStartingItems";
import TableTreasureA from "./TableTreasureA";
import F from "../helpers/F";
import InputFieldCharacter from "./InputFieldCharacter";
import TableParts from "./TableParts";

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
        if (this.state.table === 'weapons') table = <TableWeapon/>
        if (this.state.table === 'armours') table = <TableArmour/>
        if (this.state.table === 'needed') table = <TableNeeded/>
        if (this.state.table === 'treasureA') table = <TableTreasureA/>
        if (this.state.table === 'parts') table = <TableParts/>
        return (
            <span>
                <F>💰Gold pieces <C width={'2ch'}/></F>
                <InputFieldCharacter type={'number'} width={'7ch'} field_name={'gold_pieces'}/>
                <br/>
                <L onClick={() => this.toggle('none')} className={'clear'}> ✗ </L>
                <C width={'3ch'}/>
                <L onClick={() => this.toggle('weapons')}>Weapon</L>
                <C width={'3ch'}/>
                <L onClick={() => this.toggle('armours')}>Armour</L>
                <C width={'3ch'}/>
                <L onClick={() => this.toggle('needed')}>Needed</L>
                <C width={'3ch'}/>
                <L onClick={() => this.toggle('treasureA')}>Treasure A</L>
                <C width={'3ch'}/>
                <L onClick={() => this.toggle('parts')}>Parts</L>
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