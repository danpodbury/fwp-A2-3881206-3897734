import '../App.css';
import { Link } from 'react-router-dom';

function NotAuthorized(){
  return (
    <div className="App">
    <header className="App-header">

    <p>
      Not authorized. Please <Link to="/signin" style={{"textDecoration":"underline"}}>Sign in</Link> to view the timeline.
    </p>

    </header>
  </div>
  );
}

export default NotAuthorized;