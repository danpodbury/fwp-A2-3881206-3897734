import '../App.css';
import { Link } from 'react-router-dom';

function NotAuthorized(){
  return (
    <div className="App">
    <p className='center-text'>
      Not authorized. Please <Link to="/signin" style={{"textDecoration":"underline"}}>Sign in</Link> to view the timeline.
    </p>
  </div>
  );
}

export default NotAuthorized;