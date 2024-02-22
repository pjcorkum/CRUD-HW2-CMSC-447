import sqlite3
from sre_constants import SUCCESS
from flask import g, jsonify
from CRUD_HW2_CMSC_447 import app
from flask import request

DATABASE = 'prod.db'
BASEURL = '/database'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.route(BASEURL + '/createdb', methods=['POST'])
def create_table():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                          Id INTEGER PRIMARY KEY,
                          Name TEXT NOT NULL,
                          Points INTEGER NOT NULL)''')
    db.commit()
    return {}, 200

@app.route(BASEURL + '/createuser', methods=['POST'])
def create_entry():
    db = get_db()
    cursor = db.cursor()
    data = request.get_json()
    ID = data['id']
    name = data['name']
    points = data['pts']
    print(ID)
    try:
        insert_sql = '''INSERT INTO users (Id, Name, Points) VALUES (?, ?, ?)'''
        cursor.execute(insert_sql, (ID, name, points))
        db.commit()
    except sqlite3.IntegrityError:
        db.rollback()
        return "Error ID already exists or invalid input", 422
    return "Succesfully added user", 200
    
@app.route(BASEURL + '/gettable')
def get_table():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''SELECT * FROM users''')
    results = cursor.fetchall()
    if (results):
        return results, 200
    else:
        return "Error Table Empty", 404

@app.route(BASEURL + '/droptable', methods=['POST'])
def drop_table():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''DROP TABLE IF EXISTS users''')
    db.commit()
    create_table()
    return "Table Succesfully Dropped", 200

@app.route(BASEURL + '/getuserid/<userid>')
def get_user_id(userid):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''SELECT * FROM users WHERE id = ?''', (userid,))
    results = cursor.fetchall()
    if(results):
        return results, 200
    else:
        return "Error no user found", 404

@app.route(BASEURL + '/deleteuserid/<userid>', methods=['POST'])
def delete_user_id(userid):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''DELETE FROM users WHERE id = ?''', (userid,))
    db.commit()
    cursor.execute('''SELECT * FROM users WHERE id = ?''', (userid,))
    results = cursor.fetchall()
    if(results):
        return "Failed to delete user", 500
    else:
        return results, 200

@app.route(BASEURL + '/edituser/', methods=['POST'])
def edit_user():
    db = get_db()
    cursor = db.cursor()
    data = request.get_json()
    originalID = data['originalID']
    ID = data['id']
    name = data['name']
    points = data['pts']
    cursor.execute('''DELETE FROM users WHERE id = ?''', (originalID,))
    db.commit()
    cursor.execute('''INSERT INTO users (Id, Name, Points) VALUES (?, ?, ?)''', (ID, name, points))
    db.commit()
    return "Succesfully added user", 200


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
