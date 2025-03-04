from rest_framework import serializers
from .models import Player, PlayerStats

class PlayerStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerStats
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    stats = PlayerStatsSerializer(many=True, read_only=True)
    
    class Meta:
        model = Player
        fields = ['id', 'steam_id', 'nickname', 'avatar_url', 'profile_url', 'last_updated', 'stats']