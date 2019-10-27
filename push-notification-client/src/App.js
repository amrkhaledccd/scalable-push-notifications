import React, { Component } from "react";
import { Icon, Popover, Badge, List, notification } from "antd";
import "antd/dist/antd.css";
import "./App.css";

class App extends Component {
  state = {
    newNotifications: [],
    notifications: []
  };

  componentDidMount = () => {
    this.initListener();
  };

  initListener = () => {
    const eventSource = new EventSource("http://localhost:8080/subscription");
    eventSource.onopen = e => console.log("open");
    eventSource.onerror = e => {
      if (e.readyState == EventSource.CLOSED) {
        console.log("close");
      } else {
        console.log(e);
      }
      this.initListener();
    };
    eventSource.addEventListener(
      "amrkhaled",
      e => {
        console.log("amrkhaled", e.data);
        const json = JSON.parse(e.data);
        let newNotifications = this.state.newNotifications;
        newNotifications.unshift({
          name: json.name,
          msg: json.msg,
          isRead: false
        });

        this.setState({ newNotifications: newNotifications });

        notification.config({
          placement: "bottomLeft"
        });

        notification.open({
          message: (
            <div>
              <b>{json.name}</b> {json.msg}
            </div>
          )
        });
      },
      false
    );
  };

  handleOnClick = () => {
    let notifications = this.state.notifications;
    notifications = this.state.newNotifications.concat(notifications);
    console.log(notifications);
    this.setState({ newNotifications: [], notifications: notifications });
  };

  handleItemClick = notification => {
    const notifications = this.state.notifications.map(item => {
      if (item == notification) item.isRead = true;
      return item;
    });

    this.setState({ notifications });
  };
  render() {
    let iconClass = "icon-dimmed";

    if (this.state.newNotifications.length > 0) {
      iconClass = "icon-active";
    }

    const text = (
      <span>
        <b>Notifications</b>
      </span>
    );
    const content = (
      <div>
        <List
          dataSource={this.state.notifications}
          renderItem={notification => (
            <List.Item
              className={notification.isRead ? "item-read" : "item-not-read"}
              onClick={() => this.handleItemClick(notification)}
            >
              <span style={{ padding: "2px 20px" }}>
                <b>{notification.name}</b> {notification.msg}
              </span>
            </List.Item>
          )}
        />
      </div>
    );

    return (
      <div className="App">
        <div className="menuBar">
          <div className="logo">
            <a href="#">Push Notification</a>
          </div>
          <div className="menuCon">
            <div className="rightMenu">
              <a href="#">
                <Icon className="icon-dimmed" type="home" theme="filled" />
              </a>
              <a href="#">
                <Icon className="icon-dimmed" type="message" theme="filled" />
              </a>
              <a href="#" onClick={this.handleOnClick}>
                <Popover
                  placement="bottomRight"
                  title={text}
                  content={content}
                  trigger="click"
                >
                  <Badge
                    offset={[-2, 10]}
                    count={this.state.newNotifications.length}
                  >
                    <Icon className={iconClass} type="bell" theme="filled" />
                  </Badge>
                </Popover>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
