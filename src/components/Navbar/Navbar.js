import { Menu } from 'antd'
import React, {Component} from 'react'
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    state = {
        nav:[
            {name:'Главная',path:'/'},
            {name:'Todo List',path:'/todo'},
            {name:'Пользователи',path:'/users'},
            {name:'Аккаунт',path:'/account'},
        ]
    }
    render(){
        const {nav} = this.state;
        return(
            <>
                <Menu mode='horizontal'>
                    {nav.map(({name,path},index)=>{
                        return (
                            <Menu.Item key={index}>
                                <Link to={path}>{name}</Link>
                            </Menu.Item>
                        )
                    })}
                    
                </Menu>
{/*                 
                    123451
                </Link> */}
                {this.props.children}
            </>
        )
    }
}