import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import ImagePost from "./ImagePost";
import { db, storage } from '../firebase-config';
import { addDoc, collection, getDocs, orderBy, query, onSnapshot, where } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./NavBar";




export default function Dashboard() {


    const [selectedFile, setSelectedFile] = useState(null)
    const [userImageList, setUserImageList] = useState([]);
    const userImageRef = collection(db, "userImages");
    const accessToken = JSON.parse(localStorage.getItem("AccessToken"));
    const q = query(userImageRef, orderBy("uploadedDate", "desc"));
    const myPhotosQ = query(userImageRef, where("uploadedBy", "==", accessToken.profileObj.email));



    useEffect(() =>
        onSnapshot(q, (snapshot) => {
            let arr = [];
            snapshot.docs.forEach(doc => {
                arr.push({ ...doc.data(), id: doc.id })
            })
            setUserImageList(arr);
        }), []
    )




    const handleButtonClick = () => {
        var modal = document.getElementById('myModal');
        modal.style.display = 'block'
        setSelectedFile(null)
    }

    const handleMyPhotosClick = () => {

        getDocs(myPhotosQ).then(res => {
            let arr = [];
            res.docs.forEach(doc => {
                arr.push({ ...doc.data(), id: doc.id })
            })

            window.scrollTo({ top: 273, behavior: 'smooth' });
            setUserImageList(arr);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleDashboardClick = () => {
        getDocs(q).then(res => {
            let arr = [];
            res.docs.forEach(doc => {
                arr.push({ ...doc.data(), id: doc.id })
            })
            window.scrollTo({ top: 273, behavior: 'smooth' });
            setUserImageList(arr);
        }).catch(err => {
            console.log(err);
        })
    }



    const handleFileUpload = () => {

        if (selectedFile == null) return;
        const imageRef = ref(storage, `images/${selectedFile.name}`);



        toast.promise(
            uploadBytes(imageRef, selectedFile).then(res => {
                getDownloadURL(res.ref).then(url => saveDocument(url)).catch(err => console.log(err));
                closeModal();

            }).catch(err => console.log(err)),
            {
                pending: 'Image uploading...',
                success: 'Image uploaded! 👌',
                error: 'Couldn\'t upload image! 🤯'
            }
        )


    }

    const saveDocument = (url) => {

        let obj = {
            imageLink: url,
            imagename: selectedFile.name,
            likes: [],
            uploadedBy: accessToken.profileObj.email,
            username: accessToken.profileObj.name,
            uploadedDate: new Date()
        }

        console.log(obj);

        addDoc(collection(db, "userImages"), obj).then(res => {
            //getUserImageList();
        }).catch(err => console.log(err))

    }

    const closeModal = () => {
        var modal = document.getElementById('myModal');
        modal.style.display = 'none'
        // getUserImageList();
    }

    const closeImageModal = () => {
        var modal = document.getElementById('myImageModal');
        var body = document.querySelector('body');
        body.style.overflow = "auto";
        modal.setAttribute("style", "visibility:hidden;opacity:0;transition: visibility .3s, opacity .3s linear;")
    }

    const inputFileClickHandle = () => {

        var input = document.getElementById('inputFileTag');
        input.click();
    }



    const handleNextPreviousImg = (value) => {
        var img = document.getElementById('imageTag');

        let index = +img.getAttribute("data-index") + value;

        if (index === userImageList.length) return;

        img.src = "";

        img.src = userImageList.at(index).imageLink;
        img.alt = userImageList.at(index).imagename;

        img.setAttribute('data-index', index);
    }


    return (

        <>
            <NavBar />
            <ToastContainer position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />

            <div className="flex gap-[13px] header-sticky">

                <div className="mb-[12px]">

                    <button onClick={handleDashboardClick} type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block px-6 py-2.5 bg-[#414040] w-[118px] text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-[#5f9ea0] hover:shadow-lg focus:bg-[#5f9ea0] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#5f9ea0] active:shadow-lg transition duration-150 ease-in-out">
                        All
                    </button>

                </div>

                <div className="mb-[12px]">

                    <button onClick={handleButtonClick} type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block px-6 py-2.5 bg-[#8fbc8f] w-[118px] text-black font-semibold text-xs leading-tight uppercase shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">
                        Upload
                    </button>

                </div>
                <div className="mb-[12px]">

                    <button onClick={handleMyPhotosClick} type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block px-6 py-2.5 bg-[#414040] w-[118px] text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-[#5f9ea0] hover:shadow-lg focus:bg-[#5f9ea0] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#5f9ea0] active:shadow-lg transition duration-150 ease-in-out">
                        My snaps
                    </button>

                </div>
            </div>

            <div className="container">

                {
                    userImageList && userImageList.map((res, index) => {
                        return <ImagePost key={index} source={res.imageLink} data={res} indexValue={index + 1} size={userImageList.length} />
                    })
                }
            </div>

            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="close-image" style={{ cursor: 'pointer' }} onClick={closeModal}>&times;</div>
                    <div className="p-[0.5rem] pb-0">
                        {selectedFile?.name}
                        <div className="w-full h-60 flex justify-center items-center" onClick={inputFileClickHandle}>
                            CLick here to upload file!
                            <input id="inputFileTag" className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" />
                        </div>
                        <div className="flex justify-end mt-3">
                            <button onClick={handleFileUpload} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload</button>

                        </div>
                    </div>
                </div>
            </div>

            <div id="myImageModal" className="imageModal">
                <div>
                    <div className="close" onClick={closeImageModal}>&times;</div>
                    <img id="imageTag" alt="" />
                    <div className="close-blank" style={{ visibility: "hidden" }}>x</div>

                    <FontAwesomeIcon className='arrow-right' icon={faArrowRight} onClick={() => handleNextPreviousImg(1)} />

                    <FontAwesomeIcon className='arrow-left' icon={faArrowLeft} onClick={() => handleNextPreviousImg(-1)} />


                </div>

            </div>



        </>
    )
}