/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import Clear from "../components/Clear";
import React from "react";

export function clear_if_not_none(th, t) {
    const clear = t === 'none' ? '' : <span><Clear onClick={th.clear}/>&nbsp;</span>;
    return clear;
}
