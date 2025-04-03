import { _decorator, CCFloat, Component, Node, Vec3,Animation,tween} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    
    @property({
        type: CCFloat,
        tooltip: "How high can bird fly"
    })
    public jumpHeight: number = 3.5;


    @property({
        type: CCFloat,
        tooltip: "How long can bird fly"
    })

    public jumpDuration: number = 3.5;

    public birdAnimation : Animation;
    public birdLocation : Vec3;

    public hitSomething: boolean;

    protected onLoad(): void {
        this.resetBird();
        this.birdAnimation = this.getComponent(Animation);
    }

    resetBird(){
        this.birdLocation = new Vec3(0,0,0);
        this.node.setPosition(this.birdLocation);
        this.hitSomething = false;
    }

    fly() {
        this.birdAnimation.stop();
    
        tween(this.node.position)
            .to(
                this.jumpDuration, 
                new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0), 
                {
                    easing: 'sineOut', // Use a smoother easing function
                    onUpdate: (target: Vec3, ratio: number) => {
                        this.node.position = target;
                    }
                }
            )
            .start();
    
        this.birdAnimation.play();
    }

}


