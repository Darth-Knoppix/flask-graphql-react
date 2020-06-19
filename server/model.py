from ariadne import QueryType, MutationType
from uuid import uuid4

query = QueryType()
mutation = MutationType()

orders = []

class Coffee:
   def __init__(self, size, name, coffee_type):
       self.size = size
       self.name = name
       self.type = coffee_type
       self.id = uuid4()

@query.field("orders")
def resolve_hello(_, info):
    return orders

@mutation.field("orderCoffee")
def resolve_hello(_, info, size, name, type):
    newOrder = Coffee(size, name, type)
    orders.append(newOrder)
    return newOrder