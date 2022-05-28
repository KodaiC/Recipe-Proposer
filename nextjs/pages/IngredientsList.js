import React, {useContext, useState} from "react"
import {DataGrid} from "@material-ui/data-grid";
import {userIngredients} from "./index";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";

const columns = [
    {
        field: "ingredient",
        headerName: "食材",
        flex: 1,
        renderCell: v => <big style={{
            color: `${v.row.isInclude ? "green" : "red"}`,
            marginLeft: "5px"
        }}>{v.value}</big>
    }
];

const IngredientList = () => {
    const [ingredients, setIngredients] = useContext(userIngredients);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(-1);
    const [selectedText, setSelectedText] = useState("");

    return (
        <div className={"container"}>
            <div className={"col-md-10 d-block mx-auto"} id={"ingredientsList"}>
                <DataGrid
                    autoHeight
                    rows={ingredients}
                    columns={columns}
                    pageSize={30}
                    onSelectionModelChange={(v) => {
                        if (v.length === 0 || v[0] === 999999999) {
                            setSelected(-1);
                            setSelectedText("");
                            return;
                        }
                        setSelected(v[0]);
                        setSelectedText(ingredients.filter(s => s.id === v[0])[0].ingredient);
                        setOpen(true);
                    }}
                    hideFooter
                    style={{backgroundColor: "white"}}
                />
            </div>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogContent>
                    <DialogContentText>{selectedText}を削除しますか？</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color={"primary"} onClick={() => {
                        setOpen(false);
                        let temp = ingredients.filter(v => v.id !== selected);
                        setIngredients(temp.length === 0 ? [{id: 999999999, ingredient: ""}] : temp);
                    }}>はい</Button>
                    <Button color={"primary"} onClick={() => {
                        setOpen(false);
                    }}>いいえ</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default IngredientList;
