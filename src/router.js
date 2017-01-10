import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';

import App from './routes/App'
import Error from './routes/error'
import Ico from './routes/ui/ico'
import Products from './routes/product_management/products';
import Ceramics from './routes/material_management/ceramics';
import Floors from './routes/material_management/floors';
import Suppliers from './routes/supplier_management/suppliers';

export default function ({ history }) {
  return (
    <Router history={ history }>
      <Route path="/" component={ App } >
      	<Route path="/product_management/products" component={Products}/>
      	<Route path="/material_management/ceramics" component={Ceramics}/>
      	<Route path="/material_management/floors" component={Floors}/>
      	<Route path="/supplier_management/suppliers" component={Suppliers}/>
      	<Route path="*" component={ Error } />
      </Route>
    </Router>
  )
}
