/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react'
import {Route} from 'react-router-dom'
import LayoutBothBar from 'LayoutBothBar'

const Layout = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={matchProps => (
            <div>
                <LayoutBothBar {...matchProps}>
                    <Component {...matchProps} />
                </LayoutBothBar>
            </div>
        )}/>
    );
};

export default Layout;
