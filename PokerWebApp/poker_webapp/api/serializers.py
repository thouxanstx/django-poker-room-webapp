from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'room_code', 'host_key', 'guest_can_pause', 'min_bet', 'host_name',
                  'votes_to_skip', 'start_balance', 'players_number', 'created_at')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'min_bet', 'votes_to_skip', 'start_balance', 'players_number', 'host_name')
