import React, { useState, CSSProperties, useEffect } from 'react';
import { render } from 'react-dom';
import Renderer from '../../src/Renderer';
// import Renderer from '../../dist';
import { objectLocation, boxItem } from '../../src/types';
import { box } from './mock'

const MoveFood = {
  width: "80px",
}

const moveFoodTitle = {
  padding: '5px',
  backgroundColor: 'aqua',
  cursor: 'pointer',
}

const MoveFoodCollection = {
  cursor: 'pointer',
}

const  MoveFoodItem = {
  padding: '5px',
  cursor: 'pointer',
}

interface MoveComponentProps {
  isClick: boolean;
}

const MoveComponent = (props: MoveComponentProps) => {
  const [openBox, setOpenBox] = useState(true)

  const { isClick } = props

  useEffect(() => {
    setOpenBox(!openBox)
  }, [isClick])


  return (
    <div style={MoveFood as CSSProperties}>
      <p style={moveFoodTitle}>{openBox ? '关闭菜谱':'打开菜谱'}</p>
      {
        openBox ? <ul style={MoveFoodCollection}>
          {box.map((item: boxItem) => {
            return (
              <li style={MoveFoodItem} key={item.id}>{item.food}</li>
            )
          })}
        </ul> : ''
      }
    </div>
  )
}

const App: any = () => {

  const [isClick, setIsClick] = useState(false)

  const onLocation = (location: objectLocation): void => {
    console.log(location)
  }

  const getMoveTime = (time: number):void => {
    if (!!time && time < 100) {
      setIsClick(!isClick)
    }
  }
  return (
    <div>
      <Renderer
        onLocation={(location: objectLocation) => onLocation(location)}
        moveStartTimeToEndTime={(time: number) => getMoveTime(time)}
        translateX={100}
        translateY={100}
      >
        <MoveComponent isClick={isClick} />
      </Renderer>
      <div>菜谱</div>
    </div>
  );
};

render(<App />, document.querySelector('#app'));