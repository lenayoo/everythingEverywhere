from flask import Flask, request, abort
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt
from sqlalchemy.exc import SQLAlchemyError

from db import db

from models import TodoModel
from schemas import TodoSchema, TodoUpdateSchema

blp = Blueprint("todo", __name__, description="Operation on Todos")


@blp.route("/todo/<int:todo_id>")
class Todo(MethodView):
    @blp.response(200, TodoSchema)
    def get(self, todo_id):
        todo = TodoModel.query.get_or_404(todo_id)
        return todo

    def delete(self, todo_id):
        todo = TodoModel.query.get_or_404(todo_id)
        db.session.delete(todo)
        db.session.commit()
        return {"message": "todo deleted"}

    @blp.arguments(TodoUpdateSchema)
    @blp.response(200, TodoSchema)
    def put(self, todo_id, todo_data):
        todo = TodoModel.query.get(todo_id)
        print("🍋", todo_data)
        if todo:
            todo.todo = todo_data["todo"]
            todo.date = todo_data["date"]
            todo.checked = todo_data["checked"]
        else:
            todo = TodoModel(id=todo_id, **todo_data)

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

        try:
            db.session.add(todo)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while adding new to do")
        return todo, 201
