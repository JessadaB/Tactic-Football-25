"""Tiny football manager core demo.

Run this file before the Pygame version if you want to understand the basic
logic first:

    python3 core_demo.py

This file has no graphics. It only shows:
1. A Player class.
2. A Team class.
3. A match simulation function.
"""

import random


class Player:
    """A simple player with a name, position, and skill level."""

    def __init__(self, name, position, skill):
        self.name = name
        self.position = position
        self.skill = skill
        self.goals = 0


class Team:
    """A football team that owns a list of Player objects."""

    def __init__(self, name, players):
        self.name = name
        self.players = players
        self.wins = 0
        self.draws = 0
        self.losses = 0
        self.goals_for = 0
        self.goals_against = 0
        self.points = 0

    def average_skill(self):
        """Return the average skill of all players on the team."""
        total_skill = 0
        for player in self.players:
            total_skill += player.skill
        return total_skill / len(self.players)


def simulate_match(home_team, away_team):
    """Simulate one match and return the score.

    Stronger teams get more chances, but randomness means upsets can happen.
    """

    home_power = home_team.average_skill() + random.randint(-10, 10) + 5
    away_power = away_team.average_skill() + random.randint(-10, 10)

    home_goals = max(0, round(home_power / 25 + random.random() * 2 - 1))
    away_goals = max(0, round(away_power / 25 + random.random() * 2 - 1))

    home_team.goals_for += home_goals
    home_team.goals_against += away_goals
    away_team.goals_for += away_goals
    away_team.goals_against += home_goals

    if home_goals > away_goals:
        home_team.wins += 1
        away_team.losses += 1
        home_team.points += 3
    elif away_goals > home_goals:
        away_team.wins += 1
        home_team.losses += 1
        away_team.points += 3
    else:
        home_team.draws += 1
        away_team.draws += 1
        home_team.points += 1
        away_team.points += 1

    return home_goals, away_goals


def make_sample_team(name, base_skill):
    """Create a simple team with 11 players."""

    positions = ["GK", "DF", "DF", "DF", "DF", "MF", "MF", "MF", "FW", "FW", "FW"]
    players = []

    for number, position in enumerate(positions, start=1):
        skill = base_skill + random.randint(-8, 8)
        players.append(Player(f"{name} Player {number}", position, skill))

    return Team(name, players)


if __name__ == "__main__":
    team_a = make_sample_team("Blue Town", 70)
    team_b = make_sample_team("Red City", 65)

    score_a, score_b = simulate_match(team_a, team_b)

    print(f"{team_a.name} {score_a} - {score_b} {team_b.name}")
    print(f"{team_a.name}: {team_a.points} points")
    print(f"{team_b.name}: {team_b.points} points")
