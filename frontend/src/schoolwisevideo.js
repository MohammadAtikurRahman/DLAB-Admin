import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import './index.css';

function SchoolwiseVideo() {
    const [videoData, setVideoData] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4300/get-video');
                if (response.ok) {
                    const data = await response.json();
                    setVideoData(data);
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const fuse = new Fuse(videoData, {
        keys: ['schoolname', 'eiin', 'video_name'], // Adjust search keys based on video data fields
        includeScore: true
    });

    const handleSearch = (pattern) => {
        setQuery(pattern);
        const results = fuse.search(pattern);
        const matches = results.map(result => result.item);
        setSelectedVideo(matches);
    };

    return (
        <div className="container mt-5">
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by video name, school name, or EIIN..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
            />

            <ul className="list-group">
                {Array.from(new Set(videoData.map(item => `${item.schoolname} EIIN: ${item.eiin}`))).map((video, index) => (
                    <li key={index} className="list-group-item list-group-item-action list-group-item-primary" onClick={() => handleSearch(video)}>
                        {video}
                    </li>
                ))}
            </ul>

            {selectedVideo && selectedVideo.length > 0 && (
                <div className="mt-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>School Name</th>
                                <th>PC Name</th>
                                <th>Video Name</th>
                                <th>Video Start</th>
                                <th>Video End</th>
                                <th>Duration (s)</th>
                                <th>Lab Number</th>
                                <th>PC Number</th>
                                <th>EIIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedVideo.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.schoolname}</td>
                                    <td>{item.pcname}</td>
                                    <td>{item.video_name}</td>
                                    <td>{item.video_start_date_time}</td>
                                    <td>{item.video_end_date_time}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.labnum}</td>
                                    <td>{item.pcnum}</td>
                                    <td>{item.eiin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default SchoolwiseVideo;
