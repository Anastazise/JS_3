import { List, Col, Pagination } from 'antd';
import React, {useState, useEffect} from 'react';
import { useFetchData } from '../../hooks/useMyHookTest';

import classes from './Users.module.css'

function UserList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [list, setList] = useState([]);
    var users = useFetchData('users');
    
    useEffect(() => {
        setList(users);
    }, [users])
    
    function handlerUpdatePages (page, pageSize) {
        setCurrentPage(page ? page : 1);
        setPerPage(pageSize);
    }

    if (list != undefined) {
        let firstItem = (currentPage - 1) * perPage;
        let lastItem = currentPage * perPage;
        let pageList = list.slice(firstItem, lastItem);
    
        return (
        <>
            <Col span={8} style={{margin: '0 auto'}}>
                <h3>Список пользователей</h3>
                <List>
                    {pageList.map((item, index)=>{
                        return(          
                            <List.Item key={index} style={{listStyle: 'decimal'}} >
                                <div>
                                    <a className={classes.userlink} href={'todo#'+item.id}><b>{item.username}</b> ({item.name})</a>
                                </div>
                            </List.Item>
                        )
                    })}
                </List>
                <Pagination size="small" showSizeChanger showQuickJumper defaultCurrent={currentPage} defaultPageSize={perPage} total={list.length} onChange={handlerUpdatePages} style={{paddingBottom: 16}} />
            </Col>
        </>
        );
    }
    else {
        return(<></>);
    }
    
}

export default UserList;