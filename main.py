from flask import Flask, render_template, jsonify, request
import json
import sqlite3
import random

app = Flask('app')

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/noteikumi')
def noteikumi():
    return render_template("noteikumi.html")

@app.route('/saktspeli')
def saktspeli():
    return render_template("saktspeli.html")

@app.route('/rekordisti')
def rekordisti():
    return render_template("rekordisti.html")

@app.route('/parstartit')
def parstartit():
    return render_template("parstartit.html")

@app.route('/kontakti')
def kontakti():
    return render_template("kontakti.html")

@app.route('/spele')
def spele():
    return render_template("spele.html")

@app.route('/generet/<niks>/<skaits>')
def generet(niks, skaits):
    DB = sqlite3.connect("dati.db")
    SQL = DB.cursor()

    SQL.execute(f"SELECT * FROM vardi WHERE length(vards) = {skaits}")
    vardi = SQL.fetchall()

    randomSkaitlis = random.randint(0, len(vardi) - 1)
    minejums = vardi[randomSkaitlis][1]
    hints =  vardi[randomSkaitlis][2]

    niks = niks.capitalize()

    SQL.execute(f"SELECT * FROM speletaji WHERE vards = '{niks}'")
    speletajs = SQL.fetchall()

    if len(speletajs) != 0:
        print("Mēģinat updeitot!")
        SQL.execute(f"UPDATE speletaji SET minejums = '{minejums}' WHERE vards = '{niks}' ")
    else:
        print("Mēģinat ievietot!")
        SQL.execute("INSERT INTO speletaji (vards, minejums, rezultats) VALUES (:vards, :minejums, :rezultats)",
        {'vards':niks, 'minejums':minejums, 'rezultats':0})

    DB.commit()

    minejums = list(minejums)
    random.shuffle(minejums)
    minejums = "".join(minejums)

    return {"vards":minejums, "hints":hints}

@app.route('/parbaudit/<niks>/<vards>')
def parbaudit(niks, vards):
    DB = sqlite3.connect("dati.db")
    SQL = DB.cursor()

    niks = niks.capitalize()
    vards = vards.lower()

    SQL.execute(f"SELECT * FROM speletaji WHERE vards = '{niks}' LIMIT 1")
    speletajs = SQL.fetchall()

    if speletajs[0][2] == vards:
        rezultats = speletajs[0][3] + 1
        SQL.execute(f"UPDATE speletaji SET rezultats = '{rezultats}', minejums = NULL WHERE vards = '{niks}' ")
        DB.commit()
        atbilde = "Super apsveicam!"
        return {"rezultats":atbilde, "status":1}
    else:
        atbilde = "Mēģini vēlreiz!"
        return {"rezultats":atbilde, "status":0}

    




# Sis netiek lietots
@app.route('/vardi/<skaits>')
def vardi(skaits):
    DB = sqlite3.connect("dati.db")
    SQL = DB.cursor()

    SQL.execute(f"SELECT * FROM vardi WHERE length(vards) = {skaits}")
    rezultati = SQL.fetchall()

    dati = []

    for ieraksts in rezultati:
        dati.append({"vards": ieraksts[1], "hints": ieraksts[2]})

    datiJson = jsonify(dati)
    return datiJson

# Sis netiek lietots
@app.route('/parbauditDB')
def parbauditDB():
    DB = sqlite3.connect("dati.db")
    SQL = DB.cursor()

    SQL.execute("SELECT * FROM vardi")
    rezultati = SQL.fetchall()
    print(rezultati)
    return "pagaidi"

app.run(host='0.0.0.0', port=8080, debug=True)
