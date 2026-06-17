"""Touchline Basics - a beginner-friendly 2D football manager.

This is a small offline football management game made with Python and Pygame.

Install:
    python3 -m pip install -r requirements.txt

Run:
    python3 main.py

Controls:
    Mouse click buttons.
    Type your team name on the setup screen.
    Backspace deletes letters.

The code uses simple classes, lists, and dictionaries so beginners can change it.
"""

import random
import sys

import pygame


SCREEN_WIDTH = 1100
SCREEN_HEIGHT = 720
FPS = 60

WHITE = (245, 247, 250)
BLACK = (15, 18, 20)
GREEN = (40, 135, 80)
DARK_GREEN = (20, 70, 45)
BLUE = (55, 120, 220)
RED = (210, 70, 70)
YELLOW = (235, 190, 65)
GRAY = (130, 140, 150)
DARK = (28, 34, 40)
PANEL = (39, 47, 55)


class Player:
    """A football player.

    name: The player's name.
    position: GK, DF, MF, or FW.
    skill: A number from 1 to 100.
    value: Transfer value.
    wage: Weekly wage.
    goals: Goals scored this season.
    """

    def __init__(self, name, position, skill, value, wage):
        self.name = name
        self.position = position
        self.skill = skill
        self.value = value
        self.wage = wage
        self.goals = 0
        self.matches = 0


class Team:
    """A team with players, budget, formation, and league stats."""

    def __init__(self, name, players, formation="4-4-2", budget=2_000_000, is_user=False):
        self.name = name
        self.players = players
        self.formation = formation
        self.budget = budget
        self.is_user = is_user
        self.reset_stats()

    def reset_stats(self):
        """Reset league table stats for a new season."""

        self.played = 0
        self.wins = 0
        self.draws = 0
        self.losses = 0
        self.goals_for = 0
        self.goals_against = 0
        self.points = 0

    def average_skill(self):
        """Calculate the average skill of the squad."""

        if len(self.players) == 0:
            return 1

        total = 0
        for player in self.players:
            total += player.skill
        return total / len(self.players)

    def wage_total(self):
        """Calculate total weekly wages."""

        total = 0
        for player in self.players:
            total += player.wage
        return total


class Button:
    """A clickable rectangle with text."""

    def __init__(self, text, x, y, width, height, action):
        self.text = text
        self.rect = pygame.Rect(x, y, width, height)
        self.action = action

    def draw(self, screen, font):
        """Draw the button."""

        pygame.draw.rect(screen, BLUE, self.rect, border_radius=8)
        pygame.draw.rect(screen, WHITE, self.rect, 2, border_radius=8)
        label = font.render(self.text, True, WHITE)
        label_rect = label.get_rect(center=self.rect.center)
        screen.blit(label, label_rect)

    def handle_click(self, mouse_pos):
        """Run the action when clicked."""

        if self.rect.collidepoint(mouse_pos):
            self.action()


def make_player(name, position, base_skill):
    """Create one player with a little randomness."""

    skill = max(30, min(99, base_skill + random.randint(-8, 8)))
    value = skill * 15_000
    wage = skill * 250
    return Player(name, position, skill, value, wage)


def make_random_team(name, base_skill):
    """Create a computer team with 11 players."""

    positions = ["GK", "DF", "DF", "DF", "DF", "MF", "MF", "MF", "FW", "FW", "FW"]
    players = []

    for number, position in enumerate(positions, start=1):
        player_name = f"{name} {position}{number}"
        players.append(make_player(player_name, position, base_skill))

    return Team(name, players, budget=1_000_000)


def make_user_team(name, formation, budget):
    """Create the player's starting team."""

    positions = ["GK", "DF", "DF", "DF", "DF", "MF", "MF", "MF", "FW", "FW", "FW"]
    players = []

    for number, position in enumerate(positions, start=1):
        player_name = f"{name} Player {number}"
        players.append(make_player(player_name, position, 62))

    return Team(name, players, formation=formation, budget=budget, is_user=True)


def simulate_match(home_team, away_team):
    """Simulate one match.

    The home team gets a small home advantage.
    Team strength is based on average squad skill.
    Randomness keeps results interesting.
    """

    home_power = home_team.average_skill() + 5 + random.randint(-12, 12)
    away_power = away_team.average_skill() + random.randint(-12, 12)

    home_goals = max(0, round(home_power / 28 + random.random() * 2 - 1))
    away_goals = max(0, round(away_power / 28 + random.random() * 2 - 1))

    update_table(home_team, away_team, home_goals, away_goals)
    assign_goals(home_team, home_goals)
    assign_goals(away_team, away_goals)

    return {
        "home": home_team.name,
        "away": away_team.name,
        "home_goals": home_goals,
        "away_goals": away_goals,
        "text": f"{home_team.name} {home_goals} - {away_goals} {away_team.name}",
    }


