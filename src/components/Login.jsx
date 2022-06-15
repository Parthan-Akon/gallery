
import GoogleLogin from 'react-google-login';
import { useNavigate } from "react-router-dom";

export default function Login() {


    let navigate = useNavigate();
    const handleLogin = (result) => {
        console.log(result);
        localStorage.setItem('AccessToken',JSON.stringify(result));
        navigate('/dashboard');
        
    }

    const handleFailure = (googledata) => {
        console.log(googledata);
    }


    return (
        <>
            <div className=''>

                <div className='flex justify-center items-center h-screen'>
                    <div>
                        <div className='bg-white w-[350px] rounded-lg h-60'>
                            <div className='flex justify-center h-full items-center'>
                                <GoogleLogin
                                
                                    clientId={"758355478549-9f5muabk71ujaqcq2su6khat5muk3f97.apps.googleusercontent.com"}
                                    buttonText="Log In with Google"
                                    onSuccess={handleLogin}
                                    onFailure={handleFailure}
                                    cookiePolicy={'single_host_origin'}>

                                </GoogleLogin>
                            </div>

                        </div>

                        <div>

                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}