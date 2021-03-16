from django.urls import path
from .views import RoomView, CreateRoomView, GetRoomView, JoinRoomView

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create', CreateRoomView.as_view()),
    path('get-room', GetRoomView.as_view()),
    path('join', JoinRoomView.as_view())
]
