# Snake

A browser-based Snake game built with HTML5 canvas and vanilla JavaScript.

This project is a simple arcade-style Snake clone where the player controls a growing snake, collects fruits, and avoids walls and self-collisions.

## Features

- Arrow-key controls
- Space bar pause/resume
- Random fruit spawning
- Score tracking
- Snake growth and collision detection

## How to run

There are no packages to install or build step. Serve the repository directory with a local static web server, then open `index.html` in your browser. For example, in Visual Studio Code you can use the Live Server extension and select **Open with Live Server** on `index.html`.

> Serve the files over HTTP rather than opening `index.html` directly, since browsers may block JavaScript modules loaded from a `file://` URL.


## Controls

- Arrows (Up, Down, Left, Right) : move the head of the snake
- Space: pause or resume the game

## Game rules

- Collect fruit to increase your score.
- Each fruit makes the snake grow.
- The game ends if the snake hits a wall or its own body.
- After a crash, the game restarts automatically.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
