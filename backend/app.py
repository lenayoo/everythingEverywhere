import os
from flask import Flask
from flask_smorest import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS

from db import db
import models
from dotenv import load_dotenv

from resources.todo import blp as TodoBlueprint


def create_app(db_url=None):
    app = Flask(__name__)
    CORS(app)

    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "todolist"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = (
        "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    )

    # DB 설정
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or os.getenv(
        "DATABASE-URL", "sqlite:///data.db"
    )
    app.config["SQLALCHEMY_TRACK_NOTIFICATIONS"] = False
    db.init_app(app)
    migrate = Migrate(app, db)

    # JWT 설정
    # app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRETE_KEY")
    # jwt = JWTManager(app)

    api = Api(app)

    with app.app_context():
        db.create_all()

    api.register_blueprint(TodoBlueprint)

    if __name__ == "__main__":
        app.run(debug=True)

    return app
