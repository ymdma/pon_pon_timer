// *******************
// **** Variables ****
// *******************



let conditionToGameClear = 10; // ゲームクリアになる正解数

let Game = { point: 0 };
let ms = 0;
let sec = 0;
let min = 0;
let stopWatch;

let countDownTimer;
let gameState = 'stop';

// カウントダウン
let cdSec;

let zero = 0

let full = 10
let seikai = 'OK'
let gameClear = '目標達成！'

let max;
// *******************
// **** Functions ****
// *******************

document.addEventListener('DOMContentLoaded', () => {

  max = document.getElementById('maxPoint').value;

  clickStartBtn();
  changeMaxScore()
});


const isDisabled = (target) => {
  target.setAttribute('disabled', true);
};

const removeDisabled = (target) => {
  target.removeAttribute('disabled');
};





// ポイントの計算量
let amountToAdd    =  1;  // 加点量
let amountToDeduct = -1;  // 減点量


//  ポイントの足し引き
//  calcPoint() >> 引数: amountToAdd or amountToDeduct
const calcPoint = amount => {
  Game.point += amount
  pointDisplayUpdate();
};



// 点数表示の更新
const pointDisplayUpdate = () => {
  const gamePoint = document.getElementById('gamePoint');
  gamePoint.innerHTML = Game.point;
};

const changeMaxScore = () => {

  let maxInput = document.getElementById('maxPoint')
  maxInput.addEventListener('change',() =>{
    max = maxInput.value;
    console.log(max)
  })
}



const changeState = (state) => {
  gameState = state
  changeDisplay();
  changeProgram();
  console.log(gameState)
};

const changeDisplay = () => {
  switch ( gameState ) {
    case 'run':
      isDisabled(startBtn);
      removeDisabled(stopBtn);
      break;
    case 'stop':
      isDisabled(stopBtn);
      removeDisabled(startBtn);
      break;
  }
}

const changeProgram = () => {
  switch ( gameState ) {
    case 'run':
      clickStopBtn();
      pushButton();
      break;
    case 'stop':
      // clickStartBtn();
      removeEL(document.getElementById('touchArea'), 'click', kaitou)
      break;
  }
}

// RemoveEventListner
const removeEL = (target,event,name) => {
  target.removeEventListener(event,name)
}


//スタートボタン押した時にカウント始める。
const clickStartBtn = () => {
  const startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', () => {
    min = 0;
    sec = 0;
    ms = 0;

    changeState('run')
    setTimeout( () => { countStart() },100); // セッティング分のサービスカウント

    document.getElementById('countDownDisplay').innerHTML = full
    countDownStart()
  })
};

// ストップウォッチスタート
countStart = () =>  {
  stopWatch = setInterval(countUp,10)

  Game.point = zero
  document.getElementById('gamePoint').innerHTML = zero

};

// カウントアップ処理
const countUp = () => {

  // 加算
  ms += 1;
  // sec += 1;
  if (ms > 99) {
    ms = 0;
    sec += 1;
  };
  if (sec > 60) {
    ms = 0;
    sec = 0;
    min += 1;
  };

  // 0埋め
  minNum = ("0" + min).slice(-2);
  secNum = ("0" + sec).slice(-2);
  msNum = ("0" + ms).slice(-2);

  // 表示
  document.getElementById('timer').innerHTML = `${minNum}:${secNum}`;
};


// タッチエリアをクリックした時に 「回答数をカウント」「カウントダウンスタート」
const pushButton = () => {
  const touchArea = document.getElementById('touchArea');

  touchArea.addEventListener('click', kaitou);
}

// 回答時。タップorクリックした時の処理
function kaitou () {
  const touchArea = document.getElementById('touchArea');
  const countDownDisplay = document.getElementById('countDownDisplay');
  const stopBtn = document.getElementById('stopBtn');

  isDisabled(stopBtn);
  touchArea.style.pointerEvents = 'none'
  clearInterval(countDownTimer);
  calcPoint(amountToAdd); // 加点
  countDownDisplay.innerHTML = seikai;


  if ( Game.point === Number(max) ) {
    console.log(max)
    console.log(Game.point)
    clearInterval(countDownTimer);
    clearInterval(stopWatch);
    countDownDisplay.innerHTML = gameClear;
    return
  }

  setTimeout( () => {
    removeDisabled(stopBtn);
    countDownDisplay.innerHTML = full;
    touchArea.style.pointerEvents = 'auto'
    // document.getElementById('info').innerHTML = ''
    countDownStart();
  }, 1000);  // 切り替え時間「OK」表示中
}

// カウントダウンスタート
countDownStart = () =>  {
  cdSec = full;
  countDownTimer = setInterval(countDown,1000)
};

