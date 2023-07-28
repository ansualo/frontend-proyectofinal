import React from "react";
import icon_01d_clear_sky from "../assets/weatherIcons/icon_01d_clear_sky.png"
import icon_02d_few_clouds from "../assets/weatherIcons/icon_02d_few_clouds.png"
import icon_03d_scattered_clouds from "../assets/weatherIcons/icon_03d_scattered_clouds.png"
import icon_04d_broken_clouds from "../assets/weatherIcons/icon_04d_broken_clouds.png"
import icon_09d_10d_rain from "../assets/weatherIcons/icon_09d_10d_rain.png"
import icon_11d_thunderstorm from "../assets/weatherIcons/icon_11d_thunderstorm.png"
import icon_13d_snow from "../assets/weatherIcons/icon_13d_snow.png"
import icon_50d_mist from "../assets/weatherIcons/icon_50d_mist.png"
import night from "../assets/weatherIcons/night.png"

export const weatherIcon = (resultIcon) => {

    switch (resultIcon) {

        case "01d":
            if (resultIcon === "01d") {
                return <img src={icon_01d_clear_sky} alt="Clear sky" className="weatherIcon" />;
            }
        case "02d":
            if (resultIcon === "02d") {
                return <img src={icon_02d_few_clouds} alt="Few clouds" className="weatherIcon" />;
            }
        case "03d":
            if (resultIcon === "03d") {
                return <img src={icon_03d_scattered_clouds} alt="Scattered clouds" className="weatherIcon" />;
            }
        case "04d":
            if (resultIcon === "04d") {
                return <img src={icon_04d_broken_clouds} alt="Broken clouds" className="weatherIcon" />;
            }
        case "09d":
            if (resultIcon === "09d") {
                return <img src={icon_09d_10d_rain} alt="Rain" className="weatherIcon" />;
            }
        case "10d":
            if (resultIcon === "10d") {
                return <img src={icon_09d_10d_rain} alt="Rain" className="weatherIcon" />;
            }
        case "11d":
            if (resultIcon === "11d") {
                return <img src={icon_11d_thunderstorm} alt="Thunderstorm" className="weatherIcon" />;
            }
        case "13d":
            if (resultIcon === "13d") {
                return <img src={icon_13d_snow} alt="Snow" className="weatherIcon" />;
            }
        case "50d":
            if (resultIcon === "50d") {
                return <img src={icon_50d_mist} alt="Mist" className="weatherIcon" />;
            }

        default:
            return <img src={night} alt="Night" className="weatherIcon" />;
    }
}