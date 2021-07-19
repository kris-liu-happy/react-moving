import React, { ReactNode, Component, MouseEvent } from 'react';
import { objectLocation } from '../types/index'
import styles from './index.less';


const DefaultChildren = () => {
  return (
    <div className={styles.defaultChildren}></div>
  )
}

interface MouseMoveProps {
  children?: ReactNode | undefined;
  // 是否限制物体在边界
  islimitInBrowser?: boolean;
  // children存在，width,height 能优化平移过后的距离
  childrenWidth?: number;
  childrenHeight?: number;
  // 开启islimitInBrowser 有效 [上，右，下，左] 默认都是10
  distance?: number[];
  // 初始化位子
  translateX?: number;
  translateY?: number;
  onLocation?(obj: objectLocation): void;
  moveStartTimeToEndTime?: (number: number) => void;
}

interface MouseMoveState {
  translateX: number;
  translateY: number;
}

class MouseDragger extends Component<MouseMoveProps, MouseMoveState>{
  moving: boolean;
  lastX: number;
  lastY: number;
  startTime: number;
  endTime: number;
  clientHeight: number;
  clientWidth: number;

  static defaultProps = {
    islimitInBrowser: false,
    distance: [10, 10, 10, 10],
    childrenWidth: 80,
    childrenHeight: 40,
  }
  

  constructor(props: MouseMoveProps) {
    super(props);

    this.state = {
      translateX: props.translateX || 0,
      translateY: props.translateY || 0,
    }
   
    this.moving = false;
    this.lastX = 0;
    this.lastY = 0;
    this.startTime = 0;
    this.endTime = 0;
    this.clientHeight = 0;
    this.clientWidth = 0;
  }

  onMouseDown = (e: MouseEvent): void => {
    e.stopPropagation();
    this.moving = true;

    // const { childrenWidth } = this.props;

    this.clientHeight = document.documentElement.clientHeight

    this.clientWidth = document.documentElement.clientWidth


    this.startTime = new Date().getTime()
  }

  onMouseUp = (e: MouseEvent): void => {
    e.stopPropagation();
    this.moving = false;
    this.lastX = null;
    this.lastY = null;
    this.endTime = new Date().getTime()
    const { moveStartTimeToEndTime } = this.props
    moveStartTimeToEndTime && moveStartTimeToEndTime(this.endTime - this.startTime)
    this.startTime = 0;
    this.endTime = 0;
  }

  onMouseMove = (e: MouseEvent): void => {
    this.moving && this.onMove(e);
  }

  browserBoundaryLimit = (e: MouseEvent): void => {

    // 1 正常 2 小于 3 大于
    let flagX = 1
    let flagY = 1

    if(this.lastX && this.lastY) {

      const { onLocation, distance, childrenWidth, childrenHeight } = this.props
      const { translateX, translateY } = this.state

      const dx:number = e.clientX - this.lastX;
      const dy:number = e.clientY - this.lastY;

      //isLimit 1 正常 2 小于 3 大于
      flagX = e.clientX < distance[3] ? 2 : e.clientX > (this.clientWidth - distance[1]) ? 3 : 1
      const X = e.clientX < distance[3] ? 0 : e.clientX > (this.clientWidth - distance[1]) ? this.clientWidth - childrenWidth : dx + translateX
      flagY = e.clientY < distance[0] ? 2 : e.clientY > (this.clientHeight - distance[2]) ? 3 : 1
      const Y = e.clientY < distance[0] ? 0 : e.clientY > (this.clientHeight - distance[2]) ? this.clientHeight - childrenHeight : dy + translateY
      onLocation && onLocation({x: X, y: Y})
      this.setState({ translateX: X, translateY: Y })
    }

    this.lastX = flagX === 1 ? e.clientX : flagX === 2 ? 0 : this.clientWidth - 80;
    this.lastY = flagY === 1 ? e.clientY : flagY === 2 ? 0 : this.clientHeight - 40;
  }

  onMove(e: MouseEvent): void {
    const { islimitInBrowser } = this.props
    if (islimitInBrowser) {
      if(this.lastX && this.lastY) {
        const dx = e.clientX - this.lastX;
        const dy = e.clientY - this.lastY;
        const { translateX, translateY } = this.state
        const { onLocation } = this.props
        onLocation && onLocation({x: translateX, y: translateY})
        this.setState({ translateX: translateX + dx, translateY: translateY + dy })
      }
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    } else {
      this.browserBoundaryLimit(e)
    }
  }

  render(): ReactNode {
    const { translateX, translateY } = this.state
    const {children, childrenWidth} = this.props

    return (
      <div
        style={{transform: `translateX(${translateX}px) translateY(${translateY}px)`, width: `${ childrenWidth }`, position: 'absolute'}}
        onMouseDown={e => this.onMouseDown(e)}
        onMouseUp={e => this.onMouseUp(e)}
        onMouseMove={e => this.onMouseMove(e)}
      >
        {children ? children : <DefaultChildren />}
      </div>
    )
  }
}


 
export default MouseDragger;