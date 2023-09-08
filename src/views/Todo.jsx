import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const { VITE_APP_HOST } = import.meta.env;

function Todo() {
    var navigate = useNavigate();
    // 取得cookie
    var cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith('token='))
        ?.split("=")[1];
    // console.log(cookieValue);


    useEffect(() => {
        try {
            axios.get(`${VITE_APP_HOST}/users/checkout`, {
                headers: {
                    Authorization: cookieValue
                }
            }).then((res) => {
                // console.log(res);
                userName.innerText = `哈囉${res.data.nickname}`;
                document.getElementById("nav").style.display = "none";
                // document.getElementById("todotoday").style.display = "inline-block";
                document.getElementById("todolist").style.display = "block";
                getTodos()

            }
            );
        } catch (error) {
            navigate('/login');
        }
    }, [])


    // 登出功能
    async function logout() {
        try {
            await axios.post(`${VITE_APP_HOST}/users/sign_out`, {},
                {
                    headers: {
                        authorization: cookieValue
                    }
                }
            ).then(function (res) {
                // console.log(res)
                Swal.fire(
                    '登出成功',
                    '別忘了今天晚上12:00前來看看還有哪些未完成項目唷!',
                    'success'
                  )
                // 登出成功後隱藏待辦事項區塊
                // document.getElementById("todotoday").style.display = "none";
                document.getElementById("nav").style.display = "block";
            }).then(()=>{
                navigate('/login');
            })
        } catch (error) {
            console.log(error)
        }
    }

    // todolist功能
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [todoEdit, setTodoEdit] = useState({});

    // console.log(todos.length)


    const getTodos = async () => {
        const response = await axios.get(`${VITE_APP_HOST}/todos`, {
            headers: {
                Authorization: cookieValue
            }
        });
        if (response.data.data.length <= 0) {
            document.getElementById('notodolist').style.display = "block";
        } else {
            document.getElementById('notodolist').style.display = "none";
        }
        setTodos(response.data.data);
    };

    const addTodo = async () => {
        if (!newTodo) return;
        const todo = {
            content: newTodo
        };
        await axios.post(`${VITE_APP_HOST}/todos`, todo, {
            headers: {
                Authorization: cookieValue
            }
        });
        setNewTodo("");
        getTodos();
    };

    const deleteTodo = async (id) => {
        await axios.delete(`${VITE_APP_HOST}/todos/${id}`, {
            headers: {
                Authorization: cookieValue
            }
        });
        getTodos();

    };

    const updateTodo = async (id) => {
        const todo = todos.find((todo) => todo.id === id);
        todo.content = todoEdit[id];
        await axios.put(`${VITE_APP_HOST}/todos/${id}`, todo, {
            headers: {
                Authorization: cookieValue
            }
        });
        getTodos();
        setTodoEdit({
            ...todoEdit,
            [id]: ""
        });
    };

    const toggleStatus = async (id) => {
        await axios.patch(
            `${VITE_APP_HOST}/todos/${id}/toggle`,
            {},
            {
                headers: {
                    Authorization: cookieValue
                }
            }
        );
        getTodos();
    };




    return (<>
        <div className="text-end me-5">
            <small className="" id="userName"></small>
            <button id="logout" onClick={logout} className="badge mx-3">登出</button>
        </div>
        <img src="/public/logo.png" id="todotodaypic" className="d-block rounded mx-auto" /><br />
        <br />
        <div id="todolist" style={{ display: "none" }} className="text-center">
            <input
                className="form-control w-25 d-inline text-center"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="新增待辦事項"
            />
            <button title="新增" className="badge mx-3" onClick={addTodo}><i class="bi bi-plus-circle-dotted"></i></button>
            <hr className="w-75 mx-auto" />
            <p id='notodolist' className='mt-5'>目前沒有待辦事項<br></br>
                <img src='/public/done.png' class='w-50'></img></p>
            <ul className="mt-3 m-5">
                {todos.map((todo, index) => (
                    <li className="my-2 pt-2 row" key={index}>
                        {/* <i className={todo.status ? "bi bi-check-circle" : ""}></i> */}
                        <span class="col-4 pt-2">
                            <button title="已完成" className="badge mx-3" onClick={() => toggleStatus(todo.id)}>✔</button>
                            <i className={todo.status ? "text-decoration-line-through" : ""}>{todo.content}</i>

                        </span>
                        <span className="col-4">
                            <input
                                className="form-control w-75 d-inline mx-3 p-1 text-center"
                                type="text"
                                placeholder="修改待辦事項內容"
                                onChange={(e) => {
                                    const newTodoEdit = {
                                        ...todoEdit
                                    };
                                    newTodoEdit[todo.id] = e.target.value;
                                    setTodoEdit(newTodoEdit);
                                }}
                            />
                            <button title="確認修改" className="badge mx-1 d-inline" onClick={() => updateTodo(todo.id)}><i className="bi bi-pencil"></i></button>
                        </span>
                        <span className="col-2 pt-1">
                            <button title="刪除項目" className="badge mx-1" onClick={() => deleteTodo(todo.id)}>✘</button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    </>)
}

export default Todo