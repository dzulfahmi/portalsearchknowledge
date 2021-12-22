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
import { Line } from '@ant-design/charts';

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

  const config = {
    data,
    width: 800,
    height: 400,
    autoFit: false,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  let chart: any;

  const downloadImage = () => {
    chart?.downloadImage();
  };

  // Get chart base64 string
  const toDataURL = () => {
    console.log(chart?.toDataURL());
  };

  return (
    <Content style={{
      margin: '8px 16px',
      paddingLeft: 12,
      paddingRight: 12,
      minHeight: 600,
    }}>
      <Row gutter={[16, 16]}>
        {/* Baris 1 */}
        <Col span={24}>
          <Card bordered>
            <Title level={3}>Selamat Datang di Portal Search Knowledge</Title>
            {/* <Text>This admin dashboard template made with Ant Design and some others library. It will provide some default pages, sidenavs, and others. If you don't know about Ant Design, you could read about it <Link href="https://ant.design" target="_blank">in here</Link></Text> */}
          </Card>
        </Col>

        {/* Baris 2 */}
        

        {/* Baris 3 */}
        <Col xs={24} sm={24} md={18}>
          <Card bordered>
            <Line {...config} onReady={(chartInstance: any) => (chart = chartInstance)} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Col>
            <Card bordered>
              <Statistic title="Total Konten" value={tContent ? tContent : 0} prefix={<FolderTwoTone twoToneColor="#F63E4F" />} />
            </Card>
          </Col>
          <Col>
            <Card bordered>
              <Statistic title="Total Elastic" value={tElastic ? tElastic : 0 } prefix={<SmileTwoTone twoToneColor="#27C7FF" />} />
            </Card>
          </Col>
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
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

