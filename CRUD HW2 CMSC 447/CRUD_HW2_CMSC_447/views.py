"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from CRUD_HW2_CMSC_447 import app
from flask import g

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
    """renders the search page."""
    return render_template(
        'search.html',
        title='Search/Edit',
        year = datetime.now().year,
        message='Your test page.'
    )

