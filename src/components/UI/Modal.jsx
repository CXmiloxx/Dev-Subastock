import React from 'react';

function Modal({ show, onClose, children }) {
    if (!show) return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    // Adjust modal style based on window width
    const isSmallScreen = window.innerWidth <= 768;
    const modalStyle = {
        backgroundColor: 'white',
        padding: isSmallScreen ? '10px' : '20px',
        borderRadius: '10px',
        width: isSmallScreen ? '90%' : '50%',
        maxWidth: '600px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        position: 'relative',
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: 'red',
        fontWeight: 'bold',
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button style={closeButtonStyle} onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
