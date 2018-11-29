import React, { Component }             from 'react';
import PropTypes                        from 'prop-types';
import { ShallowEquals }                from 'uptoo-react-utils';
import { Menu, Icon, Button, Row, Col } from 'antd';
import classNames                       from 'classnames'
import Cookies                          from "../../Utils/Cookies";
import { JWT_TOKEN }                    from "../../../config";

const SubMenu = Menu.SubMenu;

export default class Sidebar extends Component {
    state = {
        collapsed: true,
        show:      false
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    logout = () => {
        Cookies.delete(JWT_TOKEN)
        this.props.history.push('/auth/login')
    }

    render() {
        return (
            <div>

                <div id="sidebarToggle" style={{
                    padding:  '16px 24px',
                    position: 'absolute'
                }}>
                    <Icon type="bars" style={{
                        fontSize: '18px',
                        cursor:   'pointer',
                    }} onClick={() => this.setState({ show: true })}/>
                </div>

                <div style={{}} id="sidebar" className={classNames({ 'open': this.state.show })}>

                    <Row className="side-user" style={{
                        height:          '20%',
                        color:           '#fff',
                        padding:         '16px 24px',
                        backgroundColor: '#001529'
                    }}>

                        <Row>
                            <Icon type="close" style={{
                                fontSize: '18px',
                                cursor:   'pointer',
                            }} onClick={() => this.setState({ show: false })}/>
                        </Row>

                        <Row style={{
                            position:   'absolute',
                            left:       0,
                            right:      0,
                            bottom:     0,
                            padding:    '32px 24px',
                            alignItems: 'center'
                        }} type="flex" justify="center" align="center">
                            <Col span={8}>
                                <Icon type="user" style={{
                                    fontSize:        '32px',
                                    cursor:          'pointer',
                                    borderRadius:    '50%',
                                    backgroundColor: '#d9d9d9',
                                    padding:         '8px'
                                }}/>
                            </Col>
                            <Col span={16}>
                                {this.props.Auth && this.props.Auth.user ? `${this.props.Auth.user.firstname} ${this.props.Auth.user.lastname}` : 'Sofiane Akbly'}
                            </Col>
                        </Row>
                    </Row>

                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="light"
                        style={{ width: '100%' }}
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
                            <Icon type="home"/>
                            {/*<Icon type="pie-chart" />*/}
                            <span>Page d'accueil</span>
                        </Menu.Item>
                        <Menu.Item onClick={() => this.props.history.push('/home/post/new')} key="2">
                            <Icon type="plus"/>
                            <span>Ajouter un post</span>
                        </Menu.Item>
                        <Menu.Item onClick={this.logout} key="3">
                            <Icon type="logout"/>
                            <span>Déconnexion</span>
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
            </div>
        )
    }
}
