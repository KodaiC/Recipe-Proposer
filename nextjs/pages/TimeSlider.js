import React, { useContext } from "react";
import Slider from "@material-ui/core/Slider";
import {userTime, userDoSpecifyTime} from "./index";
import Input from "@material-ui/core/Input"
import {Checkbox, FormControlLabel} from "@material-ui/core";

const TimeSlider = () => {
    const [time, setTime] = useContext(userTime);
    const [doSpecifyTime, setDoSpecifyTime] = useContext(userDoSpecifyTime);

    const handleSliderChange = (event, newValue) => {
        setTime(newValue);
    }

    const handleInputChange = (event) => {
        const re = /^[0-9\b]+$/;
        const value = event.target.value;

        if (value === "") setTime("");
        if (re.test(value)) setTime(Math.max(0, Math.min(Number(value), 60)));
    }

    const handleCheckboxChange = (event) => {
        setDoSpecifyTime(event.target.checked);
    }

    return (
        <div className={"container"}>
            <div className={"card card-body d-block mx-auto col-md-10"} id={"time"}>
                <div className={"d-block mx-auto"}>
                    <FormControlLabel
                        control={<Checkbox />} label={"調理時間を指定する"}
                        value={doSpecifyTime}
                        onChange={handleCheckboxChange}
                    />
                </div>
                <div className={"row"}>
                    <div className={"d-block mx-auto col-10"}>
                        <label htmlFor={"timeSlider"}>作成時間[分以下]</label>
                        <Slider
                            valueLabelDisplay={"auto"}
                            value={typeof time === "number" ? time : 0}
                            onChange={handleSliderChange}
                            step={5}
                            marks
                            min={0}
                            max={60}
                            id={"timeSlider"}
                            disabled={!doSpecifyTime}
                        />
                    </div>
                    <div className={"col-2 d-flex align-self-center"}>
                        <Input
                            value={time}
                            onChange={handleInputChange}
                            disabled={!doSpecifyTime}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeSlider;