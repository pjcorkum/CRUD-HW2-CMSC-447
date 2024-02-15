"""
The flask application package.
"""

from flask import Flask
app = Flask(__name__)

import CRUD_HW2_CMSC_447.views
