import { _decorator, CCInteger, Component, input, Node,Input, EventKeyboard,KeyCode, director } from 'cc';

import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';

const { ccclass, property } = _decorator;


@ccclass('GameController')
export class GameController extends Component {

@property({
    type: Ground,
    tooltip: "This is Ground"
})
public ground: Ground;

@property({
    type: Bird,
    tooltip: "This is Bird"
})
public bird: Bird;

@property({
    type:Results,
    tooltip: "This is Results"
})
public results: Results;

@property({
    type:PipePool,
    tooltip: "This is PipePool"
})
public pipeQueue: PipePool;


@property({
    type: CCInteger
})
public speed: number = 300;

@property({
    type: CCInteger
})
public pipeSpeed: number = 200;


protected onLoad(): void {
    this.initListener();
    this.results.resetScore();
    director.pause();
    this.pipeQueue.initPool(); // Ensure this line is present
}
initListener(){
 
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    this.node.on(Node.EventType.TOUCH_START,() =>{
        
        this.bird.fly();

    });
}

 onKeyDown(event: EventKeyboard){

    switch(event.keyCode)
    {
        case KeyCode.KEY_A:
            this.gameOver();
            break;
        
        case KeyCode.KEY_P:
            this.results.addScore();
            break;

        case KeyCode.KEY_Q:
            this.resetGame();
            this.bird.resetBird();
    }
} 

startGame() {
    this.results.hideResults();
    director.resume();
    this.createPipe(); // Ensure this line is present to create the first pipe
}

gameOver(){
   
    this.results.showResults();
    director.pause();
}

resetGame(){

    this.results.resetScore();
    this.startGame();
    this.initListener();
    this.pipeQueue.reset();
}

passPipe(){

    this.results.addScore(); 
}

createPipe() {
    this.pipeQueue.addPool();
}

}