// カウントダウン処理
const countDown = () => {
  cdSec--
  const countDownDisplay = document.getElementById('countDownDisplay')
  countDownDisplay.innerHTML = cdSec
  banishAnimation(countDownDisplay)
  if ( cdSec < 1 ) {
    clearInterval(countDownTimer)
    countDownDisplay.innerHTML = 'Boooo!'
  }
}


// ストップボタン押した時に [state:stop , 「時間を止める」 ]
const clickStopBtn = () => {
  const stopBtn = document.getElementById('stopBtn');

  stopBtn.addEventListener('click', () => {

    changeState('stop');
    clearInterval(stopWatch);
    clearInterval(countDownTimer);
  })
};



// 消えるモーション
const banishAnimation = target => {
Promise.resolve()
.then( () => {
return new Promise( resolve => {
target.animate( {
// background: ['#ffd45e', '#ffd45e'],
fontSize: ['80px', '120px'],
opacity: ['1', '0.6', '1']
}
, {
duration: 1000,
iterations: 1
});
setTimeout( () => {
// target.style.opacity = 0

resolve();
}, 0)
})
})
.then( () => {
return new Promise( resolve => {
// setTimeout( () => {
// target.animate( {
// // opacity: [0, 0]
// }
// , {
// duration: 150,
// iterations: 1
// });
// target.style.opacity = 1;
// isDisabled(target);
resolve();
// }, 0)
})
})
};


// const reset = () => {
//   const
//       startBtn = document.getElementById('startBtn'),
//       restartBtn = document.getElementById('restartBtn'),
//       gameField = document.getElementById('gameField'),
//       endComment = document.getElementById('endComment'),
//       cells_ele = gameField.querySelectorAll('.cell'),
//       cells = Array.prototype.slice.call(cells_ele);

//   restartBtn.onclick = () => {
//   Game.point = 0;
//   gamePoint.innerHTML = Game.point;
//   sec = 0;
//   ms = 0;
//   timer.innerHTML = '00:00';

//   // changeState('pre');
//   removeDisabled(startBtn);
//   isDisabled(restartBtn);

//   cells.forEach( cell =>
//   removeDisabled(cell)
//   );

//   };
// };



// // // 表示調整用スライダー
// // const slider = () => {
// // const elem = document.getElementById('rangeSlider');
// // const target = document.getElementById('sliderValue');
// // const rangeValue = (elem, target) => {
// // return function(evt) {
// // fontChange(`${12+ elem.value * 2}px`);
// // // console.log(elem.value) // 表示の確認用
// // }
// // }
// // elem.addEventListener('input', rangeValue(elem, target));
// // };

// fontChange = size => document.documentElement.style.fontSize = size;


// // game-field 表示調整・基準（jsによるレスポンシブ）

// let width;
// let height;

// const whenResize = () => {
// window.addEventListener("resize",() =>
// setTimeout(adjustWindow, 300)
// )
// };

// // ウィンドウリサイズ時の表示サイズ調整
// const adjustWindow = () => {
// // console.log("!")
// const slider = document.getElementById('rangeSlider');
// width = document.body.clientWidth;
// height = document.body.clientHeight;
// if ( 420 > height ) {
// slider.setAttribute('value', '0');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else if ( 450 > height ) {
// slider.setAttribute('value', '1.3');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else if ( 480 > height ) {
// slider.setAttribute('value', '1.3');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else if ( 500 > height ) {
// slider.setAttribute('value', '2');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else if ( 530 > height ) {
// slider.setAttribute('value', '2.5');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else if ( 580 > height ) {
// slider.setAttribute('value', '3');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else if ( 600 > height ) {
// slider.setAttribute('value', '4');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else if ( 650 > height ) {
// slider.setAttribute('value', '4.9');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else if ( width < 540 && height > 700 ) { // 横の制限
// slider.setAttribute('value', '6.8');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else if ( 700 > height ) {
// slider.setAttribute('value', '5.5');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else if ( 750 > height ) {
// slider.setAttribute('value', '6.8');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else if ( 800 > height ) {
// slider.setAttribute('value', '8');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else if ( 850 > height ) {
// slider.setAttribute('value', '10');
// fontChange(`${12+ slider.value * 2}px`);
// }
// else {
// slider.setAttribute('value', '10');
// fontChange(`${12+ slider.value * 2}px`);
// }
// };

// // スマホの横置き時、「縦でお願いします」のダイアログを出す。
// const onlyPortrait = () => {

// window.onorientationchange = () => {
// switch ( window.orientation ) {
// case 0:
// break;
// case 90:
// alert('スマホでは画面を縦にしてプレイしてください');
// break;
// case -90:
// alert('スマホでは画面を縦にしてプレイしてください２');
// break;
// }
// }
// }
