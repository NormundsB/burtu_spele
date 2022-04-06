from flask import Flask, render_template, jsonify, request
import json

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