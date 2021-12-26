/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Paper} from "@material-ui/core"
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import {ContentState, Editor, EditorState, RichUtils} from 'draft-js'
import 'draft-js/dist/Draft.css'
import {update_dic} from "../helpers/helpers_update";


class Log extends Component {

    constructor(props) {
        super(props);
        this.clear_action = this.clear_action.bind(this);
        let t = EditorState.createWithContent(ContentState.createFromText('start '))
        if ('log' in this.props.game)
            t = EditorState.createWithContent(ContentState.createFromText(this.props.game.log))
        this.state = {editorState: t};
        this.onChange = this.onChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    }

    clear_action() {
    }

    onChange(value) {
        const t = value.getCurrentContent().getPlainText();
        this.setState({editorState: value});
        const g = update_dic(this.props.game, 'log', t);
        this.props.set_game(g);
    }

    toggleInlineStyle(event) {
        console.log('toggleInlineStyle')
        event.preventDefault();
        let style = event.currentTarget.getAttribute('data-style');
        this.setState({
            editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)
        });
    }


    handleKeyCommand(command, editorState) {
        // when type "return"
        console.log('handleKeyCommand')
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }


    render() {
        const q = this.props.game.quest;
        if (q.d100 === 'none') return '';
        const t = EditorState.createWithContent(ContentState.createFromText(this.props.game.log))
        console.log('t', t.getCurrentContent().getPlainText());
        return (
            <Paper elevation={5} className={'encounter'}>
                <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                />
            </Paper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)
