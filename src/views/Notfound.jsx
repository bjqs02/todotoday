import { useNavigate } from "react-router-dom";

function Notfound() {
    var navigate = useNavigate();

    setTimeout(function(){
        navigate('/login');
    }, 2000)

    return (
        <p className="text-center mt-5">Oops!</p>
    )
}

export default Notfound