import React, {useState} from "react";
import {Help} from "@material-ui/icons";

const Tips = ({id, sentence}) => {
    return (
        <div className={"container"}>
            <div className={"col-md-10 d-block mx-auto spoiler clearfix"}>
                <a data-toggle={"collapse"} href={`#${id}`} role={"button"}
                   aria-expanded={"false"} aria-controls={id}
                   className={"float-end"}>
                    <Help/>
                </a>
                <div className={"collapse"} id={id}>
                    <div className="card card-body">
                        {sentence}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tips;