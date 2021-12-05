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
import Collapse from "@kunukn/react-collapse";
import L from "../helpers/L";

class CollapsibleHelp extends Component {

    static defaultProps = {
        text: "help"
    }

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const v = !this.state.open;
        this.setState({open: v});
    }

    render() {
        return (
            <span>
                <L onClick={this.toggle}>{this.props.text}</L>
                    <Collapse isOpen={this.state.open}>
                        <span className={'help collapse-css-transition'}>
                        {this.props.children}
                        </span>
                    </Collapse>
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleHelp);
