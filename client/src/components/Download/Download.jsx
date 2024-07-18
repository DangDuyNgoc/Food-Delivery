import { assets } from "../../assets/assets";
import "./Download.css";

const Download = () => {
  return (
    <div className="download" id="download">
        <p>For better Experience Download <br/>Tomato App</p>
        <div className="app-platforms">
            <img src={assets.play_store}/>
            <img src={assets.app_store}/>
        </div>
    </div>
  )
}

export default Download