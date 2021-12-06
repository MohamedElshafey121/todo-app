import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from 'classnames';

import users from './../data/users'
import { Link } from 'react-router-dom';
import { addTodoItem } from '../store/todos'



function AddToDoScreen ( { history } ) {
    const todoList = useSelector( state => state.todoList )
    const { success } = todoList;

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [deadLine, setDeadLine] = useState()
    const [startDate, setStartDate] = useState( new Date() );
    const [priority, setPriorioty] = useState( new Date() )
    const [user, setUser] = useState();

    useEffect( () => {
        if ( success ) {
            history.push( '/' )
        }
    }, [success] )

    const dispatch = useDispatch();
    const submithandler = ( e ) => {
        e.preventDefault();
        dispatch( addTodoItem( {
            title,
            description,
            deadLine,
            startDate,
            priority,
            user,
            status: 'todo'
        } ) )
    }

    const buttonClasses = classNames( 'btn btn-primary', {
        'disabled': !( title && description && deadLine && startDate && priority && user )
    } )
    const btnTitile = !( title && description && deadLine && startDate && priority && user )
        ? 'All data is required'
        : 'add';
    return (
        <React.Fragment>
            <div className='container'>
                <div className='row d-flex justify-content-center container'>
                    <div className='col-md-10'>
                        <div className='card-hover-shadow-2x mb-3 card'>
                            <div className='card-header-tab card-header'>
                                <div className='col-md-4'>
                                    <div className='card-header-title font-size-lg text-capitalize font-weight-normal'>
                                        <h5>Add New Task</h5>
                                    </div>
                                </div>
                            </div>
                            <div className='form-area container' style={{ marginTop: '20px' }}>
                                <div className='row'>
                                    <div className=' col-sm-12'>
                                        <div className='form-group'>
                                            <label htmlFor='title'>Title</label>
                                            <input type='text' className='form-control' id='title' value={title} onChange={( e ) => setTitle( e.target.value )} />
                                        </div>
                                    </div>

                                    <div className=' col-sm-12'>
                                        <div className='form-group'>
                                            <label htmlFor='description'>description</label>
                                            <textarea type='text' className='form-control' id='description' rows='4' value={description} onChange={e => setDescription( e.target.value )}></textarea>
                                        </div>
                                    </div>

                                    <div className=' col-sm-6'>
                                        <div className='form-group'>
                                            <label htmlFor='start_date'>Start Date</label>
                                            <DatePicker className='form-control' id='start_date'
                                                selected={startDate}
                                                onChange={date => setStartDate( date )}
                                            />
                                        </div>
                                    </div>

                                    <div className=' col-sm-6'>
                                        <div className='form-group'>
                                            <label htmlFor='dead_line'>Dead Line</label>
                                            <DatePicker className='form-control' id='dead_line'
                                                selected={deadLine}
                                                onChange={date => setDeadLine( date )}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label htmlFor='priority'>Priority</label>
                                            <select class="custom-select" id='priority' onChange={e => setPriorioty( e.target.value )} value={priority}>
                                                <option selected >select priority</option>
                                                <option value="high">High</option>
                                                <option value="medium">Medium</option>
                                                <option value="low">Low</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label htmlFor='priority'>User</label>
                                            <select class="custom-select" id='priority' onChange={e => setUser( e.target.value )} value={user}>
                                                <option selected disabled>select User</option>
                                                {users.map( ( user, userIdx ) => (
                                                    <option key={userIdx} value={user.id}>{user.name}</option>
                                                ) )}

                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='d-block text-right card-footer'>
                                <Link to='/' className='mr-2 btn btn-link btn-sm'>Cancel</Link>
                                <button onClick={submithandler} title={btnTitile} className={buttonClasses}>save</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}


export default AddToDoScreen;
