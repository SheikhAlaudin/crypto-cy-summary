import React from 'react';
import './Modal.css';

export const Modal:  React.FC<{ handleButtonClicked: any, content: string }> = ({ handleButtonClicked, content }) =>{
    const onButtonClicked = () => {
        handleButtonClicked();
    }
    return (
        <div className="modal modal-box">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">OOPS</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onButtonClicked}></button>
                    </div>
                    <div className="modal-body">
                        <p>{content}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onButtonClicked}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
