import './index.html';
import './index.css';
import dva from 'dva';

// 1. Initialize
const app = dva();

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/apps')); 
app.model(require('./models/ceramics')); 
app.model(require('./models/floors'));
app.model(require('./models/products'));
app.model(require('./models/suppliers'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

