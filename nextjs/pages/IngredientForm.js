import React from "react"
import { useState, useContext, Fragment, useEffect} from "react";
import {userIngredients} from "./index";
const BootstrapSwitchButton = (props) => {
    const [ loadedState, setLoadedState ] = useState(<Fragment />);
    useEffect(() => {
        const BootstrapSwitchButton = require('bootstrap-switch-button-react').default;
        setLoadedState(<BootstrapSwitchButton {...props} />);
    }, []);

    return loadedState;
}

const IngredientForm = () => {
    const [value, setValue] = useState("");
    const [isInclude, setIsInclude] = useState(true);
    const [number, setNumber] = useState(0);
    const [ingredients, setIngredients] = useContext(userIngredients);

    const handleClick = event => {
        addIngredient();
        event.preventDefault();
    }

    const addIngredient = () => {
        let flag = true;

        if (value !== "") {
            if (!ingredients.some(v => v.ingredient === value)) {
                setIngredients([...(ingredients.filter(v => v.ingredient !== "")), {id: number, ingredient: value, isInclude: isInclude}]);
                setNumber(number + 1);
            }
            setValue("");
        }
    }

    return (
        <div className="container" id={"ingredientForm"}>
            <form className="col-md-10 d-block mx-auto card card-body">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <label htmlFor="ingredient">指定する食材</label>
                        <input
                            type="search"
                            value={value}
                            onChange={event => setValue(event.target.value)}
                            onKeyPress={event => {
                                if (event.key === "Enter") {
                                    addIngredient();
                                    event.preventDefault();
                                }
                            }}
                            className="form-control col-6" id="ingredient"
                            placeholder="食材"
                        />
                    </div>
                    <div
                        className="col-12 col-md-2 d-flex align-self-md-end justify-content-md-center justify-content-end"
                        id={"switchInclude"}>
                        <BootstrapSwitchButton
                            checked={true}
                            onlabel="含む"
                            offlabel="含まない"
                            onstyle="success"
                            offstyle="danger"
                            width="1000000"
                            onChange={checked => setIsInclude(checked)}
                        />
                    </div>
                    <div
                        className="col-12 col-md-2 d-flex align-self-md-end justify-content-md-center justify-content-end"
                        id="add">
                        <button type="button" className="btn btn-primary align-self-end col-12" onClick={handleClick}>追加</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default IngredientForm;