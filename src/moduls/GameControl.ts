// 引入其他类
import Snake from "./snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制器,控制其他的所有类 
class GameControl{
    // 蛇
    snake:Snake;
    // 食物
    food:Food;
    // 记分牌
    scorePanel:ScorePanel;
    // 创建一个属性来储存蛇的移动方向
    direction:string = '';
    // 创建一个属性来记录游戏是否结束
    isLive = true

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init();
    }
    // 创建一个键盘按下的响应函数
    keydownHandler(event:KeyboardEvent){
        this.direction = event.key;
    }
    // 创建一个蛇移动的方法
    run(){
        // 根据方向(this.direction) 来使蛇的位置发生改变
        // 蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;
        // 根据按键的方向修改值
        switch(this.direction){
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }
        // 检查蛇是否吃到食物
        this.checkEat(X,Y)
        
        // 修改蛇的X和Y
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (error) {
            // 进入到catch 说明出现了异常,游戏结束,弹出一个提示信息
            alert(error + 'GAME OVER')
            this.isLive = false
        }
        // 开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this),150 - (this.scorePanel.level - 1) * 12)
    }
    // 定义一个方法,用来检查蛇是否吃到了食物
    checkEat(X:number,Y:number){ 
        if( X === this.food.X && Y === this.food.Y){
            // 食物的位置要进行重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇要增加一节
            this.snake.addBody()   
        }

    }

    // 游戏的初始化方法,调动后游戏即开始
    init(){
        // 绑定键盘按键按下的时间
        document.addEventListener('keydown',this.keydownHandler.bind(this));
        // 调用run方法,使蛇移动
        this.run();
    }
}

export default GameControl