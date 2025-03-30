from flask import Flask, request, abort
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt
from sqlalchemy.exc import SQLAlchemyError
from logger.logger import logger

from db import db

from models import BookModel
from schemas import BookSchema


blp = Blueprint("book", __name__, description="Operation on Books")
logger.info("🌸book module got loaded")
