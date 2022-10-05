import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadSongForm from './UploadSongForm';
import CreatePlaylistForm from '../CreatePlaylistModal/CreatePlaylistForm';
import './UploadSong.css';

export default function UploadSong() {
    const [files, setFiles] = useState([]);
    const [showSingleForm, setShowSingleForm] = useState(false);
    const [showMultiForm, setShowMultiForm] = useState(false);
    const [showDragDrop, setDragDrop] = useState(true);
    const [initialTitle, setInitialTitle] = useState('');
    const [showDiv, setShowDiv] = useState(false);

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        accept: {
            'audio/mpeg': ['.mp3']
        },
        onDrop: acceptedFiles => {
            setFiles([...acceptedFiles]);
            if (acceptedFiles.length === 1 && files.length < 1) {
                setShowSingleForm(true);
                setDragDrop(false);
                setInitialTitle(acceptedFiles[0].name.split('.')[0])
            } else if (acceptedFiles.length > 1 || files.length > 1) {
                setShowMultiForm(true);
                setDragDrop(false);
            }
        },
        noClick: true
    });

    const handleFile = () => {
        const realBtn = document.getElementById('real-file-button');
        realBtn.click();
    };

    const updateFiles = (e) => {
        const inputFiles = e.target.files;
        if (inputFiles.length === 1 && files.length < 1) {
            setFiles([...inputFiles]);
            setShowSingleForm(true);
            setDragDrop(false);
        } else if (inputFiles.length > 1 || files.length > 1) {
            setFiles([...inputFiles]);
            setShowMultiForm(true);
            setDragDrop(false);
        }
    };

    const handleDragLeave = e => {
        if(e.clientY === 0 || e.clientX === 0)setShowDiv(false);
    };

    return (
        <div className="upload-song-page" onDragEnter={() => setShowDiv(true)} onDrop={() => setShowDiv(false)}>
            <div className="upload-container flx-ctr flx-col">
                {showDragDrop && (
                    <>
                        <div className="drag-drop-area">
                            <p>Drag and drop your tracks & albums here</p>
                        </div>
                        <input
                            type="file"
                            accept=".mp3"
                            id="real-file-button"
                            onChange={updateFiles}
                            hidden
                        />
                        <div className="fake-file-input">
                            <button className="org-btn fake-file-button flx-ctr sng-upld-btn" type="button" onClick={handleFile}>or choose files to upload</button>
                        </div>
                    </>
                )}
                {showSingleForm && (
                    <div className="drag-drop-area">
                        <UploadSongForm songFiles={files} initialTitle={initialTitle} setShowMultiForm={setShowMultiForm} setShowSingleForm={setShowSingleForm} setDragDrop={setDragDrop} setFiles={setFiles} />
                    </div>
                )}
                {showMultiForm && (
                    <div className="drag-drop-area" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <CreatePlaylistForm />
                    </div>
                )}
                <div className="btm-upld">
                    {!!fileRejections.length && fileRejections.map(({ file, errors }) => (
                            <div key={file.path} className="drop-errors flx-ctr flx-col">
                                This file "{file.path}" has the following error(s):
                                <div>
                                    {errors.map(e => (
                                        <p key={e.code}>{e.message}</p>
                                    ))}
                                </div>
                            </div>
                        ))
                    
                    }
                </div>
            </div>
            {showDiv && (
                <div className="popup-box-bkgrnd flx-ctr" onDragLeave={handleDragLeave}>
                    <div className="popup-box" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drop your files here</p>
                    </div>
                </div>
            )}
        </div>
    )
}