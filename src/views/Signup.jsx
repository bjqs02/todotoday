import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const { VITE_APP_HOST } = import.meta.env;

function Signup() {
    // console.log(VITE_APP_HOST);
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

    async function 註冊() {
        try {
            var res = await axios.post(`${VITE_APP_HOST}/users/sign_up`, formData)
            // console.log(res['data'].status);
            Swal.fire(
                '註冊成功',
                '現在您可以登入並開啟待辦事項功能！',
                'success'
              )
            // window.alert('註冊成功，按下確認後畫面跳轉至登入頁面!')
            navigate('/login');
        } catch (error) {
            // console.log(error.response.data.message)
            remider.innerText = error.response.data.message;
        }
       
    }


    return (<div className="col" id="signup">
        <input type="email" className="form-control" placeholder="Email" name="email" onChange={HandleChange} /><br />
        <input type="password" className="form-control" placeholder="PassWord" name="password" onChange={HandleChange} /><br />
        <input type="text" className="form-control" placeholder="Nickname" name="nickname" onChange={HandleChange} /><br />
        <p id="remider"></p>
        <button type="button" className="btn btn-outline-warning" onClick={(e) => {
            註冊()
        }} >註冊</button>

    </div>)
}

export default Signup