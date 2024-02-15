"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from CRUD_HW2_CMSC_447 import app
import sqlite3
from flask import g

DATABASE = 'prod.db'

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route('/display')
def display():
    """Renders the contact page."""
    
    return render_template(
        'display.html',
        title='Display',
        year=datetime.now().year,
        message='Your contact page.'
    )

@app.route('/create')
def create():
    """Renders the about page."""
    return render_template(
        'create.html',
        title='Create',
        year=datetime.now().year,
        message='Your application description page.'
    )

@app.route('/search')
def search():
    """renders the test page."""

    create_table()
    create_entry()
    return render_template(
        'search.html',
        title='Search/Edit',
        year = datetime.now().year,
        message='Your test page.'
    )

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def create_table():
    db = get_db()
    cursor = db.cursor()
    drop_sql = '''DROP TABLE IF EXISTS users'''
    cursor.execute(drop_sql)
    db.commit()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                          Id INTEGER PRIMARY KEY,
                          Name TEXT NOT NULL,
                          Points INTEGER NOT NULL)''')
    db.commit()
def create_entry():
    db = get_db()
    cursor = db.cursor()
    insert_sql = '''INSERT INTO users (Id, Name, Points) VALUES (?, ?, ?)'''
    cursor.execute(insert_sql, (1, 'Bob Dylan', 529))
    db.commit()

def get_entry():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users')
    results = cursor.fetchall()
    return results

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
