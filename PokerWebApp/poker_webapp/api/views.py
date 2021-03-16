from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class GetRoomView(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'room_code'

    def get(self, request, format=None):
        room_code = request.GET.get(self.lookup_url_kwarg)

        if room_code is not None:
            room = Room.objects.filter(room_code=room_code)

            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host_key
                return Response(data, status=status.HTTP_200_OK)

            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid Parameter'}, status=status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        # Check for users active session
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            start_balance = serializer.data.get('start_balance')
            players_number = serializer.data.get('players_number')
            host_name = serializer.data.get('host_name')
            min_bet = serializer.data.get('min_bet')
            host_key = self.request.session.session_key
            queryset = Room.objects.filter(host_key=host_key)

            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.min_bet = min_bet
                room.save(update_fields=[
                    'min_bet',
                    'guest_can_pause',
                    'votes_to_skip'])
                self.request.session['room_code'] = room.room_code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

            else:
                room = Room(
                    host_key=host_key,
                    host_name=host_name,
                    min_bet=min_bet,
                    guest_can_pause=guest_can_pause,
                    votes_to_skip=votes_to_skip,
                    start_balance=start_balance,
                    players_number=players_number)
                room.save()
                self.request.session['room_code'] = room.room_code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


class JoinRoomView(APIView):
    lookup_param_kwarg = 'room_code'

    def post(self, request, format=None):
        # Check for users active session
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        room_code = request.data.get(self.lookup_param_kwarg)

        if room_code is not None:
            result = Room.objects.filter(room_code=room_code)

            if len(result):
                room = result[0]
                self.request.session['room_code'] = room_code
                return Response({'message': 'Successfully Joined the Room'}, status=status.HTTP_200_OK)

            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Invalid Parameter'}, status=status.HTTP_400_BAD_REQUEST)