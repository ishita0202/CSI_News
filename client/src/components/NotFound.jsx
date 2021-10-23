import React from 'react';

const NotFound = () => {
    return (
        <div className="position-relative" style={{
            minHeight: 'calc(100vh - 70px)',
            textAlign: 'center',
            margin: '20% 0'
        }}>
            <h2 className="position-absolute text-secondary" style={{
                fontSize: '2rem'
            }}>
                404 | Not Found
            </h2>
        </div>
    )
};

export default NotFound;