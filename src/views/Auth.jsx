import { Outlet } from "react-router-dom"
import bootstrap from 'bootstrap/dist/css/bootstrap.css'

function Auth() {

    return (<>
        <div className="container row mt-3 ">
            <img src="/main.png" className="w-50 col" />
            <Outlet />
        </div>
    </>)
}

export default Auth