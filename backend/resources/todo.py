from flask import Flask, request, abort
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt
from sqlalchemy.exc import SQLAlchemyError
from logger.logger import logger

from db import db

from models import TodoModel
from schemas import TodoSchema, TodoUpdateSchema

blp = Blueprint("todo", __name__, description="Operation on Todos")
logger.info("🌸todomodule got loaded")


@blp.route("/todo/<int:todo_id>")
class Todo(MethodView):
    @blp.response(200, TodoSchema)
    def get(self, todo_id):
        logger.info(f"🍋 GET request:{todo_id}")
        todo = TodoModel.query.get_or_404(todo_id)
        return todo

    def delete(self, todo_id):
        # logger.info(f"{todo_id}는 삭제 됩니다.")
        todo = TodoModel.query.get_or_404(todo_id)
        db.session.delete(todo)
        db.session.commit()
        return {"message": "todo deleted"}

    @blp.arguments(TodoUpdateSchema)
    @blp.response(200, TodoSchema)
    def put(self, todo_data, todo_id):
        logger.debug(f"🍋 PUT 요청 받음: todo_id={todo_id}, todo_data={todo_data}")

        logger.info(f"🍋 [put] request:{todo_data} {todo_id}")
        todo = TodoModel.query.get(todo_id)
        if todo:
            todo.todo = todo_data["todo"]
            todo.checked = todo_data["checked"]
        else:
            return {"message": "todo not found"}, 404

        db.session.add(todo)
        db.session.commit()

        return todo


@blp.route("/todo")
class TodoList(MethodView):
    @blp.response(200, TodoSchema(many=True))
    def get(self):
        # TODO: 날짜별로 볼러오는 모델을 추가할 것
        return TodoModel.query.all()

    @blp.arguments(TodoSchema)
    @blp.response(201, TodoSchema)
    def post(self, todo_data):
        todo = TodoModel(**todo_data)
        logger.info(f"🍋 [post] request:{todo_data}")
        try:
            db.session.add(todo)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while adding new to do")
        return todo, 201
