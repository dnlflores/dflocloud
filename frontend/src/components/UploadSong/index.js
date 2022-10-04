import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadSongForm from './UploadSongForm';
import './UploadSong.css';

export default function UploadSong() {
    const [files, setFiles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDragDrop, setDragDrop] = useState(true);

    const { getRootProps, getInputProps } = useDropzone({
        accept: ".mp3,.mp4",
        onDrop: acceptedFiles => {
            setFiles([...acceptedFiles]);
            setShowForm(true);
            setDragDrop(false);
        },
        noClick: true
    });

    const handleFile = () => {
        const realBtn = document.getElementById('real-file-button');
        const fileName = document.getElementById('file-name');
        realBtn.click();

        // realBtn.addEventListener('change', () => {

        //     if (realBtn.value) {
        //         const name = realBtn.value.split("\\")[2];
        //         fileName.innerHTML = name;
        //     }
        //     else fileName.innerHTML = 'No picture chosen!"'
        // });
    };

    const updateFiles = (e) => {
        const files = e.target.files;
        if (!!files.length) {
            setFiles([...files]);
            setShowForm(true);
            setDragDrop(false);
        }
    };

    console.log("these are the files => ", files);

    return (
        <div className="upload-song-page">
            <div className="upload-container flx-ctr flx-col">
                {showDragDrop && (
                    <>
                        <div className="drag-drop-area" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag and drop your tracks & albums here</p>
                        </div>
                        <input
                            type="file"
                            accept=".mp3,.mp4"
                            id="real-file-button"
                            onChange={updateFiles}
                            hidden
                        />
                        <div className="fake-file-input">
                            <button className="org-btn fake-file-button flx-ctr sng-upld-btn" type="button" onClick={handleFile}>or choose files to upload</button>
                        </div>
                    </>
                )}
                {showForm && (
                    <UploadSongForm songFiles={files} />
                )}
                <div>
                    {!!files.length && files.map((file, i) => (
                        <p key={i}>Here's the file name! {file.name}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}