import { ThemeContext } from "../App/App";
import darkmode from "../../assets/darkmode.png";
import lightmode from "../../assets/lightmode.png";
import gearLight from "../../assets/gear_light.png";
import gearDark from "../../assets/gear_dark.png";
import "./Header.css";

const Header = ({ userInfo }) => {
  return (
    <header>
      {/* PFP */}
      {userInfo.images[0] ? (
        <img src={userInfo.images[0]} alt="pfp" />
      ) : (
        <div className="pfp">
          <svg
            role="img"
            height="20"
            width="20"
            aria-hidden="true"
            data-testid="user"
            viewBox="0 0 24 24"
            className="Svg-ytk21e-0 jAKAlG"
            style={{
              filter:
                "invert(59%) sepia(40%) saturate(353%) hue-rotate(224deg) brightness(90%) contrast(86%)",
            }}
          >
            <path d="M10.165 11.101a2.5 2.5 0 01-.67 3.766L5.5 17.173A2.998 2.998 0 004 19.771v.232h16.001v-.232a3 3 0 00-1.5-2.598l-3.995-2.306a2.5 2.5 0 01-.67-3.766l.521-.626.002-.002c.8-.955 1.303-1.987 1.375-3.19.041-.706-.088-1.433-.187-1.727a3.717 3.717 0 00-.768-1.334 3.767 3.767 0 00-5.557 0c-.34.37-.593.82-.768 1.334-.1.294-.228 1.021-.187 1.727.072 1.203.575 2.235 1.375 3.19l.002.002.521.626zm5.727.657l-.52.624a.5.5 0 00.134.753l3.995 2.306a5 5 0 012.5 4.33v2.232H2V19.77a5 5 0 012.5-4.33l3.995-2.306a.5.5 0 00.134-.753l-.518-.622-.002-.002c-1-1.192-1.735-2.62-1.838-4.356-.056-.947.101-1.935.29-2.49A5.713 5.713 0 017.748 2.87a5.768 5.768 0 018.505 0 5.713 5.713 0 011.187 2.043c.189.554.346 1.542.29 2.489-.103 1.736-.838 3.163-1.837 4.355m-.001.001z"></path>
          </svg>
        </div>
      )}
      <p className="username">{userInfo.display_name}</p>
      {/* THEME MODE */}
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <>
            <img
              src={theme === "light" ? lightmode : darkmode}
              alt="theme mode"
              onClick={toggleTheme}
            />
            <img
              className="settings"
              src={theme === "light" ? gearLight : gearDark}
              alt="settings"
            />
          </>
        )}
      </ThemeContext.Consumer>
    </header>
  );
};

export default Header;
