//HOOKS
import {useNavigate} from 'react-router-dom'

//STYLE
import "./landingPage.css"

function LandingPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/home");
  };

  return (
    <div className="landing-rootDiv">
      <div className='landing-div'>
        <h1>LANDING PAGE POKEMON API</h1>

        <button onClick={handleButtonClick}>IR A LA HOME</button>
      </div>
    </div>
  );
};

export default LandingPage;