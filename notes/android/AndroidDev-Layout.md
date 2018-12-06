## Andriod 简单布局
> ### LinearLayout
> 该布局控制子视图的摆放位置，具体就是决定子视图是水平摆放(horizontal)还是竖直摆放(vertical)
1. 父视图关键属性:
``android:orientation:指定子视图的摆放方向，horizontal为水平摆放，vertical为竖直摆放，默认是水平摆放``
2. 子视图关键属性``layout_weight:布局权重，决定了该子视图在父视图中所占面积大小``
3. 均等分布摆放
```
<!-- 以水平均等摆放为例 -->
<LinearLayout
    ...
    android:orientation="horizontal">
    <TextView
        ...
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="One"/>
    <TextView
        ...
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="Two"/>
    <TextView
        ...
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="Three"/>
</LinearLayout>
<!-- 当android:layout_width="wrap_content"时，权重的优先权在文本内容大小所占位置之后，这同样适用于其他view -->
```
4. 非均等摆放
```
<!-- 以水平摆放为例 -->
<LinearLayout
    ...
    android:orientation="horizontal">
    <TextView
        ...
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="One"/>
    <TextView
        ...
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="3"
        android:text="Two"/>
    <TextView
        ...
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="Three"/>
</LinearLayout>
<!-- 此时文本内容为Two的文本视图权重为3，那么所有的权重加起来=5，它在宽度上永远占3/5，文本内容若有超出范围，自动增加行，即增加高度 -->
<!-- 若非均等摆放可调整布局权重，该值越高，所占面积越大 -->
<!-- 但是当android:layout_width="wrap_content"时，权重的优先权在文本内容大小所占位置之后，这同样适用于其他view，如下代码 -->
<LinearLayout
    ...
    android:orientation="horizontal">
    <TextView
        ...
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_weight="0"
        android:text="One"/>
    <TextView
        ...
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="Two"/>
    <TextView
        ...
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_weight="0"
        android:text="Three"/>
</LinearLayout>
<!-- 此时的布局以文本内容所占为先，即文本内容超范围时，不会先增加行，先会挤占其他文本视图的宽度 -->
```

> ### RelativeLayout
> 该视图下的子视图均已相对与谁的调性来摆放
1. 子视图关键属性：以``android:layout_align...``开头的，根据字面意思理解即可，表示对齐到哪里例如
```
android:layout_alignParentBottom="true" 就表示用自己的底边界对其到其父视图的底边界
```
``android:layout_above`` ``android:layout_below``，这类同样根据字面意思理解。
2. 以上属性中，有的为boolean值，有的需要指定view的id。
