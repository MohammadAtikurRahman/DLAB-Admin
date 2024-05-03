import React, { useState } from 'react';
import axios from 'axios';

function UploadPC() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert("Please select one or more CSV files to upload.");
            return;
        }

        const formData = new FormData();
        Array.from(selectedFiles).forEach((file) => {
            formData.append("files", file);
        });

        try {
            const response = await axios.post('http://localhost:4300/pc-info', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Upload successful:", response.data);
            alert("Upload successful!");
            // Optionally, you can handle the response or update state here
        } catch (error) {
            console.error("Upload error:", error);
            alert("An error occurred while uploading. Please try again.");
        }
    };

    return (
        <div className="input-group">
        <input
          type="file"
          className="form-control"
          id="inputGroupFile04"
          aria-describedby="inputGroupFileAddon04"
          aria-label="Upload"
          onChange={handleFileChange}
        />
        <button className="btn btn-danger" type="button" id="inputGroupFileAddon04">
          UPLOAD
        </button>
      </div>
    );
}

export default UploadPC;
