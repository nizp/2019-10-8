import React from 'react';
import {
    Switch
} from 'react-router-dom';

import routes,{routerList} from './routes'; //引了一下配置数组


export default (<Switch>{routerList(routes)}</Switch>);

