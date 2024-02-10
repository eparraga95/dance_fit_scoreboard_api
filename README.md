
# Dance Fit Scoreboard API


### The Idea
---

As a Player of [Pump It Up](https://pt.wikipedia.org/wiki/Pump_It_Up) at the [Dance Fit Gaming House](https://www.instagram.com/dancefitgaming.house/) myself, and in the need to find some real life problem to get motivated to code, alongside with the DFH Staff we had the idea to come up with an app to replace the current and manual process of registering, mantaining and processing the data that is provided by the players to create their championships and ranking systems. What happens as of today, is that a Player takes a picture of
the PIU machine's scorescreen and a championship staff has to manually add it to a datasheet to be rendered on a front.

This project has the intention to be the API the will serve a new web application desingned to take this manual work from the hands of the championship staffs and put it in the hands of the players and give the staffs only the job to validate each score that was registered by their owners (players).

The idea is to make it possible so a player can send a picture of their scores as the real source of thruth via front end alongside with the other score details to make it so the staffs jobs are only to review and validate each score, update it or delete it as needed.


### Database 
---

![Entity Relationship Diagram](/assets/img/DER_100224_1423.png "Entity Relationship Diagram")

## Endpoints


### Players
---

| Method | Endpoint     | Name        | Auth                                   | Discription                                                                               |
|--------|--------------|-------------|----------------------------------------|-------------------------------------------------------------------------------------------|
| POST   | /players | Create Player | No Auth                                        | Creates a new Player instance and stores it in the DB, allowing said player future Login. |
| GET    | /players        | Find All      | Bearer Token, roles: 'admin', 'player'         | Query for all Players.                                                                    |
| GET    | /players/:id    | Find By Id    | Bearer Token, roles: 'admin', 'player' | Query for a Player by its player_id                                                       |
| PATCH  | /players/:id    | Update        | Bearer Token, roles: 'admin' | Updates the Player's updatable data                                                       |
| DELETE | /players/:id    | Delete        | Bearer Token, roles: 'admin'                   | Deletes a Player instance                                                                 |

### Auth
---

| Method | Endpoint    | Name       | Auth                                           | Discription                                                             |
|--------|-------------|------------|------------------------------------------------|-------------------------------------------------------------------------|
| POST   | /auth/login  | Login       | No Auth                                | Authenticates the Player into the system storing a Session Entity bound on a 1:1 relation |
| DELETE | /auth/logout | Logout      | Bearer Token, roles: 'admin', 'player' | Removes the Sesson entity bound to the Player identified by the Request    |
| GET    | /auth/admin  | Check Admin | Bearer Token, roles: 'admin'           | Returns true if the Player has Admin rights                                               |

### Scores
---

| Method | Endpoint    | Name       | Auth                                           | Discription                                                             |
|--------|-------------|------------|------------------------------------------------|-------------------------------------------------------------------------|
| POST   | /scores     | Create     | Bearer Token, roles: 'admin', 'player'         | Creates a new instance of Score and assigns it to the logged in Player. |
| GET    | /scores     | Find All   | No Auth                                        | Query for all Scores                                                    |
| GET    | /scores/:id     | Find By Id | No Auth                                        | Query for a Score by its score_id                                       |
| PATCH  | /scores/:id | Update     | Bearer Token, roles: 'admin' | Updates the Scores's updatable data                                     |
| DELETE | /scores/:id | Delete     | Bearer Token, roles: 'admin'                   | Deletes a Score instance                                                |

### Events
---

| Method | Endpoint    | Name       | Auth                                           | Discription                                                             |
|--------|-------------|------------|------------------------------------------------|-------------------------------------------------------------------------|
| POST   | /events     | Create     | Bearer Token, roles: 'admin'         | Creates a new instance of Score and assigns it to the logged in Player. |
| GET    | /events     | Find All   | no Auth                                        | Query for all Events                                                    |
| GET    | /events/:id | Find By Id | no Auth                                        | Query for a Event by its score_id                                       |
| PATCH  | /events/:id | Update     | Bearer Token, roles: 'admin' | Updates the Event's updatable data                                      |
| DELETE | /events/:id | Delete     | Bearer Token, roles: 'admin'                   | Deletes an Event instance                                               |
| POST   | /events/:id/join | Join Event | Bearer Token, roles: 'admin', 'player' | Enrolls a Player instance to an Event instance |