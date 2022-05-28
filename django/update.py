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


def update(ida, time):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("UPDATE recipes SET int_time=%s where id=%s", [time, ida])
        conn.commit()
    return


connection = get_connection()
cursor = connection.cursor()
cursor.execute("SELECT * FROM recipes")
results = cursor.fetchall()
cursor.close()
connection.close()

for r in results:
    match = re.search("([0-9]*)[^0-9]*", r[6])
    if not match.group(1):
        update(r[0], "1000000")
    else:
        update(r[0], match.group(1))
    print(r[0], r[6], match.group(1))
