class Snake{
    // 表示蛇头的元素
    head:HTMLElement;
    // 蛇的身体(包括蛇头)
    bodies:HTMLCollection;
    // 获取蛇的容器
    element:HTMLElement;
    constructor(){
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = document.getElementById('snake')?.getElementsByTagName('div')!;
        this.element = document.getElementById('snake')!;
    }
    // 获取蛇的坐标
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }
    set X(value:number){
        if(this.X == value) {
            return 
        }
        if(value < 0 || value > 290){
            // 说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        // 修改x时,是在修改水平坐标,蛇在向左移动时,不能向右掉头,反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            // 如果发生掉头,让蛇反方向继续移动
            if(value > this.X){
                // 如果新值大于旧值X,则说明蛇在向右走,此时发生掉头,应该使蛇继续向左走
                value = this.X - 10
            }else{
                value = this.X + 10
            }
        }
        // 移动身体
        this.moveBody()
        this.head.style.left = value + 'px'
        this.checkHeadBody()
    }
    set Y(value:number){
        if(this.Y == value) {
            return 
        }
        if(value < 0 || value > 290){
            // 说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        // 修改y时,是在修改水平坐标,蛇在向上移动时,不能向下掉头,反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            // 如果发生掉头,让蛇反方向继续移动
            if(value > this.Y){
                // 如果新值大于旧值X,则说明蛇在向右走,此时发生掉头,应该使蛇继续向左走
                value = this.Y - 10
            }else{
                value = this.Y + 10
            }
        }
        // 移动身体
        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }
    //蛇添加身体的方法
    addBody(){
        this.element.insertAdjacentHTML('beforeend',"<div></div>")
    }    
    // 添加一个蛇身体移动的方法
    moveBody(){
        /*
            将后边的身体设置为前边身体的位置
                举例子:
                    第4节 = 第3节的位置
                    第3节 = 第2节的位置
                    ....
        */ 
        // 遍历获取所有的身体
        for(let i=this.bodies.length-1 ; i>0; i--){
            // 获取前边身体的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            // 将值设置到当前的身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';

        }    
    }
    // 检查蛇头是否撞倒自己身体的方法
    checkHeadBody(){
        // 获取所有的身体,检测其是否和蛇头的坐标发生重叠
        for(let i = 1;i<this.bodies.length;i++){
            let bd = this.bodies[i] as HTMLElement
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                // 进入判断说明蛇头撞倒身体,游戏结束
                throw new Error('撞倒自己了')
            }
        }
    }
}
export default Snake