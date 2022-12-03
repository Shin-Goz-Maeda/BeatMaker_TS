/*----- 各HTMLを取得 -----*/
// HTML<playGround>DOMを取得
var playGround = document.getElementById('playground');
var volumeControl = document.getElementById('volumeChange');
// HTML<feature Btn>DOMを取得
var shuffleBtn = document.getElementById('shuffle');
var returnBtn = document.getElementById('return');
var playBtn = document.getElementById('play');
var forwardBtn = document.getElementById('forward');
var repeatBtn = document.getElementById('repeat');
//HTML<sound>DOMを取得
var soundName = document.querySelectorAll('.name');
var sound = new Array(6);
sound[0] = document.getElementById('sound1');
sound[1] = document.getElementById('sound2');
sound[2] = document.getElementById('sound3');
sound[3] = document.getElementById('sound4');
sound[4] = document.getElementById('sound5');
sound[5] = document.getElementById('sound6');
// 再生時間　DOMを取得
var playBackPosition = document.getElementById("playBackPosition");
var endPosition = document.getElementById("endPosition");
var sliderProgress = document.getElementById("progress");
/*----- コントロール -----*/
// 再生状態判定
var playSound = "OFF";
// ランダムスイッチ判定 
var shuffleSwitch = "OFF";
// リピートスイッチ判定
var repeatSwitch = "OFF";
// どの音声ファイルを再生しているか判別
var whichSound = 0;
// 初期値を設定
var playTimer = null;
// ランダムな数字を生成
function randomGet(min, max) {
    var random = Math.floor(Math.random() * (max + 1 - min)) + min;
    return random;
}
// 再生状態によってステータス表示を管理
function startImage() {
    // playBtnをstopBtnに変更
    var stopImage = document.querySelector('.mainBtn');
    stopImage.src = "img/feature/stopBtn.png";
    // groundをstop表示に変更
    var groundImage = document.querySelector('.state');
    groundImage.src = "img/playGround/stopBtn.png";
    // playGroundに.rotateを付与
    playGround.classList.add('rotate');
}
// 再生状況のステータス表示をストップ
function stopImage() {
    // playBtnをstartBtnに変更
    var startImage = document.querySelector('.mainBtn');
    startImage.src = "img/feature/startBtn.png";
    // groundのstart表示に変更
    var groundImage = document.querySelector('.state');
    groundImage.src = "img/playGround/startBtn.png";
    // playGroundの.rotateを削除
    playGround.classList.remove('rotate');
}
// リピート状況のステータス表示ON
function repeatOnImg() {
    var repeatOn = document.querySelector('.repeat');
    repeatOn.src = "img/feature/repeatBtn-ON.png";
}
// リピート状況のステータス表示OFF
function repeatOffImg() {
    var repeatOff = document.querySelector('.repeat');
    repeatOff.src = "img/feature/repeatBtn.png";
}
// シャッフル状況のステータス表示ON
function shuffleOnImg() {
    var shuffleOn = document.querySelector('.shuffle');
    shuffleOn.src = "img/feature/shuffleBtn-ON.png";
}
// シャッフル状況のステータス表示OFF
function shuffleOffImg() {
    var shuffleOff = document.querySelector('.shuffle');
    shuffleOff.src = "img/feature/shuffleBtn.png";
}
// 再生を停止したらアンダーラインを削除
function markReset() {
    for (var i = 0; i < sound.length; i++) {
        soundName[i].style.textDecoration = "none";
    }
}
// 再生しているサウンドにアンダーラインを引く
function markSound(num) {
    if (whichSound === num) {
        soundName[num].style.textDecoration = "underline";
    }
    else if (whichSound === num) {
        soundName[num].style.textDecoration = "underline";
    }
    else if (whichSound === num) {
        soundName[num].style.textDecoration = "underline";
    }
    else if (whichSound === num) {
        soundName[num].style.textDecoration = "underline";
    }
    else if (whichSound === num) {
        soundName[num].style.textDecoration = "underline";
    }
    else if (whichSound === num) {
        soundName[num].style.textDecoration = "underline";
    }
    else {
        soundName[0].style.textDecoration = "underline";
    }
}
// 再生開始時に実行
var startTimer = function () {
    playTimer = setInterval(function () {
        playBackPosition.textContent = convertTime(sound[whichSound].currentTime);
        sliderProgress.value = Math.floor((sound[whichSound].currentTime / sound[whichSound].duration) * sound[whichSound].duration);
    }, 100);
};
// 停止した時に実行
var stopTimer = function () {
    clearInterval(playTimer);
    playBackPosition.textContent = convertTime(sound[whichSound].currentTime);
};
// 再生時間の表示を「mm:ss」に整える
var convertTime = function (timePosition) {
    timePosition = Math.floor(timePosition);
    var res = null;
    if (60 <= timePosition) {
        res = Math.floor(timePosition / 60);
        res += ":" + Math.floor(timePosition % 60).toString().padStart(2, "0");
    }
    else {
        res = "0:" + Math.floor(timePosition % 60).toString().padStart(2, "0");
    }
    return res;
};
// 音声ファイルの再生時間を取得
function playtimeControl(whichSound) {
    sliderProgress.max = sound[whichSound].duration;
    playBackPosition.textContent = convertTime(sound[whichSound].currentTime);
    endPosition.textContent = convertTime(sound[whichSound].duration);
}
// 各機能のクラスを作成
var soundState = /** @class */ (function () {
    function soundState() {
    }
    soundState.prototype.Play = function (num) {
        whichSound = num;
        control.Stop();
        markSound(num);
        startImage();
        playtimeControl(num);
        sound[num].play();
        sound[num].addEventListener('ended', function () {
            stopImage();
            playSound = "OFF";
        });
    };
    soundState.prototype.Stop = function () {
        stopImage();
        markReset();
        for (var i = 0; i < sound.length; i++) {
            sound[i].pause();
        }
    };
    soundState.prototype.Repeat = function (num) {
        whichSound = num;
        sound[num].loop = true;
        playtimeControl(num);
        sound[num].play();
        // イメージが止まらないように継続するため
        startImage();
    };
    soundState.prototype.Shuffle = function (num) {
        whichSound = num;
        var random = randomGet(0, 5);
        control.Stop();
        markSound(random);
        playtimeControl(random);
        sound[random].play();
        sound[random].addEventListener('ended', function () {
            var random = randomGet(0, 5);
            whichSound = random;
            control.Stop();
            markSound(random);
            playtimeControl(random);
            sound[random].play();
        });
    };
    soundState.prototype.Return = function (num) {
        whichSound = num;
        control.Stop();
        playtimeControl(num);
        if (num === 0) {
            sound[5].currentTime = 0;
            control.Play(5);
            sound[5].addEventListener('ended', function () {
                control.Stop();
            });
        }
        else {
            sound[num - 1].currentTime = 0;
            control.Play(num - 1);
            sound[num - 1].addEventListener('ended', function () {
                control.Stop();
            });
        }
    };
    soundState.prototype.Forward = function (num) {
        whichSound = num;
        control.Stop();
        playtimeControl(num);
        if (num === 5) {
            sound[0].currentTime = 0;
            control.Play(0);
            sound[0].addEventListener('ended', function () {
                control.Stop();
            });
        }
        else {
            sound[num + 1].currentTime = 0;
            control.Play(num + 1);
            sound[num + 1].addEventListener('ended', function () {
                control.Stop();
            });
        }
    };
    return soundState;
}());
var control = new soundState();
// 各サウンドクラス
var Sounds = /** @class */ (function () {
    function Sounds() {
    }
    Sounds.prototype.Sound = function (num) {
        whichSound = num;
        sound[num].currentTime = 0;
        control.Play(num);
    };
    return Sounds;
}());
var eachSound = new Sounds();
// 各featureのイベント処理
playBtn.addEventListener("click", function () {
    if (whichSound === 0) {
        if (playSound === "OFF") {
            if (repeatSwitch === "ON") {
                playSound = "ON";
                control.Repeat(0);
            }
            else if (shuffleSwitch === "ON") {
                playSound = "ON";
                control.Shuffle(0);
            }
            else if (repeatSwitch === "ON" && shuffleSwitch === "ON") {
                playSound = "ON";
                control.Repeat(0);
            }
            else {
                playSound = "ON";
                control.Play(0);
            }
        }
        else {
            playSound = "OFF";
            control.Stop();
        }
    }
    else if (whichSound === 1) {
        if (playSound === "OFF") {
            if (repeatSwitch === "ON") {
                playSound = "ON";
                control.Repeat(1);
            }
            else if (shuffleSwitch === "ON") {
                playSound = "ON";
                control.Shuffle(1);
            }
            else if (repeatSwitch === "ON" && shuffleSwitch === "ON") {
                playSound = "ON";
                control.Repeat(1);
            }
            else {
                playSound = "ON";
                control.Play(1);
            }
        }
        else {
            playSound = "OFF";
            control.Stop();
        }
    }
    else if (whichSound === 2) {
        if (playSound === "OFF") {
            if (repeatSwitch === "ON") {
                playSound = "ON";
                control.Repeat(2);
            }
            else if (shuffleSwitch === "ON") {
                playSound = "ON";
                control.Shuffle(2);
            }
            else if (repeatSwitch === "ON" && shuffleSwitch === "ON") {
                playSound = "ON";
                control.Repeat(2);
            }
            else {
                playSound = "ON";
                control.Play(2);
            }
        }
        else {
            playSound = "OFF";
            control.Stop();
        }
    }
    else if (whichSound === 3) {
        if (playSound === "OFF") {
            if (repeatSwitch === "ON") {
                playSound = "ON";
                control.Repeat(3);
            }
            else if (shuffleSwitch === "ON") {
                playSound = "ON";
                control.Shuffle(3);
            }
            else if (repeatSwitch === "ON" && shuffleSwitch === "ON") {
                playSound = "ON";
                control.Repeat(3);
            }
            else {
                playSound = "ON";
                control.Play(3);
            }
        }
        else {
            playSound = "OFF";
            control.Stop();
        }
    }
    else if (whichSound === 4) {
        if (playSound === "OFF") {
            if (repeatSwitch === "ON") {
                playSound = "ON";
                control.Repeat(4);
            }
            else if (shuffleSwitch === "ON") {
                playSound = "ON";
                control.Shuffle(4);
            }
            else if (repeatSwitch === "ON" && shuffleSwitch === "ON") {
                playSound = "ON";
                control.Repeat(4);
            }
            else {
                playSound = "ON";
                control.Play(4);
            }
        }
        else {
            playSound = "OFF";
            control.Stop();
        }
    }
    else if (whichSound === 5) {
        if (playSound === "OFF") {
            if (repeatSwitch === "ON") {
                playSound = "ON";
                control.Repeat(5);
            }
            else if (shuffleSwitch === "ON") {
                playSound = "ON";
                control.Shuffle(5);
            }
            else if (repeatSwitch === "ON" && shuffleSwitch === "ON") {
                playSound = "ON";
                control.Repeat(5);
            }
            else {
                playSound = "ON";
                control.Play(5);
            }
        }
        else {
            playSound = "OFF";
            control.Stop();
        }
    }
    else if (whichSound === undefined) {
        if (playSound === "OFF") {
            if (repeatSwitch === "ON") {
                playSound = "ON";
                control.Repeat(0);
            }
            else if (shuffleSwitch === "ON") {
                playSound = "ON";
                control.Shuffle(0);
            }
            else if (repeatSwitch === "ON" && shuffleSwitch === "ON") {
                playSound = "ON";
                control.Repeat(0);
            }
            else {
                playSound = "ON";
                control.Play(0);
            }
        }
        else {
            playSound = "OFF";
            control.Stop();
        }
    }
    volumeControl.addEventListener('input', function () {
        sound[whichSound].volume = volumeControl.value;
    });
    if (playSound === "ON") {
        startTimer();
    }
    else {
        stopTimer();
    }
});
returnBtn.addEventListener("click", function () {
    if (playSound === "ON") {
        if (whichSound === 0) {
            playSound = "ON";
            control.Return(0);
        }
        else if (whichSound === 1) {
            playSound = "ON";
            control.Return(1);
        }
        else if (whichSound === 2) {
            playSound = "ON";
            control.Return(2);
        }
        else if (whichSound === 3) {
            playSound = "ON";
            control.Return(3);
        }
        else if (whichSound === 4) {
            playSound = "ON";
            control.Return(4);
        }
        else if (whichSound === 5) {
            playSound = "ON";
            control.Return(5);
        }
    }
});
forwardBtn.addEventListener("click", function () {
    if (playSound === "ON") {
        if (whichSound === 0) {
            playSound = "ON";
            control.Forward(0);
        }
        else if (whichSound === 1) {
            playSound = "ON";
            control.Forward(1);
        }
        else if (whichSound === 2) {
            playSound = "ON";
            control.Forward(2);
        }
        else if (whichSound === 3) {
            playSound = "ON";
            control.Forward(3);
        }
        else if (whichSound === 4) {
            playSound = "ON";
            control.Forward(4);
        }
        else if (whichSound === 5) {
            playSound = "ON";
            control.Forward(5);
        }
    }
});
repeatBtn.addEventListener("click", function () {
    if (repeatSwitch == "OFF") {
        repeatSwitch = "ON";
        repeatOnImg();
    }
    else {
        repeatSwitch = "OFF";
        repeatOffImg();
    }
});
shuffleBtn.addEventListener("click", function () {
    if (shuffleSwitch === "OFF") {
        shuffleSwitch = "ON";
        shuffleOnImg();
    }
    else {
        shuffleSwitch = "OFF";
        shuffleOffImg();
    }
});
// 各soundのイベント処理
soundName[0].addEventListener("click", function () {
    playSound = "ON";
    eachSound.Sound(0);
});
soundName[1].addEventListener("click", function () {
    playSound = "ON";
    eachSound.Sound(1);
});
soundName[2].addEventListener("click", function () {
    playSound = "ON";
    eachSound.Sound(2);
});
soundName[3].addEventListener("click", function () {
    playSound = "ON";
    eachSound.Sound(3);
});
soundName[4].addEventListener("click", function () {
    playSound = "ON";
    eachSound.Sound(4);
});
soundName[5].addEventListener("click", function () {
    playSound = "ON";
    eachSound.Sound(5);
});
