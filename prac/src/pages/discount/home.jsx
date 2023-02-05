import React, { Component } from 'react'
import {Card,Input,Button,Icon,Table,Select} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import LinkButton from '../../components/link-button'
import { reqDiscounts, reqSearchDiscount } from "../../api";
import {PAGE_SIZE}  from '../../utils/constant'
import storageUtils from '../../utils/storageUtils'



const element = <FontAwesomeIcon icon={faEye} />
const element1 = <FontAwesomeIcon icon={faEye}  style={{color:'gray',opacity:0.2}}/>

const Option = Select.Option;
export default class DiscountHome extends Component {
  state = {
    total: 0,
    discount: [],
    loading: false,
    searchName: "", //搜索的關鍵字
    searchType: "discountName", //根據什麼來搜索
  };

  //初始化table的列的數組
  initColumns = () => {
    this.columns = [
      {
        title: "優惠劵名稱",
        dataIndex: "name",
      },
      {
        title: "發放者",
        dataIndex: "author",
      },
      {
        width: 300,
        title: "發布日期",
        dataIndex: "update",
      },
      {
        width: 300,
        title: "到期日",
        dataIndex: "username",
      },
      {
        width: 250,
        title: "操作",
        render: (discount) => {
          const ifWatch = storageUtils.getWatch();
          const found = ifWatch.find((ele) => ele === discount._id) || "";
          return (
            <span>
              {/*把article對象使用state傳給目標路由组件*/}
              <LinkButton
                onClick={() => {
                  this.props.history.push("/admin/discount/detail", {
                    discount,
                  });
                }}
              >
                {found ? element : element1}詳細資訊
              </LinkButton>
              <LinkButton
                onClick={() =>
                  this.props.history.push("/admin/discount/addupdate", discount)
                }
              >
                <Icon type="edit" />
                修改
              </LinkButton>
            </span>
          );
        },
      },
    ];
  };

  //獲取指定頁碼的列表數據顯示
  getDiscount = async (pageNum) => {
    this.pageNum = pageNum;
    this.setState({ loading: true });
    const { searchName, searchType } = this.state;
    let result;
    //如果關鍵字有值代表要搜索分頁
    if (searchName) {
      result = await reqSearchDiscount({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType,
      });
    } else {
      //一般分頁搜索
      result = await reqDiscounts(pageNum, PAGE_SIZE);
    }

    this.setState({ loading: false });
    if (result.status === 0) {
      const { total, list } = result.data;
      this.setState({
        total,
        discount: list,
      });
    }
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getDiscount(1);
  }

  render() {
    const { discount, total, loading, searchName, searchType } = this.state;

    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 110 }}
          onChange={(value) => {
            this.setState({ searchType: value });
          }}
        >
          <Option value="discountName">按名稱</Option>
          <Option value="discountAuth">按作者</Option>
        </Select>
        <Input
          placeholder="關鍵字"
          style={{ width: 150, margin: "0 15px" }}
          value={searchName}
          onChange={(e) => {
            this.setState({ searchName: e.target.value });
          }}
        />
        <Button type="primary" onClick={() => this.getDiscount(1)}>
          搜尋
        </Button>
      </span>
    );
    const extra = (
      <Button
        type="primary"
        onClick={() => {
          this.props.history.push("/admin/discount/addupdate");
        }}
      >
        <Icon type="plus" />
        增加優惠券
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={discount}
          columns={this.columns}
          pagination={{
            current: this.pageNum,
            total: total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: (pageNum) => {
              this.getDiscount(pageNum);
            },
            current: this.pageNum,
          }}
        />
        ;
      </Card>
    );
  }
}
