import { useEffect, useState } from "react";
import ImagePost from "./ImagePost";
import { db, storage } from '../firebase-config';
import { addDoc, collection, getDocs } from "firebase/firestore"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Dashboard() {


    const [selectedFile, setSelectedFile] = useState(null)
    const [users, setUsers] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [userImageList, setUserImageList] = useState([]);

    const usersCollectionRef = collection(db, "users");
    const userImageRef = collection(db, "userImages");
    const imageListRef = ref(storage, 'images/');

    const accessToken = JSON.parse(localStorage.getItem("AccessToken"));

    // const amount = useSelector(state => state.amount)

    useEffect(() => {

        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url])
                    //setImageList(prev => ({...prev.data(), url:url, id: item.id}))
                })
            })

        })

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getUsers();

        getDocs(userImageRef).then(res => {
            console.log(res.docs);
            let arr = [];
            res.docs.forEach(doc => {
                arr.push({ ...doc.data(), id: doc.id })
            })

            setUserImageList(arr);
            console.log(userImageList)
        }).catch(err => {
            console.log(err);
        })

    }, [])


    const handleButtonClick = () => {
        var modal = document.getElementById('myModal');
        modal.style.display = 'block'
    }

    const handleFileUpload = () => {

        if (selectedFile == null) return;
        const imageRef = ref(storage, `images/${selectedFile.name}`);
        uploadBytes(imageRef, selectedFile).then(res => {
            alert("image uploaded")
            getDownloadURL(res.ref).then(url => saveDocument(url)).catch(err => console.log(err));

        }).catch(err => console.log(err))

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
            console.log(res)
        }).catch(err => console.log(err))



    }



    const closeModal = () => {
        var modal = document.getElementById('myModal');
        modal.style.display = 'none'
    }

    const closeImageModal = () => {
        var modal = document.getElementById('myImageModal');
        modal.setAttribute("style", "visibility:hidden;opacity:0;transition: visibility .1s, opacity .1s linear;")
    }

    const inputFileClickHandle = () => {

        var input = document.getElementById('inputFileTag');
        input.click();
    }


    return (

        <>
            {/* <NavBar /> */}
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />

            <div className="flex justify-center">
                <div className="mt-4 mb-8">
                    <div className="flex justify-end">
                        <button onClick={handleButtonClick} type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            class="inline-block px-6 py-2.5 bg-[#414040] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Upload
                        </button>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* {imageList && imageList.map((url, index) => {
                    return <ImagePost key={index} source={url} indexValue={index + 1} size={imageList.length} />
                })} */}
                {
                    userImageList && userImageList.map((res, index) => {
                        return <ImagePost key={index} source={res.imageLink} data={res} indexValue={index + 1} size={userImageList.length} />
                    })
                }
            </div>

            <div id="myModal" className="modal">
                <div className="modal-content rounded-xl">
                    <div className="close-image" onClick={closeModal}>&times;</div>
                    <div className="p-[0.5rem] pb-0">
                        {selectedFile?.name}
                        <div className="w-full h-60 flex justify-center items-center" onClick={inputFileClickHandle}>
                            Upload file
                            <input id="inputFileTag" className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" />
                        </div>
                        <div className="flex justify-end mt-3">
                            <button onClick={handleFileUpload} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload</button>

                        </div>
                    </div>
                </div>
            </div>

            <div id="myImageModal" className="imageModal">
                <div className="close" onClick={closeImageModal}>&times;</div>
                <img id="imageTag" />
            </div>



        </>
    )
}