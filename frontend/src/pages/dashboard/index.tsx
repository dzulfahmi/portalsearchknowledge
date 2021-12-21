import {useEffect, useRef, useState} from 'react';
import { 
  Card, 
  Col, 
  Row, 
  Layout,
  Statistic, 
  Typography,
} from 'antd';
import {
  FolderTwoTone,
  SmileTwoTone,
  CalendarTwoTone,
  BugTwoTone,
} from "@ant-design/icons";
import {useDispatch, useSelector} from 'react-redux';
import { getCrawlerCount } from '../../store/actions/CrawlerAction';

const { Title, Text, Link } = Typography;


const {Content} = Layout;
const routes = [
  {
    path: 'index',
    breadcrumbName: 'Dashboard',
  },
  {
    path: 'first',
    breadcrumbName: 'Paket Webinar',
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();
	const {info, isLoading, contents, tContent, tElastic} = useSelector((state: any) => ({
		info: state.info,
		contents: state.craw.contents,
		tContent: state.craw.tContent,
		tElastic: state.craw.tElastic,
		isLoading: state.craw.isLoading,
	}));
  const [page, setPage] = useState(1);


  useEffect(() => {
    dispatch(getCrawlerCount())
  }, []);

  return (
    <Content style={{
      margin: '8px 16px',
      paddingLeft: 12,
      paddingRight: 12,
      minHeight: 600,
    }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card bordered>
            <Title level={3}>Selamat Datang di Portal Search Knowledge</Title>
            {/* <Text>This admin dashboard template made with Ant Design and some others library. It will provide some default pages, sidenavs, and others. If you don't know about Ant Design, you could read about it <Link href="https://ant.design" target="_blank">in here</Link></Text> */}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card bordered>
            <Statistic title="Total Konten" value={tContent ? tContent : 0} prefix={<FolderTwoTone twoToneColor="#F63E4F" />} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card bordered>
            <Statistic title="Total Elastic" value={tElastic ? tElastic : 0 } prefix={<SmileTwoTone twoToneColor="#27C7FF" />} />
          </Card>
        </Col>
        {contents && contents.map((item: any, ind: any) => {
          return (
            <Col key={ind} xs={24} sm={24} md={6}>
              <Card bordered>
                <Statistic title={item._id} value={item.total} prefix={<FolderTwoTone twoToneColor="#F63E4F" />} />
              </Card>
            </Col>    
          )
        })}
      </Row>
      
    </Content>
  )
};

export default Dashboard;



const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
