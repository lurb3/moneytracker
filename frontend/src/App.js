import { ConfigProvider } from 'antd';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import AppRoutes from './routes';
import store from './store/store';

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
