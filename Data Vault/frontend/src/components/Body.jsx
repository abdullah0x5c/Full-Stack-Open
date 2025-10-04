import { useState } from "react"
import Download from "./Download"
import Upload from "./Upload"

function Body() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleFileUploaded = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <>
        <div className="container p-3">
            <div className="row">
                <div className="col">
                  <Download refreshTrigger={refreshTrigger} />
                </div>
                <div className="col border-start">
                    <Upload onFileUploaded={handleFileUploaded} />
                </div>
            </div>
        </div>
    </>
  )
}

export default Body