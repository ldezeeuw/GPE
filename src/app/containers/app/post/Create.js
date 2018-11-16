import React, {Component} from 'react';
import {Icon, Row, Col, Card, Avatar, AutoComplete, Layout} from 'antd';
import Requester from './../../../Utils/Requester';
import {connect} from 'react-redux';
import CreateForm from './form/Create';

class create extends Component {
    state = {};

    createPost = form => {
        // console.log(this.props.Auth.user._id);
        // Requester.post('http://localhost:8080/post', form);
        fetch('http://localhost:8080/post', {
            method: 'POST',
            // mode: 'no-cors',
            body: JSON.stringify(form),
            dataType: 'json',
            headers: {
                // 'Access-Control-Request-Method': 'POST',
                Accept: '*/*',
                'Content-Type': 'application/json',
            },
        })
            .then(resp => {
                console.log(resp);
            })
            .then(r => {
                console.log('data', r);
            }, error => {
                console.error('zer', error.response || error);
            });
    };

    render() {
        return (
            <div style={{width: '100%'}}>
                <Layout.Header id="navbar" style={{width: '100%'}}>
                    <Row type="flex" justify="space-between">
                        <div className="certain-category-search-wrapper" style={{
                            width: 250,
                            paddingLeft: 32,
                            fontSize: 25,
                        }}>
                            Create a post
                        </div>
                    </Row>
                </Layout.Header>
                <CreateForm onSubmit={this.createPost}/>
            </div>
        );
    }
}


const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
    login: data => {
        dispatch(Auth.login(data));
    },
    authenticate: data => {
        dispatch(Auth.authenticate(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(create);
