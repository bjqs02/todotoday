import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const { VITE_APP_HOST } = import.meta.env;


function Login() {

    var [formData, setFormdata] = useState({
        email: '',
        password: '',
        nickname: ''
    })
    var navigate = useNavigate();

    function HandleChange(e) {
        var { name, value } = e.target;
        setFormdata({
            ...formData,
            [name]: value
        })
    }

    async function 登入() {
        try {
            var res = await axios.post(`${VITE_APP_HOST}/users/sign_in`, formData)
            var { token } = res.data;
            // 寫入cookie
            document.cookie = `token=${token}`;
            Swal.fire({
                title: '登入成功',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }
              )
            navigate('/todo/list');
        } catch (error) {
            remider.innerText = error.response.data.message;
        }

    }



    return (<div className="col" id="login">
        <input type="email" className="form-control" placeholder="Email" name="email" onChange={HandleChange} /><br />
        <input type="password" className="form-control" placeholder="PassWord" name="password" onChange={HandleChange} /><br />
        <p id="remider"></p>
        <button type="button" className="btn btn-outline-warning" onClick={(e) => {
            登入()
        }} >登入</button>


    </div>)
}

export default Login