> ## 使用Adapter动态构建view
> 以ListView为例，思路：
> 1. 先创建一套模板布局，这个布局指定了ListView中的每个元素的样式，它是固定的
> 2. 创建一个自定义Adapter类继承ArrayAdapter，调用ArrayAdapter的构造函数，传入必要的参数，并重写getView方法
> 3. 在Activity中获取ListView视图对象，创建自定义Adapter的对象，传入List集合，将Adapter设置到ListView中
> ### 解释第一步
> 这一步指定的模板在后面会被自定义的Adapter所使用，Adapter会使用该模板来在直接父级视图中撑张一个子视图，所有的样式优先来自与该模板，没有的再使用默认的。举例说明，示例如下：
```
<!-- 模板示意图如下，只使用关键属性 -->
<LinearLayout
    ...
    android:orientation="horizontal">
    <LinearLayout
        ...
        android:orientation="vertical">
        <ImageView .../>
        <TextView .../>
    </LinearLayout>
    <LinearLayout
        ...
        android:orientation="vertical">
        <TextView .../>
        <TextView .../>
    </LinearLayout>
    <LinearLayout
        ...
        android:orientation="vertical">
        <TextView .../>
        <TextView .../>
    </LinearLayout>
</LinearLayout>
```
> ### 解释第二步
> An Adapter object acts as a bridge between an AdapterView and the underlying data for that view. The Adapter provides access to the data items. The Adapter is also responsible for making a View for each item in the data set.这是来自官方的解释，对Adapter的定义。意思就是，一个Adapter在AdapterView与视图的底层数据之间扮演了一个桥梁的角色。Adapter提供了对数据项的访问入口。Adapter还为数据集中每个部件构建视图。通俗来说，就是数据要怎么填进view都由Adapter决定和完成。所以在重写的getView方法中正是要做这个事：
```
...
public class MyAdapter extends ArrayAdapter<...>{
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // position可以理解为该项在数据集中的位置
        // convertView指的上一个视图，如果可能，将会被重复使用，以节约内存
        // parent指所属的父级视图组
        // 撑张一个视图
        View listItemView = LayoutInflater.from(getContent()).inflate(
            R.layout.template_item_view, parent, attachToRoot:false)
        // 接下来就是填充数据了
        // ...
        return listItemView;
    }
    // 这个方法不用我自己手动调用，写到这里就可以了，剩下要做的就是下一步了
}
```
> ### 解释第三步
> 也是最后一步，可以简单的理解为拼接前面的散碎部分
```
...
public class MainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.earthquake_activity);
        // 获取被填充的ListView对象
        ListView listView = findViewById(R.id.list);
        // 创建自定义Adapter对象
        final MyAdapter myAdapter = new myAdapter(this, earthquakes);
        // 拼接起来
        earthquakeListView.setAdapter(earthquakeAdapter);
    }
}
```
> 到这里就实现了在代码中动态添加view的功能，但是依然很简陋，比如可能添加的数量很多，我的ui该如何处理？
