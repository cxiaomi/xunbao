document.addEventListener('DOMContentLoaded', function () {
    // 获取保存ID的按钮元素
    const saveIdButton = document.getElementById('saveIdButton');
    // 为保存ID的按钮添加点击事件监听器
    saveIdButton.addEventListener('click', function() {
      // 获取玩家输入的ID
      const playerId = document.getElementById('playerIdInput').value;
      // 假设昵称和游戏历史记录暂时为空
      const nickname = '';
      const gameHistory = [];
      // 调用savePlayerInfo函数保存玩家ID和其他信息
      savePlayerInfo(playerId, nickname, gameHistory);
      // 可以在这里添加一些提示信息，告知玩家ID已保存
      alert('玩家ID已保存！');
    });
  class TreasureMap {
    static async loadGameData(file) {
      try {
        const response = await fetch(file);
        const data = await response.text();
        return data;
      } catch (error) {
        throw new Error('Failed to load game data: ' + error);
      }
    }

    static getInitialClue() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("在古老的图书馆里找到了第一个线索...");
        }, 1000);
      });
    }

    static decodeAncientScript(clue) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!clue) {
            reject("没有线索可以解码!");
          }
          resolve("解码成功!宝藏在一座古老的神庙中...");
        }, 1500);
      });
    }

    static searchTemple(location) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          if (random < 0.5) {
            reject("糟糕!遇到了神庙守卫!");
          }
          resolve("找到了一个神秘的箱子...");
        }, 2000);
      });
    }

    static openTreasureBox() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("恭喜!你找到了传说中的宝藏!");
        }, 1000);
      });
    }

    static faceGuard() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          if (random < 0.3) {
            reject("守卫拒绝了你的请求，你必须找到另一种方式进入神庙。");
          } else {
            resolve("守卫允许你进入神庙，他对你的智慧印象深刻。");
          }
        }, 1500);
      });
    }
  }

  async function findTreasureWithAsyncAwait() {
    const startButton = document.getElementById("startButton");
    startButton.disabled = true; // 禁用开始按钮
    try {
      const libraryClue = await TreasureMap.loadGameData('txt/library.txt');
      const templeInfo = await TreasureMap.loadGameData('txt/temple.txt');
      const guardInfo = await TreasureMap.loadGameData('txt/guard.txt');

      const clue = libraryClue;
      updateInterface("clue", "100px", clue);
      const decodedLocation = await TreasureMap.decodeAncientScript(clue);
      updateInterface("decoded", "200px", decodedLocation);
      const puzzleSolved = await solvePuzzle();
      updateInterface("puzzle", "300px", puzzleSolved);
      const templeCleared = await avoidTraps();
      updateInterface("traps", "400px", templeCleared);
      const doorUnlocked = await unlockDoor();
      updateInterface("door", "450px", doorUnlocked);
      const guardPassed = await TreasureMap.faceGuard();
      updateInterface("guard", "500px", guardPassed);
      const box = await TreasureMap.searchTemple(decodedLocation);
      updateInterface("box", "150px", box);
      const treasure = await TreasureMap.openTreasureBox();
      updateInterface("treasure", "250px", treasure);
    } catch (error) {
      updateStatus("任务失败: " + error);
    } finally {
      startButton.disabled = false; // 启用开始按钮
    }
  }

  function solvePuzzle() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("谜题解开了!");
      }, 1000);
    });
  }

  function avoidTraps() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.7) {
          reject("糟糕!触发了陷阱!");
        }
        resolve("避开了所有陷阱!");
      }, 1500);
    });
  }
  

  function unlockDoor() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("门解锁了!");
      }, 1000);
    });
  }

  function updateInterface(stepId, xPosition, message) {
    const stepElement = document.getElementById(stepId);
    stepElement.style.left = xPosition;
    updateStatus(message);
  }

  function updateStatus(message) {
    const statusElement = document.getElementById("status");
    statusElement.innerText = message;
  }


  function savePlayerInfo(playerId, nickname, gameHistory) {
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
  }

  function loadPlayerInfo() {
    const playerId = localStorage.getItem('playerId');
    const nickname = localStorage.getItem('nickname');
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory'));
    return { playerId, nickname, gameHistory };
  }
  

  function toggleMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic.paused) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }

  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", findTreasureWithAsyncAwait);

  const musicControlButton = document.getElementById('musicControlButton');
  musicControlButton.addEventListener('click', toggleMusic);

  const backgroundMusic = document.getElementById('backgroundMusic');
  startButton.addEventListener("click", function() {
    backgroundMusic.play();
  });
});