from marshmallow import Schema, fields, EXCLUDE


class TodoSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.Date(required=True)
    todo = fields.Str(required=True)
    checked = fields.Bool(required=False)


class TodoUpdateSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    todo = fields.Str(required=True)
    checked = fields.Bool(required=True)


class BookSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=False)
    author = fields.Str(required=False)
    description = fields.Str(required=False)
