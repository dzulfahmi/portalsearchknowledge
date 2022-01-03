import { Avatar, Button, Layout, Dropdown, Menu, Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/AuthAction';

const { Header, Footer } = Layout;
const { SubMenu } = Menu;

const AdminLayout = (props: any) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const {children} = props;
  const getSelectedKeys = () => {
    if (window.location.href.indexOf('/admin/dashboard') !== -1) {
      return ['dashboard']
    } else if (window.location.href.indexOf('/admin/crawler') !== -1) {
      return ['crawler']
    } else if (window.location.href.indexOf('/admin/print') !== -1) {
      return ['print']
    } else if (window.location.href.indexOf('/admin/order') !== -1) {
      return ['order']
    } else if (window.location.href.indexOf('/admin/shipment') !== -1) {
      return ['shipment']
    } else if (window.location.href.indexOf('/admin/customer') !== -1) {
      return ['customer']
    } else if (window.location.href.indexOf('/admin/stock') !== -1) {
      return ['stock']
    } 
  }

  const afterUserDestroyed = () => {
    navigate('/');
    setTimeout(function(){window.location.reload();},10);
  }

  const menu = (
    <Menu>
      {/* <Menu.Item>
        <a target="_blank"  rel="noopener noreferrer">
          Profil
        </a>
      </Menu.Item> */}
      <Menu.Item onClick={() => dispatch(logout())}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Row>
          <Col span={3} style={{paddingTop: 15}}>
            <Title style={{color: 'white', justifySelf: 'center'}} level={4}>Portal K</Title>
          </Col>
          <Col span={18}>
            <Menu style={{alignItems: 'center', justifyContent: 'center'}} theme="dark" mode="horizontal" selectedKeys={getSelectedKeys()}>
              <Menu.Item key="dashboard"><Link to="/admin/dashboard">Dasbor</Link></Menu.Item>
              <Menu.Item key="crawler"><Link to="/admin/crawler">Crawler</Link></Menu.Item>
            </Menu>
            
          </Col>
          <Col span={3} style={{paddingTop: 15}}>
          <Dropdown overlay={menu} placement="bottomLeft">
            {/* <Button>bottomLeft</Button> */}
            <Avatar style={{float: 'right'}} src='./assets/img/avatar.png' />
          </Dropdown>
          </Col>
        </Row>
      </Header>
      <Outlet />
      <Footer style={{ textAlign: 'center' }}>Portal Search Knowledge ©2021.</Footer>
    </Layout>
  )
};

export default AdminLayout;