// time-twister-backend/src/main/java/com/timetwister/service/GameService.java
package com.timetwister.service;

import com.timetwister.model.GameState;
import com.timetwister.model.Position;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GameService {

    private static final int GRID_WIDTH = 5;
    private static final int GRID_HEIGHT = 5;

    private GameState gameState = new GameState();

    // Maze walls
    private static final Set<Position> WALLS = Set.of(
        new Position(1, 1),
        new Position(2, 2),
        new Position(3, 1)
    );

    public GameState getState() {
        return gameState;
    }

    public GameState move(String direction) {
        Position current = gameState.getPosition();
        int x = current.getX();
        int y = current.getY();

        int newX = x, newY = y;
        switch (direction.toUpperCase()) {
            case "UP":    newY--; break;
            case "DOWN":  newY++; break;
            case "LEFT":  newX--; break;
            case "RIGHT": newX++; break;
        }

        Position newPos = new Position(newX, newY);

        // Check bounds and wall
        if (newX >= 0 && newX < GRID_WIDTH &&
            newY >= 0 && newY < GRID_HEIGHT &&
            !WALLS.contains(newPos)) {
            gameState.setPosition(newPos);
            gameState.getMoveHistory().add(direction);
        }

        return gameState;
    }
    // time-twister-backend/src/main/java/com/timetwister/controller/GameController.java
@GetMapping("/state")
public ResponseEntity<GameState> getGameState() {
    return ResponseEntity.ok(gameService.getState());
}
}


