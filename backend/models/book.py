from db import db


class BookModel(db.Model):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=True)
    author = db.Column(db.String(80), nullable=True)
    description = db.Column(db.String(255), nullable=True)
