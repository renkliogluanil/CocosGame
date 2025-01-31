import { _decorator, Component, Node, Vec3,UITransform, director,Canvas } from 'cc';
import { GameController } from './GameController';

const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
    
    @property({
        type: Node,
        tooltip: "Ground 1 is here"
    })
    public ground1: Node;

    @property({
        type: Node,
        tooltip: "Ground 2 is here"
    })
    public ground2: Node;

    @property({
        type: Node,
        tooltip: "Ground 3 is here"
    })
    public ground3: Node;
    
    // Create ground width variables
    
    public groundWidth1: number;
    public groundWidth2: number;
    public groundWidth3: number;
    
    public temporaryStartPosition1: Vec3 = new Vec3();
    public temporaryStartPosition2: Vec3 = new Vec3();
    public temporaryStartPosition3: Vec3 = new Vec3();

    public gameController = new GameController();

    private gameSpeed: number;


    onLoad(){
        this.startUp();
    }

    startUp(){
       
        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;

        this.temporaryStartPosition1.x = 0;
        this.temporaryStartPosition2.x = this.groundWidth1;
        this.temporaryStartPosition3.x = this.groundWidth1 + this.groundWidth2;

        this.ground1.setPosition(this.temporaryStartPosition1);
        this.ground2.setPosition(this.temporaryStartPosition2);
        this.ground3.setPosition(this.temporaryStartPosition3);
    }

    update(deltaTime: number){

        this.gameSpeed = this.gameController.speed;

        this.temporaryStartPosition1 = this.ground1.position;
        this.temporaryStartPosition2 = this.ground2.position;
        this.temporaryStartPosition3 = this.ground3.position;

        this.temporaryStartPosition1.x -= this.gameSpeed * deltaTime;
        this.temporaryStartPosition2.x -= this.gameSpeed * deltaTime;
        this.temporaryStartPosition3.x -= this.gameSpeed * deltaTime;

        if(this.temporaryStartPosition1.x <= -this.groundWidth1){
            this.temporaryStartPosition1.x = this.temporaryStartPosition3.x + this.groundWidth3;
        }

        if (this.temporaryStartPosition2.x <= -this.groundWidth2){
            this.temporaryStartPosition2.x = this.temporaryStartPosition1.x + this.groundWidth1;
        }

        if (this.temporaryStartPosition3.x <= -this.groundWidth3){
            this.temporaryStartPosition3.x = this.temporaryStartPosition2.x + this.groundWidth2;
        }
    
        this.ground1.setPosition(this.temporaryStartPosition1);
        this.ground2.setPosition(this.temporaryStartPosition2);
        this.ground3.setPosition(this.temporaryStartPosition3);

    }
}
