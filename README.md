# Touchline Twenty

A browser-based JavaScript starter architecture for a football management simulation game.

## Systems Included

- 20-team Premier League seed for the 2025/26 club set.
- World league selector covering major leagues across Europe, the Americas, Asia, Africa, and Australia.
- Global Super League seed with real global clubs and recognizable real player-name squads.
- Remote real club crest display for real-seeded clubs, plus clearly labeled generated SVG crests for generated world-league clubs.
- Real player seed data with approximate contract years.
- Pre-game club selection screen before the management UI opens.
- Player database model with technical, mental and physical 1-20 attributes.
- Hidden attributes for Current Ability, Potential Ability and Injury Proneness.
- Rule-based probabilistic match engine that simulates 90 minutes.
- Full-pitch match area with player positions, ball marker, shot/goal highlights and timeline.
- Replay screen for latest-match key events.
- Player stat tracking for appearances, goals, assists, shots, and key passes.
- 38-match home-and-away league season, weekly finance updates, young-player transfers, contract negotiation and squad condition.
- Domestic cups for each league, including the FA Cup for English careers.
- UEFA Champions League and UEFA Europa League prototype competitions for eligible European clubs.
- Honors screen with champion banner, trophy cabinet, and roll of honor.
- Future-season rollover after matchweek 38, with player aging and prospect growth.
- Text command loop plus simple UI tabs for squad, tactics, league, transfers, engine notes and schema.

## Run

Open `index.html` in a browser.

Useful commands in the app:

- `squad`
- `match`
- `tactics`
- `league`
- `transfers`
- `sim`
- `rest`
- `scout`
- `buy ID`
- `contract ID`

## Architecture Notes

The prototype is intentionally kept in plain JavaScript so the game logic is easy to move into a larger stack later.

- `script.js`: domain data, player/team factories, match engine, league economy and UI command loop.
- `schema.sql`: relational database structure for a future server-backed version.
- `styles.css`: responsive management UI.

The match engine flow is:

1. Pick each team first XI.
2. Calculate attack, midfield, defense and physical phase ratings.
3. Run a 90-minute loop.
4. Roll possession from midfield strength, tempo, pressing and home advantage.
5. Roll events from attack versus defense, mentality, tempo, width and weather.
6. Resolve shots into xG, shots on target and goals.
7. Apply injuries, form, condition, morale, league table and finances after the match.
