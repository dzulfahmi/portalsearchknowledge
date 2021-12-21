import { Button, Layout, PageHeader, Table, Tag, Space } from 'antd';

const { Header, Content } = Layout;

const NotFound = () => {
  return (
    <Content style={{
      margin: '8px 16px',
      paddingLeft: 12,
      paddingRight: 12,
      minHeight: 600,
    }}>
      <h3>Halaman yang Anda tuju tidak tersedia</h3>
    </Content>
  );
}

export default NotFound;