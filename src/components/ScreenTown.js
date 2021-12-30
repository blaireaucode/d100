/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props';
import L from "../helpers/L";
import CollapsibleHelp from "./CollapsibleHelp";
import C from "../helpers/C";
import HelpStartingItems from "./HelpStartingItems";
import F from "../helpers/F";
import InputFieldCharacter from "./InputFieldCharacter";
import TableGeneric from "./TableGeneric";
import {all_tables, new_table_roll, tables_props} from "../helpers/helpers_table";
import TableRoll from "./TableRoll";

class ScreenTown extends Component {

    components_tables = {};
    menus_tables = [];

    constructor(props) {
        super(props);
        this.state = {table: 'none', table_roll: new_table_roll()};
        this.state.table_roll.tables = all_tables;
        this.toggle = this.toggle.bind(this);
        this.components_tables['none'] = '';
        for (const t in tables_props) {
            const p = tables_props[t];
            this.components_tables[p.name] = <TableGeneric key={p.name} table_name={p.name} title={p.title}/>;
            this.menus_tables.push(
                <span key={p.name}>
                    <L onClick={() => this.toggle(p.name)}>{p.short}</L>
                    <C width={'2ch'}/>
                </span>);
        }
    }

    on_table_roll = (state) => {
        this.setState({table_roll: state});
        return this.props.game;
    }

    toggle(table) {
        this.setState({table: table});
    }

    render() {
        const table = this.components_tables[this.state.table];
        return (
            <span>
                <F>💰Gold pieces <C width={'2ch'}/></F>
                <InputFieldCharacter type={'number'} width={'7ch'} field_name={'gold_pieces'}/>
                <p/>
                <TableRoll state={this.state.table_roll} on_roll={this.on_table_roll}/>
                <p/>
                <L onClick={() => this.toggle('none')} className={'clear'}> ✗ </L>
                <C width={'2ch'}/>
                {this.menus_tables}
                <C width={'2ch'}/>
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