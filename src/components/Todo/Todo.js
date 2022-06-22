import { Button, Checkbox, List, Col, Input, Pagination } from 'antd';
import React, {useState, useEffect} from 'react';
import { useFetchData } from '../../hooks/useMyHookTest';

import classes from './Todo.module.css'

function TodoList(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [list, setList] = useState([]);
    var todos = useFetchData('todos');
    
    useEffect(() => {
        setList(todos);
    }, [todos])
    
    function handelerTodoChecked(todoID) {
        let todo = JSON.parse(JSON.stringify(list));
        todo = todo.filter((item) => {
            if (item.id === todoID) {
                item.completed = !item.completed;
            }
            return item;
        })
        setList(todo);
    }

    function handlerDeleteTodo(todoID) {
        let todo = JSON.parse(JSON.stringify(list));
        todo = todo.filter((item) => {
            if (item.id !== todoID) return item;
            else return undefined;
        })
        setList(todo);
    }

    function handlerAddToTodo(e) {
        console.log(e);
        let defVariable = [{id: Math.random(), title:e.target.value, completed: false}];
        setList([...list, ...defVariable]);
    }

    function handlerUpdatePages (page, pageSize) {
        setCurrentPage(page ? page : 1);
        setPerPage(pageSize);
    }

    if (list !== undefined) {
        let showList = (props.uid !== undefined) ? list.filter((item) => item.userId == props.uid) : list;
        let firstItem = (currentPage - 1) * perPage;
        let lastItem = currentPage * perPage;
        let pageList = showList.slice(firstItem, lastItem);
    
        return (
        <>
            <Col span={8} style={{margin: '0 auto'}}>
                <h3>Todo list {props.uid ? '#' + props.uid : ''}</h3>
                <List>
                    <Input placeholder='Добавить todo в список' onPressEnter={(e) => handlerAddToTodo(e)}/>
                    {pageList.map((item, index)=>{
                        return(          
                            <List.Item key={index} style={{listStyle: 'decimal', textDecoration : item.completed ? 'line-through' : 'none', display: 'flex'}} >
                                <div>
                                    <Checkbox onChange={() => handelerTodoChecked(item.id) } checked={item.completed ? true : false } style={{marginRight: 16}}/>
                                    <span>{item.title}</span>
                                </div>
                                <Button className={classes.button} onClick={()=> handlerDeleteTodo(item.id) }>Удалить</Button>
                            </List.Item>
                        )
                    })}
                </List>
                <Pagination size="small" showSizeChanger showQuickJumper defaultCurrent={currentPage} defaultPageSize={perPage} total={showList.length} onChange={handlerUpdatePages} style={{paddingBottom: 16}} />
            </Col>
        </>
        );
    }
    else {
        return(<></>);
    }
    
}

export default TodoList;