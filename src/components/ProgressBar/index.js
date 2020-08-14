import React from 'react';


function ProgressBar({ results_percentage_area, binary = false }) {
    let color;

    switch (true) {
        case results_percentage_area == 0:
            color = "#FF0000";
            break;
        case results_percentage_area < 25:
            color = "#FFC000";
            break;
        case results_percentage_area < 50:
            color = "#FFFF00";
            break;
        case results_percentage_area < 75:
            color = "#00B0F0";
            break;
        case results_percentage_area < 100:
            color = "#7030A0";
            break;
        case results_percentage_area == 100:
            color = "#00B050";
            break;
    }
    return (
        <div className="progress mt-2" style={{ height: "10px" }}>
            <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${results_percentage_area || 0}%`, backgroundColor: color }}
                aria-valuenow={results_percentage_area || 0}
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        </div>
    );
}

export default ProgressBar;
