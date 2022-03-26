// Copyright 2022 The Casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import {Alert, Card, Col, Space} from "antd";
import * as Setting from "./Setting";
import {withRouter} from "react-router-dom";
import i18next from "i18next";

const { Meta } = Card;

class SingleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  renderPayment(product, payment) {
    if (product.name !== payment.productName) {
      return null;
    }

    return (
      <Alert
        message={`${payment.state} | ${payment.price} | ${payment.currency}`}
        showIcon
        description={<div>
          {`${i18next.t("general:Name")}: ${payment.name}`}
          <br/>
          {`${i18next.t("general:Created time")}: ${Setting.getFormattedDate(payment.createdTime)}`}
        </div>}
        type="success"
        style={{cursor: "pointer"}}
        onClick={() => {
          Setting.goToLink(Setting.getPaymentUrl(this.props.account, payment));
        }}
        action={
          <Space direction="vertical">
            {
              `${payment.type}`
            }
            {/*<Button size="small" danger type="ghost">*/}
            {/*  Decline*/}
            {/*</Button>*/}
          </Space>
        }
      />
    )
  }

  renderCardMobile(logo, link, title, desc, time, isSingle, clickable) {
    const cursor = clickable ? "pointer" : "auto";
    const gridStyle = {
      width: '100vw',
      textAlign: 'center',
      cursor: cursor,
    };

    return (
      <Card.Grid style={gridStyle} onClick={() => {
        if (clickable) {
          Setting.goToLink(link);
        }
      }}>
        <img src={logo} alt="logo" height={60} style={{marginBottom: '20px'}}/>
        <Meta title={title} description={desc} />
      </Card.Grid>
    )
  }

  renderCard(logo, link, title, desc, time, isSingle, clickable) {
    const cursor = clickable ? "pointer" : "auto";
    return (
      <Col style={{paddingLeft: "20px", paddingRight: "20px", paddingBottom: "20px", marginBottom: "20px"}} span={6}>
        <Card
          hoverable
          cover={
            <img alt="logo" src={logo} width={"100%"} height={"100%"} />
          }
          onClick={() => {
            if (clickable) {
              Setting.goToLink(link);
            }
          }}
          style={isSingle ? {width: "320px", cursor: cursor} : {cursor: cursor}}
        >
          <Meta title={title} description={desc} />
          <br/>
          <br/>
          {
            this.props.payments.map(payment => {
              return this.renderPayment(this.props.product, payment);
            })
          }
          {/*<Meta title={""} description={Setting.getFormattedDateShort(time)} />*/}
        </Card>
      </Col>
    )
  }

  render() {
    if (Setting.isMobile()) {
      return this.renderCardMobile(this.props.logo, this.props.link, this.props.title, this.props.desc, this.props.time, this.props.isSingle, this.props.clickable);
    } else {
      return this.renderCard(this.props.logo, this.props.link, this.props.title, this.props.desc, this.props.time, this.props.isSingle, this.props.clickable);
    }
  }
}

export default withRouter(SingleCard);
