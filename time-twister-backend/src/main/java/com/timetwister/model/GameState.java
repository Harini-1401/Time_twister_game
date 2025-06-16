// time-twister-backend/src/main/java/com/timetwister/model/GameState.java
package com.timetwister.model;

import java.util.ArrayList;
import java.util.List;

public class GameState {
    private Position position = new Position(0, 0);
    private List<String> moveHistory = new ArrayList<>();
    private final Position target = new Position(4, 4);  // 🎯 target at bottom-right

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public List<String> getMoveHistory() {
        return moveHistory;
    }

    public Position getTarget() {
        return target;
    }
    public void undoLastMove() {
    if (!moveHistory.isEmpty()) {
        String lastMove = moveHistory.remove(moveHistory.size() - 1);
        switch (lastMove) {
            case "UP": position.moveDown(); break;
            case "DOWN": position.moveUp(); break;
            case "LEFT": position.moveRight(); break;
            case "RIGHT": position.moveLeft(); break;
        }
    }

}
public void makeMove(String direction) {
    int newX = position.getX();
    int newY = position.getY();

    switch (direction) {
        case "UP": newY--; break;
        case "DOWN": newY++; break;
        case "LEFT": newX--; break;
        case "RIGHT": newX++; break;
    }

    if (isValidMove(newX, newY)) {
        position.setX(newX);
        position.setY(newY);
        moveHistory.add(direction);
    }
}

private boolean isValidMove(int x, int y) {
    if (x < 0 || x >= 5 || y < 0 || y >= 5) return false;

    // Define the wall layout (same as frontend)
    String[][] maze = {
        {" ", " ", " ", " ", " "},
        {" ", "█", " ", "█", " "},
        {" ", " ", "█", " ", " "},
        {" ", "█", " ", " ", " "},
        {" ", " ", " ", " ", " "}
    };

    return !maze[y][x].equals("█");
}


}
