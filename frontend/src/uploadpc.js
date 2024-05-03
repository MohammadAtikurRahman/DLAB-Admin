import React, { useState } from 'react';
import Papa from 'papaparse';

function UploadPC() {
    const [parsedData, setParsedData] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first file only for simplicity
        if (file) {
            Papa.parse(file, {
                header: true, // Consider the first row of the CSV as headers
                skipEmptyLines: true,
                complete: function(results) {
                    setParsedData(results.data); // Set the parsed data to state
                }
            });
        }
    };

    return (
        <div>
            <div className="input-group">
                <input
                    type="file"
                    accept=".csv"
                    className="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    onChange={handleFileChange}
                />
            </div>

            {parsedData.length > 0 && (
                <div>
                    <h2>Parsed CSV Data</h2>
                    <pre>{JSON.stringify(parsedData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default UploadPC;
