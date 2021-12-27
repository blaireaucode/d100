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
import C from "../helpers/C";
import Clear from "./Clear";
import ItemSingle from "./ItemSingle";

class TableRollResult extends Component {

    clear = () => {
        let s = JSON.parse(JSON.stringify(this.props.state));
        s.dice = -1;
        let g = this.props.game;
        if (this.props.on_roll !== 'none') g = this.props.on_roll(s);
        this.props.set_game(g);
    }

    render() {
        if (this.props.state.dice === -1) return '';
        let m = '';
        if (this.props.state.mod > 0) m = '+ ' + this.props.state.mod + ' = ' + this.props.state.total;
        if (this.props.state.mod < 0) m = this.props.state.mod + ' = ' + this.props.state.total;
        const id = this.props.state.total;
        return (<span>
                <C width={'2ch'}/> ➜ <C width={'2ch'}/>
                {this.props.state.dice}
                {m}
                <C width={'2ch'}/>
                <Clear onClick={this.clear}/>
                <p/>
                <div className={'item_table_roll'}>
                    <ItemSingle
                        id={id}
                        item_type={this.props.state.table}
                        buy={false}/>
                </div>
                </span>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TableRollResult)
