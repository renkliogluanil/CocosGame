import { _decorator, CCInteger, Component, input, Node,Input, EventKeyboard,KeyCode, director,Contact2DType,Collider2D,IPhysics2DContact} from 'cc';

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
        type: Results,
        tooltip: "This is Results"
    })
    public results: Results;

    @property({
        type: PipePool,
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

    private isGameStarted: boolean = false;
    private isPipeSpawned: boolean = false;

    public isOver: boolean;
    protected onLoad(): void {
        console.log("GameController loaded");
        this.initListener();
        this.results.resetScore();
        this.isOver = false;
        director.pause();
        this.pipeQueue.initPool(); // Initialize the pipe pool
        this.startGame(); // Start the game automatically
    }

    initListener() {
      //  input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            
            if (this.isOver == true){
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            }

            if (this.isOver == false) {
                this.startGame();
                this.bird.fly();
            }
        
        });
    }

   /* onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
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
    }*/

   // private isPipeSpawned: boolean = false;

   startGame() {
    if (this.isGameStarted) return; // Prevent multiple calls
    this.isGameStarted = true;

    console.log("Game started");
    this.results.hideResults();
    director.resume();

    // Pipe spawn işlemini sürekli hale getir
    this.schedule(this.createPipe, 1); // Her 2 saniyede bir pipe oluştur
}
    gameOver() {
        this.results.showResults();
        this.isOver = true;
        director.pause();
    }

    resetGame() {
        this.results.resetScore();
        this.isGameStarted = false; // Oyunun tekrar başlamasına izin ver
        this.initListener();
        this.pipeQueue.reset();
        this.isOver = false;
    }

    passPipe() {
        this.results.addScore();
    }

    createPipe() {
        console.log("Creating new pipe");
        this.pipeQueue.addPool();
    }

    contactGroundPipe(){

        let collider = this.bird.getComponent(Collider2D);

        if (collider) {

            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        
        this.bird.hitSomething = true;

    }

    birdStruck(){
        this.contactGroundPipe();

        if (this.bird.hitSomething) {
        
            this.gameOver();
        }
    }

    update(){

        if (this.isOver == false) {
            this.birdStruck();
        }
    }
}




