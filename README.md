### Endpoints

### Players

| Method | Endpoint        | Name          | Auth                                           | Discription                                                                               |
|--------|-----------------|---------------|------------------------------------------------|-------------------------------------------------------------------------------------------|
| POST   | /players | Create Player | no Auth                                        | Creates a new Player instance and stores it in the DB, allowing said player future Login. |
| GET    | /players        | Find All      | Bearer Token, roles: 'admin', 'player'         | Query for all Players.                                                                    |
| GET    | /players/:id    | Find By Id    | Bearer Token, roles: 'admin', 'player' (owner) | Query for a Player by its player_id                                                       |
| PATCH  | /players/:id    | Update        | Bearer Token, roles: 'admin', 'player' (owner) | Updates the Player's updatable data                                                       |
| DELETE | /players/:id    | Delete        | Bearer Token, roles: 'admin'                   | Deletes a Player instance                                                                 |

### Scores

| Method | Endpoint    | Name       | Auth                                           | Discription                                                             |
|--------|-------------|------------|------------------------------------------------|-------------------------------------------------------------------------|
| POST   | /scores     | Create     | Bearer Token, roles: 'admin', 'player'         | Creates a new instance of Score and assigns it to the logged in Player. |
| GET    | /scores     | Find All   | no Auth                                        | Query for all Scores                                                    |
| GET    | /scores     | Find By Id | no Auth                                        | Query for a Score by its score_id                                       |
| PATCH  | /scores/:id | Update     | Bearer Token, roles: 'admin', 'player' (owner) | Updates the Scores's updatable data                                     |
| DELETE | /scores/:id | Delete     | Bearer Token, roles: 'admin'                   | Deletes a Score instance                                                |

### Events

| Method | Endpoint    | Name       | Auth                                           | Discription                                                             |
|--------|-------------|------------|------------------------------------------------|-------------------------------------------------------------------------|
| POST   | /events     | Create     | Bearer Token, roles: 'admin', 'player'         | Creates a new instance of Score and assigns it to the logged in Player. |
| GET    | /events     | Find All   | no Auth                                        | Query for all Events                                                    |
| GET    | /events/:id | Find By Id | no Auth                                        | Query for a Event by its score_id                                       |
| PATCH  | /events/:id | Update     | Bearer Token, roles: 'admin', 'player' (owner) | Updates the Event's updatable data                                      |
| DELETE | /events/:id | Delete     | Bearer Token, roles: 'admin'                   | Deletes an Event instance                                               |
| POST   | /events/:id/join | Join Event | Bearer Token, roles: 'admin', 'player' | Enrolls a Player instance to an Event instance |