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
import C from "../helpers/C";

class TestDiceResult extends Component {

    render() {
        const t = this.props.test;
        const c = this.props.game.characteristics;
        let result = '';
        if (t.dice !== -1) {
            const v = parseInt(c[t.type.toLowerCase()]) + parseInt(t.mod);
            if (t.dice <= v) {
                result = <span> ➜ &nbsp; {t.dice}<C width={'2ch'}/>
                            <span className={'attack_hit'}>Success ! <C width={'4ch'}/>
                             <C width={'25ch'} className={'help'}> {t.dice} is lower or equal to {v} </C>
                        </span>
                    </span>
            } else {
                result = <span> ➜ &nbsp; {t.dice}<C width={'2ch'}/>
                                <span className={'attack_miss'}>Fail <C width={'4ch'}/>
                                <span className={'help'}> {t.dice} is greater to {v}
                                </span>
                        </span>
                </span>
            }
        }
        return (
            <span>
                {result}
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestDiceResult)
