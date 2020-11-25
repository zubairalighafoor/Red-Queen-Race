import React, { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const back1 = useRef(null);
  const back2 = useRef(null);
  const front1 = useRef(null);
  const front2 = useRef(null);
  const queen = useRef(null);
  useEffect(() => {
    var sceneryFrames = [
      { transform: 'translateX(100%)' },
      { transform: 'translateX(-100%)' },
    ];

    var sceneryTimingBackground = {
      duration: 36000,
      iterations: Infinity,
    }

    var sceneryTimingForeground = {
      duration: 12000,
      iterations: Infinity,
    };

    const spriteFrames = [
      { transform: "translateY(0)" },
      { transform: "translateY(-100%)" }
    ]

    const back1Movement = back1.current.animate(sceneryFrames, sceneryTimingBackground);
    back1Movement.currentTime = back1Movement.effect.getTiming().duration / 2;

    const back2Movement = back2.current.animate(sceneryFrames, sceneryTimingBackground);

    const front1Movement = front1.current.animate(sceneryFrames, sceneryTimingForeground);
    front1Movement.currentTime = front1Movement.effect.getTiming().duration / 2;

    const front2Movement = front2.current.animate(sceneryFrames, sceneryTimingForeground);

    const queenMovement = queen.current.animate(spriteFrames, {
      easing: 'steps(7,end)',
      direction: 'reverse',
      duration: 600,
      playbackRate: 1,
      iterations: Infinity,
    });

    var scenes = [front1Movement, front2Movement, back1Movement, back2Movement];

    const adjustPlaybackRate = () => {
      if(queenMovement.playbackRate < .8) {
        scenes.forEach((animation) => {
          animation.playbackRate = queenMovement.playbackRate/2*-1;
          // console.log(animation.playbackRate);
        })
      } else if(queenMovement.playbackRate > 1.2){
        scenes.forEach((animation) => {
          animation.playbackRate = queenMovement.playbackRate/2;
          // console.log(animation.playbackRate);
        })
      } else {
        scenes.forEach((animation) => {
          animation.playbackRate = 0;
          // console.log(animation.playbackRate);
        })
      }
    }

    // setInterval(() => {
    //   if(queenMovement.playbackRate > .4) {
    //     queenMovement.playbackRate *= 0.9;
    //   }
    // })

    // const goFaster = () => {
    //   queenMovement.playbackRate *= 1.1;
    //   console.log(queenMovement.playbackRate);
    // }

    setInterval(() => {
      if (queenMovement.playbackRate > .4) {
        queenMovement.playbackRate *= .9;
      }
      adjustPlaybackRate();
    }, 3000)

    const goFaster = () => {
      queenMovement.playbackRate *= 1.1;
      adjustPlaybackRate();
    }

    window.addEventListener("click", goFaster);
  })
  return (
    <div className="wrapper">
      <div className="sky"></div>
      <div className="earth">
        <div id="red-queen_and_alice">
          <img id="red-queen_and_alice_sprite" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place." ref={queen} />
        </div>
      </div>
      <div className="scenery" id="foreground1" ref={front1}>
        <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" " />
      </div>
      <div className="scenery" id="foreground2" ref={front2}>
        <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" " />
        <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" " />
      </div>
      <div className="scenery" id="background1" ref={back1}>
        <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" " />
        <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" " />
        <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" " />
      </div>
      <div className="scenery" id="background2" ref={back2}>
        <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" " />
        <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" " />
        <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" " />
      </div>
    </div>
  );
}

export default App;