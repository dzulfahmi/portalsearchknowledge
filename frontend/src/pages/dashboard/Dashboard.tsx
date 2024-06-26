import {useEffect, useRef, useState} from 'react';
import { 
  Card, 
  Col, 
  DatePicker,
  Dropdown,
  Form,
  Menu,
  Modal,
  Row, 
  Layout,
  Statistic,
  Table, 
  Typography,
} from 'antd';
import {
  FolderTwoTone,
  SmileTwoTone,
  DownOutlined,
  BugTwoTone,
} from "@ant-design/icons";
import {useDispatch, useSelector} from 'react-redux';
import { Line } from '@ant-design/charts';

import { getCrawlerResult, loadCrawlerCount } from '../../store/actions/CrawlerAction';
import { data1 } from './DummyData';

let moment = require('moment');

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
	const {info, isLoading, dContent, contents, tContent, tElastic} = useSelector((state: any) => ({
		info: state.info,
		contents: state.craw.contents,
		tContent: state.craw.tContent,
		tElastic: state.craw.tElastic,
    dContent: state.craw.dContent,
		isLoading: state.craw.isLoading,
	}));
  const [title, setTitle] = useState(`Hari Ini | ${moment().format('DD-MM-YYYY')}`);
  const [isOpenCustomRange, setIsOpenCustomRange] = useState(false);
  const [form] = Form.useForm();
  const [initVal, setInitVal] = useState({
    begindate: '',
    enddate: '',
  });

  useEffect(() => {
    loadCC()
    // dispatch;(getCrawlerResult());
  }, []);

  const loadCC = (payload: any = {}) => {
    dispatch(loadCrawlerCount(payload));
  }

  const columns = [
    // {
    //   title: 'Sampul',
    //   dataIndex: 'img_url',
    //   key: 'sampul',
    //   render: (data: any, ind: any) => {
    //     return <span>
    //       {data ? 
    //         <img key={ind} src={ data } className="img-fluid img-bordered" width="100px" />
    //         : '-'
    //       }
    //     </span>
    //   } 
    // },
    {
      title: 'Tipe Konten',
      dataIndex: '_id',
      key: 'tipe_konten',
    },
    {
      title: 'Jumlah Konten',
      dataIndex: 'total',
      key: 'jumlah_konten',
    },
    {
      title: 'Elastic',
      dataIndex: 'elastic',
      key: 'jumlah_elastic',
    },
  ];

  // multi line chart
  const COLOR_PLATE_10 = [
    '#5B8FF9',
    '#5AD8A6',
    '#5D7092',
    '#F6BD16',
    '#E8684A',
    '#6DC8EC',
    '#9270CA',
    '#FF9D4D',
    '#269A99',
    '#FF99C3',
  ];
  const config2 = {
    data: dContent && dContent.contentvselastic ? dContent.contentvselastic : [],
    xField: 'month',
    yField: 'count',
    seriesField: 'type',
    yAxis: {
      label: {
        formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: COLOR_PLATE_10,
    // point: {
    //   shape: ({ category } : any) => {
    //     return category === 'Gas fuel' ? 'square' : 'circle';
    //   },
    //   style: ({ year }: any) => {
    //     return {
    //       r: Number(year) % 4 ? 0 : 3, // 4 个数据示一个点标记
    //     };
    //   },
    // },
    meta: {
      count: {
        alias: 'Jumlah',
      },
      month: {
        alias: 'Bulan',
      },
      
    },
  };

  const onSubmitCustomRange = (values: any) => {
    setIsOpenCustomRange(false);
    setTitle(`Custom | ${moment(values.begindate).format('DD-MM-YYYY')} - ${moment(values.enddate).format('DD-MM-YYYY')}`);
    let payload = {
      param: 'custom',
      start: values.begindate,
      end: values.enddate,
    }
    loadCC(payload);
  }

  const onFilterActive = (param: any) => {
    let start = new Date();
    let end = new Date().toISOString();

    if (param !== 'custom') {
      if (param === 'today') {
        start = new Date();
        end = new Date().toISOString();
        setTitle(`Hari Ini | ${moment(start).format('DD-MM-YYYY')}`);
      } else if (param === 'lastweek') {
        start = moment(start).subtract(1, 'week').startOf('week').toISOString();
        setTitle(`1 Minggu Terakhir | ${moment(start).format('DD-MM-YYYY')} - ${moment(end).format('DD-MM-YYYY')}`);
        // setTitle(`1 Minggu Terakhir | ${moment(start).format('DD-MM-YYYY h:mm:ss')} - ${moment(end).format('DD-MM-YYYY h:mm:ss')}`);
      } else if (param === 'lastmonth') {
        start = moment(start).subtract(1, 'month').startOf('month').toISOString();
        setTitle(`1 Bulan Terakhir | ${moment(start).format('DD-MM-YYYY')} - ${moment(end).format('DD-MM-YYYY')}`);
      } else if (param === 'last3month') {
        start = moment(start).subtract(3, 'month').startOf('month').toISOString();
        setTitle(`3 Bulan Terakhir | ${moment(start).format('DD-MM-YYYY')} - ${moment(end).format('DD-MM-YYYY')}`);
      } else if (param === 'lastyear') {
        start = moment(start).subtract(1, 'year').startOf('year').toISOString();
        setTitle(`1 Tahun Terakhir | ${moment(start).format('DD-MM-YYYY')} - ${moment(end).format('DD-MM-YYYY')}`);
      }
      let payload = {param, start, end};
      loadCC(payload);
    } else {
      setIsOpenCustomRange(true);
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key={0} onClick={() => onFilterActive('today')}>
        Hari Ini
      </Menu.Item>
      <Menu.Item key={1} onClick={() => onFilterActive('lastweek')}>
        1 Minggu Terakhir
      </Menu.Item>
      <Menu.Item key={2} onClick={() => onFilterActive('lastmonth')}>
        1 Bulan Terakhir
      </Menu.Item>
      <Menu.Item key={3} onClick={() => onFilterActive('last3month')}>
        3 Bulan Terakhir
      </Menu.Item>
      <Menu.Item key={4} onClick={() => onFilterActive('lastyear')}>
        1 Tahun Terakhir
      </Menu.Item>
      <Menu.Item key={5} onClick={() => onFilterActive('custom')}>
        Custom
      </Menu.Item>
    </Menu>
  );

  const fieldConfig = {
    rules: [{ type: 'object', required: true, message: 'Tolong pilih tanggal!' }],
  };

  return (
    <Content style={{
      margin: '8px 16px',
      paddingLeft: 12,
      paddingRight: 12,
      minHeight: 600,
      padding: '0 50px', 
      marginTop: 72,
    }}>
      <Row gutter={[16, 16]}>
        {/* Baris 1 */}
        <Col span={24}>
          <Card bordered>
            <Title level={3}>{title}</Title>
            <Dropdown overlay={menu} >
              {/* <Button>Filter</Button> */}
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Filter <DownOutlined />
              </a>
            </Dropdown>
            {/* <Text>This admin dashboard template made with Ant Design and some others library. It will provide some default pages, sidenavs, and others. If you don't know about Ant Design, you could read about it <Link href="https://ant.design" target="_blank">in here</Link></Text> */}
          </Card>
        </Col>

        {/* Baris 2 */}
        <Col xs={24} sm={24} md={18}>
          <Card bordered>
            <Title level={4}>Konten vs Elastic</Title>
            <Line {...config2} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Col>
            <Card bordered>
              <Statistic title="Total Isi Konten" value={tContent ? tContent : 0} prefix={<FolderTwoTone twoToneColor="#F63E4F" />} />
            </Card>
          </Col>
          <Col>
            <Card bordered>
              <Statistic title="Total Elastic" value={tElastic ? tElastic : 0 } prefix={<SmileTwoTone twoToneColor="#27C7FF" />} />
            </Card>
          </Col>
          <Col>
            <Card bordered>
              <Statistic title="Isi Konten" value={dContent ? dContent.contentByFilter : 0} prefix={<FolderTwoTone twoToneColor="#F63E4F" />} />
            </Card>
          </Col>
          <Col>
            <Card bordered>
              <Statistic title="Elastic" value={dContent ? dContent.elasticByFilter : 0 } prefix={<SmileTwoTone twoToneColor="#27C7FF" />} />
            </Card>
          </Col>
          <Col>
            <Card bordered>
              <Statistic title="Konten" value={contents ? contents.length : 0 } prefix={<SmileTwoTone twoToneColor="#27C7FF" />} />
            </Card>
          </Col>
        </Col>

        {/* {contents && contents.map((item: any, ind: any) => {
          return (
            <Col key={ind} xs={24} sm={24} md={6}>
              <Card bordered>
                <Statistic title={item._id} value={item.total} prefix={<FolderTwoTone twoToneColor="#F63E4F" />} />
              </Card>
            </Col>    
          )
        })} */}
        {contents && (contents.length > 0) && (
          <Col xs={24} sm={24} md={24}>
            <Table 
              key="2" 
              loading={isLoading} 
              columns={columns} 
              dataSource={contents} 
              pagination={{
                hideOnSinglePage: true,
                total: contents.length,
                // onChange: (val) => setPage(val),
                // onShowSizeChange: (val, val2) => setLimit(val2)
              }}  
            />
          </Col>
        )}
      </Row>
      
      <Modal
        visible={isOpenCustomRange}
        title={"Masukan tanggal"}
        okText={"Filter"}
        cancelText="Batal"
        onCancel={() => setIsOpenCustomRange(false)}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onSubmitCustomRange(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={initVal}
        >
          <Form.Item name="begindate" label="Tanggal Awal" rules={[{ required: true, message: 'Tolong pilih tanggal!' }]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>

          <Form.Item name="enddate" label="Tanggal Akhir" rules={[{ required: true, message: 'Tolong pilih tanggal!' }]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </Form>
      </Modal>
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

