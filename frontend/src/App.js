import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from './store/store';
import AppRoutes from './routes';
import 'semantic-ui-css/semantic.min.css'
import './App.scss';

function App() {
  const providerTheme = {
    token: {
      colorPrimary: '#00b96b',
    }
  }
  return (
    <Provider store={store}>
      <Router>
        <ConfigProvider theme={providerTheme}>
          <AppRoutes />
        </ConfigProvider>
      </Router>
    </Provider>
  );
}

export default App;
