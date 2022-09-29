//adapted from: https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react
// import React, {useRef} from 'react'
import React from 'react'

const FileUploader = (props) => {
    // const fileInput = useRef(null)
    // const maxSize = 1024

    const handleFileInput = (e) => {
        e.preventDefault()
        // handle validations
        const file = e.target.files[0];
        props.onFileSelectSuccess(file);
        //if (file.size > maxSize)
        //    props.onFileSelectError({ error: `File size cannot exceed more than ${maxSize /1024}Mb` });
        //else props.onFileSelectSuccess(file);
    };

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput} style={{"fontSize":"12pt"}}></input>
            {/*<button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary">Upload</button>*/}
        </div>
    )
}

export default FileUploader