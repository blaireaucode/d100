/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import ReactDOMServer from 'react-dom/server';


export function log_quest(quest) {
    const a = <span>
        <h1>Quest: {quest.name}</h1>
        Success: {quest.S}<br/>
        Fail: {quest.F}<br/>
        Encounter mod: {quest.enc_mod}<br/>
        {quest.txt}
        </span>
    ;
    return ReactDOMServer.renderToStaticMarkup(a);
}