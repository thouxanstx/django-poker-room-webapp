import random
import string

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


def get_table(players):
    table = {
        'table': zip([x.get_name() for x in players], [x.get_cards() for x in players])
    }
    return table


def generate_room_code():
    length = 6
    while True:
        room_code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(room_code=room_code).count() == 0:
            break
    return room_code


# def generate_default_user_name():
#     length = 8
#     while True:
#         user_name = 'user'.join(random.choices(string.ascii_lowercase, k=length))
#         if Room.objects.filter(host_name=user_name).count() == 0:
#             break
#     return user_name


class Room(models.Model):
    room_code = models.CharField(max_length=8, default=generate_room_code, unique=True)
    host_key = models.CharField(max_length=50, unique=True)
    host_name = models.CharField(null=False, max_length=20)
    guest_can_pause = models.BooleanField(null=False, default=False)
    # table_state = models.JSONField(default=get_table)
    created_at = models.DateTimeField(auto_now_add=True)
    votes_to_skip = models.IntegerField(
        null=False, default=2, validators=[MinValueValidator(1), MaxValueValidator(10)])
    start_balance = models.IntegerField(
        null=False, default=100, validators=[MinValueValidator(1), MaxValueValidator(10000)])
    min_bet = models.IntegerField(
        null=False, default=1, validators=[MinValueValidator(1), MaxValueValidator(1000)])
    players_number = models.IntegerField(
        null=False, default=2, validators=[MinValueValidator(2), MaxValueValidator(10)])
    # players_names = JSONField(null=True, default=list)

    def get_abs_url(self):
        pass
