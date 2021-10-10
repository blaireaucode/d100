/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react'
import {Paper} from "@material-ui/core";


export function renderCellExpand(params) {
    console.log('params', params)
    return (
        <Paper elevation={0} className={'table_cell'}>{params.value}</Paper>
    );
}
