import React, { useState, createContext } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientsList";
import TimeSlider from "./TimeSlider";
import Head from "next/head";
import Tips from "./Tips";
import {Help} from "@material-ui/icons";
import RecipeList from "./RecipeList";
import {scroller} from "react-scroll";
import {TwitterShareButton, TwitterIcon} from "react-share";

export const userIngredients = createContext([]);
export const userTime = createContext(20);
export const userDoSpecifyTime = createContext(false);
export const userData = createContext([]);
const baseURL = "http://192.168.0.13";

const Index = () => {
    const [ingredients, setIngredients] = useState([{id: 999999999, ingredient: ""}]);
    const [time, setTime] = useState(20);
    const [doSpecifyTime, setDoSpecifyTime] = useState(false);
    const [data, setData] = useState([]);

    const handleClick = async (event) => {
        let tempIng = [];
        ingredients.forEach(v => {if(v.isInclude) tempIng.push(v.ingredient)});
        let tempIngEx = [];
        ingredients.forEach(v => {if(!v.isInclude) tempIngEx.push(v.ingredient)});

        let num = 0;
        let get = [];
        let temp = [];
        const axiosBase = require('axios');
        const axios = axiosBase.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            responseType: 'json'
        });

        await axios
            .get(`/api/recipes/?ingredients=${tempIng.join()}&ex_ingredients=${tempIngEx.join()}&int_time_max=${doSpecifyTime ? time : ""}&int_time_min=&limit=1&offset=1`)
            .then(response => num = response.data.count)
            .catch(() => console.log("Get data failed."));

        console.log(num);
        if (num < 5) get = Array(num).fill().map((_, i) => i);
        else {
            for (let i = 0; i < 5; i++) {
                while (true) {
                    let temp = Math.floor(Math.random() * 100000 % num);
                    if (!get.includes(temp)) {
                        get.push(temp);
                        break;
                    }
                }
            }
        }

        for (const i of get) {
            await axios
                .get(`/api/recipes/?ingredients=${tempIng.join()}&ex_ingredients=${tempIngEx.join()}&int_time_max=${doSpecifyTime ? time : ""}&int_time_min=&limit=1&offset=${i}`)
                .then(response => {
                    temp.push(response.data.results[0]);
                })
                .catch(() => console.log("Get data failed."));
        }

        setData(temp);

        scroller.scrollTo("recipeList", {
            duration: 800,
            delay: 200,
        });
    };

    return (
        <div>
            <Head>
                <title>Recipe Proposer</title>
                <meta charSet={"utf-8"}/>
                <meta name={"viewport"} content={"width=device-width,initial-scale=1"}/>
                <meta httpEquiv={"X-UA-Compatible"} content={"IE=edge"}/>
                <meta name={"description"} content={"みんなのきょうの料理様のレシピをランダムに表示することができるサービスです。献立が決まらないときなどにお使いください。"}/>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                        crossOrigin="anonymous"/>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
                        integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
                        crossOrigin="anonymous"/>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"
                        integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF"
                        crossOrigin="anonymous"/>
                <link rel="icon" href="/img/logo.png" type="image/png" />
                <link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet"/>
                <script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"/>
                <meta property="og:url" content={baseURL} />
                <meta property="og:title" content="Recipe Proposer" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="みんなのきょうの料理様のレシピをランダムに表示することができるサービスです。献立が決まらないときなどにお使いください。" />
                <meta property="og:image" content={baseURL + "/img/logo.png"} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@Cogon84206841" />
                <meta property="og:site_name" content="Recipe Proposer" />
            </Head>

            <div className={"container"}>
                <div className={"card card-body col-md-10 d-block mx-auto"} id={"introduction"}>
                    画面下部の「ランダム表示」ボタンを押すことでNHKエデュケーショナル様の「みんなのきょうの料理」サイトのレシピをランダムで表示します。<br/>
                    その他条件を指定することもできます。指定の方法は各欄のはてなマーク<Help style={{color: "blue"}}/>を押してください。<br/>
                    「みんなのきょうの料理」サイトは、サイトの運営者であるNHKエデュケーショナル様の著作物です。<br/>
                    詳しいレシピはリンク先の「みんなのきょうの料理」サイトをご覧ください。
                </div>
            </div>

            <userIngredients.Provider value={[ingredients, setIngredients]}>
                <IngredientForm/>
                <IngredientList/>
            </userIngredients.Provider>

            <Tips id={"ingredientCollapse"} sentence={
                <div>
                    使う食材、使わない食材を指定することができます。<br/>
                    残っている食材を使いたい、アレルギーの食材は使いたくない、などのときに役立ちます。<br/>
                    トグルボタンをタップして食材を含む、含まないの切り替えができます。<br/>
                    含む食材は緑色、含まない食材は赤色で表示されます。<br/>
                    指定した食材を削除したい場合は、その食材をタップしてください。<br/>
                    表記揺れにより、正しく認識されない場合があります。当てはまるものがなかった場合、ひらがなにして指定してみてください。<br/>
                    例：ナス、茄子→なす
                </div>}/>

            <userTime.Provider value={[time, setTime]}>
                <userDoSpecifyTime.Provider value={[doSpecifyTime, setDoSpecifyTime]}>
                    <TimeSlider/>
                </userDoSpecifyTime.Provider>
            </userTime.Provider>
            <Tips id={"timeCollapse"} sentence={
                <div>
                    調理時間を指定することができます。<br/>
                    短時間で作りたい場合に役立ちます。<br/>
                    スライドバーで指定するか、右の数字欄に直接打ち込んで指定してください。
                </div>
            }/>

            <div className={"container"}>
                <button type="button" className="btn btn-primary d-block mx-auto col-12 col-md-10" id={"display"} onClick={handleClick}>ランダム表示</button>
            </div>

            <userData.Provider value={[data, setData]}>
                <RecipeList/>
            </userData.Provider>

            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-10 d-block mx-auto"}>
                        <TwitterShareButton
                            url={baseURL}
                            title={"今日の献立をサポート Recipe Proposer"}
                            hashtags={["RecipeProposer", "みんなのきょうの料理 "]}
                            className={"float-md-end"}
                        >
                            <TwitterIcon size={60} round={true} className={"share"}/>
                        </TwitterShareButton>
                        <a href="http://www.kyounoryouri.jp/" rel={"noopener"} title="みんなのきょうの料理" target="_blank">
                            <img src="http://www.kyounoryouri.jp/links/img/234_60.gif" width="234" height="60" alt="みんなのきょうの料理" border="0" className={"float-end share"}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
