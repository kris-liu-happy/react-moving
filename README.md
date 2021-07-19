## 安装



## 使用

```react
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
```



## API

| 字段                   | 类型      | 默认值           | 含义                                                    |
| ---------------------- | --------- | ---------------- | ------------------------------------------------------- |
| children               | ReactNode | Null             |                                                         |
| islimitInBrowser       | boolean   | false            | 是否限制物体脱离在边界                                  |
| childrenWidth          | number    | 0                | children存在，width,height 能优化平移过后的距离         |
| childrenHeight         | number    | 0                | children存在，width,height 能优化平移过后的距离         |
| distance               | Array     | [10, 10, 10, 10] | 开启islimitInBrowser 有效， [上，右，下，左] 默认都是10 |
| translateX             | number    | 0                | 初始化X位置                                             |
| translateY             | number    | 0                | 初始化Y位置                                             |
| onLocation             | Function  | /                | 每次移动的坐标                                          |
| moveStartTimeToEndTime | Function  | /                | 每次移动结束返回的时间                                  |

