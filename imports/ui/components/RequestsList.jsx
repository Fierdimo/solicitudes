import React from 'react'

import {
  Divider, List, Skeleton
} from 'antd';

import InfiniteScroll from 'react-infinite-scroll-component';
import { RequestState } from './RequestState';

export const RequestsList = ({ data, maxData, loadMoreData, loading, selecttedRequest }) => {
  return (
    <div
      className="items "
      id="scrollableDiv"
      style={{
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <h4 style={{ padding: "5px", textAlign: "center", position: "sticky", top: "0", backgroundColor: "white" }}>Solicitudes {maxData === 0 ? '' : maxData}</h4>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < maxData}
        // endMessage={<Divider plain>Es todo, no hay más🤐</Divider>}
        endMessage={<Divider plain>///</Divider>}
        scrollableTarget="scrollableDiv"
        loader={
          <Skeleton
            active
            avatar
            paragraph={{
              rows: 1,
            }}
          />
        }
      >
        <List
          loading={loading}
          dataSource={data}
          renderItem={(item) => (
            <List.Item onClick={() => selecttedRequest(item._id)} key={item._id} style={{ cursor: "pointer" }}>
              <List.Item.Meta
                title={<div style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                  paddingRight: "10px",
                }} >{item.subject}</div>}
                description={`De: ${item.senderUser[0].profile.email} \n Para: ${item.receiverUser[0].profile.email/* .map(address => {
                  return address
                }) */
                  }`}
              />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                <strong style={{ fontSize: "smaller", fontWeight: "500" }}>{(new Date(item.createdAt).toLocaleString())}</strong>
                <RequestState state={item.state} />
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div >
  )
}
