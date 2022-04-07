import sqlite3
import json

DB = sqlite3.connect("dati.db")
SQL = DB.cursor()

SQL.execute(""" CREATE TABLE IF NOT EXISTS vardi (
    id INTEGER NOT NULL UNIQUE,
    vards TEXT,
    hint TEXT,
    PRIMARY KEY ("id" AUTOINCREMENT)
)  """)

SQL.execute(""" CREATE TABLE IF NOT EXISTS speletaji (
    id INTEGER NOT NULL UNIQUE,
    vards TEXT,
    minejums TEXT,
    rezultats INTEGER,
    PRIMARY KEY ("id" AUTOINCREMENT)
)  """)

# for i in range(4, 11):
#     with open(f"dati/vardi{i}.json", "r", encoding="utf-8") as f:
#         dati = f.read()
#         datiJson = json.loads(dati)

#     for ieraksts in datiJson['vardiFaila']:
#         SQL.execute("INSERT INTO vardi (vards, hint) VALUES (:vards, :hint)", 
#         {'vards':ieraksts['vards'], 'hint':ieraksts['hints']})
#         print("Veicam ierakstu!")


DB.commit()
SQL.close()
DB.close()