import { UnorderedListOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
    const hrefs = window.location.href.split('/'); // get the current browser URL
    const [href, setHref] = useState('/' + hrefs[3]); // keep this in a state
    let location = useLocation();
    useEffect(() => {
        setHref(location.pathname); // whenever react-router updates browser URL, update href
    }, [location]);
    return (
        // use href to highlight selected Menu.Item with selectedKeys
        <Menu theme='dark' mode='inline' selectedKeys={[href]}>
            <Menu.Item key='/' icon={React.createElement(ShoppingCartOutlined)}>
                <span>Buy</span>
                <Link to='/' />
            </Menu.Item>
            <Menu.Item key='/orders' icon={React.createElement(UnorderedListOutlined)}>
                <span>Orders</span>
                <Link to='/orders' />
            </Menu.Item>
        </Menu>
    );
}