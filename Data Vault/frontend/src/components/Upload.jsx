import { useState } from "react"
import {upload, getFileList, getFile} from './data.jsx'

function Upload({ onFileUploaded }) {
    const [file, setFile] = useState(null)
    const [isUploading, setStatus] = useState(false)

    const uploadFile = async (e) => {
        e.preventDefault()
        if(file){
            setStatus(true)
            try {
                const response = await upload(file)
                console.log(response)
                setFile(null)
                // Reset file input
                e.target.reset()
                if (onFileUploaded) {
                    onFileUploaded()
                }
            } catch (error) {
                console.error("Upload failed:", error)
            } finally {
                setStatus(false)
            }
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <>
            <h2 className="d-flex justify-content-center"><strong>Upload</strong></h2>
            <h4 className="d-flex justify-content-center my-2">Select Files</h4>
            <form onSubmit={uploadFile}>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <label className="form-label">Select File</label>
                    <input
                        className="form-control mb-3"
                        id="uploadFile"
                        type="file"
                        onChange={handleFileChange}
                        required
                    />
                    <button
                        className="btn btn-dark rounded-5"
                        type="submit"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default Upload