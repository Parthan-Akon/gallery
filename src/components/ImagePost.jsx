
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faDownload, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase-config';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveAs } from 'file-saver'
import { deleteObject, ref } from 'firebase/storage';


const accessToken = JSON.parse(localStorage.getItem("AccessToken"));
const optimizeURL = "https://img.gs/gthrlwxdmc/640/";

export default function ImagePost(props) {


    const handleImageClick = () => {

        var imageTag = document.getElementById('imageTag');
        imageTag.src = "";
        imageTag.src = props.source;
        imageTag.alt = props.data.imagename;

        var modal = document.getElementById('myImageModal');
        modal.setAttribute("style", "visibility:visible;opacity:1;wtransition: visibility .5s, opacity .5s linear;")

    }

    if ((props.indexValue % 2) === 0) {
        return (
            <>
                <div className="gallery-container h-span-2">
                    <div className="gallery-item">
                        <div className="image">
                            <img src={optimizeURL + props.source} width="auto" height="100%" loading='lazy' onClick={handleImageClick} alt={props?.data?.imagename} title={props?.data?.imagename} />
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
                <div className="gallery-container w-span-2">
                    <div className="gallery-item">
                        <div className="image">
                            <img loading="lazy" src={optimizeURL + props.source} width="auto" height="100%" onClick={handleImageClick} alt={props?.data?.imagename} title={props?.data?.imagename} />
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
                        <img loading="lazy" src={optimizeURL + props.source} width="auto" height="100%" onClick={handleImageClick} alt={props?.data?.imagename} title={props?.data?.imagename} />
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
    const [likedFlag, setLikedFlag] = useState(false);

    useEffect(() => {
        setLikesCount(props?.data?.likes.length);
        for (let obj of props.data?.likes) {
            if (obj === accessToken?.profileObj?.email) {
                setLikedFlag(true);
                break;
            } else {
                setLikedFlag(false);
            }
        }

    }, []);

    function downloadImage() {

        saveAs(props?.data?.imageLink, "coolpicsimage.png")
    }

    function deleteImage() {
        console.log(props);
        const imageRef = ref(storage, 'images/' + props.data.imagename);

        //delete record from database
        toast.promise(
            deleteDoc(doc(db, 'userImages', props.data.id)).then(res => {
                console.log("image data deleted successfully!");
                //delete from bucket

            }),
            {
                pending: 'Deleting..... 😪',
                success: 'Image deleted! 😕',
                error: 'Couldn\'t delete image! 🤯'
            }
        )
        deleteObject(imageRef).then(obj => {
            console.log("Image deletion successful!");
        })



    }


    const changeHeartColor = () => {

        var useremail = accessToken?.profileObj.email;
        if (!useremail) return;

        let found = false;
        for (let obj of props?.data?.likes) {
            if (obj === useremail) {
                found = true;
                break;
            }
        }

        if (!found) {
            let obj = props.data;
            obj.likes.push(useremail);
            const docRef = doc(db, "userImages", props?.data?.id);

            updateDoc(docRef, obj).then(res => {
                setLikesCount(prev => prev + 1);
                setLikedFlag(true);
                toast.success('Awesome! 🤝😁', {
                    position: "top-right",
                    className: "custom-toast",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch(err => console.log(err));

        } else {
            toast.info('You already liked this photo! 😏', {
                position: "top-right",
                className: "custom-toast",
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
                    <div style={{ 'display': 'flex', 'margin': 'auto 0', 'paddingLeft': '10px' }}>
                        {likedFlag && <FontAwesomeIcon className='redHeartIcon' icon={faHeart} onClick={changeHeartColor} />}
                        {!likedFlag && <FontAwesomeIcon className='heartIcon' icon={faHeart} onClick={changeHeartColor} />}
                        <div>
                            <div style={{ 'marginLeft': '7px', 'fontSize': '13px' }} >
                                {props.data.likes.length} likes
                            </div>
                            <div style={{ 'marginLeft': '7px', 'fontSize': '13px' }} >
                                Uploaded by {props.data.username}
                            </div>
                        </div>

                    </div>
                    <div>


                        <div style={{ 'display': 'flex', 'margin': '10px 0px', 'paddingRight': '10px' }}>
                            {
                                props.data.uploadedBy === accessToken?.profileObj.email &&
                                <FontAwesomeIcon className='heartIcon' icon={faTrashCan} style={{ marginRight: '10px' }} onClick={deleteImage} />
                            }

                            <FontAwesomeIcon className='heartIcon' icon={faDownload} onClick={downloadImage} />

                        </div>
                    </div>


                </div>
                {/* <div style={{ fontSize: "13px", margin: 'auto', marginLeft: '8px' }}>Uploaded by {props.data.username}</div> */}
            </div>
        </>
    )
}


