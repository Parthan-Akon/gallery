
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { doc, ref, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase-config';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const accessToken = JSON.parse(localStorage.getItem("AccessToken"));

export default function ImagePost(props) {



    const handleImageClick = () => {
        var modal = document.getElementById('myImageModal');
        modal.setAttribute("style", "visibility:visible;opacity:1;transition: visibility .5s, opacity .5s linear;")

        var imageTag = document.getElementById('imageTag');
        imageTag.src = props.source;

    }



    if ((props.indexValue % 2) === 0) {
        return (
            <>
                <div className="gallery-container h-span-2">
                    <div className="gallery-item">
                        <div className="image">
                            <img src={props.source} onClick={handleImageClick} />
                        </div>
                        <div className="text">Cool pics</div>
                    </div>
                    <Toolbar data={props.data} />

                </div>
            </>
        )
    } else if ((props.indexValue % 4) === 0) {
        return (
            <>
                <div className="gallery-container w-span-4">
                    <div className="gallery-item">
                        <div className="image">
                            <img src={props.source} onClick={handleImageClick} />
                        </div>
                        <div className="text">Cool pics</div>
                    </div>
                    <Toolbar data={props.data} />

                </div>
            </>
        )
    }


    return (
        <>
            <div className="gallery-container">
                <div className="gallery-item">
                    <div className="image">
                        <img src={props.source} onClick={handleImageClick} />
                    </div>
                    <div className="text">Cool pics</div>
                </div>
                <Toolbar data={props.data} />

            </div>
        </>

    )
}

function Toolbar(props) {

    const [likesCount, setLikesCount] = useState(0);
    const notify = () => toast("Wow so easy!");


    useEffect(() => {
        setLikesCount(props?.data?.likes.length)
    }, []);

    const changeHeartColor = () => {

        var useremail = accessToken?.profileObj.email;
        console.log(useremail)
        if (!useremail) return;

        let found = false;
        console.log(props.data.likes);
        for (let obj of props?.data?.likes) {
            console.log(obj)
            if (obj === useremail) {
                found = true;
                break;
            }
        }

        if (!found) {
            console.log("can be updated");
            let obj = props.data;
            obj.likes.push(useremail);
            console.log(obj);

            const docRef = doc(db, "userImages", props?.data?.id);

            updateDoc(docRef, obj).then(res => {
                console.log(res)
                setLikesCount(prev => prev + 1);
                toast.success('Awesome! 🤝😁', {
                    position: "top-right",
                    className:"custom-toast",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch(err => console.log(err));

        } else {
            console.log("here")
            toast.info('You already liked this photo! 😏', {
                position: "top-right",
                className:"custom-toast",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    return (
        <>
            <div className="toolbar">
                <div className="toolbar-item" >
                    <FontAwesomeIcon className='heartIcon' icon={faHeart} onClick={changeHeartColor} />
                    <div style={{ 'marginLeft': '7px' }} >
                        {likesCount} likes
                    </div>


                </div>

            </div>
        </>
    )
}


