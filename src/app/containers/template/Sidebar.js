import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ShallowEquals} from 'uptoo-react-utils';
import {Menu, Icon, Button} from 'antd';

const SubMenu = Menu.SubMenu;

export default class Sidebar extends Component {
    state = {
        collapsed: true,
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <div>
                <Menu
                  defaultSelectedKeys={['1']}
                  mode="inline"
                  theme="dark"
                  style={{height: 'calc(100%)', marginRight: 0}}
                  inlineCollapsed={this.state.collapsed}
                >
                    {
                        /**
                         * ATTENTION A EXPORTER DANS UN COMPOSANT POUR EMP2CHER D4AVOIR DES PROPS PETE
                    <Button
                      type="primary"
                      onClick={this.toggleCollapsed}
                      style={{ borderColor: '#001529', backgroundColor: '#001529', borderRadius: 0, width: '100%' }}
                    >
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>

                         */
                    }
                    <Menu.Item onClick={() => this.props.history.push('/home/wall')} key="1">
                        <Icon type="pie-chart" />
                        <span>Recherche</span>
                    </Menu.Item>
                    <Menu.Item onClick={() => this.props.history.push('/home/post/new')} key="2">
                        <Icon type="desktop" />
                        <span>Ajouter un post</span>
                    </Menu.Item>
                    {/*
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                */}
                </Menu>
            </div>
        )
    }
}
