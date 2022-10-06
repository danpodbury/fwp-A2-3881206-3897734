// import { useState } from 'react';
import './App.css';
import './Posting.css';
// import FileUploader from './FileUploader'
// import axios from 'axios';

function Sandbox() {

    // const [selectedFile, setSelectedFile] = useState(null);

    // function submitForm(event){
    //     event.preventDefault()

    //     console.log("yeeting file to be uploaded")

    //     const formData = new FormData();
    //     formData.append("image", selectedFile);
      
    //     const super_secret_api_key = "d893acba030fb10633893068fb1d5783"

    //     axios
    //       .post(`https://api.imgbb.com/1/upload?expiration=600&key=${super_secret_api_key}`, formData)
    //       .then((res) => {
    //         alert("File Upload success");
    //         console.log(res.data.data.display_url);
    //         console.log(res.data.data.delete_url);

    //       })
    //       .catch((err) => alert("File Upload Error"));
    // }

    // return (
    //     <div className="App">
    //         <header className="App-header">
    //         <form>

    //             <FileUploader
    //                 onFileSelectSuccess={(file) => setSelectedFile(file)}
    //                 onFileSelectError={({ error }) => alert(error)}
    //             />

    //             <button onClick={submitForm} className="btn btn-success">Submit</button>
    //         </form>

    //       </header>
    //     </div>
    // );


    return (
      <div className="App">
      <header className="App-header">
      <form>
        <input type="email" placeholder='ahhhhh' required minLength={8} ></input>
        <input type="password" placeholder='ahhhhh' required pattern=''></input>
        <button type="submit" className='btn btn-primary'>Submit</button>
      </form>
      </header>
      </div>
    );
}

export default Sandbox;