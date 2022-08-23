// 定义表示记分牌的类
class ScorePanel{
    score = 0;
    level = 1;
    scoreElm:HTMLElement;
    levelElm:HTMLElement;
    // 设置一个变量限制等级
    maxLevel:number;
    // 设置一个变量表示多少分时升级
    upScore:number;
    constructor(maxLevel:number = 10,upScore:number = 5){
        this.scoreElm = document.getElementById('score')!;
        this.levelElm = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore
    }
    // 设置一个加分的方法
    addScore(){
        // 使分数自增
        this.score++ ;
        this.scoreElm.innerHTML = this.score + '';
        if(this.score % this.upScore === 0){
            this.levelUp()
        }
    }

    // 提升等级的反复噶
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelElm.innerHTML = ++this.level + '';
        }
    }

}
export default ScorePanel