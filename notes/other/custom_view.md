## 主要以分析hellochart的角度来学习自定义视图。
```
package structure:
hellocharts:root
  |--animation:自定义的动画效果，有没有无所谓
  |--computator:很核心的一个包，负责计算图表的大小，缩放大小
  |--formatter
  |--gesture
  |--listener
  |--model
  |--provider
  |--renderer
  |--util
  |--view
    |--hack
```
### 拿其中的柱状图来说，ColumnChartView
> ChartComputator