def update_table(home_team, away_team, home_goals, away_goals):
    """Update standings after a match."""

    home_team.played += 1
    away_team.played += 1
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


def assign_goals(team, goals):
    """Give goals to random forwards or midfielders."""

    scorers = []
    for player in team.players:
        if player.position in ["FW", "MF"]:
            scorers.append(player)

    for _ in range(goals):
        if len(scorers) > 0:
            random.choice(scorers).goals += 1

    for player in team.players:
        player.matches += 1


class Game:
    """The main game object."""

    def __init__(self):
        pygame.init()
        pygame.display.set_caption("Touchline Basics")
        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        self.clock = pygame.time.Clock()
        self.font = pygame.font.SysFont("arial", 22)
        self.big_font = pygame.font.SysFont("arial", 42, bold=True)
        self.small_font = pygame.font.SysFont("arial", 17)

        self.screen_name = "menu"
        self.buttons = []
        self.team_name_text = "My FC"
        self.formation_index = 0
        self.formations = ["4-4-2", "4-3-3", "4-2-3-1"]
        self.start_budget = 2_000_000

        self.user_team = None
        self.teams = []
        self.transfer_market = []
        self.fixtures = []
        self.current_round = 0
        self.match_log = []

    def run(self):
        """Main game loop."""

        while True:
            self.handle_events()
            self.draw()
            pygame.display.flip()
            self.clock.tick(FPS)

    def handle_events(self):
        """Read keyboard and mouse input."""

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                for button in self.buttons:
                    button.handle_click(event.pos)

            if self.screen_name == "setup" and event.type == pygame.KEYDOWN:
                self.handle_setup_typing(event)

    def handle_setup_typing(self, event):
        """Let the player type a team name."""

        if event.key == pygame.K_BACKSPACE:
            self.team_name_text = self.team_name_text[:-1]
        elif event.key == pygame.K_RETURN:
            self.start_new_game()
        elif len(self.team_name_text) < 18 and event.unicode.isprintable():
            self.team_name_text += event.unicode

    def draw(self):
        """Draw the current screen."""

        self.screen.fill(DARK)
        self.buttons = []

        if self.screen_name == "menu":
            self.draw_menu()
        elif self.screen_name == "setup":
            self.draw_setup()
        elif self.screen_name == "hub":
            self.draw_hub()
        elif self.screen_name == "roster":
            self.draw_roster()
        elif self.screen_name == "transfers":
            self.draw_transfers()
        elif self.screen_name == "season":
            self.draw_season()
        elif self.screen_name == "standings":
            self.draw_standings()
        elif self.screen_name == "stats":
            self.draw_stats()

    def draw_text(self, text, x, y, font=None, color=WHITE):
        """Draw text at a position."""

        if font is None:
            font = self.font
        surface = font.render(text, True, color)
        self.screen.blit(surface, (x, y))

    def add_button(self, text, x, y, width, height, action):
        """Create and draw a button."""

        button = Button(text, x, y, width, height, action)
        button.draw(self.screen, self.font)
        self.buttons.append(button)

    def draw_panel(self, x, y, width, height):
        """Draw a dark panel."""

        pygame.draw.rect(self.screen, PANEL, (x, y, width, height), border_radius=10)
        pygame.draw.rect(self.screen, GRAY, (x, y, width, height), 1, border_radius=10)

    def draw_menu(self):
        """Main menu screen."""

        self.draw_text("Touchline Basics", 330, 140, self.big_font)
        self.draw_text("A simple offline football management game", 330, 195, self.font, YELLOW)
        self.add_button("Start New Career", 410, 280, 280, 55, self.open_setup)
        self.add_button("Quit", 410, 350, 280, 55, self.quit_game)

    def draw_setup(self):
        """Team creation screen."""

        formation = self.formations[self.formation_index]

        self.draw_text("Create Your Team", 380, 70, self.big_font)
        self.draw_panel(250, 150, 600, 360)
        self.draw_text("Team name:", 290, 190)
        self.draw_text(self.team_name_text + "_", 460, 190, self.font, YELLOW)
        self.draw_text("Formation:", 290, 250)
        self.draw_text(formation, 460, 250, self.font, YELLOW)
        self.draw_text("Budget:", 290, 310)
        self.draw_text(f"${self.start_budget:,}", 460, 310, self.font, YELLOW)

        self.add_button("Change Formation", 290, 370, 220, 45, self.change_formation)
        self.add_button("More Budget", 530, 370, 150, 45, self.increase_budget)
        self.add_button("Create Team", 430, 535, 240, 55, self.start_new_game)
        self.add_button("Back", 30, 640, 120, 45, self.open_menu)

        self.draw_text("Tip: type to edit your team name. Press Enter to start.", 300, 470, self.small_font, GRAY)

    def draw_hub(self):
        """Main manager hub."""

        self.draw_header()
        self.draw_panel(60, 130, 980, 420)
        self.draw_text("Manager Office", 90, 160, self.big_font)
        self.draw_text(f"Club: {self.user_team.name}", 90, 230)
        self.draw_text(f"Formation: {self.user_team.formation}", 90, 270)
        self.draw_text(f"Budget: ${self.user_team.budget:,}", 90, 310)
        self.draw_text(f"Weekly wages: ${self.user_team.wage_total():,}", 90, 350)

        self.add_button("Roster", 650, 180, 240, 45, lambda: self.change_screen("roster"))
        self.add_button("Transfers", 650, 235, 240, 45, lambda: self.change_screen("transfers"))
        self.add_button("Season", 650, 290, 240, 45, lambda: self.change_screen("season"))
        self.add_button("Standings", 650, 345, 240, 45, lambda: self.change_screen("standings"))
        self.add_button("Player Stats", 650, 400, 240, 45, lambda: self.change_screen("stats"))

    def draw_header(self):
        """Draw common top information."""

        self.draw_text("Touchline Basics", 35, 25, self.big_font)
        if self.user_team is not None:
            self.draw_text(f"{self.user_team.name} | Round {self.current_round + 1}/{len(self.fixtures)}", 35, 80, self.font, YELLOW)

    def draw_roster(self):
        """Roster screen."""

        self.draw_header()
        self.draw_text("Roster", 55, 130, self.big_font)
        self.draw_table_headers(["Name", "Pos", "Skill", "Value", "Wage"], 70, 190)

        y = 230
        for player in self.user_team.players:
            self.draw_text(player.name, 70, y, self.small_font)
            self.draw_text(player.position, 330, y, self.small_font)
            self.draw_text(str(player.skill), 430, y, self.small_font)
            self.draw_text(f"${player.value:,}", 520, y, self.small_font)
            self.draw_text(f"${player.wage:,}", 680, y, self.small_font)
            y += 28

        self.add_button("Back", 30, 640, 120, 45, lambda: self.change_screen("hub"))

    def draw_transfers(self):
        """Transfer screen."""

        self.draw_header()
        self.draw_text("Transfer Market", 55, 130, self.big_font)
        self.draw_text(f"Budget: ${self.user_team.budget:,}", 55, 180, self.font, YELLOW)
        self.draw_table_headers(["Name", "Pos", "Skill", "Price", "Action"], 70, 230)

        y = 270
        for index, player in enumerate(self.transfer_market):
            self.draw_text(player.name, 70, y, self.small_font)
            self.draw_text(player.position, 320, y, self.small_font)
            self.draw_text(str(player.skill), 420, y, self.small_font)
            self.draw_text(f"${player.value:,}", 520, y, self.small_font)
            self.add_button("Buy", 700, y - 6, 80, 28, lambda i=index: self.buy_player(i))
            y += 42

        self.add_button("Sell Worst Player", 820, 590, 210, 45, self.sell_worst_player)
        self.add_button("Back", 30, 640, 120, 45, lambda: self.change_screen("hub"))

    def draw_season(self):
        """Season screen."""

        self.draw_header()
        self.draw_text("Season", 55, 130, self.big_font)

        if self.current_round >= len(self.fixtures):
            self.draw_text("Season finished!", 70, 210, self.font, YELLOW)
            self.add_button("New Season", 70, 260, 200, 45, self.create_season)
        else:
            self.draw_text(f"Next round: {self.current_round + 1}", 70, 210)
            self.add_button("Simulate Next Round", 70, 260, 260, 55, self.simulate_next_round)

        self.draw_text("Latest results:", 70, 350)
        y = 390
        for result in self.match_log[-8:]:
            self.draw_text(result, 70, y, self.small_font)
            y += 28

        self.add_button("Back", 30, 640, 120, 45, lambda: self.change_screen("hub"))

    def draw_standings(self):
        """League table screen."""

        self.draw_header()
        self.draw_text("Standings", 55, 130, self.big_font)
        self.draw_table_headers(["Team", "P", "W", "D", "L", "GD", "Pts"], 70, 190)

        teams = sorted(self.teams, key=lambda team: (team.points, team.goals_for - team.goals_against, team.goals_for), reverse=True)

        y = 230
        for position, team in enumerate(teams, start=1):
            goal_difference = team.goals_for - team.goals_against
            color = YELLOW if team.is_user else WHITE
            self.draw_text(f"{position}. {team.name}", 70, y, self.small_font, color)
            self.draw_text(str(team.played), 360, y, self.small_font, color)
            self.draw_text(str(team.wins), 430, y, self.small_font, color)
            self.draw_text(str(team.draws), 500, y, self.small_font, color)
            self.draw_text(str(team.losses), 570, y, self.small_font, color)
            self.draw_text(str(goal_difference), 650, y, self.small_font, color)
            self.draw_text(str(team.points), 730, y, self.small_font, color)
            y += 30

        self.add_button("Back", 30, 640, 120, 45, lambda: self.change_screen("hub"))

    def draw_stats(self):
        """Player statistics screen."""

        self.draw_header()
        self.draw_text("Top Scorers", 55, 130, self.big_font)

        all_players = []
        for team in self.teams:
            for player in team.players:
                all_players.append((player, team))

        all_players.sort(key=lambda item: item[0].goals, reverse=True)

        y = 200
        for player, team in all_players[:15]:
            self.draw_text(f"{player.name} ({team.name})", 70, y, self.small_font)
            self.draw_text(f"{player.goals} goals", 520, y, self.small_font, YELLOW)
            y += 30

        self.add_button("Back", 30, 640, 120, 45, lambda: self.change_screen("hub"))

    def draw_table_headers(self, headers, x, y):
        """Draw table column headers."""

        spacing = [0, 260, 360, 450, 610, 700, 780]
        for index, header in enumerate(headers):
            self.draw_text(header, x + spacing[index], y, self.small_font, YELLOW)

    def open_menu(self):
        self.screen_name = "menu"

    def open_setup(self):
        self.screen_name = "setup"

    def change_screen(self, name):
        self.screen_name = name

    def change_formation(self):
        self.formation_index += 1
        if self.formation_index >= len(self.formations):
            self.formation_index = 0

    def increase_budget(self):
        self.start_budget += 500_000
        if self.start_budget > 5_000_000:
            self.start_budget = 1_000_000

    def start_new_game(self):
        """Create the team, opponents, market, and fixtures."""

        formation = self.formations[self.formation_index]
        self.user_team = make_user_team(self.team_name_text, formation, self.start_budget)

        self.teams = [
            self.user_team,
            make_random_team("North City", 64),
            make_random_team("South United", 60),
            make_random_team("River Town", 58),
            make_random_team("Mountain FC", 62),
            make_random_team("Harbour Athletic", 59),
        ]

        self.create_market()
        self.create_season()
        self.screen_name = "hub"

    def create_market(self):
        """Create players the user can buy."""

        names = ["Alex Stone", "Bruno Lima", "Carlos Vega", "Dylan Ford", "Evan King", "Felix Costa"]
        positions = ["GK", "DF", "MF", "FW", "MF", "FW"]
        self.transfer_market = []

        for name, position in zip(names, positions):
            self.transfer_market.append(make_player(name, position, 70))

    def create_season(self):
        """Create a simple round-robin season."""

        for team in self.teams:
            team.reset_stats()
            for player in team.players:
                player.goals = 0
                player.matches = 0

        self.fixtures = []
        self.match_log = []
        self.current_round = 0

        for home_index in range(len(self.teams)):
            for away_index in range(home_index + 1, len(self.teams)):
                self.fixtures.append((self.teams[home_index], self.teams[away_index]))

        random.shuffle(self.fixtures)

    def simulate_next_round(self):
        """Simulate one fixture for every click."""

        if self.current_round >= len(self.fixtures):
            return

        home_team, away_team = self.fixtures[self.current_round]
        result = simulate_match(home_team, away_team)
        self.match_log.append(result["text"])
        self.current_round += 1

        for team in self.teams:
            team.budget -= team.wage_total()
            team.budget += 100_000

    def buy_player(self, market_index):
        """Buy a player from the transfer market."""

        if market_index >= len(self.transfer_market):
            return

        player = self.transfer_market[market_index]

        if self.user_team.budget >= player.value:
            self.user_team.budget -= player.value
            self.user_team.players.append(player)
            self.transfer_market.pop(market_index)

    def sell_worst_player(self):
        """Sell the lowest-skill player on the user team."""

        if len(self.user_team.players) <= 11:
            return

        worst_player = min(self.user_team.players, key=lambda player: player.skill)
        self.user_team.players.remove(worst_player)
        self.user_team.budget += worst_player.value // 2

    def quit_game(self):
        pygame.quit()
        sys.exit()


if __name__ == "__main__":
    Game().run()
