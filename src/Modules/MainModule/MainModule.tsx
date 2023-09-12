import React from 'react';
import './MainModule.css'
export const MainModule: React.FC<{ clickedData: any }> = ({ clickedData }) => {
    let arrow = 'black';
    let color = 'black';
    if (clickedData && clickedData.change) {
        if (clickedData.change > 0) {
            arrow = 'green-arrow up';
            color = 'green';
        } else if (clickedData.change < 0) {
            arrow = 'red-arrow down';
            color = 'red';
        }
    }
    return (
        <>
            {clickedData.symbol &&
                <div className="card text-bg-light mb-3 card-box">
                    <div className="card-header">
                        Crypto Currency
                    </div>

                    <div className="card-body">
                        <div className="card-title fs-4">{clickedData.symbol}</div>
                        <hr />
                        <div className={arrow} />
                        <span className={`card-text ${color} fs-3`}>{clickedData.change}%</span>
                    </div>
                </div>
            }

        </>
    );
};
