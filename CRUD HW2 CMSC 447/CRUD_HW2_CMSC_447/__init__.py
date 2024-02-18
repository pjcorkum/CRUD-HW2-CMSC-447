"""
The flask application package.
"""

from flask import Flask
app = Flask(__name__)

from . import databaseapi
from . import views
from . import buttons