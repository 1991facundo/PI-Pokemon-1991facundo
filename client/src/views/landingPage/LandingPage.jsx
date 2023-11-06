//HOOKS
import {useNavigate} from 'react-router-dom'

//STYLE
import styles from "../../assets/global.module.css"

function LandingPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/home");
  };

  return (
    <div className={styles.landingRootDiv}>
      
      <div className={styles.landingDiv}>
        <h1>PokeAPI by Facundo</h1>

        <button className={styles.button} onClick={handleButtonClick}>
          HOME
        </button>

      </div>

    </div>
  );
};

export default LandingPage;