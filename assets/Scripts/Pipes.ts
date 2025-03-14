import  { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;

const random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

@ccclass('Pipes')
export class Pipes extends Component {
   
    @property({
        type: Node,
        tooltip: "Top Pipe"
    })
    public topPipe: Node;

    @property({
        type: Node,
        tooltip: "Bottom Pipe"
    })
    public bottomPipe: Node;

    public tempStartLocationUp: Vec3 = new Vec3(0,0,0);
    public tempStartLocationDown: Vec3 = new Vec3(0,0,0);

    public scene = screen.windowSize;

    public game; //Speed of the pipes from the GameController
    public pipeSpeed: number //Final speed of the pipes
    public tempSpeed: number //Temporary speed of the pipes

     onLoad(){

        this.game = find("GameController").getComponent("GameController");
        this.pipeSpeed = this.game.pipeSpeed;
        this.initialPosition();
    }

    initialPosition(){

        this.tempStartLocationUp.x = ((this.topPipe.getComponent(UITransform) as UITransform).width + this.scene.width);
        this.tempStartLocationDown.x = ((this.bottomPipe.getComponent(UITransform) as UITransform).width + this.scene.width);

        let gap = random(90, 100);
        let topPipeHeight = random(0, 450);

        this.tempStartLocationUp.y = topPipeHeight;
        this.tempStartLocationDown.y = (topPipeHeight - (gap *10));
     
    }

    update(){

    }

}


