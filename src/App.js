/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles'
import 'App.css'
import Theme from 'theme.json'
import store from 'helpers/store'
import Routes from 'Routes'

const theme = createTheme(Theme);

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <MuiThemeProvider theme={theme}>
                        <Routes/>
                    </MuiThemeProvider>
                </div>
            </Provider>
        );
    }
}

//export default App;
export default App;
