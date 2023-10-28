    let height = 6;
    let width = 5;

    let row = 0;
    let col = 0;
    let score = 0; // 게임 스코어
    let hintCount = 0;
    const maxHintCount = 6;
    const maxWordLength = 5; // 최소로 입력해야 하는 글자 수

    const wordList = ["APPLE", "TABLE", "CHAIR", "MOUSE", "CLOCK", "WATER", "LIGHT", "HEART",
    "STARS", "MUSIC", "PAPER", "HOUSE", "CHIPS", "FRUIT", "GRASS", "EMAIL", "MONEY", "CARDS",
    "GAMES", "SNAKE", "POWER", "FLOOR", "BRICK", "STONE", "SHIRT", "FENCE", "BEACH", "WINGS",
    "PLANE", "TIGER", "CLOUD", "DOGGO", "CATS4", "CROWN", "LIGHT", "TABLE", "DANCE", "JUMPS",
    "CREAK", "SWEEP", "SWING", "CRANE", "FIERY", "RIVER", "SMILE", "EAGLE", "STORM", "GLOVE",
    "JELLY", "LOCKS", "DREAM", "RACER", "MAGIC", "QUACK", "TRAIN", "SPEED", "SPARK", "SKILL",
    "ROBOT", "JOKER", "COAST", "CHESS", "FLAME", "HAVEN", "CRUST", "QUICK", "SAUCE", "MUSIC",
    "RHYME", "CRISP", "STONE", "OCEAN", "MOUNT", "COLOR", "DIVER", "LUNCH", "SHADE", "FABLE",
    "WATCH", "YACHT", "BLINK", "SCARF", "GRILL", "FLOSS", "GRAND", "MOUSE", "BLAST", "SWARM",
    "FLUTE", "SWORD", "SAILS", "PAGES", "BLIND", "RACER", "PIPES", "BLINK", "SWEEP", "CLIFF",
    "CYCLE", "CRANE", "STARS", "LIGHT", "SOUND", "THUMB", "SPACE", "EARTH", "SWING", "PUNCH",
    "CROWN", "FRUIT", "SHIRT", "BRICK", "GLOVE", "BEACH", "FLOOR", "MOUSE", "STONE", "TABLE",
    "DREAM", "JOKER", "CLOUD", "DOGGO", "EMAIL", "CRISP", "MAGIC", "POWER", "MONEY", "RHYME",
    "LIGHT", "CHESS", "TABLE", "STORM", "FENCE", "CHAIR", "WATER", "HEART", "STARS", "MUSIC",
    "PAPER", "HOUSE", "CHIPS", "FRUIT", "GRASS", "EMAIL", "MONEY", "CARDS", "GAMES", "SNAKE",
    "POWER", "FLOOR", "BRICK", "STONE", "SHIRT", "FENCE", "BEACH", "WINGS", "PLANE", "TIGER",
    "CLOUD", "DOGGO", "CATS4", "CROWN", "LIGHT", "TABLE", "DANCE", "JUMPS", "CREAK", "SWEEP",
    "SWING", "CRANE", "FIERY", "RIVER", "SMILE", "EAGLE", "STORM", "GLOVE", "JELLY", "LOCKS",
    "DREAM", "RACER", "MAGIC", "QUACK", "TRAIN", "SPEED", "SPARK", "SKILL", "ROBOT", "JOKER",
    "CHESS", "FLAME", "HAVEN", "CRUST", "QUICK", "SAUCE", "MUSIC", "COAST"];
    let word = wordList[Math.floor(Math.random() * wordList.length)];
    let gameOver = false;

    window.onload = function () {
      startNewGame();
      updateScore();
    }
    function startNewGame() {
      row = 0;
      col = 0;
      hintCount = 0;

      if (gameOver) {
        // 게임 오버 시 스코어를 초기화
        score = 0;
      }

      clearBoard();
      word = wordList[Math.floor(Math.random() * wordList.length)];
      // document.getElementById("answer").innerText = "";
      clearTiles();
      gameOver = false; // 게임 오버 상태 초기화
      updateScore();
    }

    function clearTiles() {
      for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        currTile.innerText = "";
        currTile.classList.remove("correct", "present", "absent");
      }
    }
    function infinity() {
      for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
          let tile = document.createElement("span");
          tile.id = r.toString() + '-' + c.toString();
          tile.classList.add("tile");
          tile.innerText = "";
          document.getElementById("board").appendChild(tile);
        }
      }
      document.addEventListener("keyup", (e) => {
        if (gameOver) return;
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
          // 알파벳 입력은 허용
          if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
              currTile.innerText = e.key.toUpperCase();
              col += 1;
              currTile.focus(); // 타일에 포커스를 줍니다.
            }
          }
        } else if (e.code == "Backspace"){
          if (0 < col && col <= width) {
            col -= 1;
          }
          let currTile = document.getElementById(row.toString() + '-' + col.toString());
          currTile.innerText = "";
        } else if (e.code == "Enter" && col >= maxWordLength) {
          update();
          if (row == height - 1) {
            // 마지막 행에서 정답을 제대로 입력하면 게임 클리어 처리
            let correct = true;
            for (let c = 0; c < width; c++) {
              let currTile = document.getElementById(row.toString() + '-' + c.toString());
              if (word[c] != currTile.innerText) {
                correct = false;
                break;
              }
            }
            if (correct) {
              // document.getElementById("answer").innerText = "WIN!";
              let clearScore = 100 - (hintCount * 10);  
              clearScore = Math.max(clearScore, 10);
              score += clearScore; // 게임 클리어한 경우에만 스코어를 업데이트
              updateScore();
    
              setTimeout(() => {
                showMessage("게임 클리어!");
                startNewGame(); // 다음 게임 시작
              }, 2000);
            } else {
              gameOver = true;
              showMessage("게임 오버!");
              setTimeout(() => {
              startNewGame(); // 다음 게임 시작
              }, 2000);
            }
          } else {
            row += 1;
            col = 0;
            hintCount++;
            if (hintCount >= maxHintCount) {
              // 힌트를 모두 사용한 경우 게임 오버
              gameOver = true;
              setTimeout(() => {
                showMessage("게임 오버!");
                startNewGame(); // 다음 게임 시작
              }, 2000);
            }
          }
        } else {
          // 그 외의 모든 입력을 무시 (한글 및 기타 특수 문자)
          e.preventDefault();
        }
      });
    }

    function update() {
      let correct = 0;
      let finished = true;

      for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;
        if (word[c] == letter) {
          currTile.classList.add("correct");
          correct += 1;
        } else if (word.includes(letter)) {
          currTile.classList.add("present");
          finished = false;
        } else {
          currTile.classList.add("absent");
          finished = false;
        }
      }

      if (correct === width && finished) {
        let clearScore = 100 - (hintCount * 10);
        clearScore = Math.max(clearScore, 10);
        score += clearScore; // 게임 클리어한 경우에만 스코어를 업데이트
        updateScore();

        setTimeout(() => {
          showMessage("게임 클리어!");
          startNewGame(); // 다음 게임 시작
        }, 2000);
      }
    }

    function clearBoard() {
      for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
          let currTile = document.getElementById(r.toString() + '-' + c.toString());
          currTile.innerText = "";
          currTile.classList.remove("correct", "present", "absent");
        }
      }
    }

    function updateScore() {
      const scoreElement = document.getElementById("score");
      scoreElement.innerText = "스코어: " + score;
    }

    function showMessage(message) {
      const messageContainer = document.getElementById("message-container");
      messageContainer.innerText = message;
    }

    infinity();