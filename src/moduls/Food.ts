// 定义食物类 Food
class Food{
    // 定义一个属性表示食物所对应的元素
    element : HTMLElement;
    // 定义一个获取食物X轴坐标的方法
    get X(){
        return this.element.offsetLeft;
    }
    // 定义一个获取食物Y轴坐标的方法
    get Y(){
        return this.element.offsetTop;
    }
    // 修改食物的位置
    change(){
        // 生成随机的位置
        // 食物的位置最小是0 最大是290
        // 蛇移动一次就是一格,一格的大小就是10,所以就要求食物的位置也是10的整数
        let top:number = Math.round(Math.random() * 29) * 10;
        let left:number = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
    constructor(){
    //  获取页面中的food元素并将其赋值给element
        this.element = document.getElementById('food')!;
    }

}
export default Food