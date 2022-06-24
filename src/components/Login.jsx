
import { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from "react-router-dom";

export default function Login() {

    const accessToken = JSON.parse(localStorage.getItem("AccessToken"));



    let navigate = useNavigate();
    const handleLogin = (result) => {
        console.log(result);
        localStorage.setItem('AccessToken', JSON.stringify(result));
        navigate('/dashboard');

    }

    const handleFailure = (googledata) => {
        console.log(googledata);
    }

    useEffect(() => {
        if (accessToken != null) {
            navigate('/dashboard');
        }
    }, [])



    return (
        <>
            <div >

                <div className='flex justify-center items-center' style={{ height: '90vh' }}>
                    <div>
                        <div className="w-[350px] rounded-lg h-60">

                            <div className='justify-center items-center'>
                                <div>
                                    <svg height="206.6" width="147.62799377441405" className='logo-class login'><defs id="SvgjsDefs1001"></defs><g id="SvgjsG1007" featurekey="Wg4LIr-0" transform="matrix(9.912534872187157,0,0,9.912534872187157,11.043727837241462,-45.017471282903756)" fill="#ffffff"><path className='fill-dark-sea-green' d="M7.36 6.66 c1.88 0 3.6 0.78 4.84 2 l-1.58 1.62 c-0.84 -0.84 -2 -1.36 -3.26 -1.36 c-2.54 0 -4.58 2.06 -4.58 4.6 c0 2.52 2.04 4.6 4.58 4.6 c1.26 0 2.42 -0.54 3.26 -1.36 l1.58 1.6 c-1.24 1.26 -2.96 2.02 -4.84 2.02 c-3.8 0 -6.86 -3.08 -6.86 -6.86 c0 -3.8 3.06 -6.86 6.86 -6.86 z M7.36 11.88 c0.9 0 1.62 0.74 1.62 1.64 s-0.72 1.62 -1.62 1.62 c-0.92 0 -1.64 -0.72 -1.64 -1.62 s0.72 -1.64 1.64 -1.64 z"></path></g><g id="SvgjsG1008" featurekey="qafomr-0" transform="matrix(1.7,0,0,1.7,-1.5300001621246337,166.1399980545044)" fill="#ffffff"><path className='fill-dark-sea-green' d="M13.02 18.5 c-1.26 1.12 -2.9 1.7 -4.8 1.7 c-3.96 0 -7.32 -2.94 -7.32 -7.2 s3.36 -7.2 7.32 -7.2 c1.88 0 3.5 0.6 4.72 1.66 l-1.94 2.18 c-0.7 -0.48 -1.64 -0.82 -2.58 -0.82 c-2.46 0 -4.16 1.76 -4.16 4.18 s1.7 4.18 4.16 4.18 c0.98 0 1.98 -0.38 2.68 -0.94 z M19.9 9.42 c2.36 0 5.48 1.78 5.48 5.42 c0 3.66 -3.12 5.36 -5.48 5.36 s-5.48 -1.7 -5.48 -5.36 c0 -3.64 3.12 -5.42 5.48 -5.42 z M19.9 12.2 c-1.2 0 -2.42 0.92 -2.42 2.64 c0 1.66 1.22 2.58 2.42 2.58 s2.44 -0.92 2.44 -2.58 c0 -1.72 -1.24 -2.64 -2.44 -2.64 z M32.26 9.42 c2.36 0 5.48 1.78 5.48 5.42 c0 3.66 -3.12 5.36 -5.48 5.36 s-5.48 -1.7 -5.48 -5.36 c0 -3.64 3.12 -5.42 5.48 -5.42 z M32.26 12.2 c-1.2 0 -2.42 0.92 -2.42 2.64 c0 1.66 1.22 2.58 2.42 2.58 s2.44 -0.92 2.44 -2.58 c0 -1.72 -1.24 -2.64 -2.44 -2.64 z M42.62 5.859999999999999 l0 14.14 l-3.16 0 l0 -14.14 l3.16 0 z M56.5 9.42 c2.38 0 5.12 1.78 5.12 5.36 c0 3.72 -2.74 5.42 -5.12 5.42 c-1.6 0 -2.54 -0.88 -2.68 -1.24 l0 4.84 l-3.16 0 l0 -6.02 l0 -8.18 l3.16 0 l0 0.96 c0.14 -0.22 1.08 -1.14 2.68 -1.14 z M56.04 17.42 c1.36 0 2.52 -0.92 2.52 -2.64 c0 -1.66 -1.16 -2.58 -2.52 -2.58 c-1.3 0 -2.36 0.9 -2.36 2.58 c0 1.74 1.06 2.64 2.36 2.64 z M66.5 5.859999999999999 l0 2.66 l-3.16 0 l0 -2.66 l3.16 0 z M66.5 9.6 l0 10.4 l-3.16 0 l0 -10.4 l3.16 0 z M73.66 9.42 c1.9 0 3.5 0.8 4.48 2.48 l-2.4 1.14 c-0.52 -0.44 -0.94 -0.84 -2.04 -0.84 c-1.2 0 -2.42 0.92 -2.42 2.62 c0 1.68 1.22 2.56 2.42 2.56 c1.1 0 1.52 -0.36 2.04 -0.8 l2.44 1.14 c-1.02 1.68 -2.58 2.44 -4.52 2.44 c-2.32 0 -5.44 -1.66 -5.44 -5.34 c0 -3.62 3.12 -5.4 5.44 -5.4 z M84.74 12.879999999999999 c-0.28 -0.72 -0.7 -0.96 -1.16 -0.96 c-0.42 0 -0.84 0.24 -0.84 0.64 c0 0.38 0.24 0.6 0.7 0.76 l1.32 0.46 c1.48 0.54 2.98 1.08 2.98 3.16 c0 2.1 -2.1 3.3 -4.26 3.3 c-1.94 0 -3.76 -1.14 -4.2 -2.96 l2.48 -0.78 c0.26 0.58 0.72 1.24 1.72 1.24 c0.68 0 1.12 -0.44 1.12 -0.84 c0 -0.2 -0.16 -0.46 -0.66 -0.66 l-1.22 -0.44 c-2.08 -0.76 -3.06 -1.82 -3.06 -3.3 c0 -1.94 1.8 -3.08 3.78 -3.08 c2.02 0 3.36 1.1 3.96 2.76 z"></path></g></svg>
                                </div>
                                <GoogleLogin

                                    clientId={"758355478549-9f5muabk71ujaqcq2su6khat5muk3f97.apps.googleusercontent.com"}
                                    buttonText="Log In with Google"
                                    onSuccess={handleLogin}
                                    onFailure={handleFailure}
                                    cookiePolicy={'single_host_origin'}
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick} type="button" className='google-button'>
                                            <div>
                                                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                                                    <g fill="#000" fillRule="evenodd">
                                                        <path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path>
                                                        <path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path>
                                                        <path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path>
                                                        <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path>
                                                        <path fill="none" d="M0 0h18v18H0z"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <span>Log In with Google</span>
                                        </button>

                                    )}
                                >

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