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
import 'draft-js/dist/Draft.css'
import {editorStateFromRaw, MegadraftEditor} from "megadraft";

//const [value, setValue] = React.useState("**Hello world!!!**");


class Log extends Component {


    constructor(props) {
        super(props);
        this.clear_action = this.clear_action.bind(this);
        this.state = {editorState: editorStateFromRaw(null)};
    }

    clear_action() {
    }


    onChange = (editorState) => {
        this.setState({editorState});
    }

    render() {
        const q = this.props.game.quest;
        if (q.d100 === 'none') return '';
        console.log('state', this.state)
        return (
            <div>
                <MegadraftEditor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    placeholder='Add some text'/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)
