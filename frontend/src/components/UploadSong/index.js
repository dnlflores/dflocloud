import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './UploadSong.css';

export default function UploadSong() {
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: ".mp3,.mp4",
        onDrop: acceptedFiles => {
            setFiles(
                [...acceptedFiles]
            )
        }
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
        if (!!files.length) setFiles([...files]);
    };

    console.log("these are the files => ", files);

    return (
        <div className="upload-song-page">
            <div className="upload-container flx-ctr flx-col">
                <div className="flx-col" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag and drop your tracks & albums here</p>
                </div>
                <div>
                    <input
                        type="file"
                        accept=".mp3,.mp4"
                        id="real-file-button"
                        onChange={updateFiles}
                        hidden
                    />
                    <div className="fake-file-input">
                        <button className="org-btn login-signup-btns fake-file-button" type="button" onClick={handleFile}>or choose files to upload</button>
                    </div>
                </div>
                <div>
                    {!!files.length && files.map((file, i) => (
                        <p key={i}>Here's the file name! {file.name}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}