import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { sortTodoList, sortTodoListByPriority } from '../store/todos'
import TodoList from './TodoList'
import { Link } from 'react-router-dom'


function ToDoScreen () {
    const [sortField, setSortField] = useState( '' );
    const dispatch = useDispatch()

    const sorthandler = ( sorttField ) => {
        setSortField( sorttField )
        if ( sorttField === 'priority' ) {
            return dispatch( sortTodoListByPriority( sorttField ) );
        }
        return dispatch( sortTodoList( sorttField ) )
    };



    return (
        <React.Fragment>
            <div className='container'>
                <div className='row d-flex justify-content-center container'>
                    <div className='col-md-8'>
                        <div className='card-hover-shadow-2x mb-3 card'>
                            <div className='card-header-tab card-header'>
                                <div className='col-md-4'>
                                    <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                                        <i className='fa fa-tasks'></i>&nbsp;Task Lists
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                                        <label>Sort By: </label> &nbsp;&nbsp;
                                        <select class="custom-select" id='priority' value={sortField} onChange={e => sorthandler( e.target.value )}>
                                            <option selected disabled value=''>Sort By</option>
                                            <option value="startDate">Start Date</option>
                                            <option value="status">Status</option>
                                            <option value="priority">priority</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <TodoList />
                            <div className='d-block text-right card-footer'>
                                {/* <button className='mr-2 btn btn-link btn-sm'>Cancel</button> */}
                                <Link to='/add' className='btn btn-primary'>Add Task</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}

export default ToDoScreen
