from flask import Flask, render_template, request, json

app = Flask(__name__)

@app.route("/terreno")
def terreno():
    return render_template('terreno.html')

@app.route("/luna")
def luna():
    return render_template('luna.html')

@app.route("/montana")
def montana():
    return render_template('montana.html')

if __name__ == "__main__":
    app.run()