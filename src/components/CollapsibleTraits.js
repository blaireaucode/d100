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
import Collapse from "@kunukn/react-collapse"
import L from 'helpers/L'

class CollapsibleTraits extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.toggle_traits = this.toggle_traits.bind(this);
    }

    toggle_traits() {
        const v = !this.state.open;
        this.setState({open: v});
    }

    render() {
        const cl = this.props.cclass;
        const t = this.props.traits;
        const tr = cl[t];
        const n = (t === 'traits' ? 'Traits' : t.replace('traits', ''));
        return (
            <span className={'character'}>
                <L className={'help'} onClick={this.toggle_traits}>{n}</L>
                <Collapse isOpen={this.state.open}>
                    <div className={'character_traits collapse-css-transition'}>
                        {tr}
                    </div>
                </Collapse>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleTraits);
