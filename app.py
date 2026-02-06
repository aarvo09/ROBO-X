from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/activities')
def activities():
    return render_template('index.html') # Placeholder for now

@app.route('/team')
def team():
    return render_template('index.html') # Placeholder for now

@app.route('/join')
def join():
    return render_template('join.html')

@app.route('/workshop')
def workshop():
    return render_template('workshop.html')

if __name__ == '__main__':
    app.run(debug=True)
