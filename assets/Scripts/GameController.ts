import { _decorator, CCInteger, Component, Node } from 'cc';

import { Ground } from './Ground';

const { ccclass, property } = _decorator;


@ccclass('GameController')
export class GameController extends Component {

@property({
    type: Ground,
    tooltip: "This is Ground"
})
public ground: Ground;

@property({
    type: CCInteger
})
public speed: number = 300;

@property({
    type: CCInteger
})
public pipeSpeed: number = 200;

protected onLoad(): void {
    
}

initListener(){
 
}

startGame(){
 
}

}


