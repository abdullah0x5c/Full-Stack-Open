import { useState, useEffect } from "react"
import { upload, getFileList, getFile } from './data.jsx'

function Download({ refreshTrigger }) {
    const [downloads, setDownloads] = useState([])
    const [selectedID, setSelectedID] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchFiles = async () => {
        setLoading(true)
        try {
            const response = await getFileList()
            setDownloads(response.data)
        } catch (error) {
            console.log("Error Downloading File List", error)
            setDownloads([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFiles()
    }, [])

    useEffect(() => {
        if (refreshTrigger) {
            fetchFiles()
        }
    }, [refreshTrigger])

    const handleSelected = (id) => {
        setSelectedID(id)
    }

    const entries = downloads.length > 0 ? downloads.map(entry => (
        <tr
            key={entry.id}
            onClick={() => handleSelected(entry.id)}
            className={selectedID === entry.id ? 'table-primary' : ''}
        >
            <th scope="row">{entry.id}</th>
            <td>{entry.fileName || entry.name}</td>
            <td>{entry.file_size || 'Unknown'}</td>
            <td>{entry.username || 'Unknown'}</td>
        </tr>
    )) : (
        <tr>
            <td colSpan="4" className="text-center">
                {loading ? 'Loading files...' : 'No files available'}
            </td>
        </tr>
    )

    const downloadFile = async () => {
        try {
            const response = await getFile(selectedID)
            const disposition = response.headers['content-disposition']
            let filename = "downloaded_file"

            if (disposition) {
                const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition)
                if (matches && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '').trim()
                }
            }

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', filename)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error("Download failed:", error)
        }
    }

    return (
        <>
            <h2 className="d-flex justify-content-center"><strong>Download</strong></h2>
            <h4 className="d-flex justify-content-center my-2">All Available Files</h4>
            <table className="table table-hover border" id="uploadsTable">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">File</th>
                        <th scope="col">Size</th>
                        <th scope="col">Uploader</th>
                    </tr>
                </thead>
                <tbody>
                    {entries}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <button
                    type="button"
                    className="btn btn-dark d-flex align-items-center justify-content-center rounded-5"
                    onClick={downloadFile}
                    disabled={!selectedID}
                >
                    Download
                </button>
            </div>
        </>
    )
}

export default Download