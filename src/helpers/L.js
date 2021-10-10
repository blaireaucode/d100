/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'

class L extends Component {

    handleClick() {
        if (this.props.onClick) this.props.onClick();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        let u = this.props.to;
        if (this.props.enabled)
            return (
                <Link className={this.props.className} to={u}
                      onClick={this.handleClick.bind(this)}>{this.props.children}</Link>
            );
        else
            return (<span>
                      {this.props.children}
                    </span>
            );
    }
}

// Set default props
L.defaultProps = {
    enabled: true,
    to: '#'
};

export default connect(mapStateToProps, mapDispatchToProps)(L);
