# Touchline Basics

A beginner-friendly offline 2D football management game made with Python 3 and Pygame.

This is a management game like Brasfoot or Elifoot. It is not an action football game.

## Files

- `core_demo.py`: smallest possible example of `Player`, `Team`, and match simulation.
- `main.py`: full Pygame menu game.
- `requirements.txt`: Python package list.

## Install

Open a terminal in this folder:

```bash
cd /Users/t74_/Documents/Codex/2026-05-21/can-you-create-game-relate-fifa/pygame_football_manager
python3 -m pip install -r requirements.txt
```

## Run The Tiny Demo

This does not need Pygame:

```bash
python3 core_demo.py
```

You should see a match result like:

```text
Blue Town 2 - 1 Red City
Blue Town: 3 points
Red City: 0 points
```

## Run The Pygame Game

```bash
python3 main.py
```

## What You Can Do

Phase 1:

- Main menu
- Create a team name
- Choose formation
- Set starting budget

Phase 2:

- View roster
- Buy transfer-market players
- Sell the lowest-skill reserve player
- Track budget and wages

Phase 3:

- Create a season
- Simulate matches one round at a time
- Computer teams play against your team

Phase 4:

- League table
- Wins, draws, losses, goal difference, points
- Top scorer statistics

## How To Modify It

Change player strength:

```python
make_random_team("North City", 64)
```

Higher number means a stronger team.

Change starting budget:

```python
self.start_budget = 2_000_000
```

Add more opponent teams:

```python
make_random_team("New Club", 61)
```

Add more transfer players:

```python
names = ["Alex Stone", "Bruno Lima", "New Player"]
positions = ["GK", "DF", "FW"]
```

## Next Feature Ideas

- Add injuries.
- Add player age and retirement.
- Add youth academy players.
- Add cup competitions.
- Add save/load with JSON.
- Add more tactical choices.
