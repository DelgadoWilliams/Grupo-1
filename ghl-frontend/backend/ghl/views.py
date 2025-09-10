from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import ghl_request

@api_view(["GET"])
def list_calendars(request):
    data, status = ghl_request("/calendars/", method="GET")
    return Response(data, status=status)

@api_view(["POST"])
def create_appointment(request):
    payload = request.data
    data, status = ghl_request("/appointments/", method="POST", data=payload)
    return Response(data, status=status)
