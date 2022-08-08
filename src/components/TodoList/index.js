import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Input, Button, Select, Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid'
import Todo from '../Todo';
import { todoRemainingSelector } from '../../redux/selectors';
import todoListSlice from './todoSlice'

export default function TodoList() {
  const [todoName, setTodoName] = useState('')
  const [priority, setPriority] = useState('Medium')

  const todoList = useSelector(todoRemainingSelector)

  const dispatch = useDispatch()

  const handleAddNewTodo = () => {
    dispatch(todoListSlice.actions.addTodo({
      id: uuidv4(),
      name: todoName,
      priority: priority,
      completed: false
    }))
    setTodoName('')
    setPriority('Medium')
  }

  const handleChangeInput = (e) => {
    setTodoName(e.target.value)
  }

  const handleChangePriority = (value) => {
    setPriority(value)
  }

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoList.map(todo => 
          <Todo 
            key={todo.id} 
            id={todo.id}
            name={todo.name} 
            priority={todo.priority} 
            completed={todo.completed}
          />
        )}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input value={todoName} onChange={handleChangeInput}/>
          <Select defaultValue="Medium" value={priority} onChange={handleChangePriority}>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddNewTodo}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
