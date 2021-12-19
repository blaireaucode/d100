/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import L from 'helpers/L'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import {Link} from "react-router-dom"
import {JSONEditor} from "react-json-editor-viewer"


class ScreenDebug extends Component {

    constructor(props) {
        super(props);
        this.onJsonChange = this.onJsonChange.bind(this);
    }

    onJsonChange(key, value, parent, data) {
        console.log(key, value, parent, data);
    }

    render() {

        return (
            <div>
                debug <L to='/team'>team</L> <p/>

                <Link to={'#'} onClick={() => this.reset()}> Reset </Link><br/>


                <JSONEditor
                    data={this.props.game}
                    collapsible
                    view={"dual"}
                    onChange={this.onJsonChange}
                />;

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenDebug)
