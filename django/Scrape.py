import requests
from bs4 import BeautifulSoup
import re
import lxml
import datetime
import psycopg2
import environ

import config.settings

env = environ.Env()
env.read_env('.env')


def get_connection():
    return psycopg2.connect(
        host="localhost",
        user=env.get_value("DATABASE_USER"),
        password=env.get_value("DATABASE_PASSWORD"),
        database=env.get_value("DATABASE_DB"),
        port="5433")


def insert(args):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("INSERT INTO recipes (name, url, date, ingredients, favo, time, calorie) VALUES(%s, %s, %s, %s, %s, %s, %s)", args)
        conn.commit()
    return


num = 1

connection = get_connection()
cursor = connection.cursor()
cursor.execute("SELECT max(date) FROM recipes")
latest = cursor.fetchall()[0][0]
cursor.close()
connection.close()

flag = True

while flag:
    res = requests.get("https://www.kyounoryouri.jp/search/recipe?kind%5B%5D=2&order_type=1&pg=" + str(num))
    soup = BeautifulSoup(res.text, "lxml")

    recipe = soup.select("[class='value']")

    if len(recipe) == 0:
        flag = False

    for r in recipe:
        name = r.select("[class='recipe-name']")[0].select("a")[0].get_text()
        url = r.select("[class='recipe-name']")[0].select("a")[0].get("href")
        temp = r.select("[class='recipe recipe-time']")
        time = temp[0].get_text() if len(temp) > 0 else "None"
        temp = r.select("[class='recipe recipe-calorie']")
        calorie = temp[0].get_text().replace("	", "") if len(temp) > 0 else "None"
        date = datetime.datetime.strptime(r.select("[class='static-date']")[0].get_text(), "%Y/%m/%d").date()
        my_recipe = r.select("[class='add-myrecipe']")[0].parent.select("[class='num']")[0].get_text()

        if date <= latest:
            flag = False
            break

        res = requests.get("https://www.kyounoryouri.jp" + url)
        soup = BeautifulSoup(res.text, "lxml")
        temp = soup.select("[class='ingredient']")
        ingredients = []
        for i in temp:
            ingredients.append(re.sub("（.*）", "", i.get_text().replace("・", "")))

        insert([name, url, date, ingredients, my_recipe, time, calorie])
        print(name)
        print(url)
        print(time)
        print(calorie)
        print(date)
        print(my_recipe)
        print(ingredients)

        print("")

    print(num)
    num += 1
