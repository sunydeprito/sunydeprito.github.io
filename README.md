# Submission 3: Creating PWA with Workbox
This is the last submission for PWA course by dicoding.com. This project must use workbox feature for service worker. Data is taken from the API [Footbal org](https://www.football-data.org/).

## Screenshot
![football](https://user-images.githubusercontent.com/26306746/51833752-e9d28f80-232a-11e9-856f-f18d61163ccf.gif)

## Requirements or features in application
1. Displays at least 3 pages that consume data from the football-data.org website.
2. Can still be accessed even though in offline mode (applying cache).
3. Has a data storage feature with indexed db (can add, display, and delete favorite teams, watch schedules, etc.) with a single page to display stored data.
4. Can display push messages from the server
5. Can be added to the homescreen.
6. Have a Splash screen.
7. The code in Service Worker must be Workbox based
8. Uploaded to Firebase Hosting or Github Pages

## API
[Footbal org](https://www.football-data.org/) - The dev-friendly football API

1. League Standings: https://api.football-data.org/v2/competitions/{id_liga}/standings
2. Team Information: https://api.football-data.org/v2/teams/{id_tim}
3. Team Match Schedule: https://api.football-data.org/v2/teams/{id_tim}/matches?status=SCHEDULED
4. Another endpoint: https://www.football-data.org/documentation/quickstart
5. League codes:  https://www.football-data.org/docs/v2/index.html#league_codes

# Please be Noted
For those who still do the project in PWA course please use this as reference only. Hope this will help you to develop more project.
