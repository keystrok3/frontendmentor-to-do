
import lightThemeBtn from '../assets/images/icon-moon.svg';
import closeBtnSVG from '../assets/images/icon-cross.svg';
import '../assets/css/ToDo.css';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

const ToDo = () => {
    const [ toDoList, setToDoList ] = useState([]);
    const [ completedList, setCompletedList ] = useState([]);


    const listItem = useRef('')

    const handleCheck = (e) => {
        let handleToDo = [ ...toDoList ];
        handleToDo[parseInt(e.target.name)].completed = true;
        setCompletedList([...handleToDo.filter(item => item.completed === true), ...completedList]);
        setToDoList([ ...handleToDo.filter(item => item.completed !== true)]);  // set toDoList to be all items not set to completed=true
    }

    const handleDelete = (e) => {
        let deleteList = [ ...toDoList ];
        let item_to_delete = deleteList[parseInt(e.target.parentNode.name)];
        let new_deletelist = deleteList.filter((item) => {
            return item != item_to_delete
        });
        setToDoList([ ...new_deletelist ]);
    };

    const handleClearCompleted = () => {
        setCompletedList([])
    };

    /** */
    const handleInput = (e) => {
        if(e.key === 'Enter') {
            console.log(listItem.current);
            if(listItem.current === '') return;
            console.log('Confirm: ', listItem.current);
            setToDoList([ ...toDoList, { item: listItem.current, completed: false } ]);
            console.log('List: ', toDoList)
        }
    };

    const handleInputChange = (e) => {
        listItem.current = e.target.value;
    }


    useEffect(() => {
        window.addEventListener('keydown', handleInput)

        return () => window.removeEventListener('keydown', handleInput);
    },[])



    return (
        <div className="todo-main">
            <header>
                <h2>TO DO</h2>
                <div>
                    <button style={{ 
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                        }}>
                        <img src={lightThemeBtn}/>
                    </button>
                </div>
            </header>
            <main>
                <div className='todo-input'>
                    <input 
                        type='text'
                        placeholder='Create new to do'
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className='todo-list'>
                    <Completed 
                        onDelete={handleDelete}
                        completed={completedList}
                    />
                    <FilterList 
                        onCheck={handleCheck}
                        onDelete={handleDelete}
                        todolist={toDoList}
                    />
                    <div className='info-panel'>
                        <div className='items-left'>{toDoList.length} items left</div>
                        <div className='clear-completed'>
                            <button 
                                onClick={handleClearCompleted}
                                style={{ 
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                            }}>Clear Completed</button>
                        </div>
                    </div>

                    <div className='filter-panel'>

                    </div>

                </div>
            </main>
            <footer></footer>
        </div>
    )
};


const FilterList = ({ todolist, onCheck, onDelete }) => {
    const [ isChecked, setChecked ] = useState(false);
    return (
        <>
            {
                todolist.map((item, idx) => {
                    return (
                        <div 
                            className='list-item' 
                            key={`${idx}`} 
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '.5em',
                        }}>
                            <input 
                                id={`item_${idx}`} 
                                type='radio'
                                name={idx}
                                style={{
                                    margin: '.5em'
                                }}
                                onChange={(e) => onCheck(e)}
                                checked={isChecked}
                            />
                            <label htmlFor={`item_${idx}`}>{ item.item } </label>
                            <button 
                                name={idx}
                                onClick={(e) => onDelete(e)}
                                style={{ 
                                    background: 'none',
                                    border: 'none',
                                    marginLeft: 'auto',
                                    cursor: 'pointer',
                            }}><img src={ closeBtnSVG }/></button>
                        </div>
                    )
                })
            }
        </>
    )
};


const Completed = ({ completed }) => {
    const [ isChecked, setChecked ] = useState(true);

    return (
        <>
            {
                completed.map((item, idx) => {
                    return (
                        <div 
                            className='list-item' 
                            key={`${idx}`} 
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '.5em',
                        }}>
                            <input 
                                id={`item_${idx}`} 
                                type='radio'
                                readOnly
                                name={idx}
                                style={{
                                    margin: '.5em'
                                }}
                                checked={isChecked}
                            />
                            <label 
                                htmlFor={`item_${idx}`}
                                style={{
                                    color: 'hsl(233, 11%, 84%)'
                                }}
                                >{ item.item } </label>
                            <button 
                                name={idx}
                                // onClick={(e) => onDelete(e)}
                                style={{ 
                                    background: 'none',
                                    border: 'none',
                                    marginLeft: 'auto',
                                    cursor: 'pointer',
                            }}><img src={ closeBtnSVG }/></button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ToDo;