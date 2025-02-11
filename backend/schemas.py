from marshmallow import Schema, fields


class TodoSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.Date(required=True)
    todo = fields.Str(required=True)
    checked = fields.Bool(required=False)


class TodoUpdateSchema(Schema):
    todo = fields.Str(required=True)
    checked = fields.Bool(required=True)
