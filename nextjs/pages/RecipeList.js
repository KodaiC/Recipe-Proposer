import React, {useContext, useEffect} from "react";
import {userData} from "./index";
import {DataGrid} from "@material-ui/data-grid";

const columns = [
    {field: "name", headerName: "リンク", width: 300, renderCell: v => <a href={`https://www.kyounoryouri.jp${v.row.url}`} target={"_blank"}>{v.value}</a>},
    {field: "time", headerName: "調理時間", width: 150},
    {field: "calorie", headerName: "カロリー", width: 150}
];

const ReactList = () => {
    const [data, setData] = useContext(userData);
    const rows = [];

    if (Object.prototype.toString.call(data) === '[object Array]')
        data.forEach((v, i) => {
            rows.push({
                name: v.name,
                time: v.time === "None" ? "" : v.time,
                calorie: v.calorie === "None" ? "" : v.calorie,
                url: v.url,
                id: i
            });
        });

    return (
        rows.length > 0 ?
        <div className={"container"}>
            <div className={"col-md-10 d-block mx-auto"} id={"recipeList"} name={"recipeList"}>
                <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    hideFooter
                    columnBuffer={2}
                    style={{backgroundColor: "white"}}
                />
            </div>
        </div>
        : ""
    );
}

export default ReactList;