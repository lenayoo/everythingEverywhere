from db import db
from datetime import date


class TodoModel(db.Model):
    __tablename__ = "todolist"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=date.today)
    todo = db.Column(db.String(80), nullable=False)
    checked = db.Column(db.Boolean, nullable=False, default=False)
