import React from 'react';


function Notebook(): React.ReactElement {
    return (
        <div className="flex flex-auto flex-col gap-2 md:gap-3">
            <div className="flex-1  bg-white max-h-[300px] rounded-md shadow-lg">32</div>
            <div className="flex-1  bg-white rounded-md shadow-lg">32</div>
        </div>
    );
}

export default Notebook;
