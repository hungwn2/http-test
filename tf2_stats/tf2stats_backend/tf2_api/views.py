import requests
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Player, PlayerStats
from .serializers import PlayerSerializer, PlayerStatsSerializer

# Set your Steam API key in settings.py or as an environment variable
# STEAM_API_KEY = 'YOUR_STEAM_API_KEY'

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    lookup_field = 'steam_id'

class PlayerStatsViewSet(viewsets.ModelViewSet):
    queryset = PlayerStats.objects.all()
    serializer_class = PlayerStatsSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def fetch_player_stats(request, steam_id):
    # Example function to fetch stats from Steam API
    try:
        # Check if player exists in database
        try:
            player = Player.objects.get(steam_id=steam_id)
        except Player.DoesNotExist:
            # Fetch player info from Steam API
            steam_api_url = f"https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key={settings.STEAM_API_KEY}&steamids={steam_id}"
            response = requests.get(steam_api_url)
            if response.status_code != 200:
                return Response({"error": "Could not fetch player data from Steam"}, status=status.HTTP_400_BAD_REQUEST)
            
            player_data = response.json()['response']['players'][0]
            player = Player.objects.create(
                steam_id=steam_id,
                nickname=player_data.get('personaname', 'Unknown'),
                avatar_url=player_data.get('avatarfull', ''),
                profile_url=player_data.get('profileurl', '')
            )
        
        # Fetch TF2 stats from Steam API
        stats_api_url = f"https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key={settings.STEAM_API_KEY}&steamid={steam_id}&appid=440"  # 440 is TF2's app ID
        response = requests.get(stats_api_url)
        
        if response.status_code != 200:
            return Response({"error": "Could not fetch TF2 stats from Steam"}, status=status.HTTP_400_BAD_REQUEST)
        
        stats_data = response.json()['playerstats']['stats']
        
        # Process and map the stats data
        # This will depend on the exact structure returned by the Steam API
        # Below is a simplified example
        stats_mapping = {
            'playtime_total': 0,
            'kills': 0,
            'deaths': 0,
            'assists': 0,
            'points': 0,
            'scout_time': 0,
            'soldier_time': 0,
            'pyro_time': 0,
            'demoman_time': 0,
            'heavy_time': 0,
            'engineer_time': 0,
            'medic_time': 0,
            'sniper_time': 0,
            'spy_time': 0,
        }
        
        for stat in stats_data:
            name = stat.get('name', '')
            value = stat.get('value', 0)
            
            # Map Steam API stat names to our model fields
            # This is simplified and would need to be adjusted based on actual API response
            if 'playtime' in name.lower():
                stats_mapping['playtime_total'] = value
            elif 'kill' in name.lower():
                stats_mapping['kills'] = value
            elif 'death' in name.lower():
                stats_mapping['deaths'] = value
            # ... map other stats similarly
        
        # Create a new stats record
        player_stats = PlayerStats.objects.create(
            player=player,
            **stats_mapping
        )
        
        # Return the serialized player with stats
        serializer = PlayerSerializer(player)
        return Response(serializer.data)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)