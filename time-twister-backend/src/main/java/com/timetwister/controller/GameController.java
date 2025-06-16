package com.timetwister.controller;

import com.timetwister.model.GameState;
import com.timetwister.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping("/state")
    public GameState getState() {
        return gameService.getState();
    }

    @PostMapping("/move")
    public GameState movePlayer(@RequestBody DirectionRequest request) {
        return gameService.movePlayer(request.getDirection());
    }

    @PostMapping("/undo")
    public GameState undoMove() {
        return gameService.undoLastMove();
    }

    static class DirectionRequest {
        private String direction;

        public String getDirection() {
            return direction;
        }

        public void setDirection(String direction) {
            this.direction = direction;
        }
    }
    @PostMapping("/undo")
public GameState undoLastMove() {
    gameState.undoLastMove();
    return gameState;
}

}
