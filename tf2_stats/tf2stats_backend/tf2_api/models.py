from django.db import models

# Create your models here.

class Player(models.Model):
    steam_id=models.CharField(max_length=17, unique=True)
    nickname=models.CharField(max_length=50)
    avatar_url=models.URLField(blank=True, null=True)
    profile_url=models.URLField(blank=True, null=True)
    last_updated=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nickname} ({self.steam_id})"
    
class PlayerStats(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='stats')
    playtime_total = models.IntegerField(default=0)  # in minutes
    kills = models.IntegerField(default=0)
    deaths = models.IntegerField(default=0)
    assists = models.IntegerField(default=0)
    points = models.IntegerField(default=0)
    
    # Class-specific playtime
    scout_time = models.IntegerField(default=0)
    soldier_time = models.IntegerField(default=0)
    pyro_time = models.IntegerField(default=0)
    demoman_time = models.IntegerField(default=0)
    heavy_time = models.IntegerField(default=0)
    engineer_time = models.IntegerField(default=0)
    medic_time = models.IntegerField(default=0)
    sniper_time = models.IntegerField(default=0)
    spy_time = models.IntegerField(default=0)
    
    date_recorded = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Stats for {self.player.nickname} at {self.date_recorded}"