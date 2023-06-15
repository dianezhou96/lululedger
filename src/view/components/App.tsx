import React from "react";
import './App.css';
import Nav from './Nav';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <div className='App'>
        <Layout>
          <Sider breakpoint='lg' collapsedWidth='0' width='12rem'>
            <h2 style={{ color: '#f5f5f5' }} className='logo'>
              lululedger
            </h2>
            <Nav />
          </Sider>
          <Layout>
            {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: 'solid #f5f5f5',
          }}
        >
          <h3>smooth transition</h3>
        </Header> */}
            <Content style={{}}>
              <Routes>
                {/* <Route path='/' element={<DeltaUpdateWidget />} /> */}
                {/* <Route path='/visualize' element={<DeltaVisualizerWidget />} /> */}
              </Routes>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
                zIndex: '2',
              }}
            >
              San Francisco Ice Theatre ©{new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
