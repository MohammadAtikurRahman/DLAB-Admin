import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import './index.css'
function SchoolwisePC() {
    const [schoolData, setSchoolData] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4300/get-pc');
                if (response.ok) {
                    const data = await response.json();
                    setSchoolData(data);
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const fuse = new Fuse(schoolData, {
        keys: ['schoolname', 'eiin'],
        includeScore: true
    });

    const handleSearch = (pattern) => {
        setQuery(pattern);
        const results = fuse.search(pattern);
        const matches = results.map(result => result.item);
        setSelectedSchool(matches);
    };

    return (
        <div className="container mt-5">
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by school name or EIIN..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <ul className="list-group">
                {Array.from(new Set(schoolData.map(item => `${item.schoolname} (EIIN: ${item.eiin})`))).map((school, index) => (
                    <li key={index} className="list-group-item list-group-item-action" onClick={() => handleSearch(school)}>
                        {school}
                    </li>
                ))}
            </ul>
            {selectedSchool && selectedSchool.length > 0 && (
                <div className="mt-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>School Name</th>
                                <th>PC Name</th>
                                <th>Start Time</th>
                                <th>Last Time</th>
                                <th>Total Time (s)</th>
                                <th>Lab Number</th>
                                <th>PC Number</th>
                                <th>EIIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedSchool.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.schoolname}</td>
                                    <td>{item.pcname}</td>
                                    <td>{item.starttime}</td>
                                    <td>{item.lasttime}</td>
                                    <td>{item.totaltime}</td>
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

export default SchoolwisePC;
