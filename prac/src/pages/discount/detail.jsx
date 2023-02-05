import React, { Component } from 'react'
import {Card,Icon,List} from 'antd'

import LinkButton from '../../components/link-button'
import storageUtils from '../../utils/storageUtils'

const Item = List.Item
export default class DicountDetail extends Component {
  render() {
    const { name, author, detail, _id } = this.props.location.state.discount;
    storageUtils.saveWatch(_id);
    const title = (
      <span>
        <LinkButton>
          <Icon
            type="arrow-left"
            style={{ marginRight: 15, fontSize: 20 }}
            onClick={() => {
              this.props.history.goBack();
            }}
          ></Icon>
        </LinkButton>
      </span>
    );
    return (
      <Card title={title} className="discount-detail">
        <List itemLayout="vertical">
          <Item>
            <span className="left">優惠劵名稱:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">發放者:</span>
            <span>{author}</span>
          </Item>
          <Item>
            <span className="left">文章內容:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    );
  }
}
