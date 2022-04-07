from flask import Flask, render_template, jsonify, request
import json
import sqlite3

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


@app.route('/parbauditDB')
def parbauditDB():
    DB = sqlite3.connect("dati.db")
    SQL = DB.cursor()

    SQL.execute("SELECT * FROM vardi")
    rezultati = SQL.fetchall()
    print(rezultati)
    return "pagaidi"


# @app.route('/spele')
# def spele():
#   return render_template("spele.html")
# @app.route('/pspele')
# def pspele():
#   return render_template("pspele.html")
# @app.route('/top')
# def top():
#   return render_template("top.html")
# @app.route('/topData')
# def topData():
#   data = datubaze.top()
#   return jsonify(data)
# @app.route('/postTop', methods=['POST'])
# def postTop(dati):
#   datiJson = json.loads(dati)
#   datubaze.pievienot(datiJson)
#   return "OK"
# @app.route('/par')
# def par():
#   return render_template("par.html")
# @app.route('/demo')
# def demo():
#   return render_template("demo.html")
# @app.route('/demoPoga', methods=['POST', 'GET'])
# def demoPoga():
#   if request.method == "GET":
#     with open("dati.txt", "r", encoding="utf-8") as f:
#       dati = f.read()
#     return dati
#   elif request.method == "POST":
#     ievade = request.json
#     with open("dati.txt", "a", encoding="utf-8") as f:
#       f.write(f"{ievade['datiY']}\n")
#     return "OK"
#   else:
#     return "Kā tu te tiki?"
app.run(host='0.0.0.0', port=8080)
