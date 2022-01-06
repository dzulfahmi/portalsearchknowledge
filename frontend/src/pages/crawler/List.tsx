import React, { useEffect, useState } from 'react';
import { Button, Layout, PageHeader, Table, Modal, Space } from 'antd';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getCrawlerResult } from '../../store/actions/CrawlerAction';

const { Header, Content } = Layout;
let moment = require('moment');
const routes = [
  {
    path: 'index',
    breadcrumbName: 'Dasbor',
  },
  {
    path: 'first',
    breadcrumbName: 'Crawler',
  },
];

const CrawlerList = () => {
	const dispatch = useDispatch();
	const {info, isLoading, cList, cTotal} = useSelector((state: any) => ({
		info: state.info,
		cList: state.craw.data,
		cTotal: state.craw.total,
		isLoading: state.craw.isLoading,
	}));
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    loadContent()
  }, [page, limit]);

  const loadContent = () => {
    let param = {
      page: page,
      limit: limit,
    }
    dispatch(getCrawlerResult(param));
  }
  
  const showModalConfirm = (param: any) => {
    Modal.confirm({
      title: 'Konfirmasi',
      icon: <ExclamationCircleOutlined />,
      content: 'Apakah Kamu yakin akan menghapus buku ini?',
      okText: 'Ya',
      cancelText: 'Batal',
      onOk() {
        console.log('Submit');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
  const columns = [
    {
      title: 'Sampul',
      dataIndex: 'img_url',
      key: 'sampul',
      render: (data: any, ind: any) => {
        return <span>
          {data ? 
            <img key={ind} src={ data } className="img-fluid img-bordered" width="100px" />
            : '-'
          }
        </span>
      } 
    },
    {
      title: 'Tipe Konten',
      dataIndex: 'content_type',
      key: 'tipe_konten',
    },
    {
      title: 'Judul',
      dataIndex: 'title',
      key: 'judul',
    },
    {
      title: 'Link',
      dataIndex: 'url',
      key: 'link',
      render: (text: any) => (
        <a href={text} target="_blank">{text}</a>
      ),
    },
    {
      title: 'Tahun Terbit',
      dataIndex: 'published_date',
      key: 'tahun_terbit',
      render: (text: any) => (
        <span>{moment(text).format('DD MMM YYYY HH:mm')}</span>
      ),
    },
  ];
  
  return (
    <Content style={{
      margin: '8px 16px',
      paddingLeft: 12,
      paddingRight: 12,
      minHeight: 600,
    }}>
      <PageHeader
        className="site-page-header"
        title="Daftar Hasil Crawler"
        breadcrumb={{ routes }}
        // extra={[
        //   <Button key="3" type="primary">
        //     <Link to="/admin/books/add">Tambah Buku</Link>
        //   </Button>
        // ]}
      />
      <Table 
        key="2" 
        loading={isLoading} 
        columns={columns} 
        dataSource={cList} 
        pagination={{
          hideOnSinglePage: true,
          total: cTotal,
          onChange: (val) => setPage(val),
          onShowSizeChange: (val, val2) => setLimit(val2)
        }}  
      />
    </Content>
  );
}

export default CrawlerList;